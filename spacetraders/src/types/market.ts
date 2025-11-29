export type Market = {
    symbol: string;
    exports: any[];
    imports: any[];
    exchange: {
        symbol: string;
        name: string;
        description: string;
    }[];
    transactions: {
        waypointSymbol: string;
        shipSymbol: string;
        tradeSymbol: string;
        type: "PURCHASE" | "SELL";
        units: number;
        pricePerUnit: number;
        totalPrice: number;
        timestamp: string;
    }[];
    tradeGoods: {
        symbol: string;
        type: string;
        tradeVolume: number;
        supply: "LOW" | "MODERATE" | "HIGH";
        purchasePrice: number;
        sellPrice: number;
    }[];
}