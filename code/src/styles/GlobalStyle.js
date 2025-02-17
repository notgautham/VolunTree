// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

/**
 * This file sets a global background that applies to the entire app,
 * plus resets margin, padding, etc.
 */
const GlobalStyle = createGlobalStyle`
  /* 1. Basic reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 2. HTML & Body fill the viewport */
  html, body {
    width: 100%;
    min-height: 100%;
  }

  /* 3. Set your site-wide font, color, and background here */
  body {
    font-family: "Poppins", sans-serif;
    color: #2e3a59;

    /* Example gradient background */
    background: linear-gradient(135deg, #FFF7E8 0%, #FFEFC2 100%);
  }
`;

export default GlobalStyle;
