import { z } from 'zod';

// -----------------------------
// Register Schema
// -----------------------------
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters'),

  email: z.string().trim().toLowerCase().email('Invalid email address'),

  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must not exceed 50 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    ),
});

// -----------------------------
// Login Schema
// -----------------------------
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),

  password: z.string().min(1, 'Password is required'),
});

// -----------------------------
// Export Types
// -----------------------------
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
