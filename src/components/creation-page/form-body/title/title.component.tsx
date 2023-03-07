import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./title.component.css";
import { Form, FormTitle } from "../../../../types/form-body";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeFormDescription, changeFormTitle } from "../../../../redux/FormSlice";

type props = {
  form: Form;
  OnQuestionChange: React.Dispatch<React.SetStateAction<Form>>;
};

function Title() {

  const formTitle = useAppSelector((state)=> state.FormReducer.title)

  const Dispatch = useAppDispatch()

  function handleFormTitleChange(event: React.ChangeEvent<HTMLInputElement>){
    Dispatch(changeFormTitle(event.target.value))
  }
  function handleFormDescriptionChange(event: React.ChangeEvent<HTMLInputElement>){
    Dispatch(changeFormDescription(event.target.value))
  }


  // function handleFormTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   event.preventDefault();
  //   let newTitle = event.target.value;

  //   OnQuestionChange({ ...form, title: { ...form.title, title: newTitle } });
  // }

  // function handleFormDescriptionChange(
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) {
  //   event.preventDefault();
  //   let newDescription = event.target.value;

  //   OnQuestionChange({
  //     ...form,
  //     title: { ...form.title, description: newDescription },
  //   });
  // }

  return (
    <div className="Title">
      <h1>
        <input value={formTitle.title} onChange={handleFormTitleChange} />
      </h1>
      <p>
        <input
          value={formTitle.description}
          onChange={handleFormDescriptionChange}
        />
      </p>
    </div>
  );
}

export default Title;
