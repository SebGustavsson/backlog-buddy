import { injectable, inject } from 'inversify';
import type { IHttpClientEngine } from '@/app/HTTPClient';
import { Config } from './config';
import { Secrets } from '../../../../secrets';
import { TYPES } from '@/di/types';

interface IResolveVanityURLResponse {
    response: {
        steamid?: string;
        success: 1 | 42;
        message?: string;
    };
}

export interface ISteamURLResolver {
    resolve(urlOrId: string): Promise<string>;
}

@injectable()
export class SteamURLResolver implements ISteamURLResolver {
    private baseUrl: string;
    private apiKey: string;

    constructor(
        @inject('IHttpClientEngine') private client: IHttpClientEngine
    ) {
        this.baseUrl = Config.STEAM_BASE_URL;
        this.apiKey = Secrets.STEAM_API_KEY;
    }

    public async resolve(urlOrId: string): Promise<string> {
        const cleanedInput = urlOrId.trim();

        // ----------------------------------------------------
        // STEG 1: Försök matcha numeriskt ID (7656...)
        // ----------------------------------------------------

        // A. Matcha ren 17-siffrig sträng
        if (/^\d{17}$/.test(cleanedInput)) {
            return cleanedInput;
        }

        // B. Matcha /profiles/NUMMER/ URL (t.ex. https://steamcommunity.com/profiles/76561198197858817/)
        const profileMatch = cleanedInput.match(/\/profiles\/(\d{17})\/?/i); // /i gör den case-insensitive
        if (profileMatch) {
            // profileMatch[1] är den fångade gruppen (det 17-siffriga ID:t)
            return profileMatch[1];
        }

        // ----------------------------------------------------
        // STEG 2: Försök matcha Vanity URL (/id/NAMN)
        // ----------------------------------------------------

        const vanityMatch = cleanedInput.match(/\/id\/([^/]+)/i);
        if (!vanityMatch) {
            throw new Error('Something wrong with Steam profile URL');
        }
        const vanityUrl = vanityMatch[1]; // Profilnamnet, t.ex. 'GabeN'

        const path = 'ISteamUser/ResolveVanityURL/v1/';
        const apiResponse = await this.client.get<IResolveVanityURLResponse>(
            this.baseUrl,
            path,
            { vanityurl: vanityUrl },
            this.apiKey
        );

        return this.extractSteamIdFromVanityResponse(vanityUrl, apiResponse);
    }

    private extractSteamIdFromVanityResponse(
        vanityUrl: string,
        apiResponse: IResolveVanityURLResponse
    ): string {
        const { success, steamid, message } = apiResponse.response;

        if (success === 1 && steamid) {
            return steamid;
        }

        // Hantera misslyckad matchning (success: 42) eller andra fel
        if (success === 42) {
            throw new Error(
                `Kunde inte hitta en matchande Steam ID för profilnamnet '${vanityUrl}'. Kontrollera att profilen existerar och är publik.`
            );
        }

        throw new Error(
            message ||
                `Steam API returnerade ett okänt fel vid Vanity URL-upplösning.`
        );
    }
}
