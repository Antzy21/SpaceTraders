import type { Waypoint } from "./waypoint";

export type System = {
    symbol: string;
    sectorSymbol: string;
    type: string;
    x: number;
    y: number;
    waypoints: Waypoint[];
    factions: any[];
    constellation: string;
    name: string;
}