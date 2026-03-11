import z from "zod";

export const loginFormValidateSchema = z.object({
    username : z.email().min(1,"User name is required"),
    password: z.string().min(1, "Password required!")
})

export type LoginFormValues = z.infer<typeof loginFormValidateSchema>;

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string[]>>;