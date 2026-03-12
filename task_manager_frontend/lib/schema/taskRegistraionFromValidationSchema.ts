import z from "zod";

export const taskRegistrationFormValidation = z.object({
    title: z.string().min(1,"Title is required!"),
    priority: z.string().min(1,"priority is required!"),
    status: z.string().min(1,"Status is reqiured!")
})

export type TaskRegisterFormValues = z.infer<typeof taskRegistrationFormValidation>;

export type TaskRegisterFormErrors = Partial<Record<keyof TaskRegisterFormValues, string[]>>;