var Spritesmith = require('spritesmith');

// Generate our spritesheet
var sprites = ['1.jpg', '2.jpg'];
Spritesmith.run({src: sprites}, function handleResult (err, result) {
  result.image; // Buffer representation of image
  result.coordinates; // Object mapping filename to {x, y, width, height} of image
  result.properties; // Object with metadata about spritesheet {width, height}
});