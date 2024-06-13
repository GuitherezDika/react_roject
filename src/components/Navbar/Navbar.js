import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from './styles';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useNavigate();
    const dispatch = useDispatch();
    // const selected = useSelector(state => state.auth); // DON'T DELETE
    // const { authData } = selected; //  // DON'T DELETE

    // cara render otomatis saat pindah screen; react router doom // DON'T DELETE
    const location = useLocation();

    const logout = () => {
        dispatch({ type: LOGOUT });
        history('/')
        setUser(null)
    }

    useEffect(() => { // cara 1 = react router doom
        setUser(JSON.parse(localStorage.getItem('profile')));

        if (user) {
            const token = user.token;
            if (token) {
                const decodedToken = jwtDecode(token);
                if (decodedToken * 1000 < new Date().getTime()) logout();
            }
        }
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt='memories' height={60} />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
