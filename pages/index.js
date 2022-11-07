import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

export default function Example() {
  const [guess, setGuess] = useState('');
  const [APIResponse, setAPIResponse] = useState('');

  const [showResult, setShowResult] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    readDB();
  }, []);

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        if(guess && APIResponse){
          handleClick();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [guess, APIResponse]);

  const readDB = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwbk7dEKoUHUmDu0rWQCshSEtfgzxmvrjdY0mES6ApQGDk7TrpROOlSrnJfTXLfVce3/exec');
      const data = await response.json();
      console.log(data);
      setAPIResponse(data);
    } catch (error) {
      console.log("There was an error reading from Database", error);
    }
  }

  const handleClick = async (e) => {
    console.log(guess);
    setShowResult(true);
    setIsDisabled(true);
  }

  const playAgain = async (e) => {
    readDB();
    setAPIResponse('')
    setGuess('');
    setShowResult(false);
    setIsDisabled(false);
  }

  return (
    <div>
      <NavBar/>
    <div className="h-full w-full">
      <div class="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
        <div class="px-4 py-8 sm:px-10">
          <div class="relative mt-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300">
              </div>
            </div>
            <div class="relative flex justify-center text-sm leading-5">
              <span class="px-2 text-gray-500 bg-white">
                Guess the acronym
              </span>
            </div>
          </div>
          <div class="mt-6">
            <div class="w-full space-y-6">
              <div class="w-full">
                <div class=" relative ">
                  <input type="text" id="search-form-price" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-indigo-700 placeholder-gray-400 shadow-sm text-base focus:outline-none ring-2 ring-indigo-700 focus:border-transparent" disabled value={APIResponse?APIResponse.acronym:'Loading...'} />
                </div>
              </div>
              <div class="w-full">
                <div class=" relative ">
                  <input type="text" id="search-form-location" onChange={(e) => setGuess(e.target.value)} class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-indigo-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent" disabled={isDisabled} placeholder="Your guess" value={guess}/>
                </div>
              </div>
              <div>
              {!showResult?
                <span class="block w-full rounded-md shadow-sm">
                  <button type="button" onClick={handleClick} disabled={!(guess && APIResponse)} class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Check
                  </button>
                </span>:
                <span class="block w-full rounded-md shadow-sm">
                <button type="button" onClick={playAgain} class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Play again?
                </button></span>}
              </div>
              <div class="w-full">
                {showResult && APIResponse.phrase.toLowerCase() === guess.toLowerCase()?
                <div class=" relative ">
                  <input type="text" disabled id="search-form-price" class="py-2 px-4  bg-white text-indigo-700 w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none rounded-lg" value={'Richtig! :)'} />
                </div>:<></>}
              </div>
              <div class="w-full">
                {showResult && APIResponse.phrase.toLowerCase() !== guess.toLowerCase()?
                <div class=" relative ">
                  <input type="text" disabled id="search-form-price" class="py-2 px-4  bg-white text-indigo-700 w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none rounded-lg" value={`Falsch! ${APIResponse.phrase}`} />
                </div>:<></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}