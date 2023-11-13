export interface progressBar {
    task: string;
    progress: number;
    qty: number;
}

export interface statsCard {
    title: string;
    qty: number;
    results: results[];
}

interface results {
    title: string;
    qty: number;
    progress: number;
}