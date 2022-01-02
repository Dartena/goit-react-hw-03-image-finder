import PropTypes from "prop-types";
import { Component } from "react";
import { GalleryImg, GalleryList, ImageGalleryItem } from "../styles/styled";

export default class ImageGallery extends Component {
  static propTypes = {
    searchResult: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    openPhoto: PropTypes.func.isRequired,
  };
  render() {
    const { searchResult, openPhoto } = this.props;
    return (
      <GalleryList onClick={openPhoto}>
        {searchResult.map((result) => (
          <ImageGalleryItem key={result.id}>
            <GalleryImg
              src={result.webformatURL}
              data-source={result.largeImageURL}
            />
          </ImageGalleryItem>
        ))}
      </GalleryList>
    );
  }
}
