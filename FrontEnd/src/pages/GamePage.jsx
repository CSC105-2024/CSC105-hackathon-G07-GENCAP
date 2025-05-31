import React, { useEffect } from 'react'
import GameCard from '../components/GameCard'
import { useNavigate } from 'react-router'
import { useParams } from "react-router";
import * as questionAPI from "../api/question.api"

const GamePage = () => {
  const navigate = useNavigate();
  const { examId } = useParams()
  const handleBackToHome = () => {
    navigate("/");
  }
  return (
    <>
      <GameCard 
        examId={examId}
        onBackToHome={handleBackToHome}
      />
    </>
  )
}

export default GamePage