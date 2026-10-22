import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is missing from .env");
    }
    return secret;
};
export const registerUser = async (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    });
    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    return prisma.user.create({
        data: {
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "STUDENT",
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
};
export const loginUser = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("INVALID_CREDENTIALS");
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, getJwtSecret(), { expiresIn: "1d" });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
//# sourceMappingURL=auth.service.js.map