import { Button } from "antd";

const CustomButton = ({
  label,
  loading,
  variant = "default",
  size = "default",
  className = "",
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={loading}
      className={className}
      {...rest}
    >
      {loading ? "Loading..." : label}
    </Button>
  );
};

export default CustomButton;
