import Shader from './Shader.js';

export default class BasicColorShader extends Shader {
    constructor() {
        super(`${Shader.prefix}/basic-color-shader.glsl`);
    }
}