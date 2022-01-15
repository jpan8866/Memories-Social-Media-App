import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

const App = () => { //functional component

    return (
        <BrowserRouter>
            {/* use container to center everything */}
            <Container maxwidth="lg">
                <Navbar />
                <Routes>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Routes>
                <Home />
            </Container>   
        </BrowserRouter>
           
    )
}

export default App;