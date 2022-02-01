import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';


export default class SceneInit {
    constructor(ModelLoad, AnimModel, clock, scene) {
        this.ModelLoad = ModelLoad;
        this.AnimModel = AnimModel;
        this.clock = clock.getDelta();
        this.scene = scene;
        this.loadCharacter();
    }

    loadCharacter() {
        const FBXloader = new FBXLoader();
        FBXloader.load(this.ModelLoad, (fbx) => {
         fbx.scale.setScalar(0.1);
         fbx.traverse(c => {
             c.castShadow = true;
         });

         //ajout de l'animation
         const anim = new FBXLoader()
         anim.load(this.AnimModel, (anim) => {
            this.mixer = new THREE.AnimationMixer(fbx)
            this.danceAnimation = this.mixer.clipAction(anim.animations[0])
         });
         console.log(this.scene);
         this.scene.add(fbx)
     })
    }
}