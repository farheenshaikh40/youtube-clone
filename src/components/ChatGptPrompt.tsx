import { useState } from "react"
import {SiOpenai} from "react-icons/si"
const { Configuration, OpenAIApi } = require("openai");

const ChatGptPrompt = () => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.2,
        max_tokens: 4000,
      });
      //console.log("response", result.data.choices[0].text);
      setApiResponse(result.data.choices[0].text);
    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  console.log(apiResponse)


  return (
    <div className="p-2 border border-gray-500 mb-4">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            placeholder="Please ask to openai"
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-zinc-600 text-white focus:outline-none p-2 w-full rounded-sm"
          ></textarea>
          <button
            disabled={loading || prompt.length === 0}
            type="submit"
            className="items-center justify-center cursor-pointer flex bg-zinc-300 p-2 my-2 text-black rounded-sm hover:bg-zinc-700 hover:text-white"
          >
            <SiOpenai className="mr-2"/>
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
      {apiResponse && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p>
            <strong>API response:</strong>
            <p className="bg-gray-800 p-1 whitespace-pre-wrap text-gray-300 text-sm">{apiResponse}</p>
          </p>
        </div>
      )}
    </div>
  );
};


export default ChatGptPrompt;