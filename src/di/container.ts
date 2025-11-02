import { Container } from 'inversify';
import { HttpClientEngine, IHttpClientEngine } from '../app/HTTPClient';
import {
    SteamAPIClient,
    ISteamAPIClient,
} from '../app/services/steam/SteamAPIClient';
import {
    SteamURLResolver,
    ISteamURLResolver,
} from '@/app/services/steam/SteamURLResolver';

const container = new Container();

container
    .bind<IHttpClientEngine>('IHttpClientEngine')
    .to(HttpClientEngine)
    .inSingletonScope();
container
    .bind<ISteamAPIClient>('ISteamAPIClient')
    .to(SteamAPIClient)
    .inSingletonScope();
container
    .bind<ISteamURLResolver>('ISteamURLResolver')
    .to(SteamURLResolver)
    .inSingletonScope();

export default container;
