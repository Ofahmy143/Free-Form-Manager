import "./choice.component.css";

import { useEffect, useState } from "react";
import { Form, FormQuestion } from "../../../../../types/form-body";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

type props = {
  id: number;
  form: Form;
  questionID: number;
  choiceOption: string;
  questionsArr: FormQuestion[];
  OnQuestionChange: React.Dispatch<React.SetStateAction<Form>>;
  type: string;
};
function Choice({
  id,
  form,
  questionID,
  choiceOption,
  questionsArr,
  OnQuestionChange,
  type,
}: props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    let questionsShallowCopy = [...questionsArr];
    let questionShallowCopy = { ...questionsArr[questionID] };
    questionShallowCopy.input[id] = event.target.value;
    questionsShallowCopy[questionID] = questionShallowCopy;
    OnQuestionChange({ ...form, questions: questionsShallowCopy });
  }
  function handleChoiceDeletion() {
    let questionsShallowCopy = [...questionsArr];
    let questionShallowCopy = { ...questionsArr[questionID] };
    // console.log("first test")
    // console.log(id)
    // console.log(questionID)

    // console.log(questionShallowCopy.input)
    questionShallowCopy.input = questionShallowCopy.input.filter(
      (input, index) => index !== id
    );
    // console.log(questionShallowCopy.input)
    questionsShallowCopy[questionID] = questionShallowCopy;
    // console.log(questionsShallowCopy[questionID].input)

    OnQuestionChange({ ...form, questions: questionsShallowCopy });
    // console.log(id)
  }
  // useEffect(()=>{
  //     // console.log(content)
  //     console.log(key)
  // },[content])
  return (
    <div className="Choice">
      <input
        className={type === "MCQ" ? "form-checkbox" : "form-radio"}
        type={type === "MCQ" ? "checkbox" : "radio"}
        name="PH"
        disabled
      />

      <input
        className="form-control"
        id="content"
        type="text"
        placeholder="Place holder"
        value={choiceOption}
        onChange={handleChange}
      />

      {/* <button onClick={handleChoiceDeletion} className="tttttttttt">
        </button> */}
      <FontAwesomeIcon
        className="faIcon"
        icon={faDeleteLeft}
        color={"#1b1c1d"}
        size={"1x"}
        onClick={handleChoiceDeletion}
      ></FontAwesomeIcon>
      {/* <span className='circle' onClick={handleChoiceDeletion}>
            -
        </span> */}
    </div>
  );
}

export default Choice;
