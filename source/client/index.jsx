import React, { Component } from 'react';
import WebView from './component/WebView';
import './index.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'about:blank'
    };
  }

  loadURL(value) {
    this.setState({ url: value });
  }

  render() {
    return (
      <WebView />
    )
  }
};
