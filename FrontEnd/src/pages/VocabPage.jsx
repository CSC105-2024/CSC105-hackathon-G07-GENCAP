import React from "react";
import { Book, ArrowLeft, BookOpen, Hash, Quote } from "lucide-react";
import { useNavigate } from "react-router";

const VocabPage = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/")
  }
  // Vocabulary data
  const vocabData = [
    {
      word: "Cool",
      meaning: "Good, awesome, or impressive",
      synonym: "Nice, great, awesome",
      example: "That new song is really cool!"
    },
    {
      word: "Sick",
      meaning: "Amazing, awesome, or excellent",
      synonym: "Awesome, amazing, incredible",
      example: "Your skateboard tricks are sick!"
    },
    {
      word: "Lit",
      meaning: "Exciting, amazing, or fun",
      synonym: "Amazing, exciting, fire",
      example: "This party is absolutely lit!"
    },
    {
      word: "Salty",
      meaning: "Bitter, upset, or angry about something",
      synonym: "Bitter, upset, mad",
      example: "He's still salty about losing the game."
    },
    {
      word: "Ghost",
      meaning: "To ignore someone or cut off communication",
      synonym: "Ignore, avoid, disappear",
      example: "She decided to ghost him after their argument."
    },
    {
      word: "Stan",
      meaning: "To support or be a big fan of someone",
      synonym: "Support, admire, fan over",
      example: "I totally stan this new artist!"
    },
    {
      word: "Tea",
      meaning: "Gossip or interesting information",
      synonym: "Gossip, news, drama",
      example: "Spill the tea about what happened!"
    },
    {
      word: "Flex",
      meaning: "To show off or boast about something",
      synonym: "Show off, boast, flaunt",
      example: "Stop trying to flex your new shoes."
    },
    {
      word: "Vibe",
      meaning: "Feeling, mood, or atmosphere",
      synonym: "Feeling, mood, energy",
      example: "I love the vibe of this coffee shop."
    },
    {
      word: "Slay",
      meaning: "To excel or do something perfectly",
      synonym: "Excel, dominate, crush it",
      example: "You absolutely slayed that presentation!"
    },
    {
      word: "Fire",
      meaning: "Something that's excellent or amazing",
      synonym: "Amazing, excellent, hot",
      example: "This new album is straight fire!"
    },
    {
      word: "Cap",
      meaning: "A lie or something that's not true",
      synonym: "Lie, false, fake",
      example: "That story sounds like cap to me."
    },
    {
      word: "Bet",
      meaning: "Agreement, okay, or for sure",
      synonym: "Okay, sure, alright",
      example: "Want to go to the movies? Bet!"
    },
    {
      word: "Periodt",
      meaning: "Period, end of discussion, final statement",
      synonym: "Period, final, done",
      example: "I'm the best at this game, periodt!"
    },
    {
      word: "Drip",
      meaning: "Style, fashion, or swag",
      synonym: "Style, swag, fashion",
      example: "His outfit has serious drip!"
    },
    {
      word: "Bussin",
      meaning: "Really good, especially food",
      synonym: "Delicious, amazing, excellent",
      example: "This pizza is absolutely bussin!"
    },
    {
      word: "No Cap",
      meaning: "No lie, telling the truth",
      synonym: "No lie, for real, honestly",
      example: "This burger is the best, no cap!"
    },
    {
      word: "Simp",
      meaning: "Someone who does too much for someone they like",
      synonym: "Try-hard, desperate, obsessed",
      example: "He's such a simp for buying her expensive gifts."
    },
    {
      word: "Sus",
      meaning: "Suspicious or questionable",
      synonym: "Suspicious, sketchy, weird",
      example: "That excuse sounds pretty sus to me."
    },
    {
      word: "Slaps",
      meaning: "Something that's really good (usually music)",
      synonym: "Amazing, hits different, fire",
      example: "This new song absolutely slaps!"
    }
  ];

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
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <button
              onClick={handleBackToHome}
              className="flex items-center px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Back to Home
            </button>
            
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-2 sm:mr-3" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Gen Z Vocabulary</h1>
            </div>
          </div>
        </div>

        {/* Vocabulary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {vocabData.map((vocab, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              {/* Word Header */}
              <div className="mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  "{vocab.word}"
                </h3>
              </div>

              {/* Meaning */}
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center mb-2">
                  <Book className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mr-2" />
                  <span className="text-xs sm:text-sm font-semibold text-purple-400">Meaning</span>
                </div>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                  {vocab.meaning}
                </p>
              </div>

              {/* Synonym */}
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center mb-2">
                  <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2" />
                  <span className="text-xs sm:text-sm font-semibold text-blue-400">Synonyms</span>
                </div>
                <p className="text-white/80 text-xs sm:text-sm">
                  {vocab.synonym}
                </p>
              </div>

              {/* Example */}
              <div>
                <div className="flex items-center mb-2">
                  <Quote className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm font-semibold text-green-400">Example</span>
                </div>
                <p className="text-white/70 text-xs sm:text-sm italic">
                  "{vocab.example}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20">
            <p className="text-white/70 text-xs sm:text-sm">
              💡 <strong>Tip:</strong> Understanding Gen Z slang helps bridge the communication gap between generations!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabPage;