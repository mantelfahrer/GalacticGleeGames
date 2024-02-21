const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];
  const dayName = days[date.getDay()];
  const formatted = `${dayName}, ${dayNumber} ${monthName} ${year}`;
  return formatted;
};
