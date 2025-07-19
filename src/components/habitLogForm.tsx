import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import SubmitButton from "./submitButton";
import TriggersInput from "./triggersInput";
import TimeSelection from "./timeSelection";
import HabitNameSelection from "./habitNameSelection";

// Zod schema for form validation
const habitLogFormSchema = z.object({
  habitName: z.string().min(1, "Please select a habit").trim(),
  selectedTime: z
    .string()
    .min(1, "Please select a time")
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid time format (HH:MM)"
    ),
  triggers: z
    .string()
    .min(1, "Please describe what triggered this habit")
    .min(3, "Trigger description must be at least 3 characters")
    .max(500, "Trigger description must be less than 500 characters")
    .trim(),
});

type HabitLogFormValues = z.infer<typeof habitLogFormSchema>;

interface HabitLogFormProps {
  onSubmit: (habitData: HabitLogFormValues) => void;
}

const HabitLogForm = ({ onSubmit }: HabitLogFormProps) => {
  const getCurrentTimeString = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // "HH:MM" format
  };

  // Initialize react-hook-form with zod resolver
  const form = useForm<HabitLogFormValues>({
    resolver: zodResolver(habitLogFormSchema),
    defaultValues: {
      habitName: "",
      selectedTime: getCurrentTimeString(),
      triggers: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  const handleFormSubmit = (data: HabitLogFormValues) => {
    // Handle form submission
    onSubmit(data);

    // Reset form after successful submission
    form.reset({
      habitName: "",
      selectedTime: getCurrentTimeString(),
      triggers: "",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Log a Bad Habit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <div className="space-y-6">
            {/* Habit Name Selection */}
            <FormField
              control={form.control}
              name="habitName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Habit Name
                  </FormLabel>
                  <FormControl>
                    <HabitNameSelection
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Selection */}
            <FormField
              control={form.control}
              name="selectedTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Time</FormLabel>
                  <FormControl>
                    <TimeSelection
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    When did this habit occur?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Triggers Input */}
            <FormField
              control={form.control}
              name="triggers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Triggers
                  </FormLabel>
                  <FormControl>
                    <TriggersInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div onClick={form.handleSubmit(handleFormSubmit)}>
              <SubmitButton
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                text={form.formState.isSubmitting ? "Logging..." : "Log Habit"}
              />
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HabitLogForm;
