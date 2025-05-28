import { Button, Checkbox } from "antd";
import PropTypes from "prop-types";

export const CheckboxField = ({
  deviceName,
  checked,
  onChange,
  isCustomScreen = false,
  onRemove,
}) => {
  const handleOnChange = () => {
    if (onChange) {
      onChange(deviceName);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent checkbox toggle when delete is clicked
    if (onRemove) {
      onRemove(deviceName);
    }
  };

  return (
    <div className="mb-2 flex items-center justify-between group">
      <Checkbox
        checked={checked}
        onChange={handleOnChange}
        className="text-sm flex-1"
      >
        {deviceName}
      </Checkbox>
      {isCustomScreen && (
        <Button
          type="text"
          size="small"
          danger
          onClick={handleRemove}
          className="hover:cursor-pointer p-1 ml-2"
          style={{ minWidth: "auto", height: "auto", padding: "2px 4px" }}
        >
          ✕
        </Button>
      )}
    </div>
  );
};

CheckboxField.propTypes = {
  deviceName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  isCustomScreen: PropTypes.bool,
  onRemove: PropTypes.func,
};

export default CheckboxField;
