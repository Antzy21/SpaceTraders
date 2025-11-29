import type { ShipyardShip } from "./shipyardShip";

export type Shipyard = {
    symbol: string;
    shipTypes: { type: string }[];
    ships: ShipyardShip[]
    modificationsFee: number;
}