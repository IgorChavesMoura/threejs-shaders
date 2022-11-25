export default class Shader {
    
    static prefix = 'shaders/sources';

    constructor(url) {
        this.url = url;
    }

    async init() {
        try {
            const response = await fetch(this.url);
            const shaderSource = await response.text();

            this.source = shaderSource;

        } catch (err) {
            throw new Error('Could not load shader source!');
        }

        return this;
    }

    getSource() {
        if(!this.source) {
            throw new Error('Shader not initialized!');
        }

        return this.source;
    }
}