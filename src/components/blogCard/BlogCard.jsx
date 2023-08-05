"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import classes from "./blogCard.module.css";
import { useSession } from "next-auth/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const BlogCard = ({
  blog: { title, desc, imageUrl, likes, authorId, _id, updatedAt },
}) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [blogLikes, setBlogLikes] = useState(0);

  useEffect(() => {
    session && likes && setIsLiked(likes.includes(session?.user?._id));
    session && likes && setBlogLikes(likes.length);
  }, [likes, session]);

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/blog/${_id}/like`, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "PUT",
      });

      console.log(res);
      if (res.ok) {
        if (isLiked) {
          setIsLiked((prev) => !prev);
          setBlogLikes((prev) => prev - 1);
        } else {
          setIsLiked((prev) => !prev);
          setBlogLikes((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link className={classes.imgContainer} href={`/blog/${_id}`}>
          <img src={imageUrl} width="60" height="60" alt="pic" />
        </Link>
        <div className={classes.blogData}>
          <div className={classes.left}>
            <h4>Title:{title}</h4>
            <p className={classes.desc}>
              <span>Desc:</span>
              {desc}
            </p>
            <p className={classes.create}>
              <span>Created On:</span> {updatedAt.slice(0, 10)}
            </p>
          </div>
          <div className={classes.right}>
            {blogLikes}{" "}
            {isLiked ? (
              <AiFillLike onClick={handleLike} size={20} />
            ) : (
              <AiOutlineLike onClick={handleLike} size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
