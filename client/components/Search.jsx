import React, { Component } from 'react'; 
import { connect }      from 'react-redux';
import {
	setTokens,
	performSearch, 
	updateSeeds
}   from '../actions/actions';
import Song from './Song.jsx';
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();
import { reduceTracks } from '../reducers/index';
class Search extends Component {
	constructor(props) {
		super(props);
		this.submitSearch = this.submitSearch.bind(this);
		this.addToSeed = this.addToSeed.bind(this);
		this.state = {
			tracks: [], 
			artists: [], 
			albums: [], 
			playlists: []
		}
	}
	componentDidMount() {
		const {dispatch, params } = this.props
		const {accessToken, refreshToken} = params;
	  //dispatch(setTokens({accessToken, refreshToken}));
	}
	async submitSearch(event) {
		const { dispatch } = this.props;
		const val = event.target.value; 
		const type = ["album","artist", "playlist", "track"];
		if(this.timeout) clearTimeout(this.timeout);
    	
    	this.timeout = setTimeout(async () => {
    		const { tracks, artists, playlists, albums } = await spotifyApi.search(val, type, {limit: 50})
    		console.log(reduceTracks(tracks.items));
    		await this.setState(() => ({
    				tracks: reduceTracks(tracks.items),
    				artists: artists.items,
    				albums: albums.items, 
    				playlists: playlists.items 
    		})); 
	    }, 1000);
		
	}

	addToSeed(id) {
		const { dispatch } = this.props;
    dispatch( updateSeeds( id ) )
  }

	componentWillUnmount() {
		window.clearInterval(this.timeout);
	}
	render() {
		const { tracks, artists, playlists, albums } = this.state;
		if(tracks.length !== 0) {
			return (
				<div className="search-page">
					<input type="text" onChange={event => {this.submitSearch(event)}}/>
					<ul className="song-list"> {
    				tracks.map((item) => {
    					//console.log(item);
    					return(
    						<li>
    							<Song albumCoverSrc={item.albumCoverSrc}
    								  songName={item.name}
    								  artists={item.artists}
    								  albumName={item.albumName}
    								  trackId={item.trackId}
    								  albumId={item.albumId}
    								  artistId={item.artistId}
    								  onClick={this.addToSeed}
    								  uri={item.uri}
    								  previewHref={item.previewHref}
    							/>
    						</li>
    					)
    				})
		    	}
	    		</ul>
				</div>
			);

		} else {
			return (
				<div className="search-page">
					<input type="text" onChange={event => {this.submitSearch(event)}}/>
				</div>
			)
		}
				
				
		
	}
}

export default connect(state => state)(Search);