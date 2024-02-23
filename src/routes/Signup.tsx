import React, { FC } from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import backgroundImage from "../images/BackgroundImages/background-7.png";
import character from "../images/Characters/sci-fi-character-5.png";
import {
  SignupFormData,
  initialSignupFormData,
} from "../models/SignupFormData";

type Props = {};

const Signup: FC<Props> = (props: Props) => {
  const [formData, setFormData] = React.useState<SignupFormData>(
    initialSignupFormData
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout backgroundImage={backgroundImage} color="pink">
      <Form
        data={{
          title: "Come on in!",
          instruction: [
            "We've got loads of exclusive content and interactive experiences for you to play with. Explore our cosmos and thrive within our community!",
          ],
          formTitle: "Sign Up",
          color: "pink",
          submitText: "Create Account",
          onSubmit: onSubmit,
          onChange: onChange,
          image: character,
          redirect: {
            text: "Already have an account?",
            linkText: "Login here",
            to: "/login",
          },
          inputFields: [
            {
              label: "Name",
              inputAttributes: {
                placeholder: "Enter your name",
                type: "text",
                name: "name",
                required: true,
                value: formData.name,
              },
            },
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

export default Signup;
