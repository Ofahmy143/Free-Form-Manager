import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./form-body.component.css";
import Question from "./question/question.component";
import Title from "./title/title.component";
import { Form, FormQuestion } from "../../../types/form-body";
import { saveAs } from "file-saver";
import { faCode, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AddFormQuestion } from "../../../redux/FormSlice";
import FormBodyExport from "./exported-form-body.component";

type props = {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
};

function FormBody() {

  const Formtitle = useAppSelector((state)=> state.FormReducer.title)
  const FormQuestions = useAppSelector((state)=> state.FormReducer.questions)
  const Dispatch = useAppDispatch()

  useEffect(()=>{
    console.log(FormQuestions)
  },[FormQuestions])

  function handleAddQuestion(){
   Dispatch(AddFormQuestion())
  }
  
  function handleExportForm() {
    console.log(document.documentElement.innerHTML);
    let formHTML = document.documentElement.innerHTML;
    let section = document.querySelector('.lowerFormbodySection')
    // formHTML = formHTML.replace(section.innerHTML, '');
    const blob = new Blob([formHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "example.html";
    link.click();
  }

  function handleSaveForm() {
    let formJson: Form = {
      title: Formtitle,
      questions: FormQuestions,
    };
    console.log(formJson);
    // saveAs(new Blob([formJson], { type: "application/json" }), "form.json");
  }

  // function handleAddQuestion() {
  //   let questions = form.questions;
  //   setForm({
  //     ...form,
  //     questions: [
  //       ...questions,
  //       {
  //         key: questions.length,
  //         title: "Untitled",
  //         type: "MCQ",
  //         input: ["This is first Placeholder"],
  //       },
  //     ],
  //   });
  //   window.scrollTo(0, document.body.scrollHeight);
  // }



  return (
    <div className="form-body">
      <Title   />
      { Array.isArray(FormQuestions) && FormQuestions.map((question: FormQuestion, index: number) => (
        <Question
          key={Math.floor(Math.random()*1000 + 1)}
          id={index}
        />
      ))}
      <section className="lowerFormbodySection row">
        <button className="AddQuestionButton" onClick={handleAddQuestion}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button className="saveJsonButton" onClick={handleSaveForm}>
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button className="exportHtmlButton" onClick={handleExportForm}>
          <FontAwesomeIcon icon={faCode} />
        </button>
      </section>
      <section className="Example-export">
        <FormBodyExport actionLink={"localhost"} Form={{title: Formtitle , questions: FormQuestions}} />

      </section>
    </div>

  );
}

export default FormBody;

