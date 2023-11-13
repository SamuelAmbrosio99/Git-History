export interface progressBar {
    task: string;
    progress: number;
    qty: number;
}

export interface statsCard {
    title: string;
    qty: number;
    results: pRResults[];
}

interface pRResults {
    title: string;
    qty: number;
    progress: number;
}