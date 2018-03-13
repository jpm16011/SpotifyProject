import Spotify from 'spotify-web-api-js';
//import Spotify2 from 'spotify-web-api-node';
//const spotifyApi2 = new Spotify2();
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_MY_SONGS = 'SPOTIFY_MY_SONGS';
export const SPOTIFY_MY_SONGS_SUCCESS = 'SPOTIFY_MY_SONGS_SUCCESS';
export const SPOTIFY_MY_SONGS_FAILURE = 'SPOTIFY_MY_SONGS_FAILURE';
export const SPOTIFY_MY_RECOMMENDATIONS_SUCCESS = 'SPOTIFY_MY_RECOMMENDATIONS_SUCCESS';
export const SPOTIFY_MY_RECOMMENDATIONS_FAILURE = 'SPOTIFY_MY_RECOMMENDATIONS_FAILURE';
export const SPOTIFY_UPDATE_SEED = 'SPOTIFY_UPDATE_SEED';
export const SPOTIFY_SEARCH_SUCCESS = 'SPOTIFY_SEARCH_SUCCESS';
export const SPOTIFY_SEARCH_FAILURE= 'SPOTIFY_SEARCH_FAILURE';
/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  //console.log(spotifyApi.setAccessToken(accessToken));
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
  //console.log(spotifyApi);
  return dispatch => {
    spotifyApi.getMySavedTracks( { limit: 50 } ).then(data => {
      dispatch({ type: SPOTIFY_MY_SONGS_SUCCESS, data: data });
    }).catch(e => {
      console.log("Error getting tracks: " +e);
      dispatch({ type: SPOTIFY_MY_SONGS_FAILURE, error: e });
    });
  };
}

export function getMyRecommendations(options) {
  return dispatch => {
    spotifyApi.getRecommendations(options).then(data => {
      dispatch({ type: SPOTIFY_MY_RECOMMENDATIONS_SUCCESS, data: data })
    }).catch(e => {
      console.log("Error getting recommendations: " +e);
      dispatch({ type: SPOTIFY_MY_RECOMMENDATIONS_FAILURE, error: e})
    });
  };
}

export function updateSeeds(id) {
  return {
    type: SPOTIFY_UPDATE_SEED,
    seed: id
  }
}

export function performSearch(value) {
  const type = ["album","artist", "playlist", "track"];
  return dispatch => {
    spotifyApi.search(value, type, 50).then( data => {
      dispatch({ type: SPOTIFY_SEARCH_SUCCESS, data: data })
    }).catch( e => {
      console.log("Error searching: ", e);
      dispatch({ type: SPOTIFY_SEARCH_FAILURE, error: e})
    });
  }
}
