import React, { Component } from 'react';
import { connect }      from 'react-redux';
import {
  getMySongs,
  setTokens,
}   from '../actions/actions';

class Songs extends Component {
	componentDidMount() {
    // params injected via react-router, dispatch injected via connect
	    const {dispatch, params} = this.props;
	    const {accessToken, refreshToken} = params;
	    dispatch(setTokens({accessToken, refreshToken}));
	    dispatch(getMySongs());
  	}
    render() {
    	const { accessToken, refreshToken, user, songs } = this.props;
      console.log("Songs: ", songs);
        return <h2>Songs and shit</h2>;  
    }
}

export default connect(state => state)(Songs);
