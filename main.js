import SpriteSheet from './spritesheet.js';
import {loadImage, loadLevel} from './loader.js';

const canvas = document.createElement('canvas');
canvas.width = 16 * 32
canvas.height = 16 * 32

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}


loadImage('images/tilesetFE.png')
.then(image => {
    const sprites = new SpriteSheet(image);
    sprites.define("grass", 3, 3);
    sprites.object("stairs", 15, 8, 2, 1);
    sprites.define("wallB", 18, 0);
    sprites.object("gatepillar", 19, 21, 1, 4);

    loadLevel('tiles')
    .then(tile => {
        tile.backgrounds.forEach(bg => {
            drawBackground(bg, canvas, sprites);
        });
    });
    loadLevel('objects')
    .then(tile => {
        tile.backgrounds.forEach(bg => {
            drawBackground(bg, canvas, sprites);
        });
    });
});

export default canvas;