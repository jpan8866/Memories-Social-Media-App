import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getPosts } from '../actions/posts';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from "./paginationStyles";

const Paginate = ({ page }) => {
     const styleClasses = useStyles();
     const dispatch = useDispatch();
     const totalPages = useSelector(state => state.posts.totalPages)

     // fetch post everytime the page changes (eg switch page)
    useEffect(() => {
        if(page) dispatch(getPosts(page));
    }, [page, dispatch]);

    return (
        <Pagination
            classes = {{ ul: styleClasses.ul }}
            count = {totalPages}
            page = {Number(page) || 1}
            variant = 'outlined'
            color = 'primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )} // change the url parameter page, then home component will pass down to paginate component the page number to re-render
        />    
    )
};

export default Paginate;