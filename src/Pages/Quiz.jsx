import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/Loading.json";
import correctAnimation from "../assets/correct.json";
import wrongAnimation from "../assets/wrong.json";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState({ correct: 0, wrong: 0, answers: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const navigate = useNavigate();

  // Load quiz data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("quizData");
    if (storedData) {
      // shuffle answers for each question
      const parsed = JSON.parse(storedData).map((q) => {
        const answers = [...q.incorrect_answers, q.correct_answer];
        return {
          ...q,
          allAnswers: answers.sort(() => Math.random() - 0.5),
        };
      });
      setQuestions(parsed);
      setIsLoading(false);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleAnswer = (answer) => {
    if (selectedAnswer) return; // Prevent changing answer after selection

    setSelectedAnswer(answer);

    // Show feedback animation
    const correct = answer === questions[currentIndex].correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Auto-proceed after a delay
    setTimeout(() => {
      handleNext(answer, correct);
    }, 1500);
  };

  const handleNext = (answer, correct) => {
    const currentQ = questions[currentIndex];

    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (!correct ? 1 : 0),
      answers: [
        ...prev.answers,
        {
          question: currentQ.question,
          correctAnswer: currentQ.correct_answer,
          chosenAnswer: answer || selectedAnswer,
          isCorrect: correct || selectedAnswer === currentQ.correct_answer,
        },
      ],
    }));

    setSelectedAnswer("");
    setShowFeedback(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      localStorage.setItem(
        "quizResult",
        JSON.stringify({
          correct: score.correct + (correct ? 1 : 0),
          wrong: score.wrong + (!correct ? 1 : 0),
          answers: [
            ...score.answers,
            {
              question: currentQ.question,
              correctAnswer: currentQ.correct_answer,
              chosenAnswer: answer || selectedAnswer,
              isCorrect: correct || selectedAnswer === currentQ.correct_answer,
            },
          ],
        })
      );
      navigate("/result");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="h-48 w-48 mx-auto"
          />
          <p className="text-gray-600 mt-4">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Quiz Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any quiz data. Please start a new quiz.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-6 md:p-8">
          {/* Question Counter */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>

          <AnimatePresence mode="wait">
            {showFeedback ? (
              /* Feedback Animation */
              <motion.div
                key="feedback"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="text-center py-8"
              >
                <Lottie
                  animationData={isCorrect ? correctAnimation : wrongAnimation}
                  loop={false}
                  className="h-40 w-40 mx-auto"
                />
                <h2
                  className={`text-2xl font-bold mt-4 ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCorrect ? "Correct! 🎉" : "Incorrect! 😕"}
                </h2>
                {!isCorrect && (
                  <p className="text-gray-600 mt-2">
                    The correct answer is:{" "}
                    <span
                      className="font-medium"
                      dangerouslySetInnerHTML={{
                        __html: currentQ.correct_answer,
                      }}
                    />
                  </p>
                )}
              </motion.div>
            ) : (
              /* Question and Answers */
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                {/* Question */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Question:
                  </h2>
                  <div
                    className="text-lg font-medium p-4 bg-gray-50 rounded-xl border border-gray-200"
                    dangerouslySetInnerHTML={{ __html: currentQ.question }}
                  />
                </motion.div>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Select an answer:
                  </h3>
                  {currentQ.allAnswers.map((answer, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(answer)}
                      disabled={selectedAnswer}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        selectedAnswer === answer
                          ? answer === currentQ.correct_answer
                            ? "bg-green-100 border-green-500 text-green-800"
                            : "bg-red-100 border-red-500 text-red-800"
                          : "bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
                      whileTap={{ scale: selectedAnswer ? 1 : 0.98 }}
                    >
                      <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </motion.button>
                  ))}
                </div>

                {/* Continue button (for manual progression) */}
                {selectedAnswer && !showFeedback && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleNext()}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition"
                  >
                    {currentIndex + 1 === questions.length
                      ? "Finish Quiz"
                      : "Next Question →"}
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
