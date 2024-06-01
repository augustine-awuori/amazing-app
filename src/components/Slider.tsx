import { useEffect, useState } from "react";

interface Props {
  initialIndex: number;
  onIndexChange: (index: number) => void;
  images: string[];
}

const Slider = ({ images = [], initialIndex, onIndexChange }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToNextSlide = () => {
    let index = 0;

    setCurrentIndex((prevIndex) => {
      const value = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      index = value;

      return value;
    });

    onIndexChange(index);
  };

  const goToPrevSlide = () => {
    let index = 0;

    setCurrentIndex((prevIndex) => {
      const value = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      index = value;

      return value;
    });

    onIndexChange(index);
  };

  return (
    <article className="carousel w-full relative">
      {images.map((image, index) => (
        <article
          key={image}
          className={`w-full carousel-item ${
            index === currentIndex ? "" : "hidden"
          }`}
        >
          <img
            src={image}
            className="rounded-md object-contain"
            alt={`Slide ${index}`}
          />
          <article className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button className="btn btn-circle" onClick={goToPrevSlide}>
              ❮
            </button>
            <button className="btn btn-circle" onClick={goToNextSlide}>
              ❯
            </button>
          </article>
        </article>
      ))}
    </article>
  );
};

export default Slider;
