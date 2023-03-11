import "./exported-form-body.component.css";
import { Form, FormQuestion } from "../../../types/form-body";
import { useEffect, useState } from "react";

function FormBodyExport({
  Form,
  actionLink,
}: {
  Form: Form;
  actionLink: string;
}) {
  const [error, setError] = useState<number>(0);
  useEffect(() => {
    console.log(error);
  }, [error]);
  function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let classValue = event.currentTarget.value.split(",")[0];
    let questionType = event.currentTarget.value.split(",")[1];
    if (questionType === "MCQ" || questionType === "SCQ") {
      let inputs = document.getElementsByClassName(
        classValue
      ) as HTMLCollectionOf<HTMLInputElement>;
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
      }
    }
    if (questionType === "Essay" || questionType === "SA") {
      let textareas = document.getElementsByClassName(
        classValue
      ) as HTMLCollectionOf<HTMLTextAreaElement>;
      // for (let i = 0; i < textareas.length; i++){
      let container = textareas[0].parentElement
        ?.parentElement as HTMLDivElement;
      // if(textareas[0].onchange !== null){
      // }
      container.classList.add("requiredBorder");
      setError(error + 1);
      textareas[0].value = "";
      textareas[0].dispatchEvent(new Event("change"));
      // }
    }
  }

  function  checkAnswers() {
    // event.preventDefault();
   let myForm = document.getElementById("myForm") as HTMLFormElement;
   let formData = new FormData(myForm);
   for(let i=0 ;i<Form.questions.length;i++){
    let ErrEl = document.getElementsByName(`question${i}Answer`)[0].parentElement?.parentElement?.parentElement as HTMLDivElement;
    if(
     (formData.getAll(`question${i}Answer`).length === 0 || formData.getAll(`question${i}Answer`)[0] === "")
     && Form.questions[i].required
     && !ErrEl.classList.contains("requiredBorder")){
      setError(error + 1);
      ErrEl.classList.add("requiredBorder");
      ErrEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      ErrEl.style.scrollMarginTop = "20px";
     }else{
     }
   }
  }

  function handlesubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let questions = document.getElementsByClassName(
      "requiredFlag"
    ) as HTMLCollectionOf<HTMLDivElement>;
    let myForm = document.getElementById("myForm") as HTMLFormElement;
    let errorAlert = document.getElementById("error") as HTMLDivElement;



    //Check answers
    let okayFlag =0;
   let formData = new FormData(myForm);
   for(let i=0 ;i<Form.questions.length;i++){
    let ErrEl = document.getElementsByName(`question${i}Answer`)[0].parentElement?.parentElement?.parentElement as HTMLDivElement;
    if(
     (formData.getAll(`question${i}Answer`).length === 0 || formData.getAll(`question${i}Answer`)[0] === "")
     && Form.questions[i].required
     && !ErrEl.classList.contains("requiredBorder")){
      setError(error + 1);
      ErrEl.classList.add("requiredBorder");
      ErrEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      ErrEl.style.scrollMarginTop = "20px";
      break;
     }else{
      okayFlag++;
     }
   }



    

    if (okayFlag === Form.questions.length) {
      // console.log(checkAnswers())
      // console.log("Check answer is ")
      // console.log(checkAnswers())
        console.log("FORM SUBMITTED")
        // myForm.submit();

    } else {
      console.log("FORM STOPPED")

    //   errorAlert.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //     inline: "nearest",
    //   });
    //   errorAlert.style.scrollMarginTop = "20px";
    }

  }
  function handleRequiredBlur(
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) {
    event.preventDefault();
    console.log(event.currentTarget.parentElement?.parentElement?.parentElement);
    let myForm = document.getElementById("myForm") as HTMLFormElement;
    let currentEl = event.currentTarget as (HTMLInputElement|HTMLTextAreaElement);
    let formData = new FormData(myForm);
    let questionNumber = Number(currentEl.name.split("Answer")[0].split("question")[1]);
      let ErrEl = event.currentTarget.parentElement?.parentElement?.parentElement as HTMLDivElement;
     if(
      (formData.getAll(currentEl.name).length === 0 || formData.getAll(currentEl.name)[0] === "")
      && Form.questions[questionNumber].required
      && !ErrEl.classList.contains("requiredBorder")){
       setError(error + 1);
       ErrEl.classList.add("requiredBorder");
      }else if(ErrEl.classList.contains("requiredBorder") && formData.getAll(currentEl.name).length !== 0 && formData.getAll(currentEl.name)[0] !== ""){
      setError(error - 1);
      ErrEl.classList.remove("requiredBorder");
      }
  }
  function handleWebShare(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    if(navigator.share){
      navigator.share({
        title: Form.title.title,
        text: "Check out this form",
        url: window.location.href
      }).then(() => {
        console.log("Thanks for sharing!")
      })
      .catch(console.error)
    }else{
      console.log("Web Share API not supported")
    }
  }

  return (
    <form method="POST" className="export-form-body" id="myForm">
      {error > 0 && (
        <section id="error">
          <h6>Please fill out all the required Fields</h6>
        </section>
      )}
      <section id="export-form-title">
        <h1>{Form.title.title}</h1>
        <p>{Form.title.description}</p>
      </section>
      <section id="export-form-questions">
        {Form.questions.map((question, questionIndex) => (
          <div className="export-question requiredFlag">
            <h5>
              {question.title}{" "}
              <span className="required">{question.required ? "*" : ""}</span>{" "}
            </h5>
            {question.description && <p>{question.description}</p>}
            <section id="formAnswers">
              {(question.type === "MCQ" || question.type === "SCQ") &&
                question.input.map((choice, index) => (
                  <div className="export-choice">
                    <input
                      onInput={
                        question.required ? handleRequiredBlur : undefined
                      }
                      name={`question${questionIndex}Answer`}
                      value={choice}
                      type={question.type === "MCQ" ? "checkbox" : "radio"}
                      className={`form-check-input question${questionIndex}Result`}
                    />
                    <label>{choice}</label>
                  </div>
                ))}
              {question.type === "SA" && (
                <section className="export-SA"> 

                <input
                  onInput={question.required ? handleRequiredBlur : undefined}
                  name={`question${questionIndex}Answer`}
                  id="export-text"
                  type="text"
                  className={`form-control question${questionIndex}Result`}
                  />
                </section>
              )}
              {question.type === "Essay" && (
                <section className="export-Essay">
                <textarea
                  onInput={question.required ? handleRequiredBlur : undefined}
                  name={`question${questionIndex}Answer`}
                  id="export-essay"
                  className={`form-control question${questionIndex}Result`}
                  />
                  </section>
              )}
            </section>
            <button
              className="btn btn-dark"
              value={`question${questionIndex}Result,${question.type}`}
              onClick={handleClear}
              // onClick={checkAnswers}
            >
              Clear
            </button>
          </div>
        ))}
      </section>
      <section>
        <button
          type="submit"
          id="submitBtn"
          onClick={handlesubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </section>
    </form>
  );
}

export default FormBodyExport;
