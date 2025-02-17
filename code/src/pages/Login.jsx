import React from "react";
import styled from "styled-components";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #1e40af;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background-color: #1e40af;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #15317e;
  }
`;

const Login = () => {
  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form>
        <Input type="email" placeholder="Enter your email" required />
        <Input type="password" placeholder="Enter your password" required />
        <Button type="submit">Login</Button>
      </Form>
    </LoginContainer>
  );
};

export default Login;
