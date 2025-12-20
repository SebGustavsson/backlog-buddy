'use server';

import { IPlayerService, steamApiService } from '@/lib/steam/definitions';

interface keyValue {
    key: string
    value: string
}

const callApi = async (service: steamApiService, endpoint: string, params: keyValue[]): Promise<string> => {
    if (service.endpoints.indexOf(endpoint) < 0) {
        // TODO invalid endpoint
        return "";
    }

    if (process.env.STEAM_API_KEY == undefined) {
        // TODO no key
        return "";
    }

    const urlParams: string[] = [];
    for (const param of params) {
        if (service.params.indexOf(param.key) < 0) {
            // TODO invalid param
            return "";
        }

        urlParams.push(`${param.key}=${param.value}`);

    }

    let url: string = service.urlFormat;
    url = url.replaceAll('{name}', service.name);
    url = url.replaceAll('{format}', service.format);
    url = url.replaceAll('{version}', service.version);
    url = url.replaceAll('{endpoint}', endpoint);
    url = url.replaceAll('{key}', process.env.STEAM_API_KEY);

    if (urlParams.length > 0) {
        url += '&' + urlParams.join('&');
    }

    return url;
}

export default async function getSteamProfileFromUrl(url: string): Promise<string> { // TODO return user + error/success
    // TODO validate profile url? simple fetch?
    
    const re: RegExp = new RegExp("/profiles/([0-9]+)/");
    const matches: RegExpExecArray | null = re.exec(url);

    if (!matches || matches.length < 2) {
        // TODO error
        return "invalid url";
    }

    const steamId: string = matches[1];
    const params: keyValue[] = [{
        key: "steamid",
        value: steamId
    }];
    const callUrl: string = await callApi(IPlayerService, 'GetOwnedGames', params);
    console.log("URL", callUrl);

    // https://developer.valvesoftware.com/wiki/Steam_Web_API#JSON
    // process.env.STEAM_API_KEY

    return `getSteamProfileForID:${steamId}`;
}

