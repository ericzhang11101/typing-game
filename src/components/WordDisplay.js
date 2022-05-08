import React from 'react'
import "./word-display.css"

export default function WordDisplay(props) {
    const { words } = props
  return (
    <div className="word-container">
        {
            words.map((word) => {
                const className = word.valid ? (word.repeated ? "repeated-word": "valid") : "invalid-word"
                return (
                    <p 
                        className={className}
                    >
                        {word.word}
                    </p>
                )
            })
        }
    </div>
  )
}
