import { Button } from "./ui/button";

interface SubmitButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
}
const SubmitButton = ({
  onClick,
  disabled,
  text = "Submit",
}: SubmitButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className="w-full bg-gradient-to-r from-indigo-800 to-purple-600 text-white hover:from-indigo-900 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
    >
      {text}
    </Button>
  );
};
export default SubmitButton;
