import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./SceneInit";


const test = new SceneInit();
        

export default function Game() {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        test.initScene();
        window.addEventListener("keyup", keyController)

        const plane = new THREE.Mesh(
            new THREE.BoxGeometry(30, 1, 30, 1),
            new THREE.MeshStandardMaterial({
                color: 0x0B15D4
            })
        )
        plane.position.y = 0;

        test.scene.add(plane);
        test.render();
    }, []);

    const keyController = (e) => {
        switch (e.keyCode){
            case 32:
                if(test.mainCharacter.danceAnimation.isRunning()){
                    test.mainCharacter.danceAnimation.stop();
                } else {
                    test.mainCharacter.danceAnimation.play();
                }
                break;
            default: 
                console.log(e.keyCode);
                break;
        }
    }

    return (
        <div>
            <canvas id="myThreeJsCanvas" />
        </div>
    );
}