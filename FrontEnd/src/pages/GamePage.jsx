import React from 'react'
import GameCard from '../components/GameCard'
import { useNavigate } from 'react-router'
import ShowResult from '../components/ShowResult'
const GamePage = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    }
  return (
    <>
    <GameCard 
    //   slangData={yourSlangData} 
      onBackToHome={handleBackToHome}
    />
    </>
  )
}

export default GamePage