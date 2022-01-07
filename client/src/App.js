// import { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
// import { useDispatch } from 'react-redux';
// import { getPosts } from './actions/posts';

import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';

const App = () => { //functional component
    const styleClasses = useStyles();
    // Note that useStyles() returns an object containing 3 style items for appBar, heading and image
    // use them for below respective elements:

    // define dispatch using useDispatch() hook
    // const dispatch = useDispatch();
    // // simulate componentWillMount with useEffect() hook
    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [dispatch]);

    return (
        // use container to center everything
        <Container maxwidth="lg">
            <AppBar className={styleClasses.appBar} position="static" color="inherit">
                {/* gives a nice font to textual elements */}
                <Typography className={styleClasses.heading} variant="h2" align="center">Memories</Typography>
                <img className={styleClasses.image} src={memories} alt="memories" width="100" height="100"/>
            </AppBar>
            {/* use Grow for animation */}
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
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