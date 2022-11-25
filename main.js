import * as THREE from './three.js/build/three.module.js';


import BasicColorShader from './shaders/BasicColorShader.js';

(async () => {
    const canvas = document.querySelector('#canvas');

    const renderer = new THREE.WebGLRenderer({ canvas });

    const uniforms = {
        color: { value: new THREE.Vector3(1, 0, 0) }
    };

    const basicColorFragmentShader = (await (new BasicColorShader()).init()).getSource();
    
    const materials = {
        red: new THREE.ShaderMaterial({ fragmentShader: basicColorFragmentShader, uniforms: { ...uniforms, color: { value: new THREE.Vector3(1, 0, 0) } } }),
        green: new THREE.ShaderMaterial({ fragmentShader: basicColorFragmentShader, uniforms: { ...uniforms, color: { value: new THREE.Vector3(0, 1, 0) } } }),
        blue: new THREE.ShaderMaterial({ fragmentShader: basicColorFragmentShader, uniforms: { ...uniforms, color: { value: new THREE.Vector3(0, 0, 1) } } })
    };

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    const scene = new THREE.Scene();

    function makeCubeInstance(size, material, x = 0) {

        const geometry = new THREE.BoxGeometry(size, size, size);

        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeCubeInstance(1, materials.red, 0),
        makeCubeInstance(1, materials.green, -2),
        makeCubeInstance(1, materials.blue, 2),
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
})();