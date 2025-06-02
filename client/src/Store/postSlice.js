import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState= {
    isLoading: false,
    allPost: [],
    allFollowingsPost: [],
}



export const getAllPost = createAsyncThunk(
    'post/allPost',
    async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API}/api/v1/post/all-posts`, {
            withCredentials: true
        })
        
        return response?.data
    }
)

export const getAllFollowingsPost = createAsyncThunk(
    'post/allFollowingsPost',
    async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API}/api/v1/post/following-posts`, {
            withCredentials: true
        })
        
        return response?.data
    }
)


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        setpost: (state, action)=>{

        },

        likeOrUnlike: (state, action)=>{
            
            
            const {postId, userId} = action.payload
            
            if(state?.allPost?.length > 0){
                const postIndex = state.allPost.findIndex((post) => post._id === postId)
                if(postIndex !== -1){
                    const post = state.allPost[postIndex]
                    if(post.like.includes(userId)){
                        post.like = post.like.filter((id) => id !== userId)
                    }else{
                        post.like.push(userId)
                    }
                }
            }
            if(state.allFollowingsPost.length > 0){
                const postIndex = state.allFollowingsPost.findIndex((post) => post._id === postId)
                if(postIndex !== -1){
                    const post = state.allFollowingsPost[postIndex]
                    if(post.like.includes(userId)){
                        post.like = post.like.filter((id) => id !== userId)
                    }else{
                        post.like.push(userId)
                    }
                }
            }

            

        }
    },

    extraReducers: (builder)=>{
    builder.addCase(getAllPost.pending, (state, action)=>{
        state.isLoading = true
    })
    .addCase(getAllPost.fulfilled,(state, action)=>{
      
        
        state.allPost = action?.payload?.posts|| null ;
        state.isLoading = false
    })
    .addCase(getAllPost.rejected, (state, action)=>{
        state.isLoading = false
    })
    .addCase(getAllFollowingsPost.pending, (state, action)=>{
        state.isLoading = true
    })
    .addCase(getAllFollowingsPost.fulfilled,(state, action)=>{
        
        
        state.allFollowingsPost = action?.payload?.posts|| null ;
        state.isLoading = false
    })
    .addCase(getAllFollowingsPost.rejected, (state, action)=>{
        state.isLoading = false
    })
    }
})


export  const {setpost, likeOrUnlike} = postSlice.actions;
export default postSlice.reducer