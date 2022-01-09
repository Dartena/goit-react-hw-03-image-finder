import PropTypes from "prop-types";
import { Component } from "react";
import {
  SearchBar,
  SearchBtn,
  SearchBtnLabel,
  SearchForm,
  SearchIcon,
  SearchInput,
} from "../styles/styled";

export default class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    searchQuery: "",
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    event.currentTarget.searchQuery.value = "";
  };

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.onSubmitHandler}>
          <SearchBtn type="submit">
            <SearchIcon />
            <SearchBtnLabel>Search</SearchBtnLabel>
          </SearchBtn>

          <SearchInput
            name="searchQuery"
            type="search"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeHandler}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}
