export enum statsType {
    pulls = 'Pull Requests',
    issues = 'Issues',
    branches = 'Branches',
}

export interface stats {
    title: string;
    qty: number;
    results: results[];
}

export interface results {
    title: string;
    qty: number;
    progress: string;
}