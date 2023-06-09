import React, { Component } from "react";
import './ImageGallert.css'

export default class ImageGalleryItem extends Component {
  render() {
    const { image, onClick } = this.props;
    return (
      <li key={image.id} className="gallery-item">
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="galleryImage"
          onClick={() => onClick(image.largeImageURL)}
        />
      </li>
    );
  }
}