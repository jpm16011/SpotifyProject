import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_MY_SONGS = 'SPOTIFY_MY_SONGS';
export const SPOTIFY_MY_SONGS_SUCCESS = 'SPOTIFY_MY_SONGS_SUCCESS';
export const SPOTIFY_MY_SONGS_FAILURE = 'SPOTIFY_MY_SONGS_FAILURE';

/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

/* get the user's info from the /me api */
export function getMyInfo() {
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.getMe().then(data => {
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}
export function getMySongs() {
  return dispatch => {
    spotifyApi.getMySavedTracks().then(data => {
      console.log("Saved Tracks: ", data);
      dispatch({ type: SPOTIFY_MY_SONGS_SUCCESS, data: data });
    }).catch(e => {
      console.log("Error getting tracks: " +e);
      dispatch({ type: SPOTIFY_MY_SONGS_FAILURE, error: e });
    });
  };
}
