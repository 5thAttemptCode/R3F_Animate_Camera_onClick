import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

export default function Experience() {

    //useState to change the current state of the boxGeometry
    const [ clicked, setClicked ] = useState(false)
    //useRef to reference to the boxGeometry
    const zoomRef = useRef()
    //Vector3 lets us reference to a point in space
    const vec = new THREE.Vector3()

    //useFrame gives us access to each frame in the scene
    useFrame(state => {
        if(clicked) {
            //state lets us access our camera and have it focus on our mesh 
            //using the lookAt() function and passing our mesh ref’s current position
            state.camera.lookAt(zoomRef.current.position)
            
            //lerp lets us move the camera. It takes two arguments: the xyz coordinates
            //(in this case (-3, 3, 6) and how fast we want to go there, in this case "0.1")
            state.camera.position.lerp(vec.set(-3, 3, 6), 0.1)

            //updateProjectionMatrix to recalculate the projection
            state.camera.updateProjectionMatrix()
        }
        return null
    })


  return (
    <mesh
        ref={zoomRef}
        onClick={() => setClicked(!clicked)}
    >
        <boxGeometry args={[2, 2, 2]} />
        <meshNormalMaterial />
    </mesh>
  )
}
