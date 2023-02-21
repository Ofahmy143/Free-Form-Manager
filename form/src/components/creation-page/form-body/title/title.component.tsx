import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './title.component.css'
import {FormTitle} from '../../../../types/form-body'



function Title({title,img, description}: FormTitle) {

  return (
    <div className="Title">
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
  )
}

export default Title
