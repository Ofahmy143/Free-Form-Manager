import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './form-body.component.css'
import Question from './question/question.component'
import Title from './title/title.component'
import {Form, FormQuestion} from '../../../types/form-body'
import { saveAs } from 'file-saver';



function FormBody() {
  // const [questions , setQuestions] = useState<FormQuestion[]>([{
  //   key:-1,
  //   title:'Noname',
  //   type:'Essay',
  //   input: ['This is a place holder for essay' ,'This is the second placeholder']
  // }])
  // const [title, setTitle] = useState({
  //   title: 'Untitled',
  //   description: 'empty for now'
  // })
  const [form, setForm] = useState<Form>({
    title: {
      title: 'Untitled',
      description: 'empty for now'
    },
    questions : [
        {
          key:0,
          title:'Noname',
          type:'Essay',
          input: ['This is a place holder for essay' ,'This is the second placeholder']
        }
    ]
  })

  useEffect(()=>{
    console.log(form)
  },[form])

  function handleExportForm(){
    console.log(document.documentElement.innerHTML)
    let formHTML = document.documentElement.innerHTML;
    const blob = new Blob([formHTML],{type:'text/html'})
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'example.html';
    link.click()

  }

  function handleSaveForm(){


    let formJson = JSON.stringify(form,null,4)
    console.log(formJson)
    saveAs(new Blob([formJson] , {type:'application/json'}) , 'form.json')
  }

  function handleAddQuestion(){
    let questions = form.questions
    setForm({...form , questions: [...questions , {key: questions.length,title:"Untitled",type:"MCQ",input:['This is first Placeholder']}]})

  }
  return (
    <div className="form-body">
      <Title 
      title={form.title.title}
      description={form.title.description}
      />
      {form.questions.map((question: FormQuestion,index: number)=>(
        <Question 
        key={index}
        id={index}
        question = {question}
        questionsArr = {form.questions}
        OnQuestionChange = {setForm}
        />
      ))}
      <button onClick={handleSaveForm} >Save JSON</button>
      <button onClick={handleExportForm}>Export HTML</button>
      <button onClick={handleAddQuestion}>Add Question</button>
      
    </div>
  )
}

export default FormBody
