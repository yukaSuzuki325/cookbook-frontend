import { ChangeEvent } from 'react';

interface FormInputProps {
  type: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
}

const FormInput = ({
  type,
  name,
  value,
  onChange,
  label,
  required = false,
}: FormInputProps) => {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded p-2"
        required={required}
      />
    </div>
  );
};
export default FormInput;
