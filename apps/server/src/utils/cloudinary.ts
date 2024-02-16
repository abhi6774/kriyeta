import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
    cloud_name: "dzclxbbwk",
    api_key: "342355561256642",
    api_secret: "jwBjAlMOl04sRp9M42zd-wCH1NQ",
});

export const deleteOnCloundinary = async (publicId: string) => {
    await cloudinary.uploader.destroy(publicId);
};

export const uploadOnCloudinary = async (localFilePath: string) => {
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        fs.unlinkSync(localFilePath); // remove file from the local server in sync

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove file from the local server in sync
        return null;
    }
};
