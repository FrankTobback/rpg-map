export default class SpriteSheet {
    constructor(image, w = 16, h = 16) {
        this.image = image;
        this.width = w;
        this.height = h;
        this.tiles = new Map();
    }

    // Drawing one tile

    define(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.height = this.height;
        buffer.width = this.width;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                this.width * x,
                this.height * y,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height);
        this.tiles.set(name, buffer);
    }

    // Drawing an object

    object(name, x, y, w, h) {
        const buffer = document.createElement('canvas');
        buffer.height = this.height * h;
        buffer.width = this.width * w;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                this.width * x,
                this.height * y,
                this.width * w,
                this.height * h,
                0,
                0,
                this.width * w,
                this.height * h,);
        this.tiles.set(name, buffer);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.getContext("2d").drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
