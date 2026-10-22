export declare const registerUser: (name: string, email: string, password: string) => Promise<{
    createdAt: Date;
    email: string;
    id: string;
    name: string;
    role: import("@prisma/client").$Enums.UserRole;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map