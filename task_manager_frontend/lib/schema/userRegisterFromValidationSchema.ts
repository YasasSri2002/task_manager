import z from "zod";

export const userRegistrationFormValidationSchema = z.object({
    firstName: z.string().min(1,"First name is required"),
    lastName: z.string().min(1,"Last name is required"),
    username : z.string().min(1,"User name is required").regex(/^\S+$/, "Username cannot contain spaces"),
    email : z.email("Invalid email"),
    password: z.string().min(8, "Password should be at least 8 charaters long!"),
})

export type UserRegisterFormValues = z.infer<typeof userRegistrationFormValidationSchema>;

export type UserRegisterFormErrors = Partial<Record<keyof UserRegisterFormValues, string[]>>;