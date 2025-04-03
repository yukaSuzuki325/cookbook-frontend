interface ActionButtonProps {
  isLoading?: boolean;
  buttonText: string;
}

const ActionButton = ({ isLoading, buttonText }: ActionButtonProps) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      disabled={isLoading}
    >
      {isLoading ? 'Submitting...' : buttonText}
    </button>
  );
};
export default ActionButton;
