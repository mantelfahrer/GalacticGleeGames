import React, { FC } from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import backgroundImage from "../images/BackgroundImages/background-4.png";
import character from "../images/Characters/sci-fi-character-4.png";
import {
  ContactFormData,
  initialContactFormData,
} from "../models/ContactFormData";

type Props = {};

const Contact: FC<Props> = (props: Props) => {
  const [formData, setFormData] = React.useState<ContactFormData>(
    initialContactFormData
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout backgroundImage={backgroundImage} color="blue-light">
      <Form
        data={{
          isError: false,
          isLoading: false,
          isSuccess: false,
          errorMessage: "",
          title: "Contact us!",
          instruction: [
            "Feel free to write us your thoughts, feedback and whatever you want.",
            "Please use our contact form",
          ],
          color: "blue-light",
          submitText: "Send",
          onSubmit: onSubmit,
          onChange: onChange,
          image: character,
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
              label: "Message",
              inputAttributes: {
                placeholder: "Type your message here",
                type: "textarea",
                name: "message",
                required: true,
                value: formData.message,
              },
            },
          ],
        }}
      />
    </Layout>
  );
};

export default Contact;
