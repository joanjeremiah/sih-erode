import React,{ useState } from 'react'
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

const AudioRecorder = () => {
    const [audioDetails,setAudioDetails] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: null,
            m: null,
            s: null,
        }
    })

    function handleAudioStop(data){
        console.log(data)
        setAudioDetails(data)
    }
    function handleAudioUpload(file) {
        console.log(file);
    }
    function handleRest(){
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
            h: null,
            m: null,
            s: null,
            }
        }
        setAudioDetails(reset)
    }

    function handleOnChange(value, name){
        console.log(value)
    }

    return (
        <Recorder
            record={true}
            title={"New recording"}
            audioURL={audioDetails.url}
            showUIAudio
            handleAudioStop={data => handleAudioStop(data)}
            handleOnChange={(value) => handleOnChange(value, 'firstname')}
            handleAudioUpload={data => handleAudioUpload(data)}
            handleReset={() => handleRest()} />
    )
}

export default AudioRecorder