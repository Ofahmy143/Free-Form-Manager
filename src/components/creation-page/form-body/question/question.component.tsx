import { useEffect, useState, Fragment, ChangeEvent } from "react";
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
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  AddQuestionChoice,
  changeQuestionDescription,
  changeQuestionTitle,
  changeQuestionType,
  RemoveFormQuestion,
  ToggleQuestionRequired,
} from "../../../../redux/FormSlice";

type props = {
  id: number;
};

function Question({ id }: props) {
  console.log("IAm being rendered");
  const question = useAppSelector((state) => state.FormReducer.questions[id]);
  const Dispatch = useAppDispatch();
  const [questionTitle, setQuestionTitle] = useState<string>(question.title);
  const [questionDescription, setQuestionDescription] = useState<string>(
    question.description ? question.description : ""
  );
  const[required,setRequired] = useState<boolean>(question.required);

  useEffect(() => {
    setRequired(question.required);
  },[question.required])


  function handleQuestionDeletion() {
    Dispatch(RemoveFormQuestion(id));
  }
  function handleAddOptions() {
    Dispatch(AddQuestionChoice(id));
  }
  function handleQuestionTitleChange(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter")
      Dispatch(changeQuestionTitle({ questionID: id, text: questionTitle }));
  }
  function handleQuestionTitleChange2(
    event: React.FocusEvent<HTMLInputElement>
  ) {
    Dispatch(changeQuestionTitle({ questionID: id, text: questionTitle }));
  }
  function handleQuestionDescriptionChange(
    event: React.FocusEvent<HTMLTextAreaElement>
  ) {
    Dispatch(
      changeQuestionDescription({
        questionID: id,
        text: event.currentTarget.value,
      })
    );
  }

  function handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    Dispatch(changeQuestionType({ questionID: id, text: event.target.value }));
  }
  function handleRequired(event: React.FocusEvent<HTMLInputElement>){
    event.preventDefault();
    console.log(event.currentTarget.checked)
    Dispatch(ToggleQuestionRequired({questionID:id,required:event.currentTarget.checked}));
    // let label = document.getElementById(`question${id}Label`) as HTMLLabelElement;
    // if(event.currentTarget.checked){
    //   label.style.color = "red";
    //   // label.classList.add("required");
    // }else{
    //   // label.classList.remove("required");
    //   label.style.color = "#1b1c1d";

    // }

  }

  return (
    <div className="Question">
      <section className="upperQuestionSection">
        <input
          className="form-control"
          id="question-title"
          type="text"
          value={questionTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuestionTitle(e.target.value);
          }}
          onKeyUp={handleQuestionTitleChange}
          onBlur={handleQuestionTitleChange2}
        />
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  setQuestionDescription("Description");
                }}
              >
                Add description
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Add Image
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Add Video
              </a>
            </li>
          </ul>
        </div>

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
      {questionDescription && (
        <textarea
          className="form-control"
          id="question-description"
          value={questionDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setQuestionDescription(e.target.value);
          }}
          onBlur={handleQuestionDescriptionChange}
        />
      )}
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
                  questionID={id}
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
      <div className="form-check form-switch">
            <input
              className={`form-check-input `}
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={required}
              onClick={()=>{setRequired(!required)}}
              onBlur={handleRequired}
            />
            <label className={`form-check-label ${required? "required" : ""} `} id={`question${id}Label`}>Required</label>
          </div>
          {/* <div id="utilityBtns"> 
            <button className="utilityBtn">Img</button>
            <button className="utilityBtn">Img</button>
            <button className="utilityBtn">Img</button>
          </div> */}
    </div>
  );
}

export default Question;
