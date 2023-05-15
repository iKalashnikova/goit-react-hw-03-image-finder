import React, { Component } from 'react';
import { Audio } from  'react-loader-spinner'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';
import { Button } from 'components/Button/Button';
import Modal from '../Modal/Modal'

export default class ImageGallery extends Component {
  state = {
    image: null,
    error: null,
    status: 'idle',
    page: 1,
      showModal: false,
   largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText ) {
      this.setState({ status: 'pending', page: 1 });

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
          this.setState({ images: data.hits, total: data.totalHits, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

handleLoadMoreClick = () => {
    this.setState(prevState => ({
    page: prevState.page + 1,
    // status: 'pending',
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
        images: prevState.images.concat(data.hits),
        status: 'resolved',

          // images: [...prevState.images, ...data.hits],
        }));
    })
    .catch(error => this.setState({ error, status: 'rejected' }));
};

    toggleModal = () => {
        this.setState(({showModal}) => ({showModal: !showModal,}))
    }
    
    handleImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };
    
  render() {
    const { error, status, showModal, total, images, page } = this.state;

    if (status === 'idle') {
      return <div> Введите свой поиск в форму</div>;
    }

    if (status === 'pending') {
      return <div><Audio
        height="80"
        width="80"
        radius="9"
        color='green'
        ariaLabel='three-dots-loading'
        wrapperStyle={{ margin: 'auto' }}
        wrapperClassName="my-audio-class"
      /></div>;
    }

    console.log('status:', status);

    if (status === 'rejected') {
      console.log('Error message:', error.message);
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
          <>
             {showModal && <Modal onClose={this.toggleModal} largeImageURL={this.state.largeImageURL} />}
          <ul className="gallery">
            {this.state.images.map(image => (
              <ImageGalleryItem key={image.id} image={image} onClick={this.handleImageClick} />
            ))}
          </ul>
          {images.length > 0 && Math.ceil(total/12) !== page &&(
            <Button onClick={this.handleLoadMoreClick} />
              )}
        </>
      );
    }
  }
}
