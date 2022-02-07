import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import useStyles from "./paginationStyles";

const Paginate = () => {
     const styleClasses = useStyles();
    
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