import { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { commentPost, deleteComment } from '../../actions/posts';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';

const CommentSection = ({ post }) => {
    const commentStyles = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch()
    const commentsRef = useRef();

    // get user info of commenter
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleClick = async () => {
        const commentToPost = `${user.result.name}: ${comment}:${user.result?._id || user.result?.googleId}`;
        // dispatch w redux; we return the updated comment, need to await on the value returned (async)
        const updatedComments = await dispatch(commentPost(commentToPost, post._id));
        // immediately update the comments so we see new comment on FE (otherwise need reload)
        setComments(updatedComments);
        // reset comment input box
        setComment('');
        // scroll to latest comment
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleDelete = async (comment) => {
        const updatedComments = await dispatch(deleteComment(comment, post._id))
        setComments(updatedComments);
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={commentStyles.commentsOuterContainer}>
                <div className={commentStyles.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <Typography gutterBottom variant="subtitle1" className={commentStyles.commentText}>
                                {/* user name in bold */}
                                <strong>{comment.split(': ')[0]}</strong> 
                                {comment.split(':')[1]}
                            </Typography>
                            {user && comment.split(':')[2] === (user.result?._id || user.result?.googleId) 
                                && <IconButton className={commentStyles.commentDeleteButton} aria-label="delete" size="small" onClick={() => handleDelete(comment)}>
                                    <DeleteIcon fontSize="small" />
                                   </IconButton>}
                        </div>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && 
                    <div style={{ width: '50%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Comment"
                            multiline
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>Comment</Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default CommentSection;