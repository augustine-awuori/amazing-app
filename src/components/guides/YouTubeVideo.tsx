import { Link } from "react-router-dom";

interface Props {
  src: string;
}

const YouTubeVideo = ({ src }: Props) => {
  return (
    <div>
      <iframe
        className="w-full rounded-md"
        width="560"
        height="315"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />

      <Link
        to={src}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 text-blue-600"
      >
        Refused to connect? Watch on YouTube instead
      </Link>
    </div>
  );
};

export default YouTubeVideo;
