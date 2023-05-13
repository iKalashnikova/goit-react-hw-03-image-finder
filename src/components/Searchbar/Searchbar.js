import { Component } from "react";
import './Searchbar.css'
export default class Searchbar extends Component {
    state = {
        searchText: '',
        
    }

    handleNameChange = event => {
        this.setState({ searchText: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchText.trim() === '') {
            alert('Заповніть поле пошуку');
            return
        }
        this.props.onSubmit(this.state.searchText);
        this.setState({searchText: ''})
    }

    render() {
        return (<header className="Searchbar">
            <form onSubmit={this.handleSubmit} className="SearchForm">
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>

                <input
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.searchText}
                    onChange={this.handleNameChange}
                />
            </form>
        </header>)
    }
}