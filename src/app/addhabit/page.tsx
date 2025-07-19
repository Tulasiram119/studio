"use client";
import { useModeStore } from "@/store/mode";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submitButton";

// Zod schema for form validation
const habitFormSchema = z.object({
  habitName: z
    .string()
    .min(1, "Habit name is required")
    .min(2, "Habit name must be at least 2 characters")
    .max(50, "Habit name must be less than 50 characters")
    .trim(),
  habitDescription: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
});

type HabitFormValues = z.infer<typeof habitFormSchema>;

const HabitTracker = () => {
  const isDarkMode = useModeStore((state) => state.isDarkMode);

  // Initialize react-hook-form with zod resolver
  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: {
      habitName: "",
      habitDescription: "",
    },
  });

  const handleAddHabit = (data: HabitFormValues) => {
    // Handle habit addition logic here
    console.log("Adding habit:", data);

    // Reset form after successful submission
    form.reset();
  };

  return (
    <main className="flex flex-col items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-center">
            Add New Habit
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddHabit)}
              className="space-y-6"
            >
              {/* Habit Name Input */}
              <FormField
                control={form.control}
                name="habitName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Habit Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Overthinking"
                        className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Choose a clear, specific name for your habit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Habit Description Input */}
              <FormField
                control={form.control}
                name="habitDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief Description or Category"
                        rows={4}
                        className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Optional: Add context or categorize your habit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <SubmitButton
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                text={form.formState.isSubmitting ? "Adding..." : "Add Habit"}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Additional UI Elements */}
      <div className="mt-8 text-center">
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Start building better habits today
        </p>
      </div>
    </main>
  );
};

export default HabitTracker;
