import { Button, Form, Input, InputNumber, Modal, Slider } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

/** Components */
import CheckboxField from "./CheckboxField/CheckboxField.jsx";

/** Data */
import DefaultScreens from "data/screens.js";

export const Sidebar = ({
  screens,
  setScreens,
  onKeyDown,
  onSearch,
  onZoomChange,
  addCustomScreen,
  removeCustomScreen,
}) => {
  const [allScreens, setAllScreens] = useState(screens);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setAllScreens(screens);
  }, [screens]);

  const handleChange = (deviceName) => {
    const tmpAllScreens = allScreens?.map((screen) => {
      if (screen?.deviceName === deviceName) {
        return {
          ...screen,
          checked: !screen.checked,
        };
      }
      return screen;
    });
    setAllScreens([...tmpAllScreens]);

    setScreens([...tmpAllScreens]);
  };

  const marks = {
    25: "25%",
    50: "50%",
    100: {
      style: { color: "#f50" },
      label: <strong>100%</strong>,
    },
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

  // Helper function to check if a screen is custom
  const isCustomScreen = (screenName) => {
    return !DefaultScreens.some(
      (defaultScreen) => defaultScreen.deviceName === screenName
    );
  };

  const { Search } = Input;
  return (
    <div className="inline-flex flex-col px-6 pb-2 w-52 fixed left-0 overflow-y-auto h-full top-20 bg-gray-50 shadow-lg">
      <div
        className="fixed z-10 bg-gray-100 rounded-md p-2"
        style={{ width: "210px" }}
      >
        <Search
          className="mb-2"
          placeholder="https://onlyVishesh.vercel.app"
          defaultValue={"https://onlyVishesh.vercel.app"}
          allowClear
          onKeyDown={(event) => onKeyDown(event)}
          enterButton
          onSearch={(event) => onSearch(event)}
          onChange={handleChange}
        />
      </div>
      <div className="mt-12 pt-8">
        <div className="text-sm font-medium mb-2">Zoom</div>
        <Slider
          defaultValue={100}
          tooltip={{ open: false }}
          onChange={onZoomChange}
          marks={marks}
          step={null}
          className="mb-4"
        />

        <Button
          type="primary"
          onClick={handleAddCustomScreen}
          className="mb-4 w-full"
          size="small"
        >
          Add Custom Screen
        </Button>

        <div className="py-2 text-base font-normal leading-6">All Screens</div>
        <div className="flex flex-col mb-24">
          {allScreens?.map((screen, index) => (
            <CheckboxField
              key={`screen-device-${screen?.deviceName}-${index}`}
              deviceName={screen?.deviceName}
              checked={screen?.checked}
              onChange={handleChange}
              isCustomScreen={isCustomScreen(screen?.deviceName)}
              onRemove={handleRemoveCustomScreen}
            />
          ))}
        </div>
      </div>

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

Sidebar.propTypes = {
  screens: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      deviceName: PropTypes.string.isRequired,
    })
  ).isRequired,
  setScreens: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onZoomChange: PropTypes.func.isRequired,
  addCustomScreen: PropTypes.func.isRequired,
  removeCustomScreen: PropTypes.func.isRequired,
};

export default Sidebar;
