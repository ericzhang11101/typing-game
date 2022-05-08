import React from 'react'
import "./info-overlay.css"

export default function InfoOverlay(props) {
    const {text} = props;
  return (
    <div className="overlay">
        {text}
    </div>
  )
}
