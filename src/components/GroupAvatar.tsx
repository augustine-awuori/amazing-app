import React from "react";

interface Props {
  images: string[];
}

const GroupAvatar: React.FC<Props> = ({ images }) => {
  const displayedImages = images.slice(0, 3); // Display up to 3 images
  const remainingCount = images.length - displayedImages.length; // Calculate remaining images count
  const hasRemaining = remainingCount > 0; // Check if there are remaining images

  return (
    <div className="avatar-group -space-x-6 rtl:space-x-reverse">
      {displayedImages.map((image, index) => (
        <div className="avatar" key={index}>
          <div className="w-12">
            <img src={image} alt={`Avatar ${index + 1}`} />
          </div>
        </div>
      ))}
      {hasRemaining && (
        <div className="avatar placeholder">
          <div className="w-12 bg-neutral text-neutral-content">
            <span>+{remainingCount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupAvatar;
