import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from './styles';
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
    const data = useSelector(state => state.posts); // from combineReducers
    const classes = useStyles();

    useEffect(() => {
        if (data && !data.posts?.length && !data.isLoading) return "No posts!"
    }, []);

    return (
        <>
            {data && data.isLoading ? <CircularProgress /> : (
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                    {data?.posts?.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}

export default Posts
