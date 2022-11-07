import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

export default function About() {
    const [acronym, setAcronym] = useState('');
    const [phrase, setPhrase] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(acronym, phrase);
        postDB(acronym, phrase);
        setAcronym('');
        setPhrase('');
    }

    const postDB = (a, p) => {
        try {
            const promise = fetch('https://script.google.com/macros/s/AKfycbx-ehImprtiiDXPD34qFAKq8WoMlx7l-XyDt3qfC0mpJAt4KlX2q4uJEI47a1tpeaXa/exec?action=addEntry', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'acronym': a,
                    'phrase': p
                })
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="h-full w-full">
            <NavBar />

            <div class="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
                <div class="px-4 py-8 sm:px-10">
                    <div class="relative mt-6">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300">
                            </div>
                        </div>
                        <div class="relative flex justify-center text-sm leading-5">
                            <span class="px-2 text-gray-500 bg-white">
                                Add Acronym to Database
                            </span>
                        </div>
                    </div>
                    <div class="mt-6">
                        <div class="w-full space-y-6">
                            <div class="w-full">
                                <div class=" relative ">
                                    <input type="text" id="search-form-price" onChange={(e) => setAcronym(e.target.value)} class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-indigo-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent" placeholder="Acronym goes here" value={acronym} />
                                </div>
                            </div>
                            <div class="w-full">
                                <div class=" relative ">
                                    <input type="text" id="search-form-location" onChange={(e) => setPhrase(e.target.value)} class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-indigo-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent" placeholder="Full Phrase goes here" value={phrase} />
                                </div>
                            </div>
                            <div>
                                <span class="block w-full rounded-md shadow-sm">
                                    <button type="button" disabled={!(acronym && phrase)} onClick={handleClick} class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Add {acronym} to Database
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}