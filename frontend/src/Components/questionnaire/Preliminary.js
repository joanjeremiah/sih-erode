import  React,{ useCallback, useEffect, useState } from "react";

import "survey-core/modern.min.css";
// import 'survey-core/survey.min.css';
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import Axios from "axios"
import Spinner from '../../Containers/Spinner/Spinner';

StylesManager.applyTheme("modern");

function Preliminary() {
  const [surveyJson,setSurveyJson] = useState({ elements:[]})

  const [isloading,setIsloading] = useState(true)
  
  let survey = new Model(surveyJson)

  useEffect(() => {
    Axios.get('/question/preliminary?s=10')
    .then(doc => {
        console.log(doc)
        
        setIsloading(false)
        setSurveyJson({ elements: doc.data })
    })
  },[])

  const alertResults = useCallback((sender) => {
    console.log(sender.data)
    setSurveyJson(pre => {
      console.log(pre)
      let score = 0;
      pre.elements.forEach(el => {
        if(el.name in sender.data){
          if(el.isPositive){
            if(sender.data[el.name]){
              score++;
            }
            else{
              score--;
            }
          }
          else{
            if(sender.data[el.name]){
              score--;
            }
            else{
              score++;
            }
          }
        }
      })
      console.log(score)
      return pre
    })
    surveyJson.elements.forEach(element => {
      console.log(element)
    });
    
  }, [surveyJson.elements]);
  
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
    <Survey model={survey} />
  );
}

export default Preliminary;
