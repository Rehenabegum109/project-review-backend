type AdminUserRole = "STUDENT" | "MENTOR" | "ADMIN";
export declare const getAllUsers: () => Promise<{
    createdAt: Date;
    email: string;
    id: string;
    name: string;
    role: import("@prisma/client").$Enums.UserRole;
}[]>;
export declare const getAllSubmissions: () => Promise<({
    review: {
        createdAt: Date;
        feedback: string;
        mentorId: string;
        status: import("@prisma/client").$Enums.SubmissionStatus;
    } | null;
    student: {
        email: string;
        id: string;
        name: string;
    };
} & {
    id: string;
    title: string;
    description: string;
    githubUrl: string;
    liveUrl: string | null;
    status: import("@prisma/client").$Enums.SubmissionStatus;
    studentId: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const getDashboardStats: () => Promise<{
    totalUsers: number;
    totalSubmissions: number;
    pendingSubmissions: number;
    approvedSubmissions: number;
    rejectedSubmissions: number;
}>;
export declare const createAdminUser: (name: string, email: string, password: string, role: AdminUserRole) => Promise<{
    createdAt: Date;
    email: string;
    id: string;
    name: string;
    role: import("@prisma/client").$Enums.UserRole;
}>;
export {};
//# sourceMappingURL=admin.service.d.ts.map