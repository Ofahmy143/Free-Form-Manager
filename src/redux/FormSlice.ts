import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Form, FormQuestion } from "../types/form-body";
import produce from "immer";

// Define a type for the slice state
type FormState = {
  Form: Form;
};

// Define the initial state using that type
const initialState: Form = {
  title: {
    title: "Untitled",
    description: "empty for now",
  },
  questions: [
    {
      key: 0,
      title: "Noname",
      type: "Essay",
      input: [
        "This is a place holder for essay",
        "This is the second placeholder",
      ],
    },
  ],
};

type updateFormQuestionsChoicesPayload = {
  questionID: number;
  newInput: string[];
};

type removeChoice = {
  questionID: number;
  choiceID: number;
};

type questionTextChange = {
  questionID: number;
  text: string;
};

type questionChoiceTextChange = {
  questionID: number;
  choiceID: number;
  text: string;

}

export const FormSlice = createSlice({
  name: "Form",
  initialState,
  reducers: {
    updateFormQuestions: (
      state,
      newQuestions: PayloadAction<FormQuestion[]>
    ) => {
      state.questions = newQuestions.payload;
    },
    updateFormQuestionsChoices: (
      state,
      action: PayloadAction<updateFormQuestionsChoicesPayload>
    ) => {
      return produce(state, (draftState) => {
        const question = draftState.questions[action.payload.questionID];
        question.input = action.payload.newInput;
      });
    },
    changeFormTitle: (state, title: PayloadAction<string>) => {
      return produce(state, (draftState) => {
        const FormHeader = draftState.title;
        FormHeader.title = title.payload;
      });
    },
    changeFormDescription: (state, title: PayloadAction<string>) => {
      return produce(state, (draftState) => {
        const FormHeader = draftState.title;
        FormHeader.description = title.payload;
      });
    },
    changeQuestionTitle: (state, questionData: PayloadAction<questionTextChange>) => {
      return produce(state, (draftState) => {
        const question = draftState.questions[questionData.payload.questionID];
        question.title = questionData.payload.text;
      });
    },
    changeQuestionType: (state, questionData: PayloadAction<questionTextChange>) => {
      return produce(state, (draftState) => {
        console.log(questionData.payload.text);
        const question = draftState.questions[questionData.payload.questionID];
        question.type = questionData.payload.text;
      });
    },
    changeQuestionDescription: (state, questionData: PayloadAction<questionTextChange>) => {
      return produce(state, (draftState) => {
        const question = draftState.questions[questionData.payload.questionID];
        question.description = questionData.payload.text;
      });
    },
    AddFormQuestion: (state) => {
      return produce(state, (draftState) => {
        const questions = draftState.questions;
        questions.push({
          key: state.questions.length,
          title: "Untitled",
          type: "MCQ",
          input: ["This is first Placeholder"],
        });
      });
    },
    RemoveFormQuestion: (state, questionID: PayloadAction<number>) => {
      return produce(state, (draftState) => {
        draftState.questions.splice(questionID.payload, 1);
      });
    },
    AddQuestionChoice: (state, questionID: PayloadAction<number>) => {
      return produce(state, (draftState) => {
        const question = draftState.questions[questionID.payload];
        if (Array.isArray(question.input)) {
          question.input.push(
            `This is a new placeholder ${Math.floor(Math.random() * 100 + 1)}`
          );
        } else {
          question.input = [
            `This is a new placeholder ${Math.floor(Math.random() * 100 + 1)}`,
          ];
        }
      });
    },
    changeQuestionChoiceDescription: (state, questionChoiceData: PayloadAction<questionChoiceTextChange>)=>{
      return produce(state, (draftState) => {
        let question = draftState.questions[questionChoiceData.payload.questionID];
        question.input[questionChoiceData.payload.choiceID] = questionChoiceData.payload.text;
      })
    },
    removeQuestionChoice: (state, id: PayloadAction<removeChoice>) => {
      return produce(state, (draftState) => {
        const question = draftState.questions[id.payload.questionID];
        question.input.splice(id.payload.choiceID, 1);
      });
    },
  },
});

export const {
  // updateFormQuestions,
  // updateFormQuestionsChoices,
  changeFormTitle,
  changeFormDescription,
  changeQuestionTitle,
  changeQuestionType,
  changeQuestionDescription,
  AddFormQuestion,
  RemoveFormQuestion,
  AddQuestionChoice,
  changeQuestionChoiceDescription,
  removeQuestionChoice,
} = FormSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.FormReducer;

export default FormSlice.reducer;
