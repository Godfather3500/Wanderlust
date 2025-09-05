const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

async function uploadToImgBB(localPath) {
  if (!process.env.IMGBB_API_KEY) {
    throw new Error("❌ IMGBB_API_KEY is missing from .env");
  }

  const imageData = fs.readFileSync(localPath, { encoding: "base64" });

  // Create FormData for the 'image' and 'name' parameters (if desired)
  const formData = new FormData();
  formData.append("image", imageData);

  try {
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData, // Pass formData as the request body
      {
        headers: formData.getHeaders(), // Set correct Content-Type header
        params: {
          // Pass API key as a query parameter in the URL
          key: process.env.IMGBB_API_KEY,
        },
        timeout: 60000, // Keep the increased timeout (25 seconds)
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    return response.data.data.url;
  } catch (err) {
    console.error(
      "❌ ImgBB Upload Error:",
      err.response?.data?.error?.message || err.message, // Access specific error message from ImgBB response
      "Error Code:",
      err.code // Log the error code like 'ECONNRESET'
    );
    throw err;
  }
}

module.exports = uploadToImgBB;
