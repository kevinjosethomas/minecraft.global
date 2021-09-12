import { useState } from "react";

type QuestionProps = {
  question: Record<string, any>;
};

function Question(props: QuestionProps): JSX.Element {
  const [answer, setAnswer] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full rounded border-2 border-gray-800">
      <div
        className="flex flex-row items-start justify-between w-full px-5 md:px-10 py-5 bg-dark-800 cursor-pointer"
        onClick={() => setAnswer(!answer)}
      >
        <span className="font-medium text-lg md:text-xl text-gray-400">
          {props.question.question}
        </span>
        <i
          className={`fas ${
            answer ? "fa-caret-up" : "fa-caret-down"
          } text-lg md:text-xl text-gray-400`}
        />
      </div>
      {answer && (
        <div className="faq flex flex-col items-start justify-center w-full px-5 md:px-10 py-4 bg-dark-700">
          <span className="font-medium md:text-lg text-gray-500">{props.question.answer}</span>
        </div>
      )}
    </div>
  );
}

export default Question;
