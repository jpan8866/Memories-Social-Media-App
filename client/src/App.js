import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import useStyles from './styles';

const App = () => { //functional component

    const user = JSON.parse(localStorage.getItem('profile'));
    const styles = useStyles();

    return (
        <BrowserRouter>
            {/* use container to center everything */}
            <Container className={styles.appContainer}>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Navigate replace to="/posts" />} />
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" exact element={<PostDetails />} /> {/*post details path, :id means dynamic */}
                    <Route path="/auth" exact element={user?.result?.name ? <Navigate replace to="/posts" /> : <Auth />} /> {/* if user already signed in, then /auth goes back to /posts */}
                </Routes>
            </Container>   
        </BrowserRouter>
           
    )
}

export default App;