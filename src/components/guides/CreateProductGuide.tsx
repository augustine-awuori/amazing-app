import { guides } from "../../pages/MartGuidePage";
import { funcs } from "../../utils";
import { LastEdit, Subtitle, Text, Title } from "./GetStartedGuide";
import Link from "./Link";
import YouTubeVideo from "./YouTubeVideo";

const CreateShopGuide = () => {
  const getShopGuideLink = (): string => {
    const guide = guides.find((g) => g.title.toLowerCase().includes("shop"));

    return guide
      ? `/mart/guides/${funcs.getEndpointFromGuideTitle(guide.title)}`
      : "";
  };

  return (
    <section>
      <LastEdit>Last Edit: Jul 20, 2024</LastEdit>
      <Title>How to Add a Product to Your Shop</Title>
      <Text>
        You need to have created a shop already. Every product should belong to
        a particular shop
      </Text>
      <Subtitle>1. Sign In or Sign Up</Subtitle>
      <Text>
        Before you can add a product to your shop, you need to be logged into
        your Amazing account.{" "}
        <Link route={getShopGuideLink()}>See how to create a shop guide.</Link>
      </Text>
      <Subtitle> 2. Create Your Product</Subtitle>
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
            can select it from the list. If you don’t have a shop yet, you need
            to create a shop first.
          </Text>
        </li>
        <li>
          <Text>
            Select the shop you intend to add this new product to and click
            'Proceed' button.
          </Text>
        </li>
        <li>
          <Text>
            A new product form modal will pop up. Enter the details of your new
            product. Save changes when done and WAIT till the process is
            complete. Moving arount the app will interfere with your product
            creation
          </Text>
        </li>
        <li>
          <Text>
            Product is now created successfully, go to{" "}
            <Link route="/">home page</Link> and see for yourself
          </Text>
        </li>
      </ol>

      <Subtitle className="mb-3">Watch Video Instead</Subtitle>
      <YouTubeVideo src="https://www.youtube.com/watch?v=r1VgPILjMjc&list=UU5eJnniY3dFzkFwQ2OjkWvw" />
    </section>
  );
};

export default CreateShopGuide;
