import React, { useState, useRef } from 'react';
import { Button, TextField, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from './styles';
import { commentPost } from "../../actions/posts";

const CommentSection = (post) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [comments, setComments] = useState(post?.post.comments);

    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComment = await dispatch(commentPost(finalComment, post.post._id));
        setComments(newComment);
        setComment('');

        commentsRef.current.scrollIntoView({ behaviour: 'smooth' })
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{c.split(': ')[0]}:</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'>Write a comment: </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant='outlined'
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment}
                            variant='contained' color='primary' onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;