let sampleText =
    "This is text with word if, word as , word *1234 and 1234*, function addBigLetter bigLetterAdd bigAddLetter, case sensitive If";

const wordIf = replaceWord("if", "hvis");
const wordAs = replaceWord("as", "som");
const wordAnd = replaceWord("and", "i");
const wordWords = replaceWord("words", "ord");

console.log(sampleText);

function replaceWord(englishWord, norwegianWord) {
    if (sampleText.search(englishWord) === -1) {
        console.log(`Word <${englishWord}> was not found`);
    } else {
        sampleText = sampleText.replace(englishWord, norwegianWord);
        console.log(
            `Word <${englishWord}> was replaced with <${norwegianWord}>`
        );
    }
}
