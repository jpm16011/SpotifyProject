import React, { Component } from 'react';
import { connect }      from 'react-redux';
import {
  getMySongs,
  setTokens, 
  getMyRecommendations
}   from '../actions/actions';
import Song from './Song.jsx';
import Loading from './Loading.jsx';

class Recommendations extends Component {
	componentDidMount() {
			const {dispatch, seeds, accessToken, refreshToken} = this.props;
	   
	    if(seeds.length !== 0) {
	    	const seedTracks = seeds.join(',');
	    	//console.log(seeds);
	    	//console.log(seedTracks);
	    	dispatch(getMyRecommendations({ seed_tracks: seedTracks}))
	    }
	    
	}

	render() {
		const { recommendations } = this.props;

		if(recommendations.loading === false) {
    		return (
    			<ul className="song-list"> {
    				recommendations.map((item) => {
    					return(
    						<li>
    							<Song albumCoverSrc={item.albumCoverSrc}
    								  songName={item.name}
    								  artists={item.artists}
    								  albumName={item.albumName}
    								  trackId={item.trackId}
    								  albumId={item.albumId}
    								  artistId={item.artistId}
                      uri={item.uri}
                      previewHref={item.previewHref}
    							/>
    						</li>
    					)
    				})
		    	}
	    		</ul>
				);  
    	} else {
    		return <p>No recommendations to display! Add more songs to the mix</p>
    	}
	}
}



export default connect(state => state)(Recommendations);