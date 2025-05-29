import {
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { Badge, Card } from "antd";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Iframe from "./Iframe/Iframe.jsx";

export const Screens = ({ screens, url, zoom }) => {
  const screensRef = useRef(null);

  useEffect(() => {
    if (screensRef.current) {
      gsap.fromTo(
        ".screen-container",
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [screens, url]);

  const getDeviceIcon = (deviceName) => {
    const name = deviceName.toLowerCase();
    if (
      name.includes("iphone") ||
      name.includes("galaxy") ||
      name.includes("pixel")
    ) {
      return <MobileOutlined className="text-blue-500 text-sm" />;
    } else if (name.includes("ipad") || name.includes("tab")) {
      return <TabletOutlined className="text-green-500 text-sm" />;
    } else {
      return <DesktopOutlined className="text-purple-500 text-sm" />;
    }
  };

  const getDeviceCategory = (deviceName) => {
    const name = deviceName.toLowerCase();
    if (
      name.includes("iphone") ||
      name.includes("galaxy") ||
      name.includes("pixel")
    ) {
      return { category: "Mobile", color: "#3b82f6" };
    } else if (name.includes("ipad") || name.includes("tab")) {
      return { category: "Tablet", color: "#10b981" };
    } else if (
      name.includes("laptop") ||
      name.includes("desktop") ||
      name.includes("macbook")
    ) {
      return { category: "Desktop", color: "#8b5cf6" };
    }
    return { category: "Custom", color: "#f59e0b" };
  };

  return (
    <div ref={screensRef} className="w-full">
      <div className="flex justify-center items-start min-h-screen pt-8">
        <div className="w-full max-w-full">
          <div
            className="flex flex-wrap gap-8 justify-center p-6"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
            }}
          >
            {screens?.map(
              (screen, index) =>
                screen?.checked && (
                  <div key={`screen-${index}`} className="screen-container">
                    <Card
                      className="bg-white shadow-xl rounded-2xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300"
                      bodyStyle={{ padding: 0 }}
                    >
                      {/* Device Header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                              {getDeviceIcon(screen.deviceName)}
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">
                                {screen?.deviceName}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {screen?.width} × {screen?.height}
                              </p>
                            </div>
                          </div>
                          <Badge
                            color={getDeviceCategory(screen.deviceName).color}
                            text={getDeviceCategory(screen.deviceName).category}
                            className="text-xs"
                          />
                        </div>
                      </div>

                      {/* Device Content */}
                      <div className="relative">
                        <div
                          className="relative bg-black rounded-b-2xl overflow-hidden"
                          style={{
                            width: screen?.width,
                            height: screen?.height + 4,
                            maxWidth: "100%",
                          }}
                        >
                          {/* Device Frame Effect */}
                          <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-br from-gray-100 via-white to-gray-200 p-1">
                            <div className="w-full h-full rounded-xl overflow-hidden bg-black relative">
                              {url !== "" && (
                                <Iframe screen={screen} url={url} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Screens.propTypes = {
  screens: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      deviceName: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    })
  ).isRequired,
  url: PropTypes.string.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default Screens;
