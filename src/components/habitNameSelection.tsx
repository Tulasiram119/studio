import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface HabitNameInputProps {
  value: string;
  onChange: (value: string) => void;
}
const HabitNameSelection = ({ value, onChange }: HabitNameInputProps) => {
  const habitOptions = [
    { value: "excessive-snacking", label: "Excessive Snacking" },
    { value: "smoking", label: "Smoking" },
    { value: "social-media-scrolling", label: "Social Media Scrolling" },
    { value: "nail-biting", label: "Nail Biting" },
    { value: "procrastination", label: "Procrastination" },
    { value: "excessive-drinking", label: "Excessive Drinking" },
    { value: "skipping-meals", label: "Skipping Meals" },
    { value: "staying-up-late", label: "Staying Up Late" },
    { value: "emotional-eating", label: "Emotional Eating" },
    { value: "avoiding-exercise", label: "Avoiding Exercise" },
    { value: "negative-self-talk", label: "Negative Self-Talk" },
    { value: "impulse-buying", label: "Impulse Buying" },
  ];

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          <SelectValue placeholder="Select a habit" />
        </SelectTrigger>
        <SelectContent>
          {habitOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default HabitNameSelection;
