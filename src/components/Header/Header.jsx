import { GithubOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div
      className={`header-container flex items-center justify-between px-6 py-4 fixed top-0 w-full z-50 transition-all duration-300 ${"bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"}`}
    >
      <div className="flex items-center">
        <img src="./public/logo.png" alt="logo" className="size-10" />
        <Link to="/" preventScrollReset={true} className="no-underline">
          <div
            className={`ml-3 text-xl font-bold transition-colors ${"text-gray-900 hover:text-blue-600"}`}
          >
            DevicePreview
          </div>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="https://github.com/onlyVishesh/DevicePreview"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors ${"text-gray-700 hover:text-blue-600"}`}
        >
          <Button
            type="text"
            icon={<GithubOutlined />}
            className={`flex items-center space-x-2 ${"text-gray-700 hover:text-blue-600"}`}
          >
            GitHub
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
