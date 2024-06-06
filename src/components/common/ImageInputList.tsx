import { ChangeEvent, useState } from "react";

import { useImages } from "../../hooks";
import ImagePicker from "./ImagePicker";

interface Props {
  imagesLimit: number;
}

const ImageInputList = ({ imagesLimit }: Props) => {
  const { addImages, imagesCount, removeImage } = useImages(imagesLimit);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const addNewFiles = (oldItems: string[], newItems: string[]) =>
    [...oldItems, ...newItems].slice(0, imagesLimit);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;

    if (files) {
      const newSelectedFiles = Array.from(files);
      addImages(newSelectedFiles);

      const newPreviews = newSelectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(addNewFiles(imagePreviews, newPreviews));
    }
  };

  const unSelectImageBy = (imageIndex: number) => {
    removeImage(imageIndex);

    setImagePreviews(
      imagePreviews.filter((preview, index) => {
        if (index !== imageIndex) return preview;
      })
    );
  };

  return (
    <div className="max-w-xs mb-2 mr-2">
      <div className="overflow-x-auto">
        <div className="flex">
          <ImagePicker
            onChange={handleFileChange}
            visible={imagesCount < imagesLimit}
          />
          <div className="flex">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Selected Image ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md cursor-pointer m-1"
                onClick={() => unSelectImageBy(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInputList;
