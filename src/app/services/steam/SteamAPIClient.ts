import { inject, injectable } from 'inversify';
import type { IOwnedGamesResponse } from './types';
import type { IHttpClientEngine } from '../../HTTPClient';
import { Config } from './config';
import { Secrets } from '../../../../secrets';
import { TYPES } from '@/di/types';

export interface ISteamAPIClient {
    getOwnedGames(steamId: string): Promise<IOwnedGamesResponse>;
}

@injectable()
export class SteamAPIClient implements ISteamAPIClient {
    private baseUrl: string;
    private apiKey: string;

    constructor(
        @inject('IHttpClientEngine') private client: IHttpClientEngine
    ) {
        this.baseUrl = Config.STEAM_BASE_URL;
        this.apiKey = Secrets.STEAM_API_KEY;
    }

    public async getOwnedGames(steamId: string): Promise<IOwnedGamesResponse> {
        const path = 'IPlayerService/GetOwnedGames/v0001/';

        const params = {
            steamid: steamId,
            format: 'json',
            include_appinfo: 'true',
            include_played_free_games: 'true',
        };

        return await this.client.get<IOwnedGamesResponse>(
            this.baseUrl,
            path,
            params,
            this.apiKey
        );
    }
}
