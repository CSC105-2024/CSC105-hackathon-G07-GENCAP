import React, { useEffect, useState, useContext } from 'react'
import GameCard from '../components/GameCard'
import { useNavigate, useParams } from 'react-router'
import * as questionAPI from "../api/question.api"
import { ThemeContext } from "../contexts/auth";
import * as examAPI from "../api/exam.api"


const GamePage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const { userId } = useContext(ThemeContext);
  const [difficulty, setDifficulty] = useState("")

  const handleExamFetchData = async () => {
    const response = await examAPI.getExamById(examId)
    setDifficulty(response.data.data.difficult)
    
  }

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleFetchQuestionData = async () => {
    const fetchedQuestions = [];
    for (let i = 1; i <= 10; i++) {
      try {
        const response = await questionAPI.getQuestion(examId, i);
        const q = response.data.data;
        console.log(response);
        

        fetchedQuestions.push({
          word: q.question,
          meaning: q.choices.find((c) => c.correct).choice,
          alternatives: q.choices.filter((c) => !c.correct).map((c) => c.choice),
        });
      } catch (err) {
        console.error(`Error fetching question ${i}`, err);
      }
    }
    setQuestions(fetchedQuestions);
  };


  useEffect(() => {
    if (examId) {
      handleFetchQuestionData();
      handleExamFetchData()
    }
  }, [examId]);

  return (
    <>
      <GameCard
        slangData={questions}
        userId={userId}
        onBackToHome={handleBackToHome}
      />
    </>
  );
};

export default GamePage;
