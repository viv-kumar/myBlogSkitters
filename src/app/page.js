"use client";
import BlogCard from "@/components/blogCard/BlogCard";
import { blogs } from "@/lib/data";
import Image from "next/image";
import classes from "./page.module.css";
import Pagination from "@/components/Pagination/Pagination";
import { paginate } from "@/lib/paginate";

import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await fetch("http://localhost:3000/api/blog");
      console.log(res);
      const data = await res.json();
      console.log(data);
      setPosts(data);
    };
    getBlogs();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch =  () => {
    const filteredResult=posts.filter((item)=>item.title.toLowerCase().includes(keyword.toLowerCase()));
    setPosts(filteredResult)
  };

  const paginatePosts = paginate(posts, currentPage, pageSize);

  return (
    <div className={classes.container}>
      {blogs?.length > 0 && <h2>My Blogs</h2>}
      <Pagination
        items={posts.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div style={{padding:"10px"}}>
        <input
          type="text"
          placeholder="search blog title"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          style={{padding:"3px"}}
        />
        <button onClick={handleSearch} style={{padding:"5px",background:"blue",border:"none",color:"white"}}>Search</button>
      </div>
      <div className={classes.wrapper}>
        {paginatePosts?.length > 0 ? (
          paginatePosts.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <h3 className={classes.noBlogs}>...loading</h3>
        )}
      </div>
    </div>
  );
}
