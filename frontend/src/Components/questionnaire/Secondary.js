import  React,{ useCallback, useEffect, useState } from "react";

import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import Axios from "axios"
import Spinner from '../../Containers/Spinner/Spinner';
import AudioRecorder from "./AudioRecorder";

StylesManager.applyTheme("modern");

function Secondary() {
  const [surveyJson,setSurveyJson] = useState({ elements:[]})

  const [isloading,setIsloading] = useState(true)
  
  let survey = new Model(surveyJson)

  useEffect(() => {
    Axios.get('/question/secondary?s=10')
    .then(doc => {
        console.log(doc)
        
        setIsloading(false)
        setSurveyJson({ elements: doc.data })
    })

   
  },[])

  const alertResults = useCallback((sender) => {
    console.log(sender.data)
    const results = JSON.stringify(sender.data);
    alert(results);
    
  }, []);
  
  if (isloading) {
    return (
        <>
            <div className="container loading">
                <div className="mar-20">
                    <Spinner />
                </div>
            </div>
        </>
    )
  }
  
  survey.focusFirstQuestionAutomatic = false;
  survey.onComplete.add(alertResults);

  return (
    <>
      <AudioRecorder />
      <Survey model={survey} />
    </>
    
  );
}

export default Secondary;
