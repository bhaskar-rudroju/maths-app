import { useEffect, useState } from "react";
import { generateQuestions } from "./questionGenerator";

const ALL_QUESTIONS = generateQuestions(1000);

function pick50() {
  return ALL_QUESTIONS
    .sort(() => Math.random() - 0.5)
    .slice(0, 30);
}

export default function App() {
  const [questions] = useState(pick50());
  const [answers, setAnswers] = useState(Array(50).fill(""));

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer
  useEffect(() => {
    let timer;
    if (startTime && !endTime) {
      timer = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const end = Date.now();
    setEndTime(end);

    const bodyLines = [
      `Math Quiz Submission`,
      `Started: ${startTime ? new Date(startTime).toISOString() : "N/A"}`,
      `Ended: ${new Date(end).toISOString()}`,
      `Time Taken: ${elapsedSeconds} seconds`,
      "",
      "Questions & Validation:",
      ""
    ];

    questions.forEach((item, i) => {
      bodyLines.push(`${i + 1}. ${item.q}`);
      bodyLines.push(`   ➤ Your answer: ${answers[i] || "[empty]"}`);
      bodyLines.push(`   ➤ Correct answer: ${item.a}`);
      bodyLines.push("");
    });

    const body = encodeURIComponent(bodyLines.join("\n"));

    window.location.href =
      `mailto:bhaskar1802@gmail.com?subject=Math Quiz Submission&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Maths Assignment
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
          onClick={() => {
            setStartTime(Date.now());
            setEndTime(null);
            setElapsedSeconds(0);
          }}
        >
          Start
        </button>

        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow"
          onClick={() => setEndTime(Date.now())}
        >
          End
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Timer */}
      <div className="text-center text-lg font-semibold mb-6">
        Time: {elapsedSeconds} sec
      </div>

      {/* Questions Grid */}
      <div className="flex flex-wrap gap-4 justify-center">
        {questions.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow w-full md:w-[45%] lg:w-[30%]"
          >
            <p className="font-semibold mb-2">
              {index + 1}. {item.q}
            </p>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Your answer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
