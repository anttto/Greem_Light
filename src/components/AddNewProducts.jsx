import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewArtwork } from "../api/firebase";
import { uploadImage } from "../api/uploader";
import { useAuthContext } from "../context/AuthContext";
import Button from "./ui/Button";

export default function NewProducts() {
  const [product, setProduct] = useState({});
  const [file, setFiles] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  const { uid } = useAuthContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFiles(files && files[0]);
    }
    setProduct((product) => {
      return { ...product, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addNewArtwork(uid, product, url).then(() => {
          setSuccess("업로드가 완료 되었습니다.");
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        });
      })
      .finally(() => {
        setIsUploading(false);
        navigate("/artwork");
      });
  };

  return (
    <section className="max-w-md mx-auto text-center pt-10 pb-32">
      <h2 className="text-2xl font-bold my-4 mt-10">새로운 그림 등록</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file && <img className="w-72 mx-auto mb-2" src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit} className="flex flex-col px-2">
        <input onChange={handleChange} name="file" className="w-full bg-white" type="file" accept="image/*" required placeholder="파일" />
        <input name="title" value={product.title ?? ""} className="w-full" type="text" required placeholder="그림 제목" onChange={handleChange} />
        <textarea name="description" id="" cols="30" rows="5" className="w-full mb-2" required placeholder="그림 설명" onChange={handleChange}></textarea>
        {/* <text name="description" value={product.description ?? ""} className="w-full" type="text" required placeholder="그림 설명" onChange={handleChange} /> */}
        {/* <input name="price" value={product.price ?? ""} className="w-full" type="number" required placeholder="가격" onChange={handleChange} /> */}
        {/* <input name="category" value={product.category ?? ""} className="w-full" type="text" required placeholder="카테고리" onChange={handleChange} /> */}
        {/* <input name="options" value={product.options ?? ""} className="w-full" type="text" placeholder="태그 (콤마(,)로 구분)" onChange={handleChange} /> */}
        {/* <select name="type" onChange={handleChange} className="px-3" required>
          <option key="type" value="Artwork">
            장르
          </option>
          <option key="type1" value="Character Design">
            캐릭터
          </option>
          <option key="type2" value="Landscape">
            배경
          </option>
          <option key="type3" value="Concept Art">
            컨셉아트
          </option>
        </select> */}
        <Button text={isUploading ? "업로드 중..." : "제품 등록하기"} disabled={isUploading} />
      </form>
    </section>
  );
}
