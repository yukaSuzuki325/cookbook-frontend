interface ActionButtonProps {
  isLoading?: boolean;
  buttonText?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  children?: React.ReactNode;
}

const ActionButton = ({
  isLoading,
  buttonText,
  type = 'submit',
  onClick,
  children,
}: ActionButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      disabled={isLoading}
    >
      {isLoading ? 'Submitting...' : children || buttonText}
    </button>
  );
};
export default ActionButton;
