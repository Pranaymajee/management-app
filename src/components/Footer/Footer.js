import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


const Footer = () => {
  return (
    <footer style={{backGround:"#2D4250"}}>
      <Box pt={7} pb={13.3} bgcolor="#2D4250">
        <Container maxWidth="lg">
          <Grid item xs={12} container direction="column" alignItems="center" justify="center">
          <Typography style={{color:"white"}}>Copyright 2022 Highradius.All Rights Reserved.</Typography>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer