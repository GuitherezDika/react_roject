import { Container, Grid, Grow, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Forms/Form";
import Pagination from '../Pagination';
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import { useLocation } from "react-router-dom";
import useStyles from './styles'

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const location = useLocation();
    const classes = useStyles();
    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch, location]);

    return (
        <Grow in>
            <Container>
                <Grid container justify='space-between' alignItems='stretch'>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;