import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import { useForm } from "./useForm";
import { getRandomCharacter, getSymbol } from "./utils";
import toast from "react-hot-toast";
import POWER from "./boxmap";

function App() {
  const [values, setValues] = useForm({
    length: 6,
    capital: true,
    small: true,
    number: true,
    symbol: true,
  });

  const [result, setResult] = useState("");

  const fieldsArray = [
    {
      field: values.capital,
      getChar: () => getRandomCharacter(65, 90),
    },
    {
      field: values.small,
      getChar: () => getRandomCharacter(97, 122),
    },
    {
      field: values.number,
      getChar: () => getRandomCharacter(48, 57),
    },
    {
      field: values.symbol,
      getChar: () => getSymbol(),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let generatedPassword = "";
    const checkedFields = fieldsArray.filter(({ field }) => field);

    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }

    if (generatedPassword) {
      setResult(generatedPassword);
    } else {
      toast.error(" Please select at least one option");
    }
  };

  const handleClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast.success("Copied to your clipboard");
    } else {
      toast.error("No password to copy");
    }
  };

  return (
    <section>
      <h1 id="head">Password Generator</h1>
      <div className="password-container">
        <div className="result">
          <input
            type="text"
            id="result"
            placeholder="Min 6 Characters"
            readOnly
            value={result}
          />
          <div className="clipboard" onClick={handleClipboard}>
            <FaClipboard></FaClipboard>
          </div>
        </div>
      </div>
      <div className="container">
        <form id="pg-from" onSubmit={handleSubmit}>
          <div className="fields-container">
            <div>
              <div className="slider-container">
                <label htmlFor="length">Character Length</label>
                <span>{values.length}</span>
                <br />
                <input
                  id="length"
                  name="length"
                  type="range"
                  min={6}
                  max={15}
                  value={values.length}
                  onChange={setValues}
                />
              </div>
            </div>
            <div className="field">
              <input
                className="strength"
                type="checkbox"
                id="capital"
                name="capital"
                checked={values.capital}
                onChange={setValues}
              />
              <label htmlFor="capital">Include Uppercase Letters</label>
            </div>
            <div className="field">
              <input
                className="strength"
                type="checkbox"
                id="small"
                name="small"
                checked={values.small}
                onChange={setValues}
              />{" "}
              <label htmlFor="small">Include Lowercase Letters</label>
            </div>
            <div className="field">
              <input
                className="strength"
                type="checkbox"
                id="number"
                name="number"
                checked={values.number}
                onChange={setValues}
              />
              <label htmlFor="number">Include Numbers</label>
            </div>
            <div className="field">
              <input
                className="strength"
                type="checkbox"
                id="symbol"
                name="symbol"
                checked={values.symbol}
                onChange={setValues}
              />
              <label htmlFor="symbol">Include Symbols</label>
            </div>
          </div>

          <div className="stength-ometer">
            <p>Strength</p>
            <POWER />
          </div>
          <button id="subb" type="submit">
            Generate
          </button>
        </form>
      </div>
    </section>
  );
}

export default App;
