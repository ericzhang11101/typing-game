import {useState, useEffect} from 'react'
import './App.css';
import Axios from 'axios'
import Header from './components/Header.js'
import Game from './components/Game.js'
import Rules from './components/Rules.js'


function App() {
  useEffect(() => {
    Axios
    .get('https://typing-game-backend.herokuapp.com/word/word') // wakey wakey mr api 
    .then((res) => {
      setDoneLoading(res.data)
    })

  }, []);

  const [showRules, setShowRules] = useState(true);
  const [doneLoading, setDoneLoading] = useState(false);

  return (
    <div className="App">
      <Header />
      <Game />
      {
        showRules
        &&
        <Rules 
          doneLoading={doneLoading}
          hideRules={() => {setShowRules(false)}}
        />
      }
    </div>
  );
}

export default App;
