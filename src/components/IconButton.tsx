import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
}

const IconButton = ({ icon, onClick, ariaLabel }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 border border-orange-300 rounded text-orange-500 bg-white hover:bg-orange-100"
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default IconButton;
