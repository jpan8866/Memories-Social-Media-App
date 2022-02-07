import { Container, Grow, Grid, Paper } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Paginate'

import useStyles from '../../styles';

function Home() {
     // Note that useStyles() returns an object containing 3 style items for appBar, heading and image
    // use them for below respective elements:
    const styleClasses = useStyles();
    
    return (
        /* use Grow for animation */
        <Grow in>
            <Container>
                <Grid className={styleClasses.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    {/* full screen for xtra small screen, and 7 out of 12 spaces on small/medium devices */}
                    <Grid item xs={12} sm={7}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form />
                        <Paper elevation={6}>
                            <Paginate />
                        </Paper> 
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
