import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../api/uploader";
import { useAuthContext } from "../context/AuthContext";
import useArtwork from "../hooks/useArtwork";
import Button from "./ui/Button";

export default function NewProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [edit, setEdit] = useState({});

  useEffect(() => {
    if (location.state) {
      setEdit(location.state.editProduct);
    } else {
      setEdit(null);
    }
  }, [location]);

  const [product, setProduct] = useState({});
  const [file, setFiles] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { productId } = useParams();
  const { uid } = useAuthContext();
  const { addArtwork } = useArtwork(productId);

  // console.log();
  // console.log(editProduct);
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
        addArtwork.mutate(
          { uid, product, url },
          {
            onSuccess: () => {
              setSuccess("업로드가 완료 되었습니다.");
              setTimeout(() => {
                setSuccess(null);
              }, 3000);
            },
          }
        );
      })
      .finally(() => {
        setIsUploading(false);
        navigate("/artworks");
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
  };
  if (edit) {
    return (
      <section className="max-w-md mx-auto text-center pt-10 pb-32">
        <h2 className="text-2xl font-bold my-4 mt-10">내용 수정하기</h2>
        <img className="w-72 mx-auto mb-2" src={edit.url} alt="local file" />
        <form onSubmit={handleEditSubmit} className="flex flex-col px-2">
          <input name="title" defaultValue={edit.title} className="w-full" type="text" required placeholder="그림 제목" onChange={handleChange} />
          <textarea name="description" defaultValue={edit.description} className="w-full mb-2" required onChange={handleChange}></textarea>
          <Button text={isUploading ? "업로드 중..." : "수정 완료"} disabled={isUploading} />
        </form>
      </section>
    );
  }
  return (
    <section className="max-w-md mx-auto text-center pt-10 pb-32">
      <h2 className="text-2xl font-bold my-4 mt-10">새로운 그림 등록</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file && <img className="w-72 mx-auto mb-2" src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit} className="flex flex-col px-2">
        <input onChange={handleChange} name="file" className="w-full bg-white" type="file" accept="image/*" required placeholder="파일" />
        <input name="title" className="w-full" type="text" required placeholder="그림 제목" onChange={handleChange} />
        <textarea name="description" id="" cols="30" rows="5" className="w-full mb-2" required placeholder="그림 설명" onChange={handleChange}></textarea>
        <Button text={isUploading ? "업로드 중..." : "그림 등록하기"} disabled={isUploading} />
      </form>
    </section>
  );
}
