import React, { useState, useEffect } from 'react';
// import useDebounce from './use-debounce';
import useDebounce from '../debounce'
import MappedOutput from "./MappedOutput"
import logo from "../rick.png"
import PageNavigation from "./PageNavigation"


// Usage
export default function RickAndMorty() {
    // State and setter for search term
    const [searchTerm, setSearchTerm] = useState('');
    // State and setter for search results
    const [results, setResults] = useState([]);
    // State for search status (whether there is a pending API request)
    const [isSearching, setIsSearching] = useState(false);
    const [totalPages, setTotalPages] = useState(false);
    const [pages, setPages] = useState(1);

    // Now we call our hook, passing in the current searchTerm value.
    // The hook will only return the latest value (what we passed in) ...
    // ... if it's been more than 500ms since it was last called.
    // Otherwise, it will return the previous value of searchTerm.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Here's where the API call happens
    // We use useEffect since this is an asynchronous action
    useEffect(
        () => {
            // Make sure we have a value (user has entered something in input)
            if (debouncedSearchTerm) {
                // Set isSearching state
                setIsSearching(true);
                // Fire off our API call
                searchCharacters(debouncedSearchTerm).then(results => {
                    // Set back to false since request finished
                    setIsSearching(false);
                    // Set results state
                    setResults(results.results);
                    //set all pages
                    setTotalPages(results.info.pages)
                });
            } else {
                setResults([]);
                setTotalPages(1)
            }
        },
        // This is the useEffect input array
        // Our useEffect function will only execute if this value changes ...
        // ... and thanks to our hook it will only change if the original ...
        // value (searchTerm) hasn't changed for more than 500ms.
        [debouncedSearchTerm]
    );
    console.log("searchTerm")
    console.log(pages)
    console.log(searchTerm)
    const changePage = e => {
        //changing page number according to next buttonn present or not
        Array.from(e.target.classList).includes('page-btn-next') ?
            setPages(prevState => prevState + 1, searchCharacters(debouncedSearchTerm)) :
            setPages(prevState => prevState - 1, searchCharacters(debouncedSearchTerm));
        //changing searchterm number according to next buttonn present or not
        Array.from(e.target.classList).includes('page-btn-next') ?
            setSearchTerm((pages + 1) + "," + searchTerm.split(",")[1]):
            setSearchTerm((pages - 1) + "," + searchTerm.split(",")[1]);
    }
    return (
        <div>
            <header>
                <img src={logo} height={300} width={300} />
            </header>
            <h1 style={{ fontSize: 30 }}>Character Search Engine</h1>
            <input
                style={{ marginTop: 20, height: 30, width: "20%", textAlign: 'center' }}
                placeholder="Ex: 'Rick'"
                onChange={e => setSearchTerm(pages + "," + e.target.value)}
            />

            {isSearching && <div>Searching ...</div>}
            {!isSearching ? <MappedOutput characters={results} /> : null}
            { totalPages > 1 && !isSearching ? <PageNavigation page={pages} totalPages={totalPages} changePage={changePage} /> : null}
        </div>
    );
}

// API search function
function searchCharacters(search) {
    var page = search.split(',')[0]
    var char = search.split(',')[1]
    if(char===""){
        char = "rick"
    }
    return fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}&name=${char}`,
        {
            method: 'GET'
        }
    )
        .then(r => r.json())
        .then(r => r)
        .catch(error => {
            console.error(error);
            return [];
        });
}
