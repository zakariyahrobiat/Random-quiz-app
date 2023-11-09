import React, { useEffect, useRef, useState } from "react";
import { data } from "./Data";
import "./style.css";
const QuizList = () => {
  let [currentQuiz, setCurrentQuiz] = useState(0);
  let [select, setSelect] = useState({});
  let [score, setScore] = useState(0);
  let [showScore, setShowScore] = useState(false);
  let [submit, setSubmit] = useState(false);
  let [timer, setTimer] = useState(30);
  let [stop, setStop] = useState(false);
  let { question, option, id, answer } = data[currentQuiz];

  function preventSelect(questionId, optionId) {
    setSelect((select) => ({
      ...select,
      [questionId]: optionId,
    }));
    setSubmit(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submit) {
      if (currentQuiz < data.length - 1) {
        setCurrentQuiz(currentQuiz + 1);
      } else {
        setShowScore(!showScore);
      }

      if (select[id] === answer) {
        setScore(score + 1);
      }
    }
  };
  const time = () => {
    if (timer !== 0) {
      setTimer(timer - 1);
    } else setStop(true);
  };

  useEffect(() => {
    const set = setInterval(time, 1000);
    return () => {
      clearInterval(set);
    };
  });

  return (
    <div>
      {stop || showScore ? (
        `your score is ${score} out of ${data.length}`
      ) : (
        <div className="quiz-container">
          <div className="header">
            <p>QUESTION {currentQuiz + 1}</p>
            <p>{timer}</p>
          </div>
          <h2>QUIZ TIME!!!</h2>
          <div className="question-container">{question}</div>
          <div className="option-container">
            {option.map((item) => {
              return (
                <ul key={item.id}>
                  <li>
                    <input
                      type="radio"
                      id="answer"
                      name="{`question${id}`}"
                      value={item.id}
                      checked={select[id] === item.id}
                      onChange={() => preventSelect(id, item.id)}
                    />
                    <label htmlFor="answer">{item.text}</label>
                  </li>
                </ul>
              );
            })}
          </div>

          <button type="submit" onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizList;
