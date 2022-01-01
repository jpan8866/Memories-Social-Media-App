import logo from './logo.svg';
import './App.css';
import Button from "./Button.js";

function App() {

  const handleButton = () => {
    console.log('ok');
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {//<Button></Button> This puts the Button component here (Button.js)
          }
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={handleButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
