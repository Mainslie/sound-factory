import SpotifyAlbum from "./SpotifyAlbum";
import SpotifyArtist from "./SpotifyArtist";

export interface SpotifyTrack {
    id: string;
    name: string;
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    uri: string;
}

export default SpotifyTrack;
