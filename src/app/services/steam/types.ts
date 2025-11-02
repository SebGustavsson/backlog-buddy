export interface IOwnedGame {
    appid: number;
    name: string;
    playtime_forever: number;
    playtime_2weeks?: number;
    img_icon_url: string;
    img_logo_url: string;
    has_community_visible_stats?: boolean;
}

export interface IOwnedGamesResponse {
    response: {
        game_count: number;
        games: IOwnedGame[];
        bad_response?: string;
    };
}