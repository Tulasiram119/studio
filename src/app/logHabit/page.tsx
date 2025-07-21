"use client";
import HabitLogForm from "@/components/habitLogForm";
interface HabitData {
  habitName: string;
  selectedTime: string;
  triggers: string;
}
export default function Home() {
  const handleHabitSubmit = (habitData: HabitData): void => {
    console.log("Habit logged:", habitData);
    // Here you would typically send the data to your backend or state management
  };

  return (
    <main className="p-6">
      <HabitLogForm onSubmit={handleHabitSubmit} />
    </main>
  );
}
