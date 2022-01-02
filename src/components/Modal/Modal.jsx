import PropTypes from "prop-types";
import { Component } from "react";
import { ModalDiv, Overlay } from "../styles/styled";

export default class Modal extends Component {
  static propTypes = {
    imgLink: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { imgLink, onClick } = this.props;
    return (
      <Overlay onClick={onClick}>
        <ModalDiv>
          <img src={imgLink} alt="" width="100%" />
        </ModalDiv>
      </Overlay>
    );
  }
}
