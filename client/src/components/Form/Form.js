import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { setPostId } from '../../actions/posts';

const Form = () => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    const formStyles = useStyles();
    const dispatch = useDispatch();
    const updateId = useSelector(state => state.posts.updateId);
    // monitor value of updateId to determine whether we want to display content in form for updating
    const postToUpdate = useSelector(state => updateId ? state.posts.posts.find(post => post._id === updateId) : null);
    // postToUpdate can either be post data, or be null, everytime it changes, we update the postData state (e.g. we want to display the post to update in the form during editing.)
    useEffect(() => {
        if(postToUpdate) setPostData(postToUpdate);
    }, [postToUpdate])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // if updateId is not null, then this is an update
        if(updateId) dispatch(updatePost(updateId, postData));
        else dispatch(createPost(postData));
        // note the current postData state is the final post to create when user clicks submit

        // clear the fields of the form after submitting and reset updateId
        clear();
    };

    // put th setPostId in clear() so that we can click clear to cancel edit
    const clear = () => {
        // set updateId back to null after updating
        dispatch(setPostId(null));
        // clear fields
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    };

    return (
        <Paper className={formStyles.paper}>
            <form autoComplete="off" 
            noValidate 
            className={`${formStyles.form} ${formStyles.root}`} 
            onSubmit={handleSubmit}>
                <Typography variant="h6">{updateId ? `Editing` : `Creating`} a Memory</Typography>
                <TextField 
                name="creator" 
                variant="outlined" 
                label="Creator" 
                fullWidth
                /* data from post will be stored in the state object postData, 
                and each object key will be a specific text field */
                value={postData.creator}
                onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                {/* We need to use spread to keep other properties of state postData intact,
                otherwise the other text fields will disappear and only creator will remain 
                Now repeat below for the other fields */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={formStyles.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        // destructuring base64
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} 
                    />
                </div>
                <Button className={formStyles.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;