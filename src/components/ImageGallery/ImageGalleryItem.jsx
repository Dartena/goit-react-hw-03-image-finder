import PropTypes from "prop-types";
import { Component } from "react";
import Loader from "../Loader/Loader";
import { GalleryImg, GalleryItem } from "../styles/styled";

export default class ImageGalleryItem extends Component {
  state = { loading: true };
  static propTypes = {
    searchResult: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  };
  render() {
    const { webformatURL, largeImageURL } = this.props.searchResult;
    const { loading } = this.state;
    return (
      <GalleryItem>
        <GalleryImg
          src={webformatURL}
          data-source={largeImageURL}
          onLoad={() => {
            this.setState({ loading: false });
          }}
          style={{ opacity: loading ? 0 : 1 }}
        />
        <Loader loading={loading} size={120} />
      </GalleryItem>
    );
  }
}
