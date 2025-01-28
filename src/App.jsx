import { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCCGqptunHPy6uQqfB9YWD66LIIcXlKWDM`,
        {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        }
      );
      const generatedText = response['data']['candidates'][0]['content'] || "No response";
      setResponseText(formatText(generatedText));
    } catch (error) {
      console.error("Error generating content:", error);
      setResponseText("An error occurred while generating content.");
    } finally {
      setLoading(false);
    }
  };

  const formatText = (text) => {
    return text.replace(/\n\n/g, "\n").split("\n").map((paragraph, index) => (
      <p key={index} className="mb-2 text-gray-700">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      <img src="/images/logo.jpg" alt="Example" className="h-10 w-10 mx-4 my-4" />
      <main className="container mx-auto px-6 pt-16 flex-1 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-4xl uppercase">Welcome to</h2>
        <h1 className="text-3xl md:text-6xl lg:text-6xl uppercase font-black mb-8">The Mahilai Club</h1>
        <p className="text-base md:text-lg lg:text-2xl mb-8">
          MahilAI is an official student-driven club that focuses on the use of AI for women security. It also conducts hackathons and other research programs for students across campus.
        </p>
        <div className="text-lg md:text-2xl lg:text-3xl py-2 px-4 md:py-4 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 w-fit mx-auto mb-8 rounded-full">
          Founded: 05 May 2023
        </div>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 rounded-lg">
          <div className="bg-red-400 shadow-lg rounded-lg p-8 w-full max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mahila Chat AI</h1>
            <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Will Answer all Your Queries on Women Protection
            </h1>
            <textarea
              value={question}
              placeholder="Type your question here..."
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
              rows="5"
            ></textarea>
            <button
              onClick={generate}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Response:</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[150px]">
                {responseText ? (
                  <div className= "text-black">
					{responseText}
					</div>
                ) : (
                  <p className="text-gray-500">No response yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="mb-4 md:mb-0 md:text-xl">Built with 💖 by Gagan Naik</p>
          <div className="flex -mx-6">
            <a
              href="https://clubs.pes.edu/mahilai-pesu/"
              className="mx-3 hover:opacity-80 duration-150"
            >
              About us
            </a>
            |
            <a href="#" className="mx-3 hover:opacity-80 duration-150">
              Privacy
            </a>
            |
            <a
              href="https://www.instagram.com/mahil_ai.pesu/"
              className="mx-3 hover:opacity-80 duration-150"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;