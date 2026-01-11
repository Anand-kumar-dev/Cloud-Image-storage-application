const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export function getAvatarUrl(publicId, size = 64) {
  if (!publicId) return "/default-avatar.png";
 console.log(CLOUD_NAME)
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/` +
         `w_${size},h_${size},c_fill,g_face,q_auto,f_auto/` +
         publicId;
}
