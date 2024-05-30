interface Props {
  images: string[];
}

const Slider = ({ images = [] }: Props) => (
  <div className="carousel w-full">
    {images.map((image) => (
      <div key={image} id={image} className="carousel-item relative w-full">
        <img src={image} className="w-full rounded-md" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a className="btn btn-circle">❮</a>
          <a className="btn btn-circle">❯</a>
        </div>
      </div>
    ))}
  </div>
);

export default Slider;
