import cloudinary from '../config/cloudinary';
import fs from 'fs';

export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    const publicId = imageUrl
      .split("/")
      .pop()
      ?.split(".")[0];

    if (!publicId) {
      return null;
    }

    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    return null;
  }
};