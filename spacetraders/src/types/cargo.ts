import type { Resource } from "./resource";

export type Cargo = {
    capacity: number;
    units: number;
    inventory: Resource[];
}