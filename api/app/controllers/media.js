var Promise = require('bluebird');
var GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'));
var storage = GoogleCloudStorage({
  projectId: 'pdh-dev',
  keyFilename: './app/config/gcloud-pdh-dev-key.json'
})
var fs = require('fs');
var BUCKET_NAME = 'medias'
var connection = require('./../connection');
var filename = 'Moulindepezenas-compressor.jpg';
var resizeMode = require('./../mediaHelpers').resizeMode;
var cropMode = require('./../mediaHelpers').cropMode;
// upload media to gcloud
var uploadMedia = function (req, res, next) {
  var pdhBucket = storage.bucket(BUCKET_NAME);

  var destination = req.body.destination;
  var fileName = req.body.filename;
  var width = parseInt(req.body.width);
  var height = parseInt(req.body.height);
  // var dataFileName = req.body.dataFileName.replace(/^data:image\/\w+;base64,/, '');
  //var imageBuffer = new Buffer(dataFileName, 'base64');

  var file = pdhBucket.file(destination + filename)
  file.existsAsync()
    .then(exists => {
      if (exists) {
        return res.status(200).json(getPublicThumbnailUrlForItem(destination + fileName));
      } else {
        imageBuffer = "./static/Salonmarcotte-compressor.jpg";
        resizeMode(width, height, false, imageBuffer, destination + fileName, function () {
          cropMode(300, 300, false, imageBuffer, destination + 'square/' + fileName, function () {
            cropMode(300, 300, true, imageBuffer, destination + 'square/blur/' + fileName, function () {
              cropMode(600, 600, false, imageBuffer, destination + 'square/retina/' + fileName, function () {
                cropMode(800, 834, false, imageBuffer, destination + 'squareBig/' + fileName, function () {
                  cropMode(800, 834, true, imageBuffer, destination + 'squareBig/blur/' + fileName, function () {
                    cropMode(1600, 1668, false, imageBuffer, destination + 'squareBig/retina/' + fileName, function () {
                      resizeMode(width, height, false, imageBuffer, destination + 'hd/retina/' + fileName, function () {
                        resizeMode(width / 2, height / 2, false, imageBuffer, destination + 'hd/' + fileName, function () {
                          resizeMode(width / 2, height / 2, true, imageBuffer, destination + 'hd/blur/' + fileName, function () {
                            resizeMode(1024, 1024 * height / width, false, imageBuffer, destination + 'tablette/' + fileName, function () {
                              resizeMode(1024, 1024 * height / width, true, imageBuffer, destination + 'tablette/blur/' + fileName, function () {
                                resizeMode(2048, 2048 * height / width, false, imageBuffer, destination + 'tablette/retina/' + fileName, function () {
                                  resizeMode(414, 414 * height / width, false, imageBuffer, destination + 'mobile/' + fileName, function () {
                                    resizeMode(414, 414 * height / width, true, imageBuffer, destination + 'mobile/blur/' + fileName, function () {
                                      resizeMode(828, 828 * height / width, false, imageBuffer, destination + 'mobile/retina/' + fileName, function () {
                                        //-- todo croper pour les landing & media
                                        return res.status(200).json(
                                          getPublicThumbnailUrlForItem(destination + fileName)
                                        );
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }
    });
}
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

function bufferToBase64(buf) {
  var binstr = Array.prototype.map.call(buf, function (ch) {
    return String.fromCharCode(ch);
  }).join('');
  return new Buffer(binstr).toString('base64');
}


exports.uploadMediaDb = uploadMedia;

var getPublicThumbnailUrlForItem = file_name => {
  return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`;
}