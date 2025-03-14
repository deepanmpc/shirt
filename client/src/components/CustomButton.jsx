import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../config/helpers";

const CustomButton = ({ type, title, CustomStyles, handleOnClick }) => {
  const snap = useSnapshot(state);
  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        background: 'linear-gradient(90deg,rgb(238, 112, 8) 0%,rgb(6, 247, 239) 100%)',
        color: getContrastingColor(snap.color),
      };
    }else if(type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };
  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${CustomStyles}`}
      style={generateStyle(type)}
      onClick={handleOnClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
