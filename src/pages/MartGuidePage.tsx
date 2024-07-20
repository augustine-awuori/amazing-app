import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  CreateProductGuide,
  CreateShopGuide,
  GetStartedGuide,
} from "../components/guides";
import { funcs } from "../utils";

interface SidebarProps {
  isCollapsed: boolean;
}

export const guides: { title: string; Element: JSX.Element }[] = [
  { Element: <GetStartedGuide />, title: "Get Started" },
  {
    Element: <CreateShopGuide />,
    title: "Create Shop",
  },
  {
    Element: <CreateProductGuide />,
    title: "Add Product",
  },
];

const MartGuidePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const { guide } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const newIndex = guide
      ? guides.findIndex(
          (item) => item.title === funcs.getTitleFromGuideEndpoint(guide)
        )
      : 0;

    setActiveIndex(newIndex);
  }, [guide]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleSideBarItemClick = (index: number) => {
    toggleSidebar();
    const endpoint = funcs.getEndpointFromGuideTitle(guides[index].title);
    navigate(`/mart/guides/${endpoint}`);
  };

  return (
    <Container>
      <Sidebar isCollapsed={isCollapsed}>
        <ToggleSidebarButton onClick={toggleSidebar}>
          <FaBars />
        </ToggleSidebarButton>
        {!isCollapsed && (
          <section className="mt-6">
            {guides.map((item, index) => (
              <SidebarItem
                key={index}
                onClick={() => handleSideBarItemClick(index)}
              >
                {item.title}
              </SidebarItem>
            ))}
          </section>
        )}
      </Sidebar>
      <Content>{guides[activeIndex].Element}</Content>
    </Container>
  );
};

export default MartGuidePage;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div<SidebarProps>`
  width: ${(props) => (props.isCollapsed ? "60px" : "29rem")};
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: width 0.3s ease;
  position: relative;
`;

const ToggleSidebarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
`;

const SidebarItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;
