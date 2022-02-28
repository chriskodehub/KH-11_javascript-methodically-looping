// Project assumptions
//
// SOLID principles
// https://en.wikipedia.org/wiki/SOLID
//
// 1. Single-responsibility principle (SRP)
//    One function is responsible for one functionality
//    https://en.wikipedia.org/wiki/Single-responsibility_principle
// 2. Function remove onli first occurrence of word

// Step 1
// Declare variables with text
// We use input[type=text] or `textarea`

const sampleText =
    "This i tekst with word if, word as , word *1234 and 1234*, function addBigLetter bigLetterAdd bigAddLetter, case sensitive If";
let modifiedText = sampleText.slice();

// Step 2
// Deklare text for search
// We use input[type=text] or input[type=radio] or `select`

let wordLet = "if";
const word1 = "if";
const word2 = "as";
const word3 = "and";
const words = ["if", "as", "and"];

// Step 3
// Explain regex - only example not connected with task
// Write regex patterns (Regular Expressions patterns)
// https://regex101.com/ - explain regex online
// https://www.w3schools.com/jsref/jsref_obj_regexp.asp - explain /pattern/modifier(s);
// https://www.w3schools.com/jsref/jsref_regexp_g.asp - explain /g
// https://www.w3schools.com/jsref/jsref_regexp_begin.asp - explain \b
// https://www.w3schools.com/jsref/jsref_regexp_i.asp - explain /i

const regex1 = /If/g; // case sensitive
const regex2 = /If/gi; // not case sensitive
const regex3 = /\badd/gi; // start with string
const regex4 = /add\b/gi; // end with string
const regex5 = /add/gi; // string position irrelevant

function testRegex(regex) {
    let indexOfSearchWord = [...sampleText.matchAll(regex)];
    console.log(indexOfSearchWord);
    console.log(sampleText, "\n\n");
}

// Step 4
// Write a regex search function - return index of search text
// https://www.w3schools.com/js/js_regexp.asp - explain search() with regex

function replaceWord(word) {
    // Main body of function
    const regexSearch = new RegExp(`\\b${word}\\b`, "i");
    const indexOfWord = modifiedText.search(regexSearch);
    // For debug
    console.log("Step 4 - Info from searchRegexPosition():");
    console.log([regexSearch, indexOfWord, word.length], "\n\n");
    // Call next function
    if (indexOfWord === -1) {
        return false;
    } else {
        prepareStringToReplace(indexOfWord, word.length);
        return true;
    }
}

// Step 5
// Prepare full string to replace
// https://www.w3schools.com/jsref/jsref_slice_string.asp - explain slice()

function prepareStringToReplace(indexOfSearchText, lengthOfText) {
    // Main body of function
    const startPosition = calculateStartPosition(indexOfSearchText);
    const endPosition = calculateEndPosition(indexOfSearchText + lengthOfText);
    const cuttedString = modifiedText.slice(startPosition, endPosition);
    // For debug
    console.log("Step 5 - Info from prepareStringToReplace():");
    console.log("\n\t", cuttedString, "\n\n");
    // Call next function
    replaseStringWithEmptySpace(cuttedString);
}

// Step 6
// Write a replace function
// https://www.w3schools.com/jsref/jsref_replace.asp - explain replace()

function replaseStringWithEmptySpace(string) {
    // Main body of function
    // slice() make copy
    modifiedText = modifiedText.replace(string, "❤");
    // For debug
    console.log("Step 6 - Info from replaseStringWithEmptySpace(): ");
    console.log(modifiedText, "\n\n");
    // We can call another function e.g. we can show modified text on website
}

// Step 7
// Write safeguards against extreme situations
// e.g. beginning or end of text, no search wor

function calculateStartPosition(startIndex) {
    const newStartIndex = startIndex - 5;
    if (newStartIndex < 0) return 0;
    else return newStartIndex;
}

function calculateEndPosition(endIndex) {
    const newEndIndex = endIndex + 5;
    if (newEndIndex >= modifiedText.length) return modifiedText.length;
    else return newEndIndex;
}

// Step 8
// Slice all word from text

for (let i = 0; i < words.length; i++) {
    let replaced = 0;
    while (replaceWord(words[i])) {
        replaced++;
    }
    console.log("\n##########################################\n");
    console.log(`The word <${words[i]}> was found ${replaced} times`);
    console.log("##########################################\n\n");
}
