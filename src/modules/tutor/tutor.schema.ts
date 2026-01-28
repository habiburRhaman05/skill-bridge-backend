import { z } from "zod";

 const createTutorProfileSchema = z.object({
 body:z.object({
     bio: z
    .string({
      required_error: "Bio is required",
    })
    .min(10, "Bio must be at least 10 characters long"),

  hourlyRate: z
    .number({
      required_error: "Hourly rate is required",
      invalid_type_error: "Hourly rate must be a number",
    })
    .positive("Hourly rate must be a positive number"),

  category: z
    .string({
      required_error: "Category is required",
    })
    .min(2, "Category must be at least 2 characters long"),

  subjects: z
    .array(
      z.string().min(2, "Each subject must be at least 2 characters long")
    )
    .min(1, "At least one subject is required"),
  availability: z
    .array(
      z.string().min(5, "Each availability time slot must be at least 5 characters long")
    )
    .min(1, "At least one availability time slot is required"),
 })
});

const addAvailabilitySchema = z.object({
  body: z.object({
    date: z
      .string({
        required_error: "Date is required",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format (YYYY-MM-DD)",
      })
      .refine((val) => {
        const inputDate = new Date(val);
        const today = new Date();

        // reset time (00:00:00)
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return inputDate >= today;
      }, {
        message: "Date must be today or a future date",
      }),

    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: "startTime must be HH:mm (24-hour)",
      }),

    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: "endTime must be HH:mm (24-hour)",
      }),
  }),
});

export const tutorSchemas = {createTutorProfileSchema,addAvailabilitySchema}