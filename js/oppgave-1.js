brakeTekst(" Oppgave 1 ");

const tekst =
    "Hvilken mesterhjerne sto bak den første sandwichen? Jo, det var jarlen av Sandwich, i 1762. Han ønsket en rett han kunne spise mens han spilte kort. Han nektet å gå fra spillebordet og ville ha noe han enkelt kunne spise med hendene, så da fikk han salt kjøtt servert mellom to skiver brød. Her får du syv sterke varianter du kan prøve eller la deg inspirere av.";
const howManyWords = 30;

const textArray = tekst.split(" ");
const isLonger = howManyWords < textArray.length ? "longer" : "shorter";

console.log(
    `You looking for text: 30 words, this text is: ${textArray.length} words, this text is ${isLonger}\n\n`
);
brakeTekst();

function brakeTekst(info = "") {
    console.log(`#####${info}#####\n\n`);
}
