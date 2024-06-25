import * as api from '../api';
import { CREATE, DELETE, FETCH_ALL, FETCH_POST, START_LOADING, END_LOADING, FETCH_BY_SEARCH, UPDATE, COMMENT } from '../constants/actionTypes';

// Actions Creators
export const getPost = (id) => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        console.log(error.message);
    }
}
export const getPosts = (page) => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        console.log(error.message);
    }
}

export const getPostsBySearch = searchQuery => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        console.log(error);
    }
}

export const createPost = (post, history) => async dispatch => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data })
        dispatch({ type: END_LOADING })
        history(`/posts/${data._id}`)
    } catch (error) {
        dispatch({ type: END_LOADING })
        console.log(error);
    }
}

export const updatePost = (id, post) => async dispatch => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = id => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
        dispatch({ type: END_LOADING });
        dispatch(getPosts())
    } catch (error) {
        dispatch({ type: END_LOADING })
        console.log(error);
    }
}

export const likePost = id => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.likePost(id);
        dispatch({ type: 'LIKE', payload: data });
        dispatch({ type: END_LOADING });
        dispatch(getPosts())
    } catch (error) {
        dispatch({ type: END_LOADING });
        console.log(error);
    }
}

export const commentPost = (value, id) => async dispatch => {
    try {
        const { data } = await api.commentPost(value, id);
        dispatch({ type: COMMENT, data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}