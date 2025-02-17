import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f4f4f4;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 2rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      © {new Date().getFullYear()} VolunTree. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;
