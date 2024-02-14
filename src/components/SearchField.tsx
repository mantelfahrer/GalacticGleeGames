import { FC } from "react";
import searchIcon from "../images/UI/icons8-search-30.png";
import "./SearchField.scss";

type Props = {
  value: string;
  onChange: (value: string) => any;
};

const SearchField: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="searchfield">
      <input
        type="text"
        value={value}
        placeholder="Search"
        onChange={(e) => onChange(e.target.value)}
        className="searchfield__input"
      />
      <img
        src={searchIcon}
        alt="magnifying glass"
        className="searchfield__icon"
      />
    </div>
  );
};

export default SearchField;
