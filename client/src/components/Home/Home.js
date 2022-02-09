import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Paginate'

import useStyles from '../../styles';

function useQuery() {
    // location.search returns a string containing all query parameters
    // combine with URLSearchParams to allow getting the exact parameter you want
    return new URLSearchParams(useLocation().search);
}

function Home() {
     // Note that useStyles() returns an object containing 3 style items for appBar, heading and image
    // use them for below respective elements:
    const styleClasses = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1; // if no page, then currently on page 1
    const searchQuery = query.get('searchQuery');
    const navigate = useNavigate();
    const [searchBar, setSearchBar] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if(searchBar.trim()) {
            // dispatch action => fetch posts relevant to search (need to modify database to search these posts)
            // need redux, so that other component's states are automatically maintained coherently
        }
        else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') { // 13 means enter key
            // search post
            searchPost();
            console.log('posts searched.');
        }
    }

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        /* use Grow for animation */
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={styleClasses.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    {/* posts take full screen for xtra small screen, and 6 out of 12 spaces on small/medium devices, since big enough to see posts */}
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={styleClasses.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={searchBar}
                                onKeyPress={handleKeyPress} // search posts when press enter
                                onChange={(e) => {setSearchBar(e.target.value)}}
                                />
                            <ChipInput 
                                style={{ margin: '10px 0 '}}
                                value={ tags }
                                onAdd={handleAddChip}
                                onDelete={handleDeleteChip}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={styleClasses.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form />
                        <Paper elevation={6}>
                            <Paginate className={styleClasses.pagination} />
                        </Paper> 
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
