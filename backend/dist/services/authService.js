"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../utils/prisma");
const env_1 = require("../utils/env");
exports.authService = {
    async register(email, password, firstName, lastName) {
        const hashedPassword = await bcryptjs_1.default.hash(password, env_1.env.BCRYPT_ROUNDS);
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: 'WORKER',
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_EXPIRE });
        return { user: { id: user.id, email: user.email, firstName, lastName }, token };
    },
    async login(email, password) {
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_EXPIRE });
        return { user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, token };
    },
    async getUserById(id) {
        return await prisma_1.prisma.user.findUnique({ where: { id } });
    },
};
//# sourceMappingURL=authService.js.map