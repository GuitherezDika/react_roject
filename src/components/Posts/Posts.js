import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from './styles';

const Posts = () => {
    const posts = useSelector(state => state.posts); // from combineReducers
    const classes = useStyles()
    return (
        <>
            <h1>Posts</h1>
        {posts && posts.length > 0 &&
            <>
                <Post />
                <Post />
            </> 
        }
        </>
    )
}

export default Posts