import React, { useState } from "react";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router";

const GameCard = ({ slangData, onBackToHome }) => {
  const navigate = useNavigate();

  const [currentSlangIndex, setCurrentSlangIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");

  const defaultSlangData = [
    { word: "Cool", meaning: "Good", alternatives: ["Bad"] },
    { word: "Sick", meaning: "Awesome", alternatives: ["Ill"] },
    { word: "Lit", meaning: "Amazing", alternatives: ["Dark"] },
    { word: "Salty", meaning: "Bitter", alternatives: ["Sweet"] },
    { word: "Ghost", meaning: "Ignore", alternatives: ["Talk"] },
    { word: "Stan", meaning: "Support", alternatives: ["Hate"] },
    { word: "Tea", meaning: "Gossip", alternatives: ["Coffee"] },
    { word: "Flex", meaning: "Show off", alternatives: ["Hide"] },
    { word: "Vibe", meaning: "Feeling", alternatives: ["Sound"] },
    { word: "Slay", meaning: "Excel", alternatives: ["Kill"] },
  ];

  const currentData = slangData || defaultSlangData;

  const handleNextQuestion = () => {
    if (!showResult) return; // ต้องตอบก่อนถึงไปข้อถัดไป

    if (currentSlangIndex < currentData.length - 1) {
      setCurrentSlangIndex((prev) => prev + 1);
      setUserAnswer("");
      setShowResult(false);
    } else {
      // ส่งข้อมูลผลลัพธ์ไปหน้า /result พร้อม state
      navigate("/result", {
        state: {
          score,
          correctAnswers,
          totalQuestions,
          answerHistory,
        },
      });
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (showResult) return;

    const currentSlang = currentData[currentSlangIndex];
    const isCorrect =
      selectedAnswer.toLowerCase() === currentSlang.meaning.toLowerCase();

    const answerData = {
      word: currentSlang.word,
      userAnswer: selectedAnswer,
      correctAnswer: currentSlang.meaning,
      isCorrect,
    };

    setAnswerHistory((prev) => [...prev, answerData]);
    setTotalQuestions((prev) => prev + 1);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev + 10);
    }

    setUserAnswer(selectedAnswer);
    setShowResult(true);
  };

  const getAnswerOptions = () => {
    if (!currentData[currentSlangIndex]) return [];
    const currentSlang = currentData[currentSlangIndex];
    const options = [currentSlang.meaning, currentSlang.alternatives[0]];
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-md rounded-xl p-3 border border-purple-300/30">
          <h2 className="text-lg sm:text-xl font-bold text-white">Beginner</h2>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-yellow-300/30 rounded-xl p-3 flex items-center space-x-4">
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-300 mr-2" />
            <div>
              <div className="text-sm text-white/70">Correct</div>
              <div className="text-xl font-bold text-white">
                {correctAnswers}/{currentData.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="bg-gradient-to-br from-pink-500/80 to-purple-500/80 backdrop-blur-md rounded-2xl p-6 border border-pink-300/30">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Question {currentSlangIndex + 1}/{currentData.length}
          </h3>
          <div className="text-2xl sm:text-4xl font-bold text-white mb-4">
            "{currentData[currentSlangIndex]?.word}"
          </div>
          <p className="text-lg font-semibold text-white">
            What does this word mean?
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {getAnswerOptions().map((option, index) => {
          const isSelected = userAnswer === option;
          const isCorrect =
            option.toLowerCase() ===
            currentData[currentSlangIndex]?.meaning.toLowerCase();

          let bgClass = "bg-gray-400/60 hover:bg-gray-300/60";
          if (showResult) {
            if (isSelected && isCorrect) {
              bgClass = "bg-green-500 text-white cursor-default";
            } else if (isSelected && !isCorrect) {
              bgClass = "bg-red-500 text-white cursor-default";
            } else if (isCorrect) {
              bgClass = "bg-green-500 text-white cursor-default";
            } else {
              bgClass = "bg-gray-300 cursor-default";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
              className={`w-full p-4 border border-gray-300/50 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                ${bgClass}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBackToHome}
          className="px-6 py-3 bg-red-500/70 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={!showResult}
          className={`px-6 py-3 bg-gradient-to-r from-[#CBEA7B] to-[#A5D65A] hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 ${
            !showResult ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>

      {showResult && (
        <div className="mt-6 p-4 rounded-xl bg-white/20 text-center">
          <div className="text-lg font-semibold text-white mb-2">
            Correct Answer: "{currentData[currentSlangIndex]?.meaning}"
          </div>
          <div
            className={`text-lg ${
              userAnswer === currentData[currentSlangIndex]?.meaning
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {userAnswer === currentData[currentSlangIndex]?.meaning ? (
              <div>
                <div className="text-green-400 font-bold mb-2">🎉 Correct!</div>
              </div>
            ) : (
              "Try again next time! 💪"
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCard;
