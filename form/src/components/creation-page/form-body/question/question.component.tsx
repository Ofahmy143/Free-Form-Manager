import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './question.component.css'
import {FormQuestion} from '../../../../types/form-body'
import Choice from './choice/choice.component'

type props = {
  id: number,
  question: FormQuestion,
  questionsArr:FormQuestion[],
  OnQuestionChange: React.Dispatch<React.SetStateAction<FormQuestion[]>>
}

function Question({id, question,questionsArr, OnQuestionChange}:props) {
  // const [choices, setChoices] = useState<string[]>(question.input)
  // function handleAddOptions(){
  //   setChoices([...choices,'Place Holder'])
  // }
  // function handleOptionDelete(event: React.ChangeEvent<HTMLInputElement>){
  //   console.log(Number(event.target.value))
  //   setChoices(choices.filter((choice,i) => i !==  Number(event.target.value)));
  // }
  function handleAddOptions(){
    let questionsShallowCopy = [...questionsArr]
    let questionShallowCopy = {...questionsArr[id]}
    // console.log("first test")
    // console.log(id)
    // console.log(questionShallowCopy)
    questionShallowCopy.input = [...questionShallowCopy.input , `This is placholder number ${questionShallowCopy.input.length}`]
    // console.log(questionShallowCopy)
    questionsShallowCopy[id] = questionShallowCopy;
    OnQuestionChange(questionsShallowCopy)

  }

  function handleQuestionDeletion(){
    let questionsShallowCopy = [...questionsArr]
    // let questionShallowCopy = {...questionsArr[id]}
    questionsShallowCopy = questionsShallowCopy.filter((input,index) => index !== id)
    OnQuestionChange(questionsShallowCopy)

  }
  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>){
    // console.log(e.target.value)
    let questionsShallowCopy = [...questionsArr];
    let questionShallowCopy = {...questionsArr[id]};
    questionShallowCopy.type = e.target.value;
    questionShallowCopy.input = ["This is the new place holder"]
    console.log("This is the test")
    console.log(questionsShallowCopy)
    console.log(questionShallowCopy.type)
    console.log(questionShallowCopy.input)
    questionsShallowCopy[id] = questionShallowCopy
    console.log(questionsShallowCopy)
    console.log("This is the test")
    OnQuestionChange(questionsShallowCopy)

  }

  // useEffect(()=>{
  //   console.log(question)
  // })
  // useEffect(()=>{
  //   console.log(choices)
  // },[choices])

  return (
    <div className="Question">
      <section>
        <input type="text" value={question.title} />
        <select name="input-options" id="input" value={question.type} onChange={handleTypeChange}>
          <option value="MCQ">Multiple Choice</option>
          <option value="SCQ" >Single Choice</option>
          <option value="Essay">Essay Answer</option>
        </select>
      </section>
      <section>
        {question.type === 'Essay' &&(
          <textarea name="" id=""></textarea>
        )}
        {question.type === 'MCQ' &&(
          <div id="choices">
            {question.input.map((option,index) =>(
              <>
            <Choice 
            questionsArr={questionsArr}
            questionID={id}
            OnQuestionChange={OnQuestionChange}
            id={index}
            key={index}
            choiceOption={option}
            />
            </>
            ))}
            <br />
            <button onClick={handleAddOptions}>Add Option</button>
            <button onClick={handleQuestionDeletion}>Delete</button>
          </div>

        )}
        {question.type === 'SCQ' &&(
          <textarea name="" id=""></textarea>
        )}
      </section>
    </div>
  )
}

export default Question
