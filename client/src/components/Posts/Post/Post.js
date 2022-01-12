import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'; 
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setPostId, deletePost, likePost } from '../../../actions/posts';

const Post = ({ post }) => {
    const postStyles = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={postStyles.card}>
            <CardMedia className={postStyles.media} image={post.selectedFile} title={post.title} />
            <div className={postStyles.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={postStyles.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => dispatch(setPostId(post._id))}>
                     <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            <div className={postStyles.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={postStyles.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={postStyles.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    &nbsp; Delete 
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;