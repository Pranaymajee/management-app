import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <footer style={{backGround:"#2D4250"}}>
      <Box pt={7} pb={13.3} bgcolor="#2D4250">
        <Container maxWidth="lg">
          <Grid item xs={12} container direction="column" alignItems="center" justify="center">
          <p style={{color:"white"}}><a href='https://www.highradius.com/privacy-policy/' target="_blank" style={{color:"white"}}>Privacy Policy</a> © HighRadius Corporation. All Rights Reserved.</p>
          </Grid>
        </Container>
      </Box>
    </footer>
    
  )
}

export default Footer