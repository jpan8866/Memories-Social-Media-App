import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

const App = () =>  { //functional component
    return (
        // use container to center everything
        <Container maxwidth="lg">
            <AppBar position="static" color="inherit">
                {/* gives a nice font to textual elements */}
                <Typography variant="h2" align="center">Memories</Typography>
                <img src={memories} alt="memories" width="100" height="100"/>
            </AppBar>
            {/* use Grow for animation */}
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        {/* full screen for xtra small screen, and 7 out of 12 spaces on small/medium devices */}
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;