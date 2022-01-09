import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { Component } from "react";
import { ModalDiv, Overlay } from "../styles/styled";
import Loader from "../Loader/Loader";

const modalRoot = document.getElementById("modal-root");
export default class Modal extends Component {
  static propTypes = {
    imgLink: PropTypes.string.isRequired,
    closeModalHandle: PropTypes.func.isRequired,

    loading: PropTypes.bool.isRequired,
    loaderSize: PropTypes.number.isRequired,
    onLoad: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.escKeyHandle);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.escKeyHandle);
  }
  escKeyHandle = (event) => {
    if (event.keyCode === 27) {
      this.props.closeModalHandle();
    }
  };
  // onLoad() {
  //   this.props.onLoad()
  // }
  render() {
    const { imgLink, closeModalHandle, loading, loaderSize, onLoad } =
      this.props;
    return createPortal(
      <Overlay onClick={closeModalHandle}>
        <Loader loading={loading} size={loaderSize} />
        <ModalDiv>
          <img
            src={imgLink}
            alt=""
            width="100%"
            onLoad={onLoad}
            style={{ display: loading ? "none" : "block" }}
          />
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}
