import React from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Render3D extends React.Component {

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        window.addEventListener("resize", this.handleWindowResize);

        // setup scene
        this.scene = new THREE.Scene();

        //setup camera
        this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
        this.camera.position.set(0, 5, 400);

        // setup rendering
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#666666');
        this.renderer.setSize(width, height, false);
        this.mount.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.autoRotate = true;
        this.controls.rotateSpeed = -0.5
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.screenSpacePanning = true;
        
        this.loadSphere360();

        this.start()

    }
    loadSphere360() {
        const loader = new THREE.TextureLoader();
        loader.load('./textures/360_bg_lol1.jpg', (texture) => {
            const sphereGeometry = new THREE.SphereGeometry(500, 60, 40)
            const sphereMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            })
            sphereGeometry.scale(-1, 1, 1);
            let mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
            this.scene.add(mesh);
            mesh.position.set(0, 0, 0)
        })
    }
    componentWillUnmount() {
        this.stop();
        window.removeEventListener("resize", this.handleWindowResize);
        this.mount.removeChild(this.renderer.domElement);
    }
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }
    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height, false);

        this.renderer.render(this.scene, this.camera);
    }

    animate = () => {
        this.controls.update();
        this.frameId = window.requestAnimationFrame(this.animate)
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div className={this.props.className} ref={(mount) => { this.mount = mount }} />
        );
    }
}