import React, { FC, useEffect } from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import backgroundImage from "../images/BackgroundImages/background-6.png";
import character from "../images/Characters/sci-fi-character-6.png";
import { initialLoginFormData } from "../models/LoginFormData";
import { UserToLogin } from "../models/User";
import { useAppDispatch } from "../state/hooks";
import { useLoginUserMutation } from "../state/slices/apiSlice";
import { useNavigate } from "react-router-dom";
import { SET_CREDENTIALS } from "../state/slices/authSlice";

type Props = {};

const Login: FC<Props> = (props: Props) => {
  const [formData, setFormData] =
    React.useState<UserToLogin>(initialLoginFormData);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { data, error, isSuccess, isError, isLoading }] =
    useLoginUserMutation();

  useEffect(() => {
    setErrorMessage("");
  }, [formData]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData).unwrap();
      navigate('/');
    } catch (error) {
      setErrorMessage("Login failed");
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout backgroundImage={backgroundImage} color="green">
      <Form
        data={{
          isError,
          isLoading,
          isSuccess,
          errorMessage,
          title: "Welcome back!",
          instruction: [
            "To access our exclusive content, please login to your account",
          ],
          formTitle: "Login",
          color: "green",
          submitText: "Login",
          onSubmit: onSubmit,
          onChange: onChange,
          image: character,
          redirect: {
            text: "Don't have an account, yet?",
            linkText: "Sign up here",
            to: "/signup",
          },
          inputFields: [
            {
              label: "Username",
              inputAttributes: {
                placeholder: "Enter your username",
                type: "text",
                name: "username",
                required: true,
                value: formData.username,
              },
            },
            {
              label: "Password",
              inputAttributes: {
                placeholder: "Enter your password",
                type: "password",
                name: "password",
                required: true,
                value: formData.password,
              },
            },
          ],
        }}
      />
    </Layout>
  );
};

export default Login;
