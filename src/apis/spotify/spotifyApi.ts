// Spotify API
// https://developer.spotify.com/documentation/web-api/reference/#/

import PlaylistTrack from "../../models/PlaylistTrack";
import { SpotifyTrack } from "./models";

let accessToken: string;
const clientId = "c77b33afda7148b9bdbbdfd8d07692bb";
const SPOTIFY_API = "https://api.spotify.com";

const authorize = () => {
    const redirectUri = (window as Window).location.href;
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    (window as Window).location = accessUrl;
};

const getAccessToken = (): string | undefined => {
    if (accessToken) {
        return accessToken;
    }

    // Get Token from Window
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
        // Save Token
        accessToken = accessTokenMatch[1];

        // Set Expiration
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

        // Clear State
        window.history.pushState("Access Token", "", "/");
        return accessToken;
    } else {
        authorize();
    }
};

const getHeaders = () => {
    const accessToken = getAccessToken();
    return { Authorization: `Bearer ${accessToken}` };
};

const search = async (term: string): Promise<PlaylistTrack[]> => {
    return fetch(`${SPOTIFY_API}/v1/search?type=track&q=${term}`, {
        headers: getHeaders(),
    })
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map((track: SpotifyTrack) => ({
                id: track.id,
                name: track.name,
                album: track.album.name,
                artist: track.artists[0].name,
                uri: track.uri,
            }));
        });
};

const getUserId = async (): Promise<string> => {
    return fetch(`${SPOTIFY_API}/v1/me`, { headers: getHeaders() })
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => jsonResponse.id);
};

const createPlaylist = async (
    name: string,
    userId: string
): Promise<string> => {
    return fetch(`${SPOTIFY_API}/v1/users/${userId}/playlists`, {
        headers: getHeaders(),
        method: "POST",
        body: JSON.stringify({ name: name }),
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            return jsonResponse.id;
        });
};

const addTracksToPlaylist = async (
    userId: string,
    playlistId: string,
    trackUris: string[]
): Promise<string> => {
    return fetch(
        `${SPOTIFY_API}/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
            headers: getHeaders(),
            method: "POST",
            body: JSON.stringify({ uris: trackUris }),
        }
    )
        .then((response) => response.json())
        .then((jsonResponse) => {
            return jsonResponse.id;
        });
};

const savePlaylist = async (
    name: string,
    trackUris: string[]
): Promise<string | undefined> => {
    if (!name || !trackUris.length) {
        return;
    }
    const userId = await getUserId();
    const playlistId = await createPlaylist(name, userId);
    const snapshotId = await addTracksToPlaylist(userId, playlistId, trackUris);
    return snapshotId;
};

export const spotifyApi = {
    search,
    savePlaylist,
};

export default spotifyApi;
