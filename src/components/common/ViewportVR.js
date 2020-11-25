import React, { Component } from "react";
import {
    AmbientLight,
    AnimationMixer,
    AxesHelper,
    Box3,
    Cache,
    CubeTextureLoader,
    DirectionalLight,
    GridHelper,
    LinearEncoding,
    LoadingManager,
    PMREMGenerator,
    PerspectiveCamera,
    Scene,
    SkeletonHelper,
    UnsignedByteType,
    Vector3,
    WebGLRenderer,
    sRGBEncoding,
    TextureLoader,
    SphereGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    AudioListener,
    AudioLoader,
    Audio
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { ZipLoader } from '../../../src/zip-loader/ZipLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { VRButton } from '../../../src/webxr/VRButton.js';
// import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';

import { GUI } from 'dat.gui';

// import { environments } from '../assets/environment/index.js';
import { createBackground } from '../../../src/lib/three-vignette.js';
import { MeshoptDecoder } from '../../../src/gltf-pack/js/meshopt_decoder.js';

// @mui core
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
// @mui icon
import RoomIcon from '@material-ui/icons/Room';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import OSMBasic from '../common/osm/CustomOSM.js';

import styles from '../../assets/jss/material-kit-react/common/customOSMStyle.js';
// 
const DEFAULT_CAMERA = '[default]';

const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// const standalone = window.navigator.standalone,
//     userAgent = window.navigator.userAgent.toLowerCase(),
//     safari = /safari/.test( userAgent ),
//     ios = /iphone|ipod|ipad/.test( userAgent );

// glTF texture types. `envMap` is deliberately omitted, as it's used internally
// by the loader but not part of the glTF format.
const environments = [
    {
        id: '',
        name: 'None',
        path: null,
        format: '.hdr'
    },
    {
        id: 'venice-sunset',
        name: 'Venice Sunset',
        path: './venice_sunset_1k.hdr',
        format: '.hdr'
    },
    {
        id: 'footprint-court',
        name: 'Footprint Court (HDR Labs)',
        path: './footprint_court_2k.hdr',
        format: '.hdr'
    }
];

const MAP_NAMES = [
    'map',
    'aoMap',
    'emissiveMap',
    'glossinessMap',
    'metalnessMap',
    'normalMap',
    'roughnessMap',
    'specularMap',
];

const Preset = { ASSET_GENERATOR: 'assetgenerator' };

Cache.enabled = true;

export default class Viewport3D extends Component {
    constructor(props) {
        super(props);
        this.state = {
            environment: Preset.ASSET_GENERATOR
                ? environments.find((e) => e.id === 'venice-sunset').name
                : environments[1].name,
            // background: false,
            background: true,
            playbackSpeed: 1.0,
            actionStates: {},
            camera: DEFAULT_CAMERA,
            wireframe: false,
            skeleton: false,
            grid: false,
            // Lights
            addLights: true,
            exposure: 1.0,
            textureEncoding: 'sRGB',
            ambientIntensity: 0.3,
            ambientColor: 0xFFFFFF,
            directIntensity: 0.8 * Math.PI, // TODO(#116)
            directColor: 0xFFFFFF,
            bgColor1: '#ffffff',
            bgColor2: '#353535',

            isOSMOpen: false,
            open : false,
            openPerson : false,
            scroll : "page"
        };

    }
    handlerOpenOSM = () => {
        this.setState({
            isOSMOpen: true
        });
    }
    handlerCloseOSM = () => {
        this.setState({
            isOSMOpen: false
        });
    }
    handleInfoOpen = () => {
        this.setState({
            open: true
        });
        console.log(this.open);
    }
    handleInfoClose = () => {
        this.setState({
            open: false
        });
    }
    handlePersonOpen = () => {
        this.setState({
            openPerson: true
        });
        console.log(this.open);
    }
    handlePersonClose = () => {
        this.setState({
            openPerson: false
        });
    }
    componentDidMount() {
        const { model } = this.props;
        this.model = model;
        this.el = this.mount;
        // this.options = options;
        this.lights = [];
        this.content = null;
        this.mixer = null;
        this.clips = [];
        this.gui = null;

        this.prevTime = 0;

        this.stats = new Stats();
        this.stats.dom.height = '24px';
        // [].forEach.call(this.stats.dom.children, (child) => (child.style.display = ''));--display all info


        this.scene = new Scene();

        const fov = Preset.ASSET_GENERATOR
            ? 0.8 * 180 / Math.PI
            : 60;
        this.defaultCamera = new PerspectiveCamera(fov, this.el.clientWidth / this.el.clientHeight, 0.01, 1000);
        this.activeCamera = this.defaultCamera;
        this.scene.add(this.defaultCamera);
        if (/Android|webOS|Mac|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.renderer = window.renderer = new WebGLRenderer({ antialias: true });
            console.log("MB - OS");
        }
        else {
            this.renderer = window.renderer = new WebGLRenderer({ antialias: false });
            console.log("PC");
        }

        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = sRGBEncoding;
        this.renderer.setClearColor(0xcccccc);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.el.clientWidth, this.el.clientHeight);

        this.pmremGenerator = new PMREMGenerator(this.renderer);
        this.pmremGenerator.compileEquirectangularShader();

        this.controls = new OrbitControls(this.defaultCamera, this.renderer.domElement);
        // this.controls.enableZoom = false;
        // this.controls.enablePan = false;
        // this.controls.enableDamping = true;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 100;
        this.controls.rotateSpeed = - 0.5;
        this.controls.autoRotate = true;
        this.controls.screenSpacePanning = true;

        this.vignette = createBackground({
            aspect: this.defaultCamera.aspect,
            grainScale: IS_IOS ? 0 : 0.001, // mattdesl/three-vignette-background#1
            colors: [this.state.bgColor1, this.state.bgColor2]
        });
        this.vignette.name = 'Vignette';
        this.vignette.renderOrder = -1;

        this.renderer.xr.enabled = true;
        this.mount.appendChild(this.stats.dom);
        this.mount.appendChild(this.renderer.domElement);
        this.mount.appendChild(VRButton.createButton(this.renderer));

        this.cameraCtrl = null;
        this.cameraFolder = null;
        this.animFolder = null;
        this.animCtrls = [];
        this.morphFolder = null;
        this.morphCtrls = [];
        this.skeletonHelpers = [];
        this.gridHelper = null;
        this.axesHelper = null;

        // this.clear();

        this.listener = new AudioListener();
        this.defaultCamera.add(this.listener);

        // create a global audio source
        this.sound = new Audio(this.listener);

        // load a sound and set it as the Audio object's buffer
        this.audioLoader = new AudioLoader();

        this.promise = Promise.resolve(this.props.model);
        this.promise.then(
            model => {
                this.audioLoader.load(model.audio, (buffer) => {
                    this.sound.setBuffer(buffer);
                    this.sound.setLoop(false);
                    this.sound.setVolume(1);
                    // if(this.props.progress >= 100)
                    //     this.sound.play();
                });
            }
        )

        this.loadSphere360();
        // this.loadPanorama();
        this.loadModel();

        this.addAxesHelper();
        // this.addGUI();
        // if (options.kiosk) this.gui.close();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.start();
        // this.animate();
    }
    componentWillUnmount() {
        this.stop();
        this.sound.stop();
        this.mount.removeChild(this.renderer.domElement);
        window.removeEventListener('resize', this.resize.bind(this), false);
    }
    componentDidUpdate() {
        if (this.props.progress >= 100) {
            this.sound.play();
        }
    }
    start() {
        if (!this.frameId) {
            // this.frameId = window.requestAnimationFrame(this.animate);
            this.frameId = this.renderer.setAnimationLoop(this.renderScene);
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }
    animate = () => {
        console.log("RUN!");
        this.renderer.setAnimationLoop(this.renderScene);
    }

    renderScene = (time) => {
        const dt = (time - this.prevTime) / 1000;
        this.controls.update();
        this.stats.update();
        this.mixer && this.mixer.update(dt);
        this.prevTime = time;

        this.renderer.render(this.scene, this.activeCamera);
        if (this.state.grid) {
            this.axesCamera.position.copy(this.defaultCamera.position)
            this.axesCamera.lookAt(this.axesScene.position)
            this.axesRenderer.render(this.axesScene, this.axesCamera);
        }
    }

    resize() {

        const { clientHeight, clientWidth } = this.el.parentElement;

        this.defaultCamera.aspect = clientWidth / clientHeight;
        this.defaultCamera.updateProjectionMatrix();
        // this.vignette.style({ aspect: this.defaultCamera.aspect });
        this.renderer.setSize(clientWidth, clientHeight);

        this.axesCamera.aspect = this.axesDiv.clientWidth / this.axesDiv.clientHeight;
        this.axesCamera.updateProjectionMatrix();
        this.axesRenderer.setSize(this.axesDiv.clientWidth, this.axesDiv.clientHeight);
    }
    loadSphere360() {
        const loader = new TextureLoader();
        loader.load('./textures/360_bg_lol1.jpg', (texture) => {
            const sphereGeometry = new SphereGeometry(500, 60, 40)
            const sphereMaterial = new MeshBasicMaterial({
                map: texture,
                side: DoubleSide
            })
            sphereGeometry.scale(-1, 1, 1);
            let mesh = new Mesh(sphereGeometry, sphereMaterial);
            this.scene.add(mesh);
            mesh.position.set(0, 0, 0)
        })
    }
    loadPanorama() {
        const loader = new CubeTextureLoader();
        const texture = loader.load([
            'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
            'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
            'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
            'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
            'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
            'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
        ]);
        this.scene.background = texture;
    }
    loadModel() {
        const manager = new LoadingManager();

        var url = this.model.urlModel;
        //var url = './models/glTF/BoomBox.gltf';

        new Promise((resolve, reject) => {

            if (url.match(/\.zip$/)) {

                new ZipLoader().load(url).then(function (zip) {

                    manager.setURLModifier(zip.urlResolver);

                    resolve(zip.find(/\.(gltf|glb)$/i)[0]);

                });

            } else {

                resolve(url);

            }

        }).then((file) => {

            const loader = new GLTFLoader(manager);
            loader.setCrossOrigin('anonymous');
            // const dracoLoader = new DRACOLoader();
            // dracoLoader.setDecoderPath('three/examples/js/libs/draco/');
            // dracoLoader.setDecoderConfig( { type: 'js' } );
            // dracoLoader.preload();
            // loader.setDRACOLoader( dracoLoader );
            loader.setMeshoptDecoder(MeshoptDecoder);
            loader.load(file, (gltf) => {
                const scene = gltf.scene || gltf.scenes[0];
                const clips = gltf.animations || [];

                if (!scene) {
                    // Valid, but not supported by this viewer.
                    throw new Error(
                        'This model contains no scene, and cannot be viewed here. However,'
                        + ' it may contain individual 3D resources.'
                    );
                }

                this.setContent(scene, clips);
            });

        });
    }
    /**
     * @param {THREE.Object3D} object
     * @param {Array<THREE.AnimationClip} clips
     */
    setContent(object, clips) {

        this.clear();

        const box = new Box3().setFromObject(object);
        const size = box.getSize(new Vector3()).length();
        const center = box.getCenter(new Vector3());

        this.controls.reset();

        object.position.x += (object.position.x - center.x);
        object.position.y += (object.position.y - center.y);
        object.position.z += (object.position.z - center.z);
        this.controls.maxDistance = size * 10;
        this.defaultCamera.near = size / 100;
        this.defaultCamera.far = size * 100;
        this.defaultCamera.updateProjectionMatrix();

        // if (this.options.cameraPosition) {

        //   this.defaultCamera.position.fromArray( this.options.cameraPosition );
        //   this.defaultCamera.lookAt( new Vector3() );

        // } else {

        this.defaultCamera.position.copy(center);
        this.defaultCamera.position.x += size / 1.5;
        this.defaultCamera.position.y += size / 5.0;
        this.defaultCamera.position.z += size / 1.5;
        this.defaultCamera.lookAt(center);

        // }

        this.setCamera(DEFAULT_CAMERA);

        this.axesCamera.position.copy(this.defaultCamera.position)
        this.axesCamera.lookAt(this.axesScene.position)
        this.axesCamera.near = size / 100;
        this.axesCamera.far = size * 100;
        this.axesCamera.updateProjectionMatrix();
        this.axesCorner.scale.set(size, size, size);

        this.controls.saveState();

        this.scene.add(object);
        this.content = object;

        // this.state.addLights = true;
        this.setState({
            addLights: true
        })
        this.content.traverse((node) => {
            if (node.isLight) {
                // this.state.addLights = false;
                this.setState({
                    addLights: false
                })
            } else if (node.isMesh) {
                // TODO(https://github.com/mrdoob/three.js/pull/18235): Clean up.
                node.material.depthWrite = !node.material.transparent;
            }
        });

        this.setClips(clips);

        this.updateLights();
        // this.updateGUI();
        this.playAllClips();
        this.updateEnvironment();
        this.updateTextureEncoding();
        this.updateDisplay();

        window.content = this.content;
        // console.info('[glTF Viewer] THREE.Scene exported as `window.content`.');
        // this.printGraph(this.content);

    }

    printGraph(node) {

        console.group(' <' + node.type + '> ' + node.name);
        node.children.forEach((child) => this.printGraph(child));
        console.groupEnd();

    }

    /**
     * @param {Array<THREE.AnimationClip} clips
     */
    setClips(clips) {
        if (this.mixer) {
            this.mixer.stopAllAction();
            this.mixer.uncacheRoot(this.mixer.getRoot());
            this.mixer = null;
        }

        this.clips = clips;
        if (!clips.length) return;

        this.mixer = new AnimationMixer(this.content);
    }

    playAllClips() {
        this.clips.forEach((clip) => {
            this.mixer.clipAction(clip).reset().play();
            // this.state.actionStates[clip.name] = true;
            console.log("ACTIONS : " + this.state.actionStates);
        });
    }

    /**
     * @param {string} name
     */
    setCamera(name) {
        if (name === DEFAULT_CAMERA) {
            this.controls.enabled = true;
            this.activeCamera = this.defaultCamera;
        } else {
            this.controls.enabled = false;
            this.content.traverse((node) => {
                if (node.isCamera && node.name === name) {
                    this.activeCamera = node;
                }
            });
        }
    }

    updateTextureEncoding() {
        const encoding = this.state.textureEncoding === 'sRGB'
            ? sRGBEncoding
            : LinearEncoding;
        this.traverseMaterials(this.content, (material) => {
            if (material.map) material.map.encoding = encoding;
            if (material.emissiveMap) material.emissiveMap.encoding = encoding;
            if (material.map || material.emissiveMap) material.needsUpdate = true;
        });
    }

    updateLights() {
        const state = this.state;
        const lights = this.lights;

        if (state.addLights && !lights.length) {
            this.addLights();
        } else if (!state.addLights && lights.length) {
            this.removeLights();
        }

        this.renderer.toneMappingExposure = state.exposure;

        if (lights.length === 2) {
            lights[0].intensity = state.ambientIntensity;
            lights[0].color.setHex(state.ambientColor);
            lights[1].intensity = state.directIntensity;
            lights[1].color.setHex(state.directColor);
        }
    }

    addLights() {
        const state = this.state;

        // if (this.options.preset === Preset.ASSET_GENERATOR) {
        //   const hemiLight = new HemisphereLight();
        //   hemiLight.name = 'hemi_light';
        //   this.scene.add(hemiLight);
        //   this.lights.push(hemiLight);
        //   return;
        // }

        const light1 = new AmbientLight(state.ambientColor, state.ambientIntensity);
        light1.name = 'ambient_light';
        this.defaultCamera.add(light1);

        const light2 = new DirectionalLight(state.directColor, state.directIntensity);
        light2.position.set(0.5, 0, 0.866); // ~60º
        light2.name = 'main_light';
        this.defaultCamera.add(light2);

        this.lights.push(light1, light2);
    }

    removeLights() {

        this.lights.forEach((light) => light.parent.remove(light));
        this.lights.length = 0;

    }

    updateEnvironment() {

        const environment = environments.filter((entry) => entry.name === this.state.environment)[0];

        this.getCubeMapTexture(environment).then(({ envMap }) => {

            if ((!envMap || !this.state.background) && this.activeCamera === this.defaultCamera) {
                // this.scene.add(this.vignette);
            } else {
                this.scene.remove(this.vignette);
            }

            this.scene.environment = envMap;
            this.scene.background = this.state.background ? envMap : null;

        });

    }

    getCubeMapTexture(environment) {
        const { path } = environment;

        // no envmap
        if (!path) return Promise.resolve({ envMap: null });

        return new Promise((resolve, reject) => {

            new RGBELoader()
                .setDataType(UnsignedByteType)
                .load(path, (texture) => {

                    const envMap = this.pmremGenerator.fromEquirectangular(texture).texture;
                    this.pmremGenerator.dispose();

                    resolve({ envMap });

                }, undefined, reject);

        });

    }

    updateDisplay() {
        if (this.skeletonHelpers.length) {
            this.skeletonHelpers.forEach((helper) => this.scene.remove(helper));
        }

        this.traverseMaterials(this.content, (material) => {
            material.wireframe = this.state.wireframe;
        });

        this.content.traverse((node) => {
            if (node.isMesh && node.skeleton && this.state.skeleton) {
                const helper = new SkeletonHelper(node.skeleton.bones[0].parent);
                helper.material.linewidth = 3;
                this.scene.add(helper);
                this.skeletonHelpers.push(helper);
            }
        });

        if (this.state.grid !== Boolean(this.gridHelper)) {
            if (this.state.grid) {
                this.gridHelper = new GridHelper();
                this.axesHelper = new AxesHelper();
                this.axesHelper.renderOrder = 999;
                this.axesHelper.onBeforeRender = (renderer) => renderer.clearDepth();
                this.scene.add(this.gridHelper);
                this.scene.add(this.axesHelper);
            } else {
                this.scene.remove(this.gridHelper);
                this.scene.remove(this.axesHelper);
                this.gridHelper = null;
                this.axesHelper = null;
                this.axesRenderer.clear();
            }
        }
    }

    updateBackground() {
        // this.vignette.style({ colors: [this.state.bgColor1, this.state.bgColor2] });
    }

    /**
     * Adds AxesHelper.
     *
     * See: https://stackoverflow.com/q/16226693/1314762
     */
    addAxesHelper() {
        this.axesDiv = document.createElement('div');
        this.el.appendChild(this.axesDiv);
        this.axesDiv.classList.add('axes');

        const { clientWidth, clientHeight } = this.axesDiv;

        this.axesScene = new Scene();
        this.axesCamera = new PerspectiveCamera(50, clientWidth / clientHeight, 0.1, 10);
        this.axesScene.add(this.axesCamera);

        this.axesRenderer = new WebGLRenderer({ alpha: true });
        this.axesRenderer.setPixelRatio(window.devicePixelRatio);
        this.axesRenderer.setSize(this.axesDiv.clientWidth, this.axesDiv.clientHeight);

        this.axesCamera.up = this.defaultCamera.up;

        this.axesCorner = new AxesHelper(5);
        this.axesScene.add(this.axesCorner);
        this.axesDiv.appendChild(this.axesRenderer.domElement);
    }

    addGUI() {

        const gui = this.gui = new GUI({ autoPlace: false, width: 260, hideable: true });

        // Display controls.
        const dispFolder = gui.addFolder('Display');
        const envBackgroundCtrl = dispFolder.add(this.state, 'background');
        envBackgroundCtrl.onChange(() => this.updateEnvironment());
        const wireframeCtrl = dispFolder.add(this.state, 'wireframe');
        wireframeCtrl.onChange(() => this.updateDisplay());
        const skeletonCtrl = dispFolder.add(this.state, 'skeleton');
        skeletonCtrl.onChange(() => this.updateDisplay());
        const gridCtrl = dispFolder.add(this.state, 'grid');
        gridCtrl.onChange(() => this.updateDisplay());
        dispFolder.add(this.controls, 'autoRotate');
        dispFolder.add(this.controls, 'screenSpacePanning');
        const bgColor1Ctrl = dispFolder.addColor(this.state, 'bgColor1');
        const bgColor2Ctrl = dispFolder.addColor(this.state, 'bgColor2');
        bgColor1Ctrl.onChange(() => this.updateBackground());
        bgColor2Ctrl.onChange(() => this.updateBackground());

        // Lighting controls.
        const lightFolder = gui.addFolder('Lighting');
        const encodingCtrl = lightFolder.add(this.state, 'textureEncoding', ['sRGB', 'Linear']);
        encodingCtrl.onChange(() => this.updateTextureEncoding());
        lightFolder.add(this.renderer, 'outputEncoding', { sRGB: sRGBEncoding, Linear: LinearEncoding })
            .onChange(() => {
                this.renderer.outputEncoding = Number(this.renderer.outputEncoding);
                this.traverseMaterials(this.content, (material) => {
                    material.needsUpdate = true;
                });
            });
        const envMapCtrl = lightFolder.add(this.state, 'environment', environments.map((env) => env.name));
        envMapCtrl.onChange(() => this.updateEnvironment());
        [
            lightFolder.add(this.state, 'exposure', 0, 2),
            lightFolder.add(this.state, 'addLights').listen(),
            lightFolder.add(this.state, 'ambientIntensity', 0, 2),
            lightFolder.addColor(this.state, 'ambientColor'),
            lightFolder.add(this.state, 'directIntensity', 0, 4), // TODO(#116)
            lightFolder.addColor(this.state, 'directColor')
        ].forEach((ctrl) => ctrl.onChange(() => this.updateLights()));

        // Animation controls.
        this.animFolder = gui.addFolder('Animation');
        this.animFolder.domElement.style.display = 'none';
        const playbackSpeedCtrl = this.animFolder.add(this.state, 'playbackSpeed', 0, 1);
        playbackSpeedCtrl.onChange((speed) => {
            if (this.mixer) this.mixer.timeScale = speed;
        });
        this.animFolder.add({ playAll: () => this.playAllClips() }, 'playAll');

        // Morph target controls.
        this.morphFolder = gui.addFolder('Morph Targets');
        this.morphFolder.domElement.style.display = 'none';

        // Camera controls.
        this.cameraFolder = gui.addFolder('Cameras');
        this.cameraFolder.domElement.style.display = 'none';

        // Stats.
        const perfFolder = gui.addFolder('Performance');
        const perfLi = document.createElement('li');
        this.stats.dom.style.position = 'static';
        perfLi.appendChild(this.stats.dom);
        perfLi.classList.add('gui-stats');
        perfFolder.__ul.appendChild(perfLi);

        const guiWrap = document.createElement('div');
        this.el.appendChild(guiWrap);
        guiWrap.classList.add('gui-wrap');
        guiWrap.appendChild(gui.domElement);
        gui.open();

    }


    updateGUI() {
        this.cameraFolder.domElement.style.display = 'none';

        this.morphCtrls.forEach((ctrl) => ctrl.remove());
        this.morphCtrls.length = 0;
        this.morphFolder.domElement.style.display = 'none';

        this.animCtrls.forEach((ctrl) => ctrl.remove());
        this.animCtrls.length = 0;
        this.animFolder.domElement.style.display = 'none';

        const cameraNames = [];
        const morphMeshes = [];
        this.content.traverse((node) => {
            if (node.isMesh && node.morphTargetInfluences) {
                morphMeshes.push(node);
            }
            if (node.isCamera) {
                node.name = node.name || `VIEWER__camera_${cameraNames.length + 1}`;
                cameraNames.push(node.name);
            }
        });

        if (cameraNames.length) {
            this.cameraFolder.domElement.style.display = '';
            if (this.cameraCtrl) this.cameraCtrl.remove();
            const cameraOptions = [DEFAULT_CAMERA].concat(cameraNames);
            this.cameraCtrl = this.cameraFolder.add(this.state, 'camera', cameraOptions);
            this.cameraCtrl.onChange((name) => this.setCamera(name));
        }

        if (morphMeshes.length) {
            this.morphFolder.domElement.style.display = '';
            morphMeshes.forEach((mesh) => {
                if (mesh.morphTargetInfluences.length) {
                    const nameCtrl = this.morphFolder.add({ name: mesh.name || 'Untitled' }, 'name');
                    this.morphCtrls.push(nameCtrl);
                }
                for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
                    const ctrl = this.morphFolder.add(mesh.morphTargetInfluences, i, 0, 1, 0.01).listen();
                    Object.keys(mesh.morphTargetDictionary).forEach((key) => {
                        if (key && mesh.morphTargetDictionary[key] === i) ctrl.name(key);
                    });
                    this.morphCtrls.push(ctrl);
                }
            });
        }

        if (this.clips.length) {
            this.animFolder.domElement.style.display = '';
            const actionStates = this.state.actionStates;
            this.clips.forEach((clip, clipIndex) => {
                // Autoplay the first clip.
                let action;
                if (clipIndex === 0) {
                    actionStates[clip.name] = true;
                    action = this.mixer.clipAction(clip);
                    action.play();
                } else {
                    actionStates[clip.name] = false;
                }

                // Play other clips when enabled.
                const ctrl = this.animFolder.add(actionStates, clip.name).listen();
                ctrl.onChange((playAnimation) => {
                    action = action || this.mixer.clipAction(clip);
                    action.setEffectiveTimeScale(1);
                    playAnimation ? action.play() : action.stop();
                });
                this.animCtrls.push(ctrl);
            });
        }
    }

    clear() {

        if (!this.content) return;

        this.scene.remove(this.content);

        // dispose geometry
        this.content.traverse((node) => {

            if (!node.isMesh) return;

            node.geometry.dispose();

        });

        // dispose textures
        this.traverseMaterials(this.content, (material) => {

            MAP_NAMES.forEach((map) => {

                if (material[map]) material[map].dispose();

            });

        });

    }
    traverseMaterials(object, callback) {
        object.traverse((node) => {
            if (!node.isMesh) return;
            const materials = Array.isArray(node.material)
                ? node.material
                : [node.material];
            materials.forEach(callback);
        });
    }
    render() {
        return (
            <div className={this.props.viewport} ref={(mount) => { this.mount = mount }} >
                <div className={this.props.controlsManager}>
                    <IconButton
                        onClick={this.handlerOpenOSM}
                        style={{ padding: "4px" }}
                        aria-label="close">
                        <RoomIcon style={{ color: "white" }} />
                    </IconButton>
                    <IconButton
                        onClick={this.handleInfoOpen}
                        style={{ padding: "4px" }}
                        aria-label="close">
                        <InfoIcon style={{ color: "white" }} />
                    </IconButton>
                    <IconButton
                        onClick={this.handlePersonOpen}
                        style={{ padding: "4px" }}
                        aria-label="close">
                        <PersonIcon style={{ color: "white" }} />
                    </IconButton>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleInfoClose}
                    scroll={'body'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Đền Hùng</DialogTitle>
                    <DialogContent dividers="true">
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            {[...new Array(10)]
                                .map(
                                    () => `Đền Hùng là tên gọi khái quát của Khu di tích lịch sử Đền Hùng - quần thể đền chùa thờ phụng các Vua Hùng và tôn thất của nhà vua trên núi Nghĩa Lĩnh, gắn với Giỗ Tổ Hùng Vương - Lễ hội Đền Hùng được tổ chức tại địa điểm đó hàng năm vào ngày 10 tháng 3 âm lịch. Hiện nay, theo các tài liệu khoa học đã công bố đa số đều thống nhất nền móng kiến trúc đền Hùng bắt đầu được xây dựng từ thời vua Đinh Tiên Hoàng trị vì. Đến thời Hậu Lê (thế kỷ 15) được xây dựng hoàn chỉnh theo quy mô như hiện tại.`,
                                )
                                .join('\n')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
            
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openPerson}
                    onClose={this.handlePersonClose}
                    scroll={'body'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Vua Hùng</DialogTitle>
                    <DialogContent dividers="true">
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            {[...new Array(10)]
                                .map(
                                    () => `Hùng Vương (chữ Hán: 雄王, chữ Nôm:𤤰雄) là cách gọi dành cho các vị vua nước Văn Lang của người Lạc Việt. Theo truyền thuyết, Hùng Vương thứ I là con trai của Lạc Long Quân, lên ngôi vào năm 2879 trước công nguyên, đặt quốc hiệu là Văn Lang, chia nước làm 15 bộ, truyền đời đến năm 258 trước công nguyên thì bị Thục Phán (An Dương Vương) chiếm mất nước.[1] Truyền thuyết về Hùng Vương được ghi chép lại lần đầu tiên vào cuối đời Trần tại Hồng Bàng Thị truyện trong sách Lĩnh Nam chích quái; sau đó được sử gia Ngô Sĩ Liên đưa vào Đại Việt Sử kí Toàn thư ở cuối thế kỉ XV.[.`,
                                )
                                .join('\n')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
            
                    </DialogActions>
                </Dialog>
                {
                    this.state.isOSMOpen && <div style={styles.popup}>
                        <div style={styles.popupContainer}>
                            <div style={styles.popupContent}>
                                <div style={styles.popupModel}>
                                    <div style={styles.modelContainer}>
                                        <div style={styles.modelMain}>
                                            <div style={styles.viewer}>
                                                <OSMBasic iframeView={styles.iframeView} />
                                                <IconButton
                                                    onClick={this.handlerCloseOSM}
                                                    className={this.props.controlsManager}
                                                    style={{ zIndex: 1000 }}
                                                    aria-label="close">
                                                    <LocationOffIcon style={{ color: "white" }} />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    (this.props.progress < 100) && (<Box ref={(controlsManager) => { this.controlsManager = controlsManager }} alignItems="center" className={this.props.boxContainer}>
                        <Box minWidth={35} style={{ color: "white" }}>
                            <Typography
                                variant="body2"
                            >
                                {`Đang tải mô hình...${Math.round(this.props.progress,)}%`}
                            </Typography>
                        </Box>
                        <Box width="33.33%" mr={1}>
                            <LinearProgress
                                className={this.props.linearBar}
                                variant="determinate"
                                value={this.props.progress} />
                        </Box>
                    </Box>)
                }
            </div>
        );
    }
};

