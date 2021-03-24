import React, { Component } from "react";
import {
    AmbientLight,
    AnimationMixer,
    AxesHelper,
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
    MathUtils,
    Clock,
    Raycaster,
    Vector2,
    Matrix4
    // AudioListener,
    // AudioLoader,
    // Audio
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { ZipLoader } from '../../../src/lib/zip-loader/ZipLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { VRButton } from '../../../src/lib/webxr/VRButton.js';
// import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';

import { GUI } from 'dat.gui';

// import { environments } from '../assets/environment/index.js';
import { createBackground } from 'lib/three-vignette.js';
import { MeshoptDecoder } from '../../../src/lib/gltf-pack/js/meshopt_decoder.js';

// @mui core

const DEFAULT_CAMERA = '[default]';
const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

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

export default class ViewportXR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            environment: Preset.ASSET_GENERATOR
                ? environments.find((e) => e.id === 'footprint-court').name
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

            model: props.model
        };

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

        // --- //
        this.isUserInteracting = false;
        this.onPointerDownMouseX = 0;
        this.onPointerDownMouseY = 0;
        this.lon = 0;
        this.onPointerDownLon = 0;
        this.lat = 0;
        this.onPointerDownLat = 0;
        this.phi = 0;
        this.theta = 0;

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;
        // Velocity vectors for the player and dino
        this.velocity = new Vector3();
        this.direction = new Vector3();

        this.clock = new Clock();
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();

        this.obj = [];
        this.objects = [];
        this.collidableObjects = [];

        this.PLAYERCOLLISIONDISTANCE = 10;
        // --- //

        this.prevTime = 0;

        this.stats = new Stats();
        this.stats.dom.height = '24px';
        // [].forEach.call(this.stats.dom.children, (child) => (child.style.display = ''));--display all info


        this.scene = new Scene();

        const fov = Preset.ASSET_GENERATOR
            ? 1.5 * 0.8 * 180 / Math.PI
            : 60;
        this.defaultCamera = new PerspectiveCamera(fov, this.el.clientWidth / this.el.clientHeight, 0.01, 1000);
        this.defaultCamera.target = new Vector3(0, 0, 0);
        this.defaultCamera.position.z = 1;
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

        // this.controls = new OrbitControls(this.defaultCamera, this.renderer.domElement);
        // // this.controls.enableZoom = false;
        // // this.controls.enablePan = false;
        // // this.controls.enableDamping = true;
        // this.controls.minDistance = 5;
        // this.controls.maxDistance = 100;
        // this.controls.rotateSpeed = - 0.5;
        // this.controls.autoRotate = true;
        // this.controls.screenSpacePanning = true;

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

        this.clear();

        this.loadSphere360();
        // this.loadPanorama();
        this.loadModel({ posX: 70, posY: -20, posZ: 0, scale: 20, url: './models/room/arena_gallery_webvr_3d.zip' });
        this.loadModel({ posX: 65, posY: -5, posZ: 0, scale: .01, url: './models/room/fel_iron_horde_lightning_cannon_tank_-_animated.zip' });

        this.addAxesHelper();
        // this.addGUI();
        // if (options.kiosk) this.gui.close();

        // interacting event
        this.el.style.touchAction = 'none';

        this.el.addEventListener('pointerdown', this.onPointerDown.bind(this), false);

        document.addEventListener('wheel', this.onDocumentMouseWheel.bind(this), false);

        document.addEventListener('dragover', function (event) {

            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';

        }, false);

        document.addEventListener('dragenter', function () {

            document.body.style.opacity = 0.5;

        }, false);

        document.addEventListener('dragleave', function () {

            document.body.style.opacity = 1;

        }, false);

        document.addEventListener('drop', function (event) {

            event.preventDefault();

            const reader = new FileReader();
            reader.addEventListener('load', function (event) {

                // material.map.image.src = event.target.result;
                // material.map.needsUpdate = true;

            }, false);
            reader.readAsDataURL(event.dataTransfer.files[0]);

            document.body.style.opacity = 1;

        }, false);

        // 

        document.addEventListener("keydown", this.onDocumentKeyDown.bind(this));
        document.addEventListener("keyup", this.onDocumentKeyUp.bind(this));

        window.addEventListener('resize', this.resize.bind(this), false);
        this.start();
        // this.animate();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.model !== nextState.model) {
            return true;
        }
        return false;
    }
    componentWillUnmount() {
        this.stop();
        // this.sound.stop();
        this.mount.removeChild(this.renderer.domElement);
        window.removeEventListener('resize', this.resize.bind(this), false);
    }
    start() {
        if (!this.frameId) {
            // this.frameId = window.requestAnimationFrame(this.animate);
            this.frameId = this.renderer.setAnimationLoop(this.renderScene);
        }
    }

    stop() {
        // cancelAnimationFrame(this.frameId);
        this.renderer.setAnimationLoop(null);
    }

    // interacting
    onPointerDown(event) {

        if (event.isPrimary === false) return;

        this.isUserInteracting = true;

        this.onPointerDownMouseX = event.clientX;
        this.onPointerDownMouseY = event.clientY;

        this.onPointerDownLon = this.lon;
        this.onPointerDownLat = this.lat;

        document.addEventListener('pointermove', this.onPointerMove.bind(this), false);
        document.addEventListener('pointerup', this.onPointerUp.bind(this), false);
        // console.log("down");

    }

    onPointerMove(event) {

        if (event.isPrimary === false) return;

        if (this.isUserInteracting === true) {

            this.lon = (this.onPointerDownMouseX - event.clientX) * 0.1 + this.onPointerDownLon;
            this.lat = (event.clientY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;
            // console.log("move");
        }

    }

    onPointerUp(event) {

        if (event.isPrimary === false) return;

        this.isUserInteracting = false;

        document.removeEventListener('pointermove', this.onPointerMove.bind(this));
        document.removeEventListener('pointerup', this.onPointerUp.bind(this));

        // console.log("up");
    }

    onDocumentMouseWheel(event) {

        const fov = this.activeCamera.fov + event.deltaY * 0.05;

        this.activeCamera.fov = MathUtils.clamp(fov, 10, 75);

        this.activeCamera.updateProjectionMatrix();
        // console.log("wheel");

    }

    // move
    onDocumentKeyDown(event) {
        switch (event.keyCode) {
            case 27: //escape
                break;
            case 38: // up
            case 87: // w
                this.moveForward = true;
                break;
            case 37: // left
            case 65: // a
                this.moveLeft = true;
                break;
            case 40: // down
            case 83: // s
                this.moveBackward = true;
                break;
            case 39: // right
            case 68: // d
                this.moveRight = true;
                break;
            case 32: // space
                if (this.canJump === true) this.velocity.y += 350 - 150;
                this.canJump = false;
                break;
            default:
                return 0;
        }
    }
    onDocumentKeyUp(event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                this.moveForward = false;
                break;
            case 37: // left
            case 65: // a
                this.moveLeft = false;
                break;
            case 40: // down
            case 83: // s
                this.moveBackward = false;
                break;
            case 39: // right
            case 68: // d
                this.moveRight = false;
                break;
            default:
                return 0;
        }
    }
    animatePlayer(delta) {
        var intersections = this.raycaster.intersectObjects(this.obj);

        var onObject = intersections.length > 0;

        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveLeft) - Number(this.moveRight);
        this.direction.normalize(); //

        if (this.detectPlayerCollision() === false) {

            if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 800.0 * delta;
            if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 800.0 * delta;
            if (onObject === true) {
                this.velocity.y = Math.max(0, this.velocity.y);
                this.canJump = true;
            }
            this.activeCamera.translateX(this.velocity.x * delta);
            this.activeCamera.position.y += (this.velocity.y * delta);
            this.activeCamera.translateZ(this.velocity.z * delta);
            if (this.activeCamera.position.y < 10 / 10) {
                this.velocity.y = 0;
                this.activeCamera.position.y = 10 / 10;
                this.canJump = true;
            }
        }
        else {

            this.velocity.x = 0;
            this.velocity.z = 0;
        }
    }

    detectPlayerCollision() {

        var rotationMatrix;

        var cameraDirection = this.activeCamera.getWorldDirection(new Vector3(0, 0, 0)).clone();

        if (this.moveBackward) {
            rotationMatrix = new Matrix4();
            rotationMatrix.makeRotationY(this.degreesToRadians(180));
        }
        else if (this.moveLeft) {
            rotationMatrix = new Matrix4();
            rotationMatrix.makeRotationY(this.degreesToRadians(90));
        }
        else if (this.moveRight) {
            rotationMatrix = new Matrix4();
            rotationMatrix.makeRotationY(this.degreesToRadians(270));
        }


        if (rotationMatrix !== undefined) {
            cameraDirection.applyMatrix4(rotationMatrix);
        }


        let rayCaster = new Raycaster(this.activeCamera.position, cameraDirection);


        if (this.rayIntersect(rayCaster, this.PLAYERCOLLISIONDISTANCE)) {
            return true;
        } else {
            return false;
        }
    }

    rayIntersect(ray, distance) {
        var intersects = ray.intersectObjects(this.collidableObjects, true);
        for (var i = 0; i < intersects.length; i++) {
            if (intersects[i].distance < distance) {
                return true;
            }
        }
        return false;
    }
    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    // 

    animate = () => {
        console.log("RUN!");
        this.renderer.setAnimationLoop(this.renderScene);
    }

    renderScene = (time) => {
        const dt = (time - this.prevTime) / 1000;
        // this.controls.update();
        this.stats.update();
        this.mixer && this.mixer.update(dt);
        this.prevTime = time;

        // move
        let delta = this.clock.getDelta();
        this.animatePlayer(delta);
        // interacting
        this.lat = Math.max(- 85, Math.min(85, this.lat));
        this.phi = MathUtils.degToRad(90 - this.lat);
        this.theta = MathUtils.degToRad(this.lon);

        this.activeCamera.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
        this.activeCamera.target.y = 500 * Math.cos(this.phi);
        this.activeCamera.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

        this.activeCamera.lookAt(this.activeCamera.target);
        // 

        this.renderer.render(this.scene, this.activeCamera);
        if (this.state.grid) {
            this.axesCamera.position.copy(this.defaultCamera.position)
            // this.axesCamera.lookAt(this.axesScene.position)
            this.axesRenderer.render(this.axesScene, this.axesCamera);
        }
        // console.log("CAM POS:" + this.activeCamera.position.x + "||" + this.activeCamera.position.y + "||" + this.activeCamera.position.z);
    }

    resize() {

        const { clientHeight, clientWidth } = this.el.parentElement || this.el;

        this.defaultCamera.aspect = this.el.clientWidth / this.el.clientHeight;
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
    loadModel(model) {
        const manager = new LoadingManager();

        var url = model.url;
        // var url = './models/room/arena_gallery_webvr_3d.zip';

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

                this.setContent(scene, clips, model);
            });

        });
    }
    /**
     * @param {THREE.Object3D} object
     * @param {Array<THREE.AnimationClip} clips
     */
    setContent(object, clips, model) {

        // this.clear();

        // const box = new Box3().setFromObject(object);
        // const size = box.getSize(new Vector3()).length();
        // const center = box.getCenter(new Vector3());

        // this.controls.reset();

        // object.position.x += (object.position.x - center.x);
        // object.position.y += (object.position.y - center.y);
        // object.position.z += (object.position.z - center.z);
        // this.controls.maxDistance = size * 10;
        // this.defaultCamera.near = size / 100;
        // this.defaultCamera.far = size * 100;
        // this.defaultCamera.updateProjectionMatrix();

        // if (this.options.cameraPosition) {

        //   this.defaultCamera.position.fromArray( this.options.cameraPosition );
        //   this.defaultCamera.lookAt( new Vector3() );

        // } else {

        // this.defaultCamera.position.copy(center);
        // this.defaultCamera.position.x += size / 1.5;
        // this.defaultCamera.position.y += size / 5.0;
        // this.defaultCamera.position.z += size / 1.5;
        // this.defaultCamera.lookAt(center);

        // }

        // this.setCamera(DEFAULT_CAMERA);

        // this.axesCamera.position.copy(this.defaultCamera.position)
        // this.axesCamera.lookAt(this.axesScene.position)
        // this.axesCamera.near = size / 100;
        // this.axesCamera.far = size * 100;
        // this.axesCamera.updateProjectionMatrix();
        // this.axesCorner.scale.set(size, size, size);

        // this.controls.saveState();

        object.position.set(model.posX, model.posY, model.posZ);
        object.scale.multiplyScalar(model.scale);

        this.scene.add(object);
        this.content = object;

        for (let i = 0; i < object.children.length; i++) {
            this.objects.push(object.children[i]);
            this.collidableObjects.push(object.children[i]);
        }

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
        console.log("XR3D");
        return (
            <div className={this.props.viewport} ref={(mount) => { this.mount = mount }} />
        );
    }
};

