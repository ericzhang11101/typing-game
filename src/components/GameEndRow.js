import React, {useState} from 'react'
import InfoOverlay from './InfoOverlay';

export default function GameEndRow(props) {
    const {rowName, rowText} = props;
    const [showOverlay, setShowOverlay] = useState(false)

    // const 
    return (
    <div className='game-end-row half-width'>
        <div className="result-row">
            <h1>{rowName}: </h1>
            <h1>{rowText}</h1>
        </div>
        <div>{/*placeholder*/}</div>  
        {/* <h1>percentile</h1> */}
        <button
            className="info-button"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
        >
            ?
            {
                showOverlay 
                &&
                <InfoOverlay
                    text={props.text}
                />
            }
        </button>
    </div>
  )
}
