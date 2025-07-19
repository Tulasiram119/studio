import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import CircularTimePicker from "./circularTimePicker";
interface TimeSelectionProps {
  value: string; // The selected time value
  onChange: (value: string) => void; // Callback to handle time selection change
}
const TimeSelection = ({ value, onChange }: TimeSelectionProps) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value || "11:00 AM");

  const handleTimeConfirm = (timeString: string) => {
    setSelectedTime(timeString);
    onChange(timeString);
  };

  const parseTime = (timeString: string) => {
    if (!timeString) return { hour: 11, minute: 0, period: "AM" };
    const [time, period] = timeString.split(" ");
    const [hour, minute] = time.split(":").map(Number);
    return { hour, minute, period };
  };

  const { hour, minute, period } = parseTime(selectedTime);

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        onClick={() => setIsPickerOpen(true)}
        className="w-full justify-start text-left font-normal focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        {selectedTime || "Select Time"}
      </Button>

      <CircularTimePicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onConfirm={handleTimeConfirm}
        initialHour={hour}
        initialMinute={minute}
        initialPeriod={period}
      />
    </div>
  );
};

export default TimeSelection;
