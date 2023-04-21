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
  const [editArtwork, setEditArtwork] = useState(null);

  const [product, setProduct] = useState({});
  const [file, setFiles] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { productId } = useParams();
  const { uid } = useAuthContext();
  const { addArtwork, modifyArtwork } = useArtwork(productId);

  //초기 랜더링 시 '수정'에 대한 접근인지 분기
  useEffect(() => {
    if (location.state) {
      setEditArtwork(location.state.editProduct);
    } else {
      setEditArtwork(null);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFiles(files && files[0]);
    }

    //수정 & 신규 분기
    if (editArtwork) {
      setEditArtwork((editArtwork) => {
        return { ...editArtwork, [name]: value };
      });
    } else {
      setProduct((product) => {
        return { ...product, [name]: value };
      });
    }
  };

  //신규 등록시 전송
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

  //수정시 전송
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    modifyArtwork.mutate(
      { editArtwork },
      {
        onSuccess: () => {
          setSuccess("수정이 완료 되었습니다.");
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
          setIsUploading(false);
          navigate("/artworks");
        },
      }
    );
  };

  //수정 버튼으로 접근 했을 때
  if (editArtwork) {
    return (
      <section className="max-w-md mx-auto text-center pt-10 pb-32">
        <h2 className="text-2xl font-bold my-4 mt-10">내용 수정하기</h2>
        <img className="w-72 mx-auto mb-2" src={editArtwork.url} alt="local file" />
        <form className="flex flex-col px-2">
          <input name="title" defaultValue={editArtwork.title} className="w-full" type="text" required placeholder="그림 제목" onChange={handleChange} />
          <textarea
            name="description"
            defaultValue={editArtwork.description}
            cols="30"
            rows="5"
            className="w-full mb-2"
            required
            onChange={handleChange}
          ></textarea>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button text={"수정하기"} disabled={isUploading} onClick={handleEditSubmit} />
            <Button text={"뒤로가기"} color={"#777"} onClick={() => navigate(-1)} />
          </div>
        </form>
      </section>
    );
  }

  //새로운 그림 등록할 때
  return (
    <section className="max-w-md mx-auto text-center pt-10 pb-32">
      <h2 className="text-2xl font-bold my-4 mt-10">내 작품 올리기</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file && <img className="w-72 mx-auto mb-2" src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit} className="flex flex-col px-2">
        <input onChange={handleChange} name="file" className="w-full bg-white rounded-lg" type="file" accept="image/*" required placeholder="파일" />
        <input name="title" className="w-full rounded-lg" type="text" required placeholder="그림 제목" onChange={handleChange} />
        <textarea name="description" cols="30" rows="5" className="w-full mb-2 rounded-lg" required placeholder="그림 설명" onChange={handleChange}></textarea>
        <Button text={isUploading ? "업로드 중..." : "그림 등록하기"} disabled={isUploading} />
      </form>
    </section>
  );
}
