import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma';
import { env } from '../utils/env';

export const authService = {
  async register(email: string, password: string, firstName: string, lastName: string) {
    const hashedPassword = await bcrypt.hash(password, env.BCRYPT_ROUNDS);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'WORKER',
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRE } as jwt.SignOptions
    );

    return { user: { id: user.id, email: user.email, firstName, lastName }, token };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRE } as jwt.SignOptions
    );

    return { user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, token };
  },

  async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  },
};