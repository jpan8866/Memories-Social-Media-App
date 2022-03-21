import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from '@material-ui/core';

import useStyles from './styles';

const Posts = () => {
    const postsStyles = useStyles();

    // ---------- the below doesnt seem necessary....

    // const dispatch = useDispatch();
    // const updateId = useSelector(state => state.posts.updateId);

    // Include updateId in bracket so that everytime its value changes, the posts are fetched
    // required when we make updates to a post. 
    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [dispatch, updateId]);
    // -------------

    const posts = useSelector(state => state.posts.posts) 
    // note 1st posts is the postsReducer, 2nd is the posts element of that state object (see postsReducer)
    const isLoading = useSelector(state => state.posts.isLoading)

    // no posts to show
    if(!posts?.length && !isLoading) return "No posts";

    return (
        // if no posts or if still loading (since async), display spinning circle
        // else display posts
        isLoading ? <CircularProgress /> : (
            <Grid className={postsStyles.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    // lg=3 so we have 4 per row (fraction of 12)
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        {/* send the post to the Post component as a prop */}
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;