import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './form-body.component.css'
import Question from './question/question.component'
import Title from './title/title.component'
import {Form, FormQuestion} from '../../../types/form-body'
import { saveAs } from 'file-saver';
import { faCode, faPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type props = {
  form: Form,
  setForm: React.Dispatch<React.SetStateAction<Form>>
}

function FormBody({form, setForm} : props) {
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
    window.scrollTo(0, document.body.scrollHeight);

  }
  return (
    <div className="form-body">
      <Title 
      form={form}
      OnQuestionChange = {setForm}
      
      />
      {form.questions.map((question: FormQuestion,index: number)=>(
        <Question 
        key={index}
        id={index}
        form ={form}
        question = {question}
        questionsArr = {form.questions}
        OnQuestionChange = {setForm}
        />
      ))}
      <section className='lowerFormbodySection'>
      <button className='AddQuestionButton' onClick={handleAddQuestion}>
      <FontAwesomeIcon icon={faPlus} />
      </button>
      <button className='saveJsonButton' onClick={handleSaveForm} >
      <FontAwesomeIcon icon={faSave} />
      </button>
      <button className='exportHtmlButton' onClick={handleExportForm}>
      <FontAwesomeIcon icon={faCode} />
      </button>
      </section>
      
    </div>
  )
}

export default FormBody
