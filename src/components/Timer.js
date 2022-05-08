import React, {useEffect, useRef, useState} from 'react'

export default function Timer(props) {
    const {gameRunning, callback} = props;

    const [time, setTime ] = useState(60);

    function formatTime(time){
        return `${Math.floor(time/60)}:${("" + time%60).length === 2 ? time%60 : "0" + time%60}`
    }

    useInterval(
        () => {
            if (gameRunning && time > 0){
                setTime(time-1);
            }
            else{
                callback();
            }
        },
        gameRunning === true ? 1000 : null
    )

    return (
        <h3>time remaining: {formatTime(time)} </h3>
    )

    // source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    function useInterval(callback, delay) {
        const savedCallback = useRef()
    
        // Remember the latest callback.
        useEffect(() => {
        savedCallback.current = callback
        }, [callback])
    
        // Set up the interval.
        useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
        }, [delay])
    }
}
