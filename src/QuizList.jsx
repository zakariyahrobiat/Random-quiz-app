import React, { useEffect, useRef, useState } from "react";
import { data } from "./Data";
import "./style.css";
const QuizList = () => {
  let [currentQuiz, setCurrentQuiz] = useState(0);
  let [select, setSelect] = useState({});
  let [score, setScore] = useState(0);
  let [showScore, setShowScore] = useState(false);
  let [submit, setSubmit] = useState(false);
  let [timer, setTimer] = useState(1);
  let [second, setSecond] = useState(0);
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
  useEffect(() => {
    let totalSecond = timer * 60;
    const set = setInterval(() => {
      if (totalSecond > 0) {
        totalSecond -= 1;
        const min = Math.floor(totalSecond / 60);
        const sec = totalSecond % 60;
        setTimer(min);
        setSecond(sec);
      } else setStop(true);
    }, 1000);
    return () => {
      clearInterval(set);
    };
  }, []);

  return (
    <div>
      {stop || showScore ? (
        <div className="score">
          <p>Your Score is</p>
          <h1>{score}</h1>
          <p> out of {data.length}!!!</p>
        </div>
      ) : (
        <div className="quiz-container">
          <div className="header">
            <p>QUESTION {currentQuiz + 1}</p>
            <p>
              {timer}:{second}
            </p>
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
