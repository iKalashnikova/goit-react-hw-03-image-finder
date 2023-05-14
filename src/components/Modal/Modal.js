import React, { Component } from 'react';
import './Modal.css'

export default class Modal extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

    render() {
        const { largeImageURL, onClose } = this.props;
        
    return (
      <div class="overlay" onClick={onClose}>
        <div class="modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
