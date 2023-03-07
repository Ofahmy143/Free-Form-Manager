import "./choice.component.css";

import { useEffect, useState } from "react";
import { Form, FormQuestion } from "../../../../../types/form-body";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { changeQuestionChoiceDescription, removeQuestionChoice } from "../../../../../redux/FormSlice";

type props = {
  id: number;
  questionID: number;
  choiceOption: string;
  type: string;
};
function Choice({
  id,
  questionID,
  choiceOption,
  type,
}: props) {
  const Dispatch = useAppDispatch();

  const [choiceDescription, setChoiceDescription] = useState<string>(choiceOption);

  function handleChoiceDescriptionChange(event : React.FocusEvent<HTMLInputElement>){
    Dispatch(changeQuestionChoiceDescription({questionID: questionID, choiceID: id, text: event.target.value}))
    }
  function handleChoiceDeletion(){
    Dispatch(removeQuestionChoice({questionID: questionID, choiceID: id}))
  }


  return (
    <div className="Choice">
      <input
        className={type === "MCQ" ? "form-checkbox" : "form-radio"}
        type={type === "MCQ" ? "checkbox" : "radio"}
        disabled
      />

      <input
        className="form-control"
        id="content"
        type="text"
        placeholder="Place holder"
        value={choiceDescription}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChoiceDescription(e.target.value)}
        onBlur={handleChoiceDescriptionChange}
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
