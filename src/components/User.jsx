import React from "react";

export default function User({ userData }) {
  if (userData) {
    return (
      <div id="userBox" className="flex items-center shrink-0 cursor-pointer">
        {/* <img className="w-8 h-8 rounded-full mr-0 md:mr-2" src={photoURL} alt={displayName} /> */}
        <i className={`pf-icon level_${userData[3]}`}>R</i>
        <span className="font-bold">{userData[0]}</span>
      </div>
    );
  }
}
