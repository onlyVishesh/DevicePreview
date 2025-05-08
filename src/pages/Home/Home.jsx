import {
  BookOutlined,
  DesktopOutlined,
  EyeOutlined,
  MobileOutlined,
  PlusOutlined,
  SearchOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Slider,
} from "antd";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

/** Component */
import Screens from "components/Screens/Screens.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

/** Stylesheets */
import DefaultScreens from "data/screens.js";
import { addToBookmarks, getCurrentPageBookmarkData } from "utils/bookmark.jsx";
import { isCheckedScreenExist } from "utils/helper.jsx";

const Home = ({
  setScreens,
  screensValues,
  addCustomScreen,
  removeCustomScreen,
}) => {
  const [url, setUrl] = useState("");
  const [zoom, setZoom] = useState(0.75);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardsRef = useRef(null);
  const [form] = Form.useForm();
  const { Search } = Input;

  // Get URL from query params or set default
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get("url");
    if (urlParam) {
      setUrl(urlParam);
    } else {
      // Set default URL if no URL is provided
      setUrl("https://onlyVishesh.vercel.app");
    }
  }, []);

  // Animate cards on mount
  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        ".device-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [screensValues]);

  const handleSearch = (value) => {
    setUrl(value);
  };

  const handleZoomChange = (value) => {
    setZoom(value / 100);
  };

  const getDeviceIcon = (deviceName) => {
    const name = deviceName.toLowerCase();
    if (
      name.includes("iphone") ||
      name.includes("galaxy") ||
      name.includes("pixel")
    ) {
      return <MobileOutlined className="text-blue-500" />;
    } else if (name.includes("ipad") || name.includes("tab")) {
      return <TabletOutlined className="text-green-500" />;
    } else {
      return <DesktopOutlined className="text-purple-500" />;
    }
  };

  const getDeviceCategory = (deviceName) => {
    const name = deviceName.toLowerCase();
    if (
      name.includes("iphone") ||
      name.includes("galaxy") ||
      name.includes("pixel")
    ) {
      return { category: "Mobile", color: "blue" };
    } else if (name.includes("ipad") || name.includes("tab")) {
      return { category: "Tablet", color: "green" };
    } else if (
      name.includes("laptop") ||
      name.includes("desktop") ||
      name.includes("macbook")
    ) {
      return { category: "Desktop", color: "purple" };
    }
    return { category: "Custom", color: "orange" };
  };

  const handleDeviceToggle = (deviceName) => {
    const updatedScreens = screensValues.map((screen) =>
      screen.deviceName === deviceName
        ? { ...screen, checked: !screen.checked }
        : screen
    );
    setScreens(updatedScreens);
  };

  const filteredScreens = screensValues.filter((screen) =>
    screen.deviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = screensValues.filter((screen) => screen.checked).length;

  // Helper function to check if a screen is custom
  const isCustomScreen = (screenName) => {
    return !DefaultScreens.some(
      (defaultScreen) => defaultScreen.deviceName === screenName
    );
  };

  const handleAddCustomScreen = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      addCustomScreen({
        deviceName: values.deviceName,
        width: values.width,
        height: values.height,
        DPR: values.DPR || 1,
        userAgent: values.userAgent || "",
      });
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleRemoveCustomScreen = (deviceName) => {
    removeCustomScreen(deviceName);
  };

  const handleAddBookmark = () => {
    const bookmarkData = getCurrentPageBookmarkData();
    addToBookmarks(bookmarkData.url, bookmarkData.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Sidebar */}
      <div
        className={`fixed left-0 top-20 h-full w-80 bg-white/90 backdrop-blur-lg shadow-2xl z-30 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Website URL
            </h3>
            <Search
              placeholder="Enter website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
              size="large"
              className="mb-4"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Zoom Level
            </h3>
            <Slider
              min={25}
              max={100}
              value={zoom * 100}
              onChange={handleZoomChange}
              marks={{
                25: "25%",
                50: "50%",
                100: "100%",
              }}
              tooltip={{ formatter: (value) => `${value}%` }}
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Devices</h3>
              <Badge count={selectedCount} color="blue" />
            </div>
            <Input
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
              className="mb-4"
            />
          </div>

          <Button
            type="dashed"
            icon={<PlusOutlined />}
            className="w-full mb-6 h-12 border-2 border-dashed border-blue-300 text-blue-600 hover:border-blue-500 hover:text-blue-700"
            onClick={handleAddCustomScreen}
          >
            Add Custom Device
          </Button>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              All Devices ({screensValues.length})
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredScreens.map((screen, index) => (
                <div
                  key={`sidebar-device-${screen.deviceName}-${index}`}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                    screen.checked
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => handleDeviceToggle(screen.deviceName)}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {getDeviceIcon(screen.deviceName)}
                    <div>
                      <div className="font-medium text-sm text-gray-900">
                        {screen.deviceName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {screen.width} × {screen.height}
                      </div>
                    </div>
                  </div>
                  {isCustomScreen(screen.deviceName) && (
                    <Button
                      type="text"
                      size="small"
                      danger
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCustomScreen(screen.deviceName);
                      }}
                      className="opacity-60 hover:opacity-100"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 pt-24 px-4 ${
          showSidebar ? "ml-80" : "ml-0"
        }`}
      >
        {/* Show URL content preview when no devices selected */}
        {url && !isCheckedScreenExist(screensValues) && (
          <div className="max-w-7xl mx-auto mb-12 my-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <EyeOutlined className="text-3xl text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  URL Ready! 🎉
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  Your website URL is loaded:
                </p>
                <div className="bg-blue-50 rounded-lg px-4 py-3 mb-6 max-w-2xl mx-auto">
                  <span className="font-mono text-blue-700 break-all">
                    {url}
                  </span>
                </div>

                {/* Animated prompt */}
                <div className="relative">
                  <div className="animate-bounce">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-2xl inline-flex items-center gap-3 shadow-lg">
                      <DesktopOutlined className="text-lg" />
                      <span className="font-semibold">
                        Click and Select Devices to Preview!
                      </span>
                      <div className="animate-pulse">👇</div>
                    </div>
                  </div>

                  {/* Animated arrow pointing to devices */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce delay-500">
                    <div className="text-4xl">⬇️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Device Cards Section - Show when no devices are selected */}
        {!isCheckedScreenExist(screensValues) && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Choose Your Devices
              </h2>
              <p className="text-xl text-gray-600">
                Select from our collection of popular devices
              </p>
            </div>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredScreens.slice(0, 12).map((screen, index) => {
                const { category, color } = getDeviceCategory(
                  screen.deviceName
                );
                return (
                  <Card
                    key={screen.deviceName}
                    className={`device-card cursor-pointer hover:shadow-xl transition-all duration-300 rounded-2xl border-2 ${
                      screen.checked
                        ? "border-blue-500 bg-blue-50 shadow-lg transform scale-105"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                    onClick={() => handleDeviceToggle(screen.deviceName)}
                    bodyStyle={{ padding: "1.5rem" }}
                  >
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                          screen.checked ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        {getDeviceIcon(screen.deviceName)}
                      </div>

                      <div className="mb-3">
                        <Badge color={color} text={category} className="mb-2" />
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                          {screen.deviceName}
                        </h3>
                      </div>

                      <div className="text-xs text-gray-500 mb-3">
                        {screen.width} × {screen.height}
                      </div>

                      <div
                        className={`w-full h-2 rounded-full transition-colors ${
                          screen.checked ? "bg-blue-500" : "bg-gray-200"
                        }`}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="text-center py-12">
              <Button
                size="large"
                onClick={() => setShowSidebar(true)}
                className="bg-white border-2 border-gray-300 text-gray-700 rounded-xl px-8 h-12 font-semibold hover:border-blue-500 hover:text-blue-600 shadow-lg"
              >
                View All Devices ({screensValues.length})
              </Button>
            </div>
          </div>
        )}

        {/* Preview Section */}
        {isCheckedScreenExist(screensValues) && url && (
          <div className="pb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Live Preview
                  </h2>
                  <p className="text-gray-600">
                    Viewing:{" "}
                    <span className="font-medium text-blue-600">{url}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge count={selectedCount} color="blue" />
                  <Button onClick={() => setShowSidebar(true)}>Settings</Button>
                  <Button
                    icon={<BookOutlined />}
                    onClick={handleAddBookmark}
                    className="text-blue-600 hover:text-blue-700"
                  ></Button>
                </div>
              </div>
            </div>

            <Screens screens={screensValues} url={url} zoom={zoom} />
          </div>
        )}
      </div>

      {/* Hidden sidebar component for functionality */}
      <div className="hidden">
        <Sidebar
          screens={screensValues}
          setScreens={setScreens}
          onKeyDown={() => {}}
          onSearch={handleSearch}
          onZoomChange={(value) => setZoom(value / 100)}
          addCustomScreen={addCustomScreen}
          removeCustomScreen={removeCustomScreen}
        />
      </div>

      {/* Add Custom Screen Modal */}
      <Modal
        title="Add Custom Screen Size"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Add Screen"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            DPR: 1,
          }}
        >
          <Form.Item
            name="deviceName"
            label="Device Name"
            rules={[{ required: true, message: "Please enter device name" }]}
          >
            <Input placeholder="e.g., Custom Device" />
          </Form.Item>

          <Form.Item
            name="width"
            label="Width (px)"
            rules={[{ required: true, message: "Please enter width" }]}
          >
            <InputNumber
              min={1}
              max={4000}
              placeholder="e.g., 1920"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="height"
            label="Height (px)"
            rules={[{ required: true, message: "Please enter height" }]}
          >
            <InputNumber
              min={1}
              max={4000}
              placeholder="e.g., 1080"
              className="w-full"
            />
          </Form.Item>

          <Form.Item name="DPR" label="Device Pixel Ratio">
            <InputNumber
              min={0.5}
              max={4}
              step={0.25}
              placeholder="e.g., 1"
              className="w-full"
            />
          </Form.Item>

          <Form.Item name="userAgent" label="User Agent (Optional)">
            <Input.TextArea
              rows={3}
              placeholder="Leave empty to use default browser user agent"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

Home.propTypes = {
  setScreens: PropTypes.func.isRequired,
  screensValues: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addCustomScreen: PropTypes.func.isRequired,
  removeCustomScreen: PropTypes.func.isRequired,
};

export default Home;
