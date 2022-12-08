import styled from "styled-components";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Swal from "sweetalert2";

import { mobile } from "../responsive";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  //   console.log(username, password);

  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     login(dispatch, { username, password });
  //   };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  const schema = yup.object({
    email: yup.string().required("Email is required!"),

    password: yup.string().required("Password is required!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    const { email, password } = data;
    publicRequest
      .post("auth/login", { email, password })
      .then((res) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfuly",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Login fail!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("email")} placeholder="email" required />
          <Input
            {...register("password")}
            placeholder="password"
            type="password"
            required
          />
          <BtnGroup>
            <Button type="submit">LOGIN</Button>
            <Button onClick={handleBack}>BACK</Button>
          </BtnGroup>

          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={() => navigate("/register")}>
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
