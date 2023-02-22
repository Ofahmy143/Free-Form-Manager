// import './choice.component.css'

import { useEffect, useState } from "react"
import { FormQuestion } from "../../../../../types/form-body";

type props = {
    id: number,
    questionID:number,
    choiceOption: string,
    questionsArr: FormQuestion[],
    OnQuestionChange: React.Dispatch<React.SetStateAction<FormQuestion[]>>
    type: string


}
function Choice({id, questionID,choiceOption,questionsArr, OnQuestionChange, type}:props)  {
    const [content, setContent] = useState(choiceOption)
    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        let questionsShallowCopy = [...questionsArr]
        let questionShallowCopy = {...questionsArr[questionID]}
        questionShallowCopy.input[id] = event.target.value
        questionsShallowCopy[questionID] = questionShallowCopy;
        OnQuestionChange(questionsShallowCopy)

    }
    function handleChoiceDeletion(){

        let questionsShallowCopy = [...questionsArr]
        let questionShallowCopy = {...questionsArr[questionID]}
        // console.log("first test")
        // console.log(id)
        // console.log(questionID)
        
        // console.log(questionShallowCopy.input)
        questionShallowCopy.input = questionShallowCopy.input.filter((input,index) => index !== id)
        // console.log(questionShallowCopy.input)
        questionsShallowCopy[questionID] = questionShallowCopy;
        // console.log(questionsShallowCopy[questionID].input)

        OnQuestionChange(questionsShallowCopy)
        // console.log(id)
    }
    // useEffect(()=>{
    //     // console.log(content)
    //     console.log(key)
    // },[content])
  return (
    <div className="Choice">
        <input type={type === 'MCQ'? "checkbox" : "radio"} name="PH"/>

        <input id="content" type="text" placeholder="Place holder" value={choiceOption}onChange={handleChange}/>

        <button onClick={handleChoiceDeletion}>Delete</button>
    </div>
  )
}

export default Choice
