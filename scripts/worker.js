importScripts('imageManips.js');

this.onmessage = function(e) {
  var imageData = e.data.imageData;
  var type = e.data.type;

  try {
    var length = imageData.data.length / 4;
    var manipulate = getManipulateFn(type);
    for (i = j = 0, ref = length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      r = imageData.data[i * 4 + 0];
      g = imageData.data[i * 4 + 1];
      b = imageData.data[i * 4 + 2];
      a = imageData.data[i * 4 + 3];
      pixel = manipulate(r, g, b, a);
      imageData.data[i * 4 + 0] = pixel[0];
      imageData.data[i * 4 + 1] = pixel[1];
      imageData.data[i * 4 + 2] = pixel[2];
      imageData.data[i * 4 + 3] = pixel[3];
    }
    postMessage(imageData);
  } catch (e) {
    function InverterException(message) {
      this.name = "InverterException";
      this.message = message;
    };
    throw new InverterException('Image manipulation error');
    postMessage(undefined);
  }
}