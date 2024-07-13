import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Drawer = ({ children, isOpen, toggleDrawer }: Props) => {
  return (
    <div className="drawer" onBlur={toggleDrawer}>
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content">{/* Page content here */}</div>
      {isOpen && (
        <div className="drawer-side fixed top-0 left-0 w-full h-full z-50">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay bg-black bg-opacity-50 absolute w-full h-full"
            onClick={toggleDrawer}
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative z-50">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Drawer;
