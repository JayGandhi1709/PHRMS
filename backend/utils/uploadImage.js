const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports.uploadImage = async (file) =>
  await cloudinary.uploader.upload(
    file.doc[key].tempFilePath,
    // { folder: "healthcare" },
    (error, result) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      // File uploaded successfully, you can access result.url for the URL of the uploaded file
      res.send("File uploaded to Cloudinary: " + result.url);
    }
  );
