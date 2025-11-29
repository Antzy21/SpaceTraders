import type { Cargo } from "./cargo";
import type { Fuel } from "./Ship/fuel";
import type { Nav } from "./Ship/nav";

export type Ship = {
    symbol: string;
    registration: {
        name: string;
        factionSymbol: string;
        role: string;
    };
    nav: Nav;
    crew: {
        current: number;
        required: number;
        capacity: number;
        rotation: string;
        morale: number;
        wages: number;
    };
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
        capacity?: number;
    }[];
    mounts: {
        symbol: string;
        name: string;
        description: string;
        requirements: {
            power: number;
            crew: number;
        };
        strength: number;
        deposits?: string[];
    }[];
    cargo: Cargo;
    fuel: Fuel;
    cooldown: {
        shipSymbol: string;
        totalSeconds: number;
        remainingSeconds: number;
    };
}
