import axios from "axios"
const upload = async (file) => {
  const data = new FormData();
  console.log("upload",data)
  data.append("file", file);
  data.append("upload_preset", "crudapp");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dqnnylmj0/image/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { secure_url } = response.data;
    return secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

  export default upload;