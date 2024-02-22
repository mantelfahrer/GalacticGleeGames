import clsx from "clsx";
import { FC } from "react";
import "./FormCard.scss";
import Title from "./Title";
import { TFormCard } from "../models/Form";

type Props = {
  data: TFormCard;
  className: string;
};

const FormCard: FC<Props> = ({ data, className }) => {
  return (
    <form
      className={clsx("form-card", `form-card--${data.color}`, className)}
      onSubmit={data.onSubmit}
    >
      {data.formTitle && <Title formPadding>{data.formTitle}</Title>}
      {data.inputFields.map((field) => {
        return (
          <div className="form-card__field" key={field.inputAttributes.name}>
            <label
              className="form-card__label"
              htmlFor={field.inputAttributes.name}
            >
              {field.label}
            </label>
            {field.inputAttributes.type === "textarea" ? (
              <textarea
                className="form-card__input"
                onChange={data.onChange}
                id={field.inputAttributes.name}
                {...field.inputAttributes}
                rows={8}
                style={{ resize: "none" }}
              />
            ) : (
              <input
                className="form-card__input"
                onChange={data.onChange}
                id={field.inputAttributes.name}
                {...field.inputAttributes}
              />
            )}
          </div>
        );
      })}
      <input
        type="submit"
        value={data.submitText}
        className="form-card__submit"
      />
    </form>
  );
};

export default FormCard;
