interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-green-500 hover:text-green-700 text-xl font-bold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessMessage;
