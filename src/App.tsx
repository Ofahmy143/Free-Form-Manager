import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Title from "./components/creation-page/form-body/title/title.component";
import FormBody from "./components/creation-page/form-body/form-body.component";
import { Form, FormQuestion } from "./types/form-body";
import Header from "./components/Header/header.component";

function App() {
  function updateFormQuestions(newQuestions: FormQuestion[]) {}

  function udpateFormHeadTitle() {}

  function udpateFormHeadDescription() {}

  function updateFormQuestion_Choices() {}

  const [form, setForm] = useState<Form>({
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
  });

  return (
    <div className="App">
      <Header />
      <FormBody form={form} setForm={setForm} />
    </div>
  );
}

export default App;
