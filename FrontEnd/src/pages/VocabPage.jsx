import React, { useEffect, useState } from "react";
import { Book, ArrowLeft, BookOpen, Hash } from "lucide-react";
import { useNavigate } from "react-router";
import * as VocabAPI from "../api/vocab.api";

const VocabPage = () => {
  const navigate = useNavigate();
  const [vocabData, setVocabData] = useState([]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const payload = parseJwt(token);
      const userId = payload ? payload.userId : null;

      if (userId) {
        const result = await VocabAPI.getUnlockedWordsByUser(userId);
        console.log(result.data);
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const formattedData = result.data.map((item) => {
            const vocab = item.UserVocabUnlockWord;
            return {
              word: vocab.word,
              meaning: vocab.meaning,
              synonym: vocab.synonym,
            };
          });
          setVocabData(formattedData);
        } else {
          console.warn("No vocabulary data found for this user.");
          setVocabData([]);
        }
      }
    };

    fetchData();
  }, []);


  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden text-white font-russo">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={handleBackToHome}
            className="flex items-center px-4 py-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 mr-3" />
            <h1 className="text-2xl font-bold">Gen Z Vocabulary</h1>
          </div>
        </div>

        {Array.isArray(vocabData) && vocabData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocabData.map((vocab, index) => (
              <div
                key={index}
                className="bg-white/10 p-5 rounded-xl hover:scale-105 transition transform"
              >
                <h3 className="text-xl font-bold mb-3">"{vocab.word}"</h3>
                <div className="mb-2">
                  <div className="flex items-center text-purple-400 text-sm font-semibold mb-1">
                    <Book className="w-4 h-4 mr-2" />
                    Meaning
                  </div>
                  <p>{vocab.meaning}</p>
                </div>
                <div className="mb-2">
                  <div className="flex items-center text-blue-400 text-sm font-semibold mb-1">
                    <Hash className="w-4 h-4 mr-2" />
                    Synonyms
                  </div>
                  <p>{vocab.synonym}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-8 text-white/80">No vocabulary unlocked yet.</p>
        )}
      </div>
    </div>
  );
};

export default VocabPage;
