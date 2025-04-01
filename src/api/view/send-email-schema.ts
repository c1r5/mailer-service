import {z} from "zod";

export const sendEmailSchema = z.object({
    from: z.string().email().optional().default('teste@mailer.com'),
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
});

export type SendEmailSchema = z.infer<typeof sendEmailSchema>;