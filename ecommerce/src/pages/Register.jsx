import styled from "styled-components";
import { useForm } from "react-hook-form";
import { mobile } from "../responsive";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Message = styled.span`
  position: absolute;
  bottom: 111px;
  right: 22px;
  color: red;
`;

const BtnGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Register = () => {
  const schema = yup.object({
    name: yup.string(),
    lastName: yup.string(),
    username: yup.string().required("Username is required!"),
    email: yup.string().required("Email is required!"),
    password: yup.string().required("Password is required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    const { username, email, password } = data;
    publicRequest
      .post("auth/register", { username, email, password })
      .then((res) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Register successfuly",
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
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("name")} placeholder="name" />

          <Input {...register("lastName")} placeholder="last name" />

          <Input {...register("username")} placeholder="username" required />

          <Input
            {...register("email")}
            placeholder="email"
            type="email"
            required
          />
          <Input {...register("password")} placeholder="password" required />
          <Input
            {...register("confirmPassword")}
            placeholder="confirm password"
            required
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => <Message>{message}</Message>}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <BtnGroup>
            <Button type="submit">CREATE</Button>
            <Button onClick={handleBack}>BACK</Button>
          </BtnGroup>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
