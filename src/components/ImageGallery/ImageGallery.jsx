import PropTypes from "prop-types";
import { GalleryList } from "../styles/styled";
import ImageGalleryItem from "./ImageGalleryItem";

export default function ImageGallery({ searchResult, openPhoto }) {
  return (
    <GalleryList onClick={openPhoto}>
      {searchResult.map((result) => (
        <ImageGalleryItem key={result.id} searchResult={result} />
      ))}
    </GalleryList>
  );
}

ImageGallery.propTypes = {
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  openPhoto: PropTypes.func.isRequired,
};
