import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Paginate'
import { getPostsBySearch } from '../../actions/posts';
import { useDispatch } from 'react-redux';

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

    // if user pastes in link with search params, get it and return the appropriate result:
    const searchQuery = query.get('searchQuery'); // pass the search params to Paginate component, where we fetch the result
    const tagsQuery = query.get('tags');
    const navigate = useNavigate();
    const [searchBar, setSearchBar] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        // check that they exist, otherwise returns empty posts array and will display "no posts" instead of loading circle
        if(searchQuery || tagsQuery) {
            dispatch(getPostsBySearch({
                search: searchQuery,
                tags: tagsQuery // already a string
            }))
        }
    }, [searchQuery, tagsQuery, dispatch])

    const searchPost = () => {
        if(searchBar.trim() || tags) { // trim to ensure its not an empty space, note not in-place
            // dispatch action => fetch posts relevant to search (need to modify database to search these posts)
            // need redux, so that other component's states are automatically maintained coherently
            dispatch(getPostsBySearch({
                search: searchBar,
                tags: tags.join(',') // cannot pass array thru url parameters
            }))
            // client side routing necessary so that url can be copied and pasted to display same search results
            navigate(`/posts/search?searchQuery=${searchBar || 'none'}&tags=${tags.join(',')}`);
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
            <Container maxWidth='100%' >
                <Grid className={styleClasses.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    {/* posts take full screen for xtra small screen, and 6 out of 12 spaces on small/medium devices, since big enough to see posts */}
                    <Grid item xs={12} sm={6} md={6} lg={9}>
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
                        {(!searchQuery && !tagsQuery) && (
                            <Paper elevation={6}>
                                <Paginate className={styleClasses.pagination} page={page}/>
                            </Paper> 
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
