import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
interface TriggersInputProps {
  value: string;
  onChange: (value: string) => void;
}
const TriggersInput = ({ value, onChange }: TriggersInputProps) => {
  return (
    <div className="space-y-2">
      <Textarea
        id="triggers"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe the triggers for this habit"
        rows={4}
        className="resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
};
export default TriggersInput;
