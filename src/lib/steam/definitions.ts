interface steamApiService {
    name: string
    endpoints: string[]
    params: string[]
    format: string
    version: string
    urlFormat: string
}

const IPlayerService: steamApiService = {
    name: "IPlayerService",
    endpoints: ["GetOwnedGames"],
    format: "json",
    version: "v0001",
    params: ["steamid"],
    urlFormat: "http://api.steampowered.com/{name}/{endpoint}/{version}/?key={key}&format={format}"
};

export type { steamApiService };
export { IPlayerService };