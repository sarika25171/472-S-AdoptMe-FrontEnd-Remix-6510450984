export interface Emergency {
    id: string;
    type: string;
    description: string;
    location: string;
    reportedAt: Date;
    status: 'pending' | 'in-progress' | 'resolved';
}