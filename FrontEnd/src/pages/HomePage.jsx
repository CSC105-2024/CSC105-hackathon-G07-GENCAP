import React, { useEffect, useState, useContext } from "react";
import { User, ArrowRight, Gamepad2, Trophy, Users, Brain } from "lucide-react";
import { useNavigate } from "react-router";
import * as examAPI from "../api/exam.api"
import * as examScoreAPI from "../api/examScore.api"
import { ThemeContext } from "../contexts/auth";


const Homepage = () => {
  const navigate = useNavigate();
  const [examId, setExamId] = useState(null);
  const { isAuth, userId } = useContext(ThemeContext);

  const navigateToGame = async () => {
    console.log("Start button clicked");

    if (!isAuth) {
      alert("Please log in first!");
      return;
    }

    try {
      const response = await examAPI.getExamByUserLevel(userId);
      console.log("Exam fetched:", response);

      const newExamId = response.data.data.id;
      setExamId(newExamId)

      const examscore = await examScoreAPI.createExamScore({
        userId: userId,
        examId: newExamId,
      });

      console.log(examscore);
      navigate(`/game/${newExamId}`);
    } catch (error) {
      console.error("Failed to create exam score:", error);
    }
  };



  return (
    <div className="min-h-screen font-russo bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 sm:-top-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/30 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 sm:-bottom-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500/30 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-indigo-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            <span className="block text-yellow-300">HOW TO</span>
            <span className="block text-blue-300">PARENT</span>
            <span className="block text-green-300">SO TEENS</span>
            <span className="block text-pink-300">WILL TALK</span>
            <span className="block text-purple-300">TO YOU</span>
          </h1>

          {/* Conversation Icons */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
        </div>
        {/* Game Preview Section - Box Style */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Game Title Box */}
          <div className="bg-pink-500/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-pink-300/30 text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Let's Play Game!
            </h2>
            <p className="text-white/90 mb-2 text-lg">
              Guess the Meaning of Gen Z Slang
            </p>
            <p className="text-white/80 text-sm sm:text-base mb-6">
              There are 10 words in total.
            </p>

            <button
              onClick={navigateToGame}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#CBEA7B]  to-[#A5D65A] text-black font-semibold rounded-xl hover:from-[#A5D65A] hover:to-[#CBEA7B] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <Gamepad2 className="w-6 h-6 mr-3" />
              Start
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* How to Play Section */}
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              How to Play?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Step 1 Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-pink-300/30 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  Choose an Answer
                </h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Read the slang word and choose the correct meaning.
                </p>
              </div>

              {/* Step 2 Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-pink-300/30 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  Get Points
                </h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Earn points for correct answers.
                </p>
              </div>

              {/* Step 3 Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-pink-300/30 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Learn</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Understand and learn Gen Z slang in a fun way!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Homepage;
