import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './title.component.css'
import { Form, FormTitle} from '../../../../types/form-body'

type props = {
  form: Form,
  OnQuestionChange: React.Dispatch<React.SetStateAction<Form>>
}


function Title({ form, OnQuestionChange}: props) {

  function handleFormTitleChange(event:React.ChangeEvent<HTMLInputElement>){
    event.preventDefault();
    let newTitle = event.target.value
    

    OnQuestionChange({...form, title: {...form.title, title: newTitle}})

  }

  function handleFormDescriptionChange(event:React.ChangeEvent<HTMLInputElement>){
    event.preventDefault();
    let newDescription = event.target.value

    OnQuestionChange({...form, title: {...form.title, description: newDescription}})

  }

  return (
    <div className="Title">
      <h1>
        <input value={form.title.title} onChange={handleFormTitleChange}/>
      </h1>
      <p>
      <input value={form.title.description} onChange={handleFormDescriptionChange}/>
      </p>
    </div>
  )
}

export default Title
