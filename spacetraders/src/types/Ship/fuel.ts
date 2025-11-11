export type Fuel = {
    current: number;
    capacity: number;
    consumed: {
        amount: number;
        timestamp: string;
    };
}