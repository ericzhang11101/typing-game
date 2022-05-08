import React from 'react'
import './game.css'
import GameEndRow from './GameEndRow'

export default function GameOverlayPopup(props) {
  const {
    resetGame,
    wordsTyped,
    wordScore,
    wordsPerMin,
    cpm,
  } = props

  return (
    <div className="game-end-overlay">
      <div className="game-end-container">
        <GameEndRow
          rowName={"words typed"}
          rowText={wordsTyped}
          text={text.wordsTyped}
        />
        <GameEndRow
          rowName={"word score"}
          rowText={wordScore}
          text={text.wordScore}
        />
        <GameEndRow
          rowName={"wpm"}
          rowText={wordsPerMin}
          text={text.wordsPerMin}
        />
        <GameEndRow
          rowName={"cpm"}
          rowText={cpm}
          text={text.cpm}
        />
        <div className="game-end-actions">
          <button onClick={resetGame}>play again</button>
          <button onClick={() => {
            navigator.clipboard.writeText(
              "⌨️Typing Game⌨️\n" +
              "Word Score: " + wordScore + "\n" +
              "Words Typed: " + wordsTyped + "\n" +
              "Words per minute: " + wordsPerMin + "\n" +
              "Clicks per minute: " + cpm + "\n"  
            )}
            }>share</button>
        </div>
        
      </div>
    </div>
  )
}

const text = {
  wordsTyped: "Words typed includes all words, valid or not. Repeated words are counted.",
  wordScore: "Word score is determined by the number of valid words typed, along with how many times they are repeated.",
  wordsPerMin: "Words per minute is the number of valid words typed. Repeated words are counted.",
  cpm: "Clicks per minute is the total number of keystrokes pressed during the test."
}

