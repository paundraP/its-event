import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(7),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string().min(6),
    email: z.string().email(),
  }),
});

export const LoginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
