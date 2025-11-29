export type NavResponse = {
    nav: {
        systemSymbol: string;
        waypointSymbol: string;
        route: {
            destination: {
                symbol: string;
                type: string;
                systemSymbol: string;
                x: number;
                y: number;
            };
            origin: {
                symbol: string;
                type: string;
                systemSymbol: string;
                x: number;
                y: number;
            };
            departureTime: string;
            arrival: string;
        };
        status: string;
        flightMode: string;
    };
    fuel: {
        current: number;
        capacity: number;
        consumed: {
            amount: number;
            timestamp: string;
        };
    };
    events: any[];
}