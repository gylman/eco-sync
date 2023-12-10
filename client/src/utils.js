import axios from "axios";

/**
 * @param {string} fileName
 * @param {File} file
 * @returns {Promise<{ IpfsHash: string; PinSize: number; Timestamp: string }>}
 */
export async function uploadFile(fileName, file) {
  const formData = new FormData();

  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: fileName,
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_API_KEY}`,
      },
    }
  );
  return res.data;
}

// const axios = require('axios')
// const FormData = require('form-data')
// const fs = require('fs')
// const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNzJhMmNhOS0zMWRlLTQyMjAtYjQwNS0yOGM5NDUyMTJlNjEiLCJlbWFpbCI6Im1haW5Aa2FudS5raW0iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzM3ZjliZWNmYTUyZmQ0NmQyOGEiLCJzY29wZWRLZXlTZWNyZXQiOiJkNzEzMzZiYTAwNGRlMDYyMDY2ODExZmRlZjIxOTk1ZmFkMWRiOGEwN2Q4NTM5NzJlNDYxMzRiNGY2YjYwYTU5IiwiaWF0IjoxNzAyMjIzMzc5fQ.hGBjaiXHGK_c5oVnlktEzG7H29CXRjC4GdUKygvolS0

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = "path/to/file.png";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
pinFileToIPFS();
