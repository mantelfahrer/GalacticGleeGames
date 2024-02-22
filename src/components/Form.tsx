import clsx from "clsx";
import { FC } from "react";
import { TForm } from "../models/Form";
import "./Form.scss";
import FormCard from "./FormCard";
import Title from "./Title";

type Props = {
  data: TForm;
};

const Form: FC<Props> = ({ data }) => {
  return (
    <div className="form">
      <div className="form__instruction">
        <div className={clsx("form__text", `form__text--${data.color}`)}>
          <Title className="form__title">{data.title}</Title>
          {data.instruction.map((text, index) => {
            return (
              <p key={index} className="form__description">
                {text}
              </p>
            );
          })}
        </div>
        <img className="form__image" alt="game character" src={data.image} />
      </div>
      <FormCard className="form__card" data={data} />
    </div>
  );
};

export default Form;
