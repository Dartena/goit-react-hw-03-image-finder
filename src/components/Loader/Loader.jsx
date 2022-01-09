import React from "react";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";
import PropTypes from "prop-types";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  top: 25%;
  left: 35%;
`;
const color = "#E3256B";

export default function Loader({ loading, size }) {
  return (
    <RingLoader color={color} loading={loading} css={override} size={size} />
  );
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
};
