import PropTypes from "prop-types";
import { Btn } from "../styles/styled";

export default function Button({ textContent, onClick }) {
  return (
    <Btn type="button" onClick={onClick}>
      {textContent}
    </Btn>
  );
}

Button.propTypes = {
  textContent: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
