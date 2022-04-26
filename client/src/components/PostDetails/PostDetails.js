import { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

import useStyles from './styles';

const PostDetails = () => {

    // get states
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postStyles = useStyles();
    const { id } = useParams();

    // fetch post from BE and put in redux instead
    // const [post] = useState(posts.find(p => p._id === id))

    // fetch the post to display
    useEffect(() => {
      dispatch(getPost(id));
    }, [id, dispatch]);

    // use a second useEffect to fetch posts with same tags, and populate posts in redux store
    // re-fetch if post changes
    useEffect(() => {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }, [post, dispatch]);

    const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id); // post itself cannot be in recommended posts

    if (!post) {
      return <p>No post!</p>;
    };

    if (isLoading) {
        return (
        <Paper elevation={6} className={postStyles.loadingPaper}>
            <CircularProgress size="7em"/>
        </Paper>
        )
    };

    const openPost = (_id) => {
      navigate(`/posts/${_id}`);
    };

    return (
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
          <div className={postStyles.card}>
            <div className={postStyles.section}>
              <Typography variant="h3" component="h2">{post.title}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
              <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
              <Typography variant="h6">Created by: {post.name}</Typography>
              <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <CommentSection post={post} />
            </div>
            <div className={postStyles.imageSection}>
              <img className={postStyles.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} size="7em"/>
            </div>
          </div>
      {recommendedPosts && (
        <div className={postStyles.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={postStyles.recommendedPosts}>
            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
              <Typography gutterBottom variant="h6">{title}</Typography>
              <Typography gutterBottom variant="subtitle2">{name}</Typography>
              <Typography gutterBottom variant="subtitle2">{message}</Typography>
              <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
              <img src={selectedFile} width="200px" alt=""/>
            </div>
          ))}
          </div>
        </div>
      )}
      </Paper>
    );
};

export default PostDetails;
