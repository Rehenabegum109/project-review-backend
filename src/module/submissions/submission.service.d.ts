export declare const createSubmission: (studentId: string, data: {
    title: string;
    description: string;
    githubUrl: string;
    liveUrl?: string;
}) => Promise<{
    id: string;
    title: string;
    description: string;
    githubUrl: string;
    liveUrl: string | null;
    status: import("@prisma/client").$Enums.SubmissionStatus;
    studentId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getMySubmissions: (studentId: string) => Promise<({
    review: {
        createdAt: Date;
        feedback: string;
        status: import("@prisma/client").$Enums.SubmissionStatus;
    } | null;
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
//# sourceMappingURL=submission.service.d.ts.map