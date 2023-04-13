import React from "react";

export default function Button({ text, onClick, disabled, liked }) {
  return (
    <button className="bg-brand text-white py-2 px-4 rounded-md hover:brightness-110 font-semibold " onClick={onClick} disabled={disabled}>
      {text} {liked && <span className="font-semibold">{liked}</span>}
    </button>
  );
}
