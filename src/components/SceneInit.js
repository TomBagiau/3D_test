import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from "three/examples/jsm/libs/stats.module";
import front from "../images/front.png"
import back from "../images/back.png"
import left from "../images/left.png"
import right from "../images/right.png"
import bottom from "../images/bottom.png"
import top from "../images/top.png"
//import ModelTest from "../assets/models/argon.gltf"
import ModelLoad from "../assets/models/mremireh_o_desbiens.fbx"
import AnimModel from "../assets/models/HipHopDancing.fbx"

export default class SceneInit {
    constructor(fov = 60, camera, scene, stats, controls, renderer, shadowMap) {
        this.fov = fov;
        this.scene = scene;
        this.stats = stats;
        this.camera = camera;
        this.controls = controls;
        this.renderer = renderer;
    }


    initScene() {
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set = ([0, 0, 0]);


        this.scene = new THREE.Scene();


        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("myThreeJsCanvas"),
            antialias: true,
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        //init shadow
        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio, 2);

        // //light
        const light = new THREE.DirectionalLight(0xFFFFFF);
        light.position.set(100, 100, 100);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.01;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 1.0;
        light.shadow.camera.far = 500;
        light.shadow.camera.left = 200;
        light.shadow.camera.right = -200;
        light.shadow.camera.top = 200;
        light.shadow.camera.bottom = -200;
        this.scene.add(light);

        const helpers = new THREE.AxesHelper();
        this.scene.add(helpers);


        // //bonhomme 
        // const GLTFloader = new GLTFLoader();

        // GLTFloader.load(ModelTest, (gltf) => {
        //     const model = gltf.scene;
        //     model.position.y = 2.8;
        //     // this.mixer = new THREE.AnimationMixer(model);
        //     // const clip1 = gltf.animations[0];
        //     // this.action1 = this.mixer.clipAction(clip1);
        //     this.scene.add(model);
        //     console.log(gltf);
        // });

        const FBXloader = new FBXLoader();
        FBXloader.load(ModelLoad, (fbx) => {
            fbx.scale.setScalar(0.1);
            fbx.traverse(c => {
                c.castShadow = true;
            });

            const anim = new FBXLoader()
            anim.load(AnimModel, (anim) => {
                this.mixer = new THREE.AnimationMixer(fbx)
                const idle = this.mixer.clipAction(anim.animations[0])
                idle.play()
            });
            this.scene.add(fbx)
        })



        document.body.appendChild(this.renderer.domElement);

        this.camera.position.y = 50;
        this.camera.position.z = -2;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);


        this.stats = Stats();
        document.body.appendChild(this.stats.dom);

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            front,
            back,
            top,
            bottom,
            left,
            right
        ]);
        this.scene.background = texture;
        // this.render();

    }

    render() {
        requestAnimationFrame(() => {
            this.render();
        })
        this.stats.update();
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}