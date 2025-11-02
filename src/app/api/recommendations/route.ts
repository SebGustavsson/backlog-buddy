import { NextRequest, NextResponse } from 'next/server';
import container from '@/di/container';
import { ISteamAPIClient } from '@/app/services/steam/SteamAPIClient';
import { ISteamURLResolver } from '@/app/services/steam/SteamURLResolver';

interface IRecommendationRequest {
    steamId: string;
}

export async function GET(request: Request) {
    return new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    let data: IRecommendationRequest;

    try {
        data = (await request.json()) as IRecommendationRequest;
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!data.steamId) {
        return NextResponse.json(
            { error: "Missing 'steamId' in request body." },
            { status: 400 }
        );
    }

    try {
        const steamAPIClient =
            container.get<ISteamAPIClient>('ISteamAPIClient');
        const steamURLResolver =
            container.get<ISteamURLResolver>('ISteamURLResolver');

        const steamId = await steamURLResolver.resolve(data.steamId);

        const ownedGames = await steamAPIClient.getOwnedGames(steamId);
        return NextResponse.json(
            {
                status: 'success',
                steamId: data.steamId,
                recommendations: ownedGames,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing recommendation request:', error);

        return NextResponse.json(
            {
                status: 'error',
                message: `Kunde inte hämta rekommendationer: ${error}`,
            },
            { status: 500 }
        );
    }
}
