import { toast } from "sonner";


export const addImage = async ({ request, fileObj, onSuccess }) => {
  try {
    if (!fileObj) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileObj);

    const response = await request({
      url: "/api/upload",
      method: "POST",
      data: formData,
    });

    if (response?.data || typeof response === "string") {
      toast.success("Image added successfully");
      onSuccess?.();
    }
  } catch (error) {
    console.error(error);
    toast.error(error?.message || "Failed to upload image");
  }
};


export const deleteImage = async ({ request, imageId, type, onSuccess }) => {
  try {
    const response = await request({
      url: "/api/delete",
      method: "POST",
      data: { _id: imageId, type },
    });

    if (response?.data) {
      toast.success(response.data.result || "Image deleted");
      onSuccess?.();
    }
  } catch (error) {
    console.error(error);
    toast.error(error?.message || "Something went wrong while deleting");
  }
};
