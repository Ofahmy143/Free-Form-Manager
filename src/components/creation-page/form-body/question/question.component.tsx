import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./question.component.css";
import { Form, FormQuestion } from "../../../../types/form-body";
import Choice from "./choice/choice.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPlusSquare,
  faSquareCheck,
  faCircleDot,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

type props = {
  id: number;
  form: Form;
  question: FormQuestion;
  questionsArr: FormQuestion[];
  OnQuestionChange: React.Dispatch<React.SetStateAction<Form>>;
};

function Question({
  id,
  form,
  question,
  questionsArr,
  OnQuestionChange,
}: props) {

  function handleAddOptions() {
    let questionsShallowCopy = [...questionsArr];
    let questionShallowCopy = { ...questionsArr[id] };
    // console.log("first test")
    // console.log(id)
    // console.log(questionShallowCopy)
    questionShallowCopy.input = [
      ...questionShallowCopy.input,
      `This is placholder number ${questionShallowCopy.input.length}`,
    ];
    // console.log(questionShallowCopy)
    questionsShallowCopy[id] = questionShallowCopy;
    OnQuestionChange({ ...form, questions: questionsShallowCopy });
  }

  function handleQuestionDeletion() {
    let questionsShallowCopy = [...questionsArr];
    // let questionShallowCopy = {...questionsArr[id]}
    questionsShallowCopy = questionsShallowCopy.filter(
      (input, index) => index !== id
    );

    OnQuestionChange({ ...form, questions: questionsShallowCopy });
  }
  function handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    // console.log(e.target.value)
    event.preventDefault();
    let questionsShallowCopy = [...questionsArr];
    let questionShallowCopy = { ...questionsArr[id] };
    questionShallowCopy.type = event.target.value;
    questionShallowCopy.input = ["This is the new place holder"];
    // console.log("This is the test")
    // console.log(questionsShallowCopy)
    // console.log(questionShallowCopy.type)
    // console.log(questionShallowCopy.input)
    questionsShallowCopy[id] = questionShallowCopy;
    // console.log(questionsShallowCopy)
    // console.log("This is the test")
    OnQuestionChange({ ...form, questions: questionsShallowCopy });
  }

  function handleQuestionTitleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    let questionsShallowCopy = [...questionsArr];
    let questionShallowCopy = { ...questionsArr[id] };
    questionShallowCopy.title = event.target.value;
    questionsShallowCopy[id] = questionShallowCopy;
    OnQuestionChange({ ...form, questions: questionsShallowCopy });
  }

  return (
    <div className="Question">
      <section className="upperQuestionSection">
        <input
          className="form-control"
          type="text"
          value={question.title}
          onChange={handleQuestionTitleChange}
        />

        <select
          className="form-select"
          name="input-options"
          id="input"
          value={question.type}
          onChange={handleTypeChange}
        >
          <option className="selectOption" value="MCQ" data-icon="check-circle">
            {" "}
            &#xf14a; &nbsp; M u l t i p l e &nbsp;C h o i c e
          </option>
          <option className="selectOption" value="SCQ" data-icon="times-circle">
            &#xf192; &nbsp; S i n g l e &nbsp; C h o i c e
          </option>
          <option className="selectOption" value="Essay">
            {" "}
            &#xf1dd; &nbsp;E s s a y &nbsp; A n s w e r
          </option>
          <option className="selectOption" value="SA">
            {" "}
            &#xf038; &nbsp;S h o r t &nbsp; A n s w e r
          </option>
        </select>
      </section>
      <section className="answerFields">
        {question.type === "Essay" && (
          <textarea className="form-control" name="" id="" disabled></textarea>
        )}
        {question.type === "SA" && (
          <input className="form-control" name="" id="" disabled />
        )}
        {(question.type === "MCQ" || question.type === "SCQ") && (
          <div id="choices">
            {question.input.map((option, index) => (
              <>
                <Choice
                  questionsArr={questionsArr}
                  form={form}
                  questionID={id}
                  OnQuestionChange={OnQuestionChange}
                  id={index}
                  key={index}
                  choiceOption={option}
                  type={question.type}
                />
              </>
            ))}
          </div>
        )}
        <section className="lowerQuestionSection">
          {(question.type === "MCQ" || question.type === "SCQ") && (
            <button className="btn " onClick={handleAddOptions}>
              <FontAwesomeIcon
                icon={faPlusSquare}
                color={"#1b1c1d"}
                size={"1x"}
              />
              <span> Option</span>
            </button>
          )}
          <button className="btn deleteBtn" onClick={handleQuestionDeletion}>
            <FontAwesomeIcon
              className="deleteIcon"
              icon={faTrashCan}
              color={"red"}
              size={"1x"}
            />
          </button>
        </section>
      </section>
    </div>
  );
}

export default Question;
