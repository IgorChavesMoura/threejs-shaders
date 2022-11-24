import * as THREE from './three.js/build/three.module.js';

const canvas = document.querySelector('#canvas');

const renderer = new THREE.WebGLRenderer({ canvas });

const uniforms = {
    color: { value: new THREE.Vector3(1, 0, 0) }
};

const fragmentShader = `
    #include <common>
    
    uniform vec3 color;
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {

        // Output to screen
        fragColor = vec4(color.x, color.y, color.z,1.0);
    }
    
    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
`;

const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 2;

const scene = new THREE.Scene();

function makeInstance(geometry, color, x = 0) {

    const material = new THREE.ShaderMaterial({ fragmentShader, uniforms: { ...uniforms, color: { value: color } } });

    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    cube.position.x = x;

    return cube;
}

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const cubes = [
    makeInstance(geometry, new THREE.Vector3(1, 0, 0), 0),
    makeInstance(geometry, new THREE.Vector3(0, 1, 0), -2),
    makeInstance(geometry, new THREE.Vector3(0, 0, 1), 2),
];

const lightColor = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(lightColor, intensity);

light.position.set(-1, 2, 4);

scene.add(light);

function resizeRenderToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;

    const needResize = canvas.width !== width || canvas.height !== height;

    if(needResize) {
        renderer.setSize(width, height, false);
    }

    return needResize;
}

function render(time) {
    time *= 0.0001;

    const canvas = renderer.domElement;

    if(resizeRenderToDisplaySize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, index) => {
        const speed = 10 + index * 0.1;
        const rot = time * speed;

        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);