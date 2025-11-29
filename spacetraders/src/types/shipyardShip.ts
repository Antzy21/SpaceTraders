export type ShipyardShip = {
    type: string;
    name: string;
    description: string;
    supply: string;
    purchasePrice: number;
    frame: {
        symbol: string;
        name: string;
        condition: number;
        integrity: number;
        description: string;
        moduleSlots: number;
        mountingPoints: number;
        fuelCapacity: number;
        requirements: {
            power: number;
            crew: number;
        };
        quality: number;
    };
    reactor: {
        symbol: string;
        name: string;
        condition: number;
        integrity: number;
        description: string;
        powerOutput: number;
        requirements: {
            crew: number;
        };
        quality: number;
    };
    engine: {
        symbol: string;
        name: string;
        condition: number;
        integrity: number;
        description: string;
        speed: number;
        requirements: {
            power: number;
            crew: number;
        };
        quality: number;
    };
    modules: {
        symbol: string;
        name: string;
        description: string;
        requirements: {
            power: number;
            crew: number;
            slots: number;
        };
        capacity: number;
    }[];
    mounts: {
        symbol: string;
        name: string;
        description: string;
        requirements: {
            power: number;
            crew: number;
        };
    }[];
    crew: {
        required: number;
        capacity: number;
    };
    activity: string;
}