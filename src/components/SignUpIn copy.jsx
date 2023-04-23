import React from "react";
import { useState } from "react";
import { addUser, join, login } from "../api/firebase";
// import { useAuthContext } from "../context/AuthContext";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Sign() {
  // const User = useAuthContext();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [isMember, setIsMember] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((userData) => {
      return { ...userData, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMember) {
      login(userData.email, userData.password);
    } else {
      join(userData.email, userData.password, userData.displayName).then(() => {
        window.location.replace("/");
      });
      console.log(userData);
    }
  };

  //기존 멤버 상태 체크
  const goToSignUp = () => {
    setIsMember((prev) => !prev);
  };

  return (
    <section className="max-w-md mx-auto text-center flex flex-col justify-center min-h-screen md:min-h-0 md:justify-start md:mt-48">
      {isMember ? (
        <h2 className="text-xl mb-4">
          "여러분의 <i className="font-bold not-italic text-green-600">GREEM</i>을 보여주세요"
        </h2>
      ) : (
        <h2 className="text-xl mb-4">
          "<i className="font-bold not-italic text-green-600">회원가입</i>을 진행해 주세요"
        </h2>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col px-4">
        {!isMember && (
          <input name="displayName" className="w-full rounded-lg" type="text" required placeholder="닉네임 (그림라이트 활동명)" onChange={handleChange} />
        )}
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
        {isMember && <Button text={"입장 하기"} type="button" />}
        {!isMember && <Button text={"가입 하기"} type="button" />}
      </form>
      <div className="mt-2 inline-block text-gray-500">
        {isMember ? (
          <span onClick={goToSignUp} className="cursor-pointer text-md">
            {"아직도 가입을 하지 않았다면 → ✅"}
          </span>
        ) : (
          <span className="text-sm">{"🔒 패스워드는 운영자도 알수 없도록 암호화되고 저장도 하지 않습니다."}</span>
        )}
      </div>
    </section>
  );
}
