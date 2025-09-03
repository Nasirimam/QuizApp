import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import celebrationAnimation from "../assets/Confetti.json";

export default function Result() {
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = localStorage.getItem("quizResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }

    // Hide confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-purple-500"
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
            No Results Found
          </h2>
          <p className="text-gray-600 mb-6">
            It looks like you haven't completed a quiz yet. Start a new quiz to
            see your results here!
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const total = result.correct + result.wrong;
  const percentage = Math.round((result.correct / total) * 100);
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 z-10 pointer-events-none">
          <Lottie
            animationData={celebrationAnimation}
            loop={false}
            className="w-full h-full"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section - Alternative Design */}
        <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 p-8">
          <div className="absolute top-4 right-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-blue-800">
                {percentage}%
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2 text-white">
            Quiz Completed!
          </h1>
          <p className="text-blue-100 text-lg">Here's how you performed</p>

          {/* Performance message based on score */}
          <div className="mt-4 p-4 bg-white rounded-xl">
            <p className="font-semibold text-lg text-blue-800">
              {isExcellent
                ? "🎉 Excellent job! You're a quiz master!"
                : isGood
                ? "👍 Good effort! Keep learning!"
                : "📚 Keep practicing, you'll improve!"}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 p-5 rounded-xl border border-green-100">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-800">
                  Correct
                </h3>
              </div>
              <p className="text-3xl font-bold text-green-900">
                {result.correct}
              </p>
            </div>

            <div className="bg-red-50 p-5 rounded-xl border border-red-100">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-800">Wrong</h3>
              </div>
              <p className="text-3xl font-bold text-red-900">{result.wrong}</p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-800">Total</h3>
              </div>
              <p className="text-3xl font-bold text-blue-900">{total}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Your progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                  isExcellent
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : isGood
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                    : "bg-gradient-to-r from-yellow-500 to-orange-500"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Answers Review */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Review Your Answers
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {result.answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border ${
                    ans.isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-start mb-3">
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        ans.isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {ans.isCorrect ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    <p
                      className="font-medium text-gray-800"
                      dangerouslySetInnerHTML={{ __html: ans.question }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-9">
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <p className="text-xs font-semibold text-green-700 uppercase mb-1">
                        Correct Answer
                      </p>
                      <p
                        className="text-green-800"
                        dangerouslySetInnerHTML={{ __html: ans.correctAnswer }}
                      />
                    </div>

                    {!ans.isCorrect && (
                      <div className="bg-white p-3 rounded-lg border border-red-200">
                        <p className="text-xs font-semibold text-red-700 uppercase mb-1">
                          Your Answer
                        </p>
                        <p
                          className="text-red-800"
                          dangerouslySetInnerHTML={{ __html: ans.chosenAnswer }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/quiz")}
              className="flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Play Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium shadow-md hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
