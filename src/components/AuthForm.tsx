import React from 'react';

interface FormField {
  id: string;
  label: string;
  type: string;
  value: string;
  required?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface AuthFormProps {
  title: string;
  fields: FormField[];
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  bottomText?: string;
  bottomLinkText?: string;
  bottomLinkHref?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  buttonText,
  onSubmit,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:border-orange-500"
                required={field.required}
              />
            </div>
          ))}
          <button
            type="submit"
            className="py-2 px-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            {buttonText}
          </button>
        </form>
        {bottomText && bottomLinkText && bottomLinkHref && (
          <p className="text-sm text-gray-600 mt-4">
            {bottomText}{' '}
            <a
              href={bottomLinkHref}
              className="text-orange-500 hover:underline"
            >
              {bottomLinkText}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
