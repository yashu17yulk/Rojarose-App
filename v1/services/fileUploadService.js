var AWS = require('aws-sdk');
const fs = require('fs');
const waterfall = require('async-waterfall')
const Config = require('../../config/imp')

AWS.config.update({
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  region: ""
});

var s3 = new AWS.S3();

function upload(req, res, cb) {
  console.log(req.body.files)
  let response = {
    status: 0,
    data: {},
    message: ""
  }

  new Promise((resolve, reject) => {
    waterfall([
      uploadtolocal,
      uploadtoAws
    ], (error, result) => {
      error ? reject(error) : resolve(result)
    })
  })
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      console.log(error);
      response.status = 400;
      response.message = 'Something went wrong';
      res.json(response);
    })
  // upload to local
  function uploadtolocal(cb) {
    console.log("cb");
    if (!req.files) {
      response.status = 400;
      response.message = "No files received";
      cb(response);
    } else {
      cb(null, req.files);
    }
  }
  //  upload to aws
  function uploadtoAws(data, cb) {
    var ResponseData = [];
    if (data.length > 0) {

      data.map((item) => {
        let localImage = item.path;
        let imageRemoteName;
        var ext = item.originalname.split('.').pop();

        if (ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg')
          imageRemoteName = `quizImage_${new Date().getTime()}.${ext}`;
        else
          imageRemoteName = `quizImage_${new Date().getTime()}.png`;

        s3.putObject({
          Bucket: BUCKET,
          Body: fs.readFileSync(localImage),
          Key: imageRemoteName
        })
          .promise()
          .then((respo) => {
            let imageUrl = `url/${imageRemoteName}`;
            fs.unlink(`${DIR}/${data[0].originalname}`, (erro) => { })

            ResponseData.push(imageUrl)
            if (ResponseData.length == data.length) {
              response.status = 200;
              response.data.image = ResponseData;
              cb(null, response);
            }
          })
          .catch((error) => {
            cb(error);
          })

      })

    } else {

      response.status = 400;
      response.data = [];
      response.message = "File not received";
      cb(null, response);
    }
  }

};

module.exports = {
  upload
}