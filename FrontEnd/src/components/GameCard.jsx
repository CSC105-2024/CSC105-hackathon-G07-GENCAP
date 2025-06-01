import React, { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import * as choiceAPI from "../api/choice.api"
import * as examScoreAPI from "../api/examScore.api"
import * as userAPI from "../api/user.api"
import * as examAPI from "../api/exam.api"

const GameCard = ({ slangData, onBackToHome, userId, difficulty }) => {

  const navigate = useNavigate();

  const [currentSlangIndex, setCurrentSlangIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [difficult, setDifficult] = useState("")
  const { examId } = useParams()


  const currentData = slangData && slangData.length > 0 ? slangData : [];

  const handleFetchExamData = async () => {
    console.log(examId);

    const response = await examAPI.getExamById(examId)
    console.log("exam", response);

  }

  const handleNextQuestion = () => {
    if (!showResult) return;

    if (currentSlangIndex < currentData.length - 1) {
      setCurrentSlangIndex((prev) => prev + 1);
      setUserAnswer("");
      setShowResult(false);
    } else {
      navigate(`/result/${examId}`, {
        state: {
          score,
          correctAnswers,
          totalQuestions,
          answerHistory,
        },
      });
    }
  };

  useEffect(() => {
    const doLevelUp = async () => {
      if (correctAnswers === currentData.length && currentData.length > 0) {
        const response = await userAPI.levelUp(userId, correctAnswers);
        console.log("Level Up Triggered:", response);
      }
    };
    doLevelUp();
    handleFetchExamData()
  }, [correctAnswers, currentData.length]);


  const handleAnswer = async (selectedAnswer) => {
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

    try {
      const response = await choiceAPI.checkChoice({
        isTrue: isCorrect,
        userId: Number(userId),
        examId: Number(examId),
      });

    } catch (error) {
      console.error("Error sending choice result:", error);
    }
  };


  const handleCancel = async () => {
    try {
      if (userId && examId) {
        const examScoreData = {
          userId: Number(userId),
          examId: Number(examId)
        };

        const response = await examScoreAPI.deleteExamScore(examScoreData);

        if (response.success) {
          console.log('Exam score deleted successfully');
        } else {
          console.error('Failed to delete exam score:', response.msg);
        }
      }
    } catch (error) {
      console.error('Error deleting exam score:', error);
    } finally {
      onBackToHome();
    }
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
          <h2 className="text-lg sm:text-xl font-bold text-white"><h2 className="text-lg sm:text-xl font-bold text-white">
            {examId === "1"
              ? "Beginner"
              : examId === "2"
                ? "Intermediate"
                : examId === "3"
                  ? "Advanced"
                  : examId === "4"
                    ? "Fluent"
                    : "Unknown Level"}
          </h2>
          </h2>
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
          onClick={handleCancel}
          className="px-6 py-3 bg-red-500/70 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={!showResult}
          className={`px-6 py-3 bg-gradient-to-r from-[#CBEA7B] to-[#A5D65A] hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 ${!showResult ? "opacity-50 cursor-not-allowed" : ""
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
            className={`text-lg ${userAnswer === currentData[currentSlangIndex]?.meaning
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