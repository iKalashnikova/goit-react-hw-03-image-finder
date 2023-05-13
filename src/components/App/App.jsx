
import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import './App.css'

class App extends Component {
  state = {
    searchText: "",
  };

  handleSearchFormSubmit = (searchText) => {
    this.setState({ searchText: searchText });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery searchText={this.state.searchText} />
      </div>
    );
  }
}

export default App;
