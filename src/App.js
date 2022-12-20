import { useState } from "react";
import './App.css';
import { Configuration, OpenAIApi } from "openai";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Button } from "@mui/material";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search such as astronaut bear"
  );
  console.log(process.env);
  const configuration = new Configuration({
    organization: "org-wpGeRngxpB5K0MgtEElZuJ15",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async () => {
  setPlaceholder(`Search ${prompt}..`);
  setLoading(true);
  const res = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });
  setLoading(false);
  setResult(res.data.data[0].url);
};

  return (
    <div className="app-main">
    {loading ? (
      <>
        <h2>Generating..Please Wait..</h2>
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </>
    ) : (
      <>
        <h2>Generate an Image using DALL E API!</h2>

        <textarea
          className="app-input"
          placeholder={placeholder}
          onChange={(e) => setPrompt(e.target.value)}
          rows="10"
          cols="40"
        />
        <Button onClick={generateImage} variant="contained" color="secondary" endIcon={<ImageSearchIcon />} >Generate an Image </Button>
        {result.length > 0 ? (
          <img className="result-image" src={result} alt="result" />
        ) : (
          <></>
        )}
      </>
    )}
  </div>
);
}

export default App;
//<Button variant="contained" endIcon={<SendIcon />}>
//Send
//</Button>