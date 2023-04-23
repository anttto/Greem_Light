import React from "react";

export default function Button({ text, onClick, disabled, liked, style }) {
  return (
    <button className="bg-brand text-white py-2 px-4 rounded-md hover:brightness-110 font-semibold" style={style} onClick={onClick} disabled={disabled}>
      {text} {liked && <span className="font-semibold">{liked}</span>}
    </button>
  );
}
