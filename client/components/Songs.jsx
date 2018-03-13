import React, { Component } from 'react';
import { connect }      from 'react-redux';
import {
  getMySongs,
  setTokens, 
  updateSeeds
}   from '../actions/actions';
import Song from './Song.jsx';
import Loading from './Loading.jsx';
import Player from './player/Player.jsx';

class Songs extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			songs: {}
		}
		this.addToSeed = this.addToSeed.bind(this);
	}

	addToSeed(id) {
		const { dispatch } = this.props;
    dispatch( updateSeeds( id ) )
  }
	componentDidMount() {
    // params injected via react-router, dispatch injected via connect
	    const {dispatch, params} = this.props;
	    const {accessToken, refreshToken} = params;
	    dispatch(setTokens({accessToken, refreshToken}));
	    dispatch(getMySongs());
  	}

    render() {
    	const { params, user, songs} = this.props;
      const { accessToken, refreshToken } = params;

    	if(songs.loading === false) {
    		return (
                <div className="song-selection">
            			<ul className="song-list"> {
            				songs.map((item, i) => {
            					return(
            						<li id={i}>
            							<Song albumCoverSrc={item.albumCoverSrc}
            								  songName={item.name}
            								  artists={item.artists}
            								  albumName={item.albumName}
            								  trackId={item.trackId}
            								  albumId={item.albumId}
            								  artistId={item.artistId}
            								  onClick={this.addToSeed}
                              previewHref={item.previewHref}
                              accessToken={accessToken}
                              refreshToken={refreshToken}
                              dispatch={this.props.dispatch}
                              uri={item.uri}
                              id={i}
            							/>
            						</li>
            					)
            				})
        		    	}
        	    		</ul>
                </div>
				);  
    	} else {
    		return <Loading />;
    	}
   
    }
}

export default connect(state => state)(Songs);
