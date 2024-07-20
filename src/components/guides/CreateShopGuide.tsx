import { LastEdit, Subtitle, Text, Title } from "./GetStartedGuide";
import Link from "./Link";
import YouTubeVideo from "./YouTubeVideo";

const CreateShopGuide = () => {
  return (
    <section>
      <LastEdit>Last Edit: Jul 20, 2024</LastEdit>
      <Title>How to Create a Shop</Title>
      <Text>
        Welcome to Amazing! We're excited to help you get started with your
        online business. Follow these steps to create your shop and start adding
        products:
      </Text>
      <Subtitle>1. Sign In or Sign Up</Subtitle>
      <Text>
        Before you can create a shop, you need to be logged into your Amazing
        account. If you don’t have an account yet, you can sign up easily. Click
        at the right top to login or register
      </Text>
      <Subtitle>2. Prepare Your Shop</Subtitle>
      <Text>
        To create a shop, you'll need a shop image ready. This image will
        represent your shop and attract potential buyers.
      </Text>
      <Subtitle>3. Navigate to the Home Page</Subtitle>
      <Text>
        Once you’re logged in, go to the <Link route="/">home page</Link>
      </Text>
      <Subtitle> 4. Create Your Shop</Subtitle>
      <ol className="list-disc ml-10">
        <li>
          <Text>
            On mobile devices, click the plus icon (+) located at the top right
            just below the navigation bar to start the shop creation process. On
            larger screens, click the 'Add Product' button.
          </Text>
        </li>
        <li>
          <Text>
            A 'Choose Shop' modal will appear. If you already have a shop, you
            can select it from the list. If you don’t have a shop yet, follow
            these steps to create one:
          </Text>
        </li>
        <li>
          <Text>
            Click on{" "}
            <Link route="/mart/shops/new">'create a new shop instead'</Link>
            {"  "} at the top of the modal and you'll be directed to a page to
            input your shop's details
          </Text>
        </li>
        <li>
          <Text>Choose an image to represent your shop</Text>
        </li>
        <li>
          <Text>
            Input the name and shop type (e.g., clothing). Your shop can have
            more than one type, allowing you to sell different items at once.
          </Text>
        </li>
        <li>
          <Text>
            State the location of your shop. Potential buyers often make
            purchasing decisions based on the shop's location.
          </Text>
        </li>
        <li>
          <Text>
            Finally, save the information and WAIT for the shop to be created.
            If you navigate to other pages, you may interfere with the creation
            process.
          </Text>
        </li>
        <li>
          <Text>
            Your shop is now successfully created. You can see it at the{" "}
            <Link route="/mart/shops">shops' page</Link>{" "}
          </Text>
        </li>
      </ol>

      <Subtitle className="mb-3">Watch Video Instead</Subtitle>
      <YouTubeVideo src="https://youtu.be/ZMD-x5Ox1s8" />
    </section>
  );
};

export default CreateShopGuide;
