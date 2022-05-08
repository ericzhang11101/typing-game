import React from 'react'
import './rules.css'

export default function Rules(props) {
  return (
    <div className="rules-overlay">
        <div className="rules-container">
            <h1>
                Typing Game Rules
            </h1>
            <ul>
                <li>
                    You can type any valid english word
                </li>
                <li>
                    There is a penalty for repeated words
                </li>
                <li>
                    Your score is based on the the number, length, and repitition of the words you type
                </li>
                <li>
                    Valid words will be <b>black</b>.
                </li>
                <li>
                    Valid words that are repeated are <b className="yellow-text">yellow</b>.
                </li>
                <li>
                    Invalid words are <b className="red-text">red</b>.
                </li>
            </ul>
            <div>
                {
                    props.doneLoading ? 
                    <button 
                        onClick={() => props.hideRules()}
                    >
                        ok
                    </button>
                    : 
                    <button>loading</button>
                }
            </div>
        </div>
    </div>
  )
}
