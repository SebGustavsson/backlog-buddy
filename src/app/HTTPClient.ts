export interface IHttpClientEngine {
    get<T>(baseUrl: string, path: string, params?: object, apiKey?: string): Promise<T>;
    post<T>(baseUrl: string, path: string, body: object, apiKey?: string): Promise<T>;
    // Lägg till API-nyckel ?
}

import { injectable } from "inversify";

@injectable()
export class HttpClientEngine implements IHttpClientEngine {

    private async baseFetch<T>(url: string, config: RequestInit): Promise<T> {
        config.cache = 'no-store';

        const response = await fetch(url, config);

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${errorBody.substring(0, 100)}`);
        }

        return response.json();
    }

    async get<T>(baseUrl: string, path: string, params: object, apiKey: string): Promise<T> {
        const url = new URL(`${baseUrl}${path}`);

        if (apiKey) {
            url.searchParams.append('key', apiKey);
        }

        if (params) {
            new URLSearchParams(params as Record<string, string>).forEach((value, key) => {
                url.searchParams.append(key, value);
            });
        }

        return this.baseFetch<T>(url.toString(), { method: 'GET' });
    }

    async post<T>(baseUrl: string, path: string, body: object, apiKey?: string): Promise<T> {
        const url = new URL(`${baseUrl}${path}`);

        if (apiKey) {
            url.searchParams.append('key', apiKey);
        }

        return this.baseFetch<T>(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    }
}