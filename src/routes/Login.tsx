import React, { FC } from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import backgroundImage from "../images/BackgroundImages/background-6.png";
import character from "../images/Characters/sci-fi-character-6.png";
import { LoginFormData, initialLoginFormData } from "../models/LoginFormData";

type Props = {};

const Login: FC<Props> = (props: Props) => {
  const [formData, setFormData] =
    React.useState<LoginFormData>(initialLoginFormData);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout backgroundImage={backgroundImage} color="green">
      <Form
        data={{
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
            to: "/signup"
          },
          inputFields: [
            {
              label: "Email address",
              inputAttributes: {
                placeholder: "Enter your email address",
                type: "email",
                name: "email",
                required: true,
                value: formData.email,
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
