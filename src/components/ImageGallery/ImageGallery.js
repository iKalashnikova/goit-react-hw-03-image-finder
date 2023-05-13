import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';
import { Button } from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    image: null,
    error: null,
    status: 'idle',
    page: 1,
    query: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?key=36341058-58041bef9cd62d3470c4ef98b&q=${this.props.searchText}&image_type=photo&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error('Error loading image. Enter correct search')
          );
        })
        .then(data => {
          this.setState({ images: data.hits, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleLoadMoreClick = () => {
  this.setState(prevState => ({
    page: prevState.page + 1,
    status: 'pending',
  }));

  fetch(
    `https://pixabay.com/api/?key=36341058-58041bef9cd62d3470c4ef98b&q=${
      this.props.searchText
    }&image_type=photo&per_page=12&page=${this.state.page + 1}`
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error('Error loading images. Enter correct search')
      );
    })
    .then(data => {
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        status: 'resolved',
      }));
    })
    .catch(error => this.setState({ error, status: 'rejected' }));
};


  render() {
    const { error, status } = this.state;

    if (status === 'idle') {
      return <div> Введите свой поиск в форму</div>;
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    console.log('status:', status);

    if (status === 'rejected') {
      console.log('Error message:', error.message);
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {this.state.images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ul>
          {this.state.images.length > 0 && (
            <Button onClick={this.handleLoadMoreClick} />
          )}
        </>
      );
    }
  }
}
