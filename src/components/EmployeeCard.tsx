import React, { FC } from "react";
import { Employee } from "../models/Employee";
import "./EmployeeCard.scss";
import clsx from "clsx";

type Props = {
  data: Employee;
};

const EmployeeCard: FC<Props> = ({ data }) => {
  return (
    <div className="employee-card">
      <img
        className="employee-card__image"
        src={data.image}
        alt="employee portrait"
      />
      <div
        className={clsx(
          "employee-card__name-sign",
          `employee-card__name-sign--${data.color}`
        )}
      >
        <p className="employee-card__name">{data.name}</p>
        <p className="employee-card__role">{data.role}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
