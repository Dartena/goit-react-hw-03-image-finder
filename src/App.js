import { Component } from "react";
import { AppDiv } from "./components/styles/styled";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import api from "./helpers/ApiService";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    searchResult: [],
    openModal: false,
    fullPhotoLink: "",
  };

  async componentDidMount() {
    try {
      const imagesData = await api.fetchImages();
      if (imagesData) {
        this.setState({
          searchResult: imagesData.hits,
        });
        api.incrementPage();
      }
    } catch (error) {}
  }

  loadMore = async () => {
    try {
      const imagesData = await api.fetchImages();
      if (imagesData) {
        this.setState((prevState) => ({
          searchResult: [...prevState.searchResult, ...imagesData.hits],
        }));
        api.incrementPage();
      }
    } catch (error) {}
  };

  search = async (searchQuery) => {
    api.query = searchQuery.trim();
    api.resetPage();
    if (api.query === "") {
      api.resetPage();
      api.resetQuery();
    }
    try {
      const imagesData = await api.fetchImages();
      if (imagesData) {
        this.setState({ searchResult: imagesData.hits });
        api.incrementPage();
      }
    } catch (error) {}
  };

  openPhoto = (event) => {
    if (!event.target.matches("img")) return;

    this.setState({
      openModal: true,
      fullPhotoLink: event.target.dataset.source,
    });
  };

  closeModal = () => {
    this.setState({
      openModal: false,
      fullPhotoLink: "",
    });
  };

  render() {
    const { searchResult, openModal, fullPhotoLink } = this.state;
    return (
      <AppDiv>
        <Searchbar onSubmit={this.search} />
        <ImageGallery searchResult={searchResult} openPhoto={this.openPhoto} />
        {searchResult.length % api.perPage === 0 && searchResult.length > 0 ? (
          <Button textContent="Load More" onClick={this.loadMore} />
        ) : (
          ""
        )}
        {openModal ? (
          <Modal imgLink={fullPhotoLink} onClick={this.closeModal} />
        ) : (
          ""
        )}
      </AppDiv>
    );
  }
}

export default App;
