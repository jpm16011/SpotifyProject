import {
  SPOTIFY_TOKENS, SPOTIFY_ME_BEGIN, SPOTIFY_ME_SUCCESS, SPOTIFY_ME_FAILURE, 
  SPOTIFY_MY_SONGS, SPOTIFY_MY_SONGS_SUCCESS, SPOTIFY_MY_SONGS_FAILURE, 
  SPOTIFY_MY_RECOMMENDATIONS_SUCCESS, SPOTIFY_MY_RECOMMENDATIONS_FAILURE,
  SPOTIFY_UPDATE_SEED, SPOTIFY_SEARCH_SUCCESS, SPOTIFY_SEARCH_FAILURE
} from '../actions/actions';

/** The initial state; no tokens and no user info */
const initialState = {
  accessToken: null,
  refreshToken: null,
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
  },
  songs : [], 
  recommendations: [], 
  seeds : [], 
  search : {
    artists: [], 
    tracks: [], 
    albums: [], 
    playlists: []
  }
};

/**
 * Our reducer
 */
export default function reduce(state = initialState, action) {
  switch (action.type) {
  // when we get the tokens... set the tokens!
  case SPOTIFY_TOKENS:
    const {accessToken, refreshToken} = action;
    return Object.assign({}, state, {accessToken, refreshToken});

  // set our loading property when the loading begins
  case SPOTIFY_ME_BEGIN:
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, {loading: true})
    });

  // when we get the data merge it in
  case SPOTIFY_ME_SUCCESS:
    //console.log(state.accessToken);
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, action.data, {loading: false})
    });

  // currently no failure state :(
  case SPOTIFY_ME_FAILURE:
    return state;
  case SPOTIFY_MY_SONGS_SUCCESS:
    var tracks = action.data.items.map((item) => item.track), 
    objects = reduceTracks(tracks);

    //console.log(tracks);
    //console.log(objects);

    return Object.assign({}, state, {
      songs: Object.assign([], state.songs, objects, {loading: false})
    });


  case SPOTIFY_MY_SONGS_FAILURE:
    return state; 

  case SPOTIFY_MY_RECOMMENDATIONS_SUCCESS:
    //console.log(action.data);
    const tracks = action.data.tracks;
    objects = reduceTracks(tracks);
    
    return Object.assign({}, state, {
      recommendations: Object.assign([], state.recommendations, objects, {loading: false})
    });

  case SPOTIFY_MY_RECOMMENDATIONS_FAILURE: 
    return state; 

  case SPOTIFY_UPDATE_SEED:
    if(state.seeds.length < 5) {
      state.seeds.push(action.seed);
    }

  case SPOTIFY_SEARCH_SUCCESS: 
    //console.log(action.data);
    //console.log(action.data.tracks);
    const searchTracks = reduceTracks(action.data.tracks.items);
    //console.log(searchTracks);
    return Object.assign({}, state, {
      search: Object.assign({}, state.search, {
        tracks: Object.assign([], state.search.tracks, searchTracks)
      })
    }, {loading: false})
     


  case SPOTIFY_SEARCH_FAILURE: 
  return state; 

  default:
    return state;
  }
}

export function reduceTracks(tracks) {
  //console.log(tracks);
  return tracks.map((track) => {
      return {
        albumCoverSrc : track.album.images.filter((img) => img.width === 300 || img.height === 300).map(c => c.url)[0],
        name : track.name,
        artists : track.artists.map((artist) => artist.name),
        albumName : track.album.name,
        trackId : track.id,
        albumId : track.album.id,
        artistId : track.artists.map((artist) => artist.id), 
        previewHref: track.preview_url, 
        uri: track.uri, 
        popularity: track.popularity
      }
  });
}
