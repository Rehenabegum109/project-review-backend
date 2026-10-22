export declare const getMyReviews: (studentId: string) => Promise<({
    submission: {
        createdAt: Date;
        id: string;
        status: import("@prisma/client").$Enums.SubmissionStatus;
        title: string;
    };
} & {
    id: string;
    feedback: string;
    status: import("@prisma/client").$Enums.SubmissionStatus;
    submissionId: string;
    mentorId: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const reviewSubmission: (mentorId: string, submissionId: string, feedback: string, status: "APPROVED" | "REJECTED") => Promise<{
    id: string;
    feedback: string;
    status: import("@prisma/client").$Enums.SubmissionStatus;
    submissionId: string;
    mentorId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getPendingSubmissions: () => Promise<({
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
export declare const getAllReviews: () => Promise<({
    submission: {
        createdAt: Date;
        id: string;
        status: import("@prisma/client").$Enums.SubmissionStatus;
        student: {
            email: string;
            id: string;
            name: string;
        };
        title: string;
    };
} & {
    id: string;
    feedback: string;
    status: import("@prisma/client").$Enums.SubmissionStatus;
    submissionId: string;
    mentorId: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
//# sourceMappingURL=review.service.d.ts.map