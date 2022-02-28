import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getPosts } from '../actions/posts';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from "./paginationStyles";

const Paginate = ({ page }) => {
     const styleClasses = useStyles();
     const dispatch = useDispatch();

     // fetch post everytime the page changes (eg switch page)
    useEffect(() => {
        dispatch(getPosts(page))
    }, [page]);

    return (
        <Pagination
            classes = {{ ul: styleClasses.ul }}
            count = {5}
            page = {1}
            variant = 'outlined'
            color = 'primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            )}
        />    
    )
};

export default Paginate;