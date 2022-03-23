import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'; 
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setPostId, deletePost, likePost } from '../../../actions/posts';
import Likes from './Likes';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
    const postStyles = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const openPost = () => navigate(`/posts/${post._id}`)

    return (
        <Card className={postStyles.card} raised elevation={6}>
            <ButtonBase className={postStyles.cardAction}>
                <CardMedia className={postStyles.media} image={post.selectedFile} title={post.title} onClick={openPost}/>
                
                <div className={postStyles.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                
                <div className={postStyles.overlay2}>
                    {/* Do not show button if current user is not creator of post */}
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                    (<Button style={{color: 'white'}} size="small" onClick={() => dispatch(setPostId(post._id))}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>)
                    }
                </div>
                <div className={postStyles.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag}`)}</Typography>
                </div>
                <Typography className={postStyles.title} variant="h5" gutterBottom>{post.title}</Typography>
                
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent> 
            </ButtonBase>
            <CardActions className={postStyles.cardActions}>
                <Button size="small" color="primary" disabled={!user} onClick={() => dispatch(likePost(post._id))}>
                    <Likes post={post} user={user}/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    &nbsp; Delete 
                </Button>
                )}    
            </CardActions>
        </Card>
    );
};

export default Post;