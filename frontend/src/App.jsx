
import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setAllpost, setPost } from './components/redux/postSlice';
import store from './components/redux/store';
import useGetallpost from './components/hook/useGetallpost';
import { useNavigate } from 'react-router-dom';
function App() {
  useGetallpost();
  const api = "http://localhost:5000/api/posts"
  const dispatch=useDispatch();
  const {allpost}=useSelector((store)=>store.post)
 // console.log(allpost)
  const navigate=useNavigate();
  //setData(post.allpost)
  //console.log(post.allpost)

  // const fetchAllJobs = async () => {
  //   try {
  //     const res = await axios.get(`${api}/allpost`, { withCredentials: true });

  //     if (res.data.success) {
  //       // dispatch(setAllpost(res.posts));
  //       //console.log(res.posts)
  //       //console.log(res)
  //      // console.log(res.data)
  //       //setData(res.data.posts)
  //       //dispatch(setAllpost(res.data.posts))
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   fetchAllJobs();
  // }, [])
  const handleEdit = (_id) => {
    const filteredData = allpost.filter((item) => item._id ===_id);
    dispatch(setPost(filteredData))
    navigate("/Page")
  };

  const handleDelete = (_id) => {

    const fetchSingleCompany = async () => {
      try {
        const res = await axios.delete(`${api}/deletedbyid/${_id}`,{
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          const filteredData = allpost.filter((item) => item._id !==_id);
          dispatch(setAllpost(filteredData))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleCompany();
    //const filteredData = data.filter((item) => item._id !==_id);
  };


  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="pt-20 container mx-auto px-6">
        <h1 className="text-3xl font-bold my-6">Welcome to the Blog</h1>
        <div className="space-y-4">
          {allpost?.map((item, index) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow-md border"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.summary}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
