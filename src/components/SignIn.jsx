import React from "react";
import { useState } from "react";
import { login } from "../api/firebase";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((userData) => {
      return { ...userData, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userData.email, userData.password);
  };

  return (
    <section className="max-w-md mx-auto text-center flex flex-col justify-center min-h-screen md:min-h-0 md:justify-start md:pt-48">
      <h2 className="text-xl mb-4">
        "여러분의 <i className="font-bold not-italic text-green-600">GREEM</i>을 보여주세요"
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col px-4">
        <input name="email" className="w-full rounded-lg" type="email" required placeholder="이메일을 입력하세요" onChange={handleChange} />
        <input
          name="password"
          className="w-full mb-2 rounded-lg"
          type="password"
          minLength={6}
          required
          placeholder="패스워드를 입력하세요"
          onChange={handleChange}
        />
        <Button text={"입장 하기"} type="button" />
        <Button
          text={"홈으로"}
          onClick={() => {
            navigate("/");
          }}
          style={{ backgroundColor: "#b4b4b4", marginTop: "0.4rem" }}
        />
      </form>
      <div className="mt-6 inline-block text-gray-500">
        <span onClick={() => navigate("/join")} className="cursor-pointer text-md">
          {"아직도 가입을 하지 않았다면 → ✅"}
        </span>
      </div>
    </section>
  );
}
