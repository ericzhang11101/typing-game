import React from 'react'
import './game.css'
import Timer from './Timer'
import WordDisplay from './WordDisplay'
import Axios from 'axios'
import GameOverPopup from './GameOverPopup'
import {useState, useEffect} from 'react';

export default function Game() {
    const [typedWords, setTypedWords ]  = useState([])
    const [currWord, setCurrWord] = useState("")
    const [gameRunning, setGameRunning] = useState(false)
    const [gameDone, setGameDone] = useState(false)
    const [rerenderKey, setRerenderKey] = useState(Date.now()) // force rerender
    const [score, setScore] = useState(0)
    const [wordCount, setWordCount] = useState({
        words: 0,
        valid: 0
    })
    const [keysClicked, setKeysClicked ] = useState(0)

    function handleNewWord(){
        const newWord = currWord;
        setCurrWord("")

        let valid
        let repeated = false;
        let wordScore = 0;

        const url = `https://typing-game-backend.herokuapp.com/word/${newWord}`
        Axios
        .get(url)
        .then((res) => {
            valid = res.data;
            if (res.data){ // valid word
                wordScore = calculateScore(newWord)*(newWord.length + 1)
                // half score for typed words 
                for (let word of typedWords){
                    if (word.word.toLowerCase() === currWord.toLowerCase()){
                        wordScore = wordScore/2
                        repeated = true;
                        break;
                    }
                }
                //update score
                wordScore = Math.floor(wordScore)
                setScore(score+wordScore)
            }

            setWordCount({
                words: wordCount.words + 1, 
                valid: wordCount.valid + (res.data ? 1 : 0)
            })
            
            setTypedWords([
                ...typedWords, 
                {
                    word: currWord,
                    valid,
                    score: wordScore,
                    repeated
                }
            ])
        })    
    }

    function handleKeystroke(event){
        setKeysClicked(keysClicked+1)
        const word = event.target.value;
        // backspace
        if (word.length === 0 && event.keyCode === 8 && typedWords.length){
            const prevWord = typedWords[typedWords.length - 1]
            setCurrWord(prevWord.word + ' ')
            setScore(score-prevWord.score)
            setTypedWords(typedWords.slice(0, typedWords.length-1))
            
        }
    }

    function handleTextChange(event){
        if (currWord === "" && typedWords.length === 0){ // start new game
            setGameRunning(true)
        }
        const word = event.target.value;
        const newCharCode = word.charCodeAt(word.length-1); // state async, need to keep up to date
        if (newCharCode === " ".charCodeAt(0) && word !== " " && word.charAt(word.length - 2) !== " "){
            handleNewWord()
        }
        else if (event.keyCode !== 8) { // doesnt update with spaces
            setCurrWord(word)
        }
    }

    function gameEnd(){
        setGameRunning(false)
        setGameDone(true)
    }

    function resetGame(){
        setTypedWords([])
        setCurrWord("")
        setGameDone(false)
        setRerenderKey(Date.now())
        setWordCount({
            words: 0,
            valid: 0
        })
        setKeysClicked(0)
        setScore(0)
    }

    return (
        <div className='game-container'>
            <div className='score-container'>
                <div>
                <Timer 
                    key={rerenderKey}
                    gameRunning={gameRunning}
                    callback={() => gameEnd()}
                />
                </div>
                <h3>score: {score}</h3>
                <h3>accuracy: {wordCount.valid ? (100*(wordCount.valid/wordCount.words)).toFixed(2) : 0}%</h3>
            </div>
            <div className='typed-text text'>
                <WordDisplay 
                    words={typedWords}
                />
            </div>
                <input  
                    type="text" 
                    className='typing-container text' 
                    value={currWord} 
                    onChange={handleTextChange}
                    onKeyDown={handleKeystroke}
                >  
                </input>
            {
                gameDone
                &&
                <GameOverPopup 
                    resetGame={resetGame}
                    wordsTyped={typedWords.length}
                    wordScore={score} // calculate based on sim, word length
                    wordsPerMin={wordCount.valid} // use some predetermined calculations
                    cpm={keysClicked} // state, keep track of it

                />
            }
        </div>
    )

    function calculateScore(){
        const prevWords = typedWords.slice(Math.max(0, typedWords.length - 3));

        if (prevWords.length === 0){
            return 1
        }
        
        // similarity score
        let simScore = 0;

        for (let word of prevWords){
            let individualSimScore = 0.5
            if (word.word !== currWord){ // 0 points for repeated within 3
                let diff = 0
                for (let char of currWord){
                    if (word.word.indexOf(char) === -1) diff ++ 
                }

                individualSimScore += (diff/currWord.length)

                simScore += individualSimScore
            }
        }
        return (simScore/ prevWords.length)


    }
}
