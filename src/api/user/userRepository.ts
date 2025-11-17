import type { User } from "@/api/user/userModel";
import { prisma } from "@/lib/prisma";

export class UserRepository {
  async createAsync(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

  async updateAsync(
    id: string,
    userData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async findAllAsync(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findByIdAsync(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmailAsync(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
}
