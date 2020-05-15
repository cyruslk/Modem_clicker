var Jimp = require('jimp');
var getPixels = require("get-pixels")
const image = "https://res.cloudinary.com/www-c-t-l-k-com/image/upload/c_fill,w_1800/v1490156377/cosmic_spheres_c_tdarne.jpg";
let width;
let height;


getPixels(image, function(err, pixels) {
  if(err) {
    console.log("Bad image path")
    return
  }
  width = pixels.shape.slice()[0];
  height = pixels.shape.slice()[1];

  for(var i=0; i<height; i++){
    Jimp.read(image, function (err, image) {
        const x = image.getPixelColor(1, i); // returns the colour of that pixel e.g. 0xFFFFFFFF
        console.log(x);
    });
  }


})
