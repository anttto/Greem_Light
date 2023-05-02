import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { getDisplayName, joinTime } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import Button from "./ui/Button";
import useArtwork from "../hooks/useArtwork";
import { v4 as uuid } from "uuid";

export default function Comment({ product }) {
  const { uid } = useAuthContext();
  const commentId = uuid();
  const { data: displayName } = useQuery(["user", uid], () => getDisplayName(uid));

  const {
    addComment,
    deleteComment,
    getComments: { data: comments },
  } = useArtwork(product.productId);

  const [input, setInput] = useState("");
  const [comment, setComment] = useState();

  const handleChange = (e) => {
    const txt = e.target.value;
    setInput(txt);
    setComment((comment) => {
      const time = joinTime();
      return [...comments, { commentId, txt, displayName, time, uid }];
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment.mutate({ product, comment });
    setInput("");
  };

  const handleDeleteComment = (e) => {
    const commentId = e.target.parentNode.getAttribute("data-key");
    deleteComment.mutate({ product, comments, commentId });
  };

  return (
    <div className="reply-wrap max-w-6xl w-full mt-12">
      <div className="reply-input">
        <form onSubmit={handleSubmit} className="flex justify-left items-center">
          <textarea
            name="reply"
            cols="30"
            rows="2"
            value={input}
            className="w-full rounded-lg h-20 max-h-20 m-0 mr-2"
            placeholder="작가님에게 하고 싶은 말을 남겨주세요."
            onChange={handleChange}
          ></textarea>
          <Button text={"글쓰기"} style={{ padding: "0", width: "8rem", height: "5rem", backgroundColor: "#a89461" }} />
        </form>
      </div>

      <div className="reply-list">
        {comments && (
          <ul>
            {comments.map((comment) => (
              <li key={comment.commentId} data-key={comment.commentId} className="align-middle">
                <span className="mr-2 inline-block font-extrabold align-middle text-md whitespace-nowrap text-ellipsis overflow-hidden nickname">
                  {comment.displayName}
                </span>
                <span className="min-w-fit ml-auto text-sm hidden sm:inline-block align-middle">{comment.time}</span>
                {displayName === comment.displayName && (
                  <span
                    onClick={handleDeleteComment}
                    className="inline-block py-px px-2 align-middle text-sm cursor-pointer bg-gray-100 border border-1 border-zinc-400 rounded-md ml-2"
                  >
                    삭제
                  </span>
                )}
                <p className="mt-2 text-sm">{comment.txt}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
