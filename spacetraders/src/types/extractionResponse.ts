export interface ExtractionResponse {
    extraction: {
        shipSymbol: string;
        yield: {
            symbol: string;
            units: number;
        };
    };
    cooldown: {
        shipSymbol: string;
        totalSeconds: number;
        remainingSeconds: number;
        expiration: string;
    };
    cargo: {
        capacity: number;
        units: number;
        inventory: {
            symbol: string;
            name: string;
            description: string;
            units: number;
        }[];
    };
    events: {
        symbol: string;
        component: string;
        name: string;
        description: string;
    }[];
    modifiers: any[]; // Adjust this type if you know the structure of modifiers
}
