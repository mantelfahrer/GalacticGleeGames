import React, { FC } from "react";
import Title from "../components/Title";
import "./AboutUs.scss";
import Layout from "../components/Layout";
import backgroundImage from "../images/BackgroundImages/background-2.png";
import { employees } from "../data/employees";
import EmployeeCard from "../components/EmployeeCard";

type Props = {};

const AboutUs: FC<Props> = (props: Props) => {
  return (
    <Layout backgroundImage={backgroundImage} color="pink">
      <div className="about">
        <Title>This is us</Title>
        <p className="about__text">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. <br />
          <br />
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet,
        </p>
        <Title>Our Team</Title>
        <div className="employees">
          {employees.map((employee) => {
            return <EmployeeCard data={employee} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
