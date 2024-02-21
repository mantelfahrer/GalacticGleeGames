import { Employee } from "../models/Employee";
import kurtis from '../images/Employees/employee-1.png';
import joan from '../images/Employees/employee-2.png';
import zakaria from '../images/Employees/employee-3.png';
import sophia from '../images/Employees/employee-4.png';
import cora from '../images/Employees/employee-5.png';
import ryan from '../images/Employees/employee-6.png';

export const employees: Employee[] = [
  {
    name: "Kurtis Bradford",
    role: "Game Developer",
    image: kurtis,
    color: "pink",
  },
  {
    name: "Joan Kerr",
    role: "Game Designer",
    image: joan,
    color: "green",
  },
  {
    name: "Zakaria Hartman",
    role: "CEO",
    image: zakaria,
    color: "blue-light",
  },
  {
    name: "Sophia Horn",
    role: "Game Artist",
    image: sophia,
    color: "blue-light",
  },
  {
    name: "Cora Walton",
    role: "CEO",
    image: cora,
    color: "blue-dark",
  },
  {
    name: "Ryan Shepard",
    role: "Sound Engineer",
    image: ryan,
    color: "green",
  },
];
