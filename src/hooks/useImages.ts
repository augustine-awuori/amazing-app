import { useContext } from "react";

import { ImagesContext } from "../contexts";

const useImages = (imagesLimit: number) => {
  const context = useContext(ImagesContext);

  const images = context?.images || [];

  const getNewImages = (newImages: File[]) =>
    [...(context?.images || []), ...newImages].slice(0, imagesLimit);

  const addImages = (images: File[]) =>
    context?.setImages(getNewImages(images));

  const removeImage = (imageIndex: number) =>
    context?.setImages(
      context.images.filter((img, index) => {
        if (index !== imageIndex) return img;
      })
    );

  const removeAllImages = () => context?.setImages([]);

  return {
    addImages,
    images,
    imagesCount: images.length,
    removeImage,
    removeAllImages,
  };
};

export default useImages;
