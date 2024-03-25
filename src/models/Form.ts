import { Color } from "./Color";
import { InputField } from "./InputField";

export type TFormCard = {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  errorMessage: string;
  color: Color;
  title: string;
  instruction: string[];
  formTitle?: string;
  inputFields: InputField[];
  submitText: string;
  redirect?: {
    text: string;
    linkText: string;
    to: string;
  };
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => any;
  onChange: React.ChangeEventHandler;
};

export type TForm = TFormCard & {
  image: string;
};
