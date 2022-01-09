import { Component } from "react";
import { AppDiv, Overlay } from "./components/styles/styled";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import api from "./helpers/ApiService";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader/Loader";

class App extends Component {
  state = {
    searchQuery: "",
    searchResult: [],
    savedSearchQuery: "",
    savedPage: 1,
    openModal: false,
    fullPhotoLink: "",
    hideLoadMoreBtn: false,
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      searchQuery: api.query,
      savedSearchQuery: api.query,
      savedPage: api.page,
    });
  }

  async componentDidUpdate(_, prevState) {
    const { searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { searchQuery } = this.state;
    if (api.query === "cats" && searchQuery.trim() === "") {
      return toast.warn("Please enter a keyword to search!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    api.query = searchQuery.trim();
    api.resetPage();

    if (api.query === "") {
      api.resetPage();
      api.resetQuery();
    }
    try {
      this.setState({ loading: true });
      const imagesData = await api.fetchImages();
      if (imagesData.hits.length > 0) {
        api.incrementPage();
        this.setState({
          searchResult: imagesData.hits,
          savedSearchQuery: api.query,
          savedPage: api.page,
          hideLoadMoreBtn: false,
        });
      }
      if (imagesData.hits.length === 0) {
        toast.error("Nothing to found! Please enter correct search query.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        api.query = this.state.savedSearchQuery;
        api.page = this.state.savedPage;
      }
      if (imagesData.hits.length < api.perPage) {
        this.setState({ hideLoadMoreBtn: true });
      }
    } catch (error) {
    } finally {
      this.onLoadHandle();
    }
  }

  loadMore = async () => {
    try {
      this.setState({
        loading: true,
      });
      const imagesData = await api.fetchImages();
      if (imagesData.hits.length > 0) {
        api.incrementPage();
        this.setState((prevState) => ({
          searchResult: [...prevState.searchResult, ...imagesData.hits],
          savedPage: api.page,
        }));
      }
      if (imagesData.hits.length < api.perPage) {
        this.setState({ hideLoadMoreBtn: true });
      }
    } catch (error) {
    } finally {
      this.setState({
        loading: false,
      });
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  setSearchQuery = (str) => {
    this.setState({ searchQuery: str });
  };

  openPhoto = (event) => {
    if (!event.target.matches("img")) return;

    this.setState({
      openModal: true,
      fullPhotoLink: event.target.dataset.source,
      loading: true,
    });
  };

  closeModal = () => {
    this.setState({
      openModal: false,
      fullPhotoLink: "",
    });
  };
  onLoadHandle = () => {
    this.setState({ loading: false });
  };
  render() {
    const { searchResult, hideLoadMoreBtn, fullPhotoLink, openModal, loading } =
      this.state;
    return (
      <AppDiv>
        <Searchbar onSubmit={this.setSearchQuery} />
        <Overlay style={{ display: loading ? "flex" : "none" }}>
          <Loader loading={loading} size={500} />
        </Overlay>
        <ImageGallery
          searchResult={searchResult}
          openPhoto={this.openPhoto}
          loading={loading}
        />
        {hideLoadMoreBtn || (
          <Button textContent="Load More" onClick={this.loadMore} />
        )}

        <ToastContainer theme="colored" />
        {!openModal || (
          <Modal
            closeModalHandle={this.closeModal}
            loading={loading}
            imgLink={fullPhotoLink}
            loaderSize={400}
            onLoad={this.onLoadHandle}
          />
        )}
      </AppDiv>
    );
  }
}

export default App;
