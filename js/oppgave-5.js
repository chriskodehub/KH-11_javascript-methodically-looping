const sampleText =
    "This i tekst with word if, word as , word *1234 and 1234*, function addBigLetter bigLetterAdd bigAddLetter, case sensitive If";

const wordIf = findWord("if");
const wordAs = findWord("as");
const wordAnd = findWord("and");

console.log(`${wordIf} | ${wordAs} | ${wordAnd}`);


function findWord(word) {
    // Main body of function
    const regexSearch = new RegExp(`\\b${word}\\b`, "i");
    const indexOfWord = sampleText.search(regexSearch);

    // Call next function
    if (indexOfWord === -1) {
        return "Word was not found";
    } else {
        return prepareStringToReplace(indexOfWord, word.length);
    }
}

function prepareStringToReplace(indexOfSearchText, lengthOfText) {
    const startPosition = calculateStartPosition(indexOfSearchText);
    const endPosition = calculateEndPosition(indexOfSearchText + lengthOfText);
    return sampleText.slice(startPosition, endPosition);
}

function calculateStartPosition(startIndex) {
    const newStartIndex = startIndex - 5;
    if (newStartIndex < 0) return 0;
    else return newStartIndex;
}

function calculateEndPosition(endIndex) {
    const newEndIndex = endIndex + 5;
    if (newEndIndex >= sampleText.length) return sampleText.length;
    else return newEndIndex;
}