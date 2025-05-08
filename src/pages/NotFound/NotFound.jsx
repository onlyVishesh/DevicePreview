import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const path = `/`;
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={handleClick} type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
