var Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

const sprites = ['./loaders/images/1.jpg', './loaders/images/2.jpg'];

Spritesmith.run({src: sprites}, (err, result) => {
    console.log(result);
    result.image; // Buffer representation of image
    result.coordinates; // Object mapping filename to {x, y, width, height} of image
    result.properties; // Object with metadata about spritesheet {width, height}
  });

