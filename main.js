import SpriteSheet from './spritesheet.js';
import {loadImage, loadLevel} from './loader.js';

const canvas = document.getElementById('map');
const context = canvas.getContext('2d');

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
    sprites.define("ground", 3, 3);
    sprites.define("water", 31, 15);
    sprites.define("waterWallB", 9, 0);
    sprites.define("castleWall", 25, 0);
    sprites.define("castleWallB", 17, 0);
    sprites.define("waterColumn", 21, 19);
    sprites.define("bridgeSideL", 3, 15);
    sprites.define("bridgeSideR", 4, 15);
    sprites.object("gate", 28, 6, 3, 2);


    loadLevel('tiles')
    .then(tile => {
        tile.backgrounds.forEach(bg => {
            drawBackground(bg, context, sprites);
        });
    });
});