import React from "react";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const ShowResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    score = 0,
    correctAnswers = 0,
    totalQuestions = 0,
    answerHistory = [],
  } = location.state || {};

  const percentage =
    totalQuestions === 0
      ? 0
      : Math.round((correctAnswers / totalQuestions) * 100);

  const handlePlayAgain = () => {
    navigate("/game");
  };
  const handleBackToHome = () => {
    navigate("/");
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const performanceMessage = () => {
    if (percentage >= 90) return "Outstanding! 🌟";
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 70) return "Great Job! 👏";
    if (percentage >= 60) return "Good Effort! 💪";
    if (percentage >= 50) return "Keep Trying! 📚";
    return "Practice More! 🎯";
  };

  return (
    <div className="min-h-screen font-russo bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden p-6">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 animate-bounce">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Game Complete!</h1>
          <p className={`text-xl font-semibold ${getScoreColor()}`}>
            {performanceMessage()}
          </p>
        </div>

        {/* Score Summary */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-300/30 rounded-2xl p-6 text-center mb-8">
          <Trophy className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <div
            className={`text-4xl font-bold mb-1 text-white ${getScoreColor()}`}
          >
            {correctAnswers} / {totalQuestions}
          </div>
          <div className="text-white/70 text-sm">Correct Answers</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {correctAnswers === totalQuestions && totalQuestions > 0 ? (
            <button
              onClick={handleBackToHome}
              className="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          ) : (
            <>
              <button
                onClick={handlePlayAgain}
                className="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </button>
              <button
                onClick={handleBackToHome}
                className="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </>
          )}
        </div>

        {/* Encouragement Message */}
        <div className="text-center mt-6 p-4 bg-white/10 rounded-xl">
          <p className="text-white/80 text-sm">
            {percentage >= 80
              ? "You're a Gen Z slang expert! 🎓"
              : percentage >= 60
                ? "You're getting the hang of it! Keep learning! 📖"
                : "Don't give up! Practice makes perfect! 💪"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
