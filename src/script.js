import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from "lil-gui"

/*debug*/

const gui = new GUI({
    width:250,
    title: "Cool Controls",
    closeFolders: true,
})

gui.close()

window.addEventListener('keydown', (e)=>{
    if(e.key =='h'){
        gui.show(gui._hidden)
    }
})
const debugObject = {}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

debugObject.color = "#75b8ab"
debugObject.pillColor  = '#6d66cc'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const CapGeometry = new THREE.CapsuleGeometry( .5, 1, 4, 8 ); 
const CapsuleMaterial = new THREE.MeshBasicMaterial( {color: debugObject.pillColor} ); 
const capsule = new THREE.Mesh( CapGeometry, CapsuleMaterial ); 
capsule.position.x = 2
scene.add( capsule );




/*cube*/
const cubeFolder =  gui.addFolder("Cube")
const move = cubeFolder.addFolder("Move Cube")
const cubeTweaks = cubeFolder.addFolder('tweaks')
const rotate = cubeFolder.addFolder('Rotate')
const  fun = cubeFolder.addFolder('Fun')

cubeTweaks.close()


move
    .add(mesh.position, "y")
    .min(-3)
    .max(3)
    .step(.01)
    .name('Elevation')

move
    .add(mesh.position, "x")
    .min(-3)
    .max(3)
    .step(.01)
    .name('Horizontal')

move
    .add(mesh.position, "z")
    .min(-3)
    .max(3)
    .step(.01)
    .name('Depth')

rotate
    .add(mesh.rotation, 'z')
    .min(-3)
    .max(3)
    .step(.01)
    .name('Rotate Z')

rotate
    .add(mesh.rotation, 'x')
    .min(-3)
    .max(3)
    .step(.01)
    .name('Rotate x')

rotate
    .add(mesh.rotation, 'y')
    .min(-3)
    .max(3)
    .step(.01)
    .name('Rotate y')



cubeTweaks
    .add(mesh, "visible")
    .name('Visible')

cubeTweaks 
    .add(material,'wireframe' )
    .name('Wireframe')

cubeTweaks
    .addColor(debugObject, 'color')
    .name('Color Picker')
    .onChange(()=>{
        material.color.set(debugObject.color)
    })

debugObject.spin = () =>{
    gsap.to(mesh.rotation, {y:mesh.rotation.y + Math.PI * 2})
}

fun
    .add(debugObject, 'spin')
    .name('Spin!')

debugObject.subdivision = 2

cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(()=>{
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(1, 1, 1,
                         debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
    })



/*pill*/

const pillFolder =  gui.addFolder("Pill")
const movePill = pillFolder.addFolder("Move Pill")
const pillTweaks = pillFolder.addFolder('tweaks')
const rotatePill = pillFolder.addFolder('Rotate')
const  funPill = pillFolder.addFolder('Fun')


movePill
    .add(capsule.position, "y")
    .min(-3)
    .max(3)
    .step(.01)
    .name('Elevation')

movePill
    .add(capsule.position, "x")
    .min(-5)
    .max(5)
    .step(.01)
    .name('Horizontal')

movePill
    .add(capsule.position, "z")
    .min(-3)
    .max(3)
    .step(.01)
    .name('Depth')

rotatePill
    .add(capsule.rotation, 'z')
    .min(-3)
    .max(3)
    .step(.01)
    .name('Rotate Z')

rotatePill
    .add(capsule.rotation, 'x')
    .min(-3)
    .max(3)
    .step(.01)
    .name('Rotate x')

rotatePill
    .add(capsule.rotation, 'y')
    .min(-3)
    .max(3)
    .step(.01)
    .name('Rotate y')


pillTweaks
    .add(capsule, "visible")
    .name('Visible')

pillTweaks
    .add(CapsuleMaterial, 'wireframe')
    .name('Wireframe')
  
pillTweaks
    .addColor(debugObject, 'pillColor')
    .name('Color Picker')
    .onChange(()=>{
        CapsuleMaterial.color.set(debugObject.pillColor)
    })


    
debugObject.spinPill = () =>{
        gsap.to(capsule.rotation, {y:capsule.rotation.y + Math.PI * 2})
    }


funPill
    .add(debugObject, 'spinPill')
    .name('Spin!')


function  spin(object){
    gsap.to(object.rotation, {y:object.rotation.y + Math.PI * 2})
}

debugObject.subCap = 4
debugObject.subdivisionPillTwo  = 8

pillTweaks
    .add(debugObject, 'subCap')
    .min(1)
    .max(20)
    .step(1)
    .name('Cap Subdivision')
    .onFinishChange(()=>{
        capsule.CapGeometry.dispose()
        capsule.CapGeometry = new THREE.CapsuleGeometry( .5, 1, debugObject.subCap, 8 )
    })


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()