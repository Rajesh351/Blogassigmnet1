import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"post",
    initialState:{
        allpost:[],
        singe:null
    },
    reducers:{
        // actions
        setAllpost:(state,action) => {
            state.allpost = action.payload;
        },
        setPost:(state,action)=>{
            state.singe=action.payload
        }
    }
});
export const {
    setAllpost, 
    setPost
} = postSlice.actions;
export default postSlice.reducer;