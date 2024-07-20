import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../hooks";
import Input from "../Input";

interface Props {
  onButtonClick: () => void;
  onQuery: (query: string) => void;
  placeholder: string;
  query: string;
}

const guideQuestions = [
  "How can I effortlessly add my products?",
  "What's the easiest way to set up my online shop?",
  "How do I share my shop's link so only my clients see my products?",
  "Are there any costs involved in adding my products?",
  "What's the mission of Amazing and how can it benefit me?",
  "Why is having an online shop essential for my business?",
  "Do I need to promote the website myself?",
  "Who will be able to view my products?",
  "How can I be sure this platform is legitimate?",
  "What are the steps to order products from other sellers?",
  "What are the safest payment methods for buying products on this platform?",
];

const Header = ({ onQuery, query, placeholder, onButtonClick }: Props) => {
  const { user } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex(
        (prevIndex) => (prevIndex + 1) % guideQuestions.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () =>
    user ? onButtonClick() : toast.info("You're not logged in");

  return (
    <section>
      <div style={{ width: "98.5%" }} className="mx-auto">
        <GuideButton
          className="btn btn-outline btn-primary mb-2 w-full"
          onClick={() => navigate("/mart/guide")}
        >
          {guideQuestions[currentQuestionIndex]}
        </GuideButton>
      </div>

      <header className="max-w-100 mx-auto flex items-center space-x-4 pl-1 pr-3">
        <div className="relative flex-grow">
          <Input
            placeholder={`Search ${placeholder}...`}
            value={query}
            onChange={onQuery}
          />
          {query && (
            <button
              className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent text-gray-500"
              onClick={() => onQuery("")}
            >
              X
            </button>
          )}
        </div>
        <button
          onClick={handleButtonClick}
          className="btn btn-outline btn-primary hidden md:inline"
        >
          &#43; Add {placeholder}
        </button>
        <button
          onClick={handleButtonClick}
          className="btn btn-outline btn-primary md:hidden"
        >
          &#43;
        </button>
      </header>
    </section>
  );
};

export default Header;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GuideButton = styled.button`
  animation: ${slideIn} 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
`;
