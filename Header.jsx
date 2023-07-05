import React from 'react'
import { AppBar, Toolbar, Typography, styled } from '@mui/material';
import {Link} from 'react-router-dom';

const Component = styled(AppBar)`
    background: #000000;
    color: white;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 25px;
        color: #FFFFFF;
        font-size:20px;
        text-decoration: none;
    }
`;

const Header = () => {
  return (
    <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Typography sx={{margin:'auto', fontSize:'35px',color:'#FF4500', fontWeight:'bold'}}>CODE  GYAN</Typography>
                <Link to='/login' style={{marginLeft:'auto'}}>LOGOUT</Link>
            </Container>
        </Component>
  )
}
/***this componet must be imported in app.js */
export default Header;
