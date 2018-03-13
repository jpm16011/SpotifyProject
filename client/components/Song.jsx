import React, { Component } from 'react';
import {
  getMySongs,
  setTokens, 
  updateSeeds
}   from '../actions/actions';

export default class Song extends Component {
	constructor(props) {
		super(props);
		this.onTrackChange = this.onTrackChange.bind(this);
	}

	onTrackChange() {
		const audios = document.getElementsByTagName('audio');
		for(let i = 0; i < audios.length; i++) {
			audios[i].load();
		}
	}

	componentDidMount() {
		const {accessToken, refreshToken, dispatch} = this.props;
	    dispatch(setTokens(accessToken, refreshToken));
	}
	componentDidUpdate() {
		this.onTrackChange();
	}
	render() {
		const { albumCoverSrc, songName, artists, albumName, trackId, albumId, artistId, onClick, previewHref, id} = this.props;
		return ( 
			<div className="song">
				<button className="album-button" onClick={onClick ? onClick.bind(null, trackId) : null}>
					<img className="album-button" src={albumCoverSrc}/> 
				</button>
				<div className="track-info">
					<p>{songName}</p>
					<ul>{
						artists.map((artist) => {
							return(
								<li>{artist}</li>
							);
						})
					}
					<li>{albumName}</li>
					</ul>
				</div>
				<audio id={id} controls ref="audio">
					<source src={previewHref} type="audio/mpeg"/>
				</audio>
			</div>
		);
	}
}