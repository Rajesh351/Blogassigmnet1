import React, { useState } from "react";
import axios from "axios";
import useGetallpost from "./hook/useGetallpost";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Edit = () => {
    const{ singe}=useSelector((store)=>store.post)
   // console.log(singe)
   console.log(singe[0])
   //console.log(singe.content)
    const [title, setTitle] = useState(singe[0].title);
    const [content, setContent] = useState(singe[0].summary);
    const allpost = "http://localhost:5000/api/posts"
    const navigate=useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
     
      const fetchSingleCompany = async () => {
        try {
          const payload = { title, content };
          const res = await axios.put(`${allpost}/updatebyid/${singe[0]._id}`, payload, {
            withCredentials: true,
          });
          console.log(res.data);
          if (res.data.success) {
              navigate("/")
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchSingleCompany();
    };
  
    return (
      <div className="container mx-auto pt-20 px-6">
        <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
          <div>
            <label className="block font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter post title"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border px-4 py-2 rounded h-40"
              placeholder="Enter post content"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    );
}
