
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllpost } from '../redux/postSlice'

const useGetallpost = () => {
    const dispatch = useDispatch();
      const allpost = "http://localhost:5000/api/posts"
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${allpost}/allpost`,{withCredentials:true});
                console.log(res)
                if(res.data.success){
                    dispatch(setAllpost(res.data.posts))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetallpost