import { MouseEvent, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface CircularTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
  initialHour?: number;
  initialMinute?: number;
  initialPeriod?: string; // "AM" or "PM"
}

type TimeMode = "hour" | "minute";
type TimePeriod = string;

const CircularTimePicker = ({
  isOpen,
  onClose,
  onConfirm,
  initialHour = 11,
  initialMinute = 0,
  initialPeriod = "AM",
}: CircularTimePickerProps) => {
  const [hour, setHour] = useState<number>(initialHour);
  const [minute, setMinute] = useState<number>(initialMinute);
  const [period, setPeriod] = useState<TimePeriod>(initialPeriod);
  const [mode, setMode] = useState<TimeMode>("hour");

  const handleClockClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = (angle + 360 + 90) % 360;

    if (mode === "hour") {
      const newHour = Math.round(angle / 30) || 12;
      setHour(newHour);
      setMode("minute");
    } else {
      // Fix: Calculate which 5-minute segment was clicked (0-11) then multiply by 5
      const segment = Math.round(angle / 30) % 12;
      const newMinute = segment * 5;
      setMinute(newMinute);
    }
  };

  const getClockNumbers = (): number[] => {
    if (mode === "hour") {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    } else {
      return Array.from({ length: 12 }, (_, i) => i * 5);
    }
  };

  const getAngle = (): number => {
    if (mode === "hour") {
      return (hour % 12) * 30 - 30;
    } else {
      return minute * 6;
    }
  };

  const handleConfirm = (): void => {
    const timeString = `${hour}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
    onConfirm(timeString);
    onClose();
  };

  const handlePeriodChange = (newPeriod: TimePeriod): void => {
    setPeriod(newPeriod);
  };

  const handleModeChange = (newMode: TimeMode): void => {
    setMode(newMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Time</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Digital Display */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-4xl font-bold text-blue-500">
            <button
              onClick={() => handleModeChange("hour")}
              className={`${
                mode === "hour" ? "text-blue-500" : "text-gray-400"
              } hover:text-blue-500 transition-colors`}
            >
              {hour.toString().padStart(2, "0")}
            </button>
            <span>:</span>
            <button
              onClick={() => handleModeChange("minute")}
              className={`${
                mode === "minute" ? "text-blue-500" : "text-gray-400"
              } hover:text-blue-500 transition-colors`}
            >
              {minute.toString().padStart(2, "0")}
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={() => handlePeriodChange("AM")}
              className={`px-3 py-1 rounded ${
                period === "AM" ? "bg-blue-500 text-white" : "text-gray-500"
              }`}
            >
              AM
            </button>
            <button
              onClick={() => handlePeriodChange("PM")}
              className={`px-3 py-1 rounded ${
                period === "PM" ? "bg-blue-500 text-white" : "text-gray-500"
              }`}
            >
              PM
            </button>
          </div>
        </div>

        {/* Clock Face */}
        <div className="flex justify-center mb-6">
          <div className="relative w-64 h-64">
            <div
              className="w-full h-full rounded-full border-2 border-gray-300 dark:border-gray-600 cursor-pointer relative"
              onClick={handleClockClick}
            >
              {/* Clock Numbers */}
              {getClockNumbers().map((num, index) => {
                const angle = index * 30 - 90;
                const radian = (angle * Math.PI) / 180;
                const x = Math.cos(radian) * 100;
                const y = Math.sin(radian) * 100;

                // Fix: Simplified and correct active state logic
                const isActive =
                  mode === "hour"
                    ? num === hour
                    : num === minute || (num === 0 && minute === 0);

                return (
                  <div
                    key={num}
                    className={`absolute w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transform -translate-x-1/2 -translate-y-1/2 ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
                    {num}
                  </div>
                );
              })}

              {/* Clock Hand */}
              <div
                className="absolute w-0.5 bg-blue-500 origin-bottom"
                style={{
                  height: "90px",
                  left: "50%",
                  top: "50%",
                  transformOrigin: "50% 100%",
                  transform: `translate(-50%, -100%) rotate(${getAngle()}deg)`,
                }}
              >
                <div className="absolute -top-2 -left-1.5 w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>

              {/* Center Dot */}
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            CANCEL
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-blue-500 hover:bg-blue-600"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CircularTimePicker;
