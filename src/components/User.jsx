import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex items-center shrink-0">
      <img className="w-8 h-8 rounded-full mr-0 md:mr-2" src={photoURL} alt={displayName} />
      <span className="hidden md:block font-bold">{displayName}</span>
    </div>
  );
}
