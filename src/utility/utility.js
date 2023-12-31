import axios from "axios";

export const uploadImageImgBB = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_API}`,
      formData
    );
    return data;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    // Handle the error as needed
    throw error; // Rethrow the error or return a specific error object
  }
};
