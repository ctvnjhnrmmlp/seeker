import z from 'zod';

export const JobSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Job title must be at least 5 characters' }),
  company: z.string().min(2, { message: 'Company name is required' }),
  location: z.string().min(2, { message: 'Location is required' }),
  type: z.string(),
  salaryMin: z.string(),
  salaryMax: z.string(),
  description: z
    .string()
    .min(50, { message: 'Description must be at least 50 characters' }),
  requirements: z
    .string()
    .min(20, { message: 'Requirements must be at least 20 characters' }),
  applicationUrl: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .optional()
    .or(z.literal('')),
  contactEmail: z.string().email({ message: 'Please enter a valid email' }),
});
