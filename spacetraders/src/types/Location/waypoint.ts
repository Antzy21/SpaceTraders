import type { Market } from "../market";
import type { Shipyard } from "../shipyard";
import type { Trait } from "../trait";

export type Waypoint = {
    symbol: string;
    type: string;
    systemSymbol: string;
    x: number;
    y: number;
    orbitals: {
        symbol: string;
    }[];
    orbitalWaypoints: Waypoint[];
    traits: Trait[];
    isUnderConstruction: boolean;
    faction: {
        symbol: string;
    };
    modifiers: any[];
    chart: {
        waypointSymbol: string;
        submittedBy: string;
        submittedOn: string;
    };
    market: Market | undefined;
    shipyard: Shipyard | undefined;
}