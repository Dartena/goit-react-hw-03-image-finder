import PropTypes from "prop-types";
import { Component } from "react";
import { Btn } from "../styles/styled";

export default class Button extends Component {
  static propTypes = {
    textContent: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { textContent, onClick } = this.props;
    return (
      <Btn type="button" onClick={onClick}>
        {textContent}
      </Btn>
    );
  }
}
