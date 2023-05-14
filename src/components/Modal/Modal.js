import React, { Component } from 'react';
import './Modal.css'

export default class Modal extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

    render() {
        const { largeImageURL, onClose } = this.props;
        
    return (
      <div className="overlay" onClick={onClose}>
        <div className="modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
