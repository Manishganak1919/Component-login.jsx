import React from 'react';
import { Grid } from '@mui/material';
import Bannar from '../../bannar/Bannar';
import Categories from './Categories';
/****component here****/
import PublicPost from './post/PublicPost';


const Home = () => {
  return (
    <>
      <Bannar/>
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories/>
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
        <PublicPost/>
        </Grid>
      </Grid>
      
    </>
  )
}
export default Home;
