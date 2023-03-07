import "./exported-form-body.component.css";
import { Form, FormQuestion } from "../../../types/form-body";

function FormBodyExport({ Form, actionLink }: { Form: Form, actionLink: string }) {
    function handleClear(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        let classValue =  event.currentTarget.value.split(',')[0];
        let questionType = event.currentTarget.value.split(',')[1];
        if(questionType === "MCQ" || questionType === "SCQ"){
            let inputs = document.getElementsByClassName(classValue) as HTMLCollectionOf<HTMLInputElement>
            for (let i = 0; i < inputs.length; i++){
                inputs[i].checked = false
            }
        }
        if(questionType === "Essay" || questionType === "SA"){
            let textareas = document.getElementsByClassName(classValue) as HTMLCollectionOf<HTMLTextAreaElement>
            for (let i = 0; i < textareas.length; i++){
                textareas[i].value = ""
            }
        }
    }

    
  return (
    <form action={actionLink} method="POST" className="export-form-body">
      <section id="export-form-title">
        <h1>{Form.title.title}</h1>
        <p>{Form.title.description}</p>
      </section>
      <section id="export-form-questions">
        {Form.questions.map((question, questionIndex) => (
          <div className="export-question">
            <h5>{question.title}</h5>
            {question.description && (
                <p>{question.description}</p>
            )}
            {(question.type === "MCQ" || question.type === "SCQ") && (
                question.input.map((choice, index) => (
                    <div className="export-choice">
                        <input type={question.type === "MCQ"? "checkbox" : "radio"} className={`question${questionIndex}Result`} name={`question${questionIndex}Result`}  />
                        <label>{choice}</label>
                    </div>
                )
            ))}
            {question.type === "SA" && (
                <input id="export-text" type="text"  className={`form-control question${questionIndex}Result`} name={`question${questionIndex}Result`}/>
            )}
            {question.type === "Essay" && (
                <textarea  id="export-essay" className={`form-control question${questionIndex}Result`} name={`question${questionIndex}Result`}/>

            )}
        <button className="btn btn-dark" value={`question${questionIndex}Result,${question.type}`} onClick={handleClear}>Clear</button>
          </div>
        ))}
      </section>
      <section>
        <button type="submit" className="btn btn-primary">Submit</button>
      </section>
    </form>
  );
}

export default FormBodyExport;
