#include <common>
    
uniform vec3 color;
    
void mainImage(out vec4 fragColor, in vec2 fragCoord) {

    // Output to screen
    fragColor = vec4(color.x, color.y, color.z,1.0);
}
    
void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}