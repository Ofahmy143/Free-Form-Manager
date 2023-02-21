import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './form-body.component.css'
import Question from './question/question.component'
import Title from './title/title.component'
import {FormQuestion} from '../../../types/form-body'

function FormBody() {
  const [questions , setQuestions] = useState<FormQuestion[]>([{
    key:-1,
    title:'Noname',
    type:'Essay',
    input: ['This is a place holder for essay' ,'This is the second placeholder']
  }])

  useEffect(()=>{
    console.log(questions)
  },[questions])
  function handleAddQuestion(){
    setQuestions([...questions,{key: questions.length,title:"Untitled",type:"MCQ",input:['This is first Placeholder']}])
  }
  return (
    <div className="form-body">
      <Title 
      title='Untitled'
      description='empty for now'
      />
      {questions.map((question: FormQuestion,index: number)=>(
        <Question 
        key={index}
        id={index}
        question = {question}
        questionsArr = {questions}
        OnQuestionChange = {setQuestions}
        />
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      
    </div>
  )
}

export default FormBody
