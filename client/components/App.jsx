import React, { Component } from 'react';
import {Link, Route } from 'react-router';
import { connect }      from 'react-redux';

import {
  getMySongs,
  setTokens
}   from '../actions/actions';
/**
 * Main app component
 * Has a header and then render's the page content
 */
class SpotifyLogin extends Component {
  componentDidMount() {
      const {dispatch, params} = this.props;
      const {accessToken, refreshToken} = params;
      dispatch(setTokens({accessToken, refreshToken}));
  }
  render() {
    // injected via react router
    const { accessToken, refreshToken, user, songs, children } = this.props;

    if(!accessToken) {
      return(
        <div className="spotify-login">
          <h1> Spotify App </h1>
          {children}
        </div>
      )
    }
    return (
    <div>
      <ul className="nav-bar">
        <li>
          <Link to={'/user/' + accessToken + '/' + refreshToken}>
            Your Songs
          </Link>
        </li>
        <li>
          <Link to={'/search'}>
            Search
          </Link>
        </li>
        <li>
          <Link to={'/recommendations'}>
              Recommendations
          </Link>
        </li>
      </ul>
      <div className="page-content">
        {children}
      </div>
    </div>
    );
  }
}

export default connect(state => state)(SpotifyLogin);