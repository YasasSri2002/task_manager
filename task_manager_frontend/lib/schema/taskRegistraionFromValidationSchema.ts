import z from "zod";

export const taskRegistrationFormValidation = z.object({
    title: z.string().min(1,"Title is required!"),
    description: z.string().min(20,"Description is required!").max(500,"Description is too long"),
    dueDate : z.date("Invalid date"),
    priority: z.string().min(1,"priority is required!"),
    status: z.string().min(1,"Status is reqiured!")
})

export type TaskRegisterFormValues = z.infer<typeof taskRegistrationFormValidation>;

export type TaskRegisterFormErrors = Partial<Record<keyof TaskRegisterFormValues, string[]>>;