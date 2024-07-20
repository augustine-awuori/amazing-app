import styled from "styled-components";

import YouTubeVideo from "./YouTubeVideo";

const features: string[] = [
  "Showcase Your Products: Easily list and display your items to attract fellow students.",
  "Shop Anytime, Anywhere: Potential buyers can browse and purchase products around the clock, even when you’re not online.",
  "In-App Communication: Connect directly with buyers through our chat feature, making transactions smooth and personal.",
  "Affordable and Accessible: No need for expensive rent or physical store setup. Manage your shop from your phone or computer.",
];

const GetStartedGuide = () => {
  return (
    <section>
      <LastEdit>Last Edit: Jul 20, 2024</LastEdit>
      <Title>Get Started</Title>
      <Text>
        Welcome to Amazing, the ultimate platform designed just for Kisii
        University students like you! Whether you're looking to showcase your
        products or discover unique finds, Amazing is here to help you turn your
        entrepreneurial dreams into reality.
      </Text>
      <Subtitle>Why Amazing?</Subtitle>
      <Text>
        Imagine running your own business without the hassle of a physical
        store. With Amazing, you can create your own online shop and start
        selling products anytime, anywhere—even when you’re in class or catching
        up on studies. Our platform empowers you to reach a wider audience 24/7,
        making your shop accessible to other students at Kisii University and
        beyond, without the overhead costs of a physical location.
      </Text>
      <Subtitle>Features:</Subtitle>
      <ol>
        {features.map((feature, index) => (
          <li key={feature}>
            <Text className="ml-4">
              {index + 1}. {feature}
            </Text>
          </li>
        ))}
      </ol>
      <Subtitle>Watch Video:</Subtitle>
      <YouTubeVideo src="https://www.youtube.com/watch?v=T4CgR160T-Y&list=UU5eJnniY3dFzkFwQ2OjkWvw&index=3" />
    </section>
  );
};

export const LastEdit = styled.div`
  font-size: 12px;
  color: gray;
`;

export const Title = styled.h1`
  font-size: 2em;
  margin-top: 0;
`;

export const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-top: 20px;
`;

export const Text = styled.p`
  font-size: 1em;
  margin-top: 10px;
  line-height: 1.5;
`;

export default GetStartedGuide;
