import { store } from "./store";

export async function apiGet (
    query: string,
): Promise<any> {
    const url = new URL(store.env.API_BASE_URL + query);

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${store.env.AGENT_TOKEN}`,
        },
    });
    return response;
}

export async function apiPost (
    query: string,
    data?: any,
): Promise<any> {
    const url = new URL(store.env.API_BASE_URL + query);

    if (data) {
        return await fetch(url.toString(), {
            method: 'Post',
            headers: {
                "Authorization": `Bearer ${store.env.AGENT_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }
    else {
        return await fetch(url.toString(), {
            method: 'Post',
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${store.env.AGENT_TOKEN}`
            }
        });
    }
}