import { Input } from "antd";

const CustomInput = ({ label, name, type = "text", value, onChange, onBlur, error }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold text-sm mb-1">{label}</label>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="py-2"
        
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default CustomInput;

