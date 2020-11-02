import React, { Component } from 'react';

export default class WebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'about:blank'
    };
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      this.setState({ url: e.target.value });
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='control'>
          <input type='text' onKeyPress={e => this.handleKeyPress(e)} />
        </div>
        <iframe className='webview' src={this.state.url} />
      </div>
    )
  }
};
