const readTextFile = file => {
  const rawFile = new XMLHttpRequest();
  let wordsArray;
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
      const allText = rawFile.responseText;
      wordsArray = allText.split("\n");
    }
  }
  rawFile.send();
  return wordsArray;
}

// const readTextFile = file => {
//    let str = "";
//    let txtFile = new File(file);
//    txtFile.open('r');
//    while (!txtFile.eof){
//      str += txtFile.readln() + '/n';
//    }
//    return str;
// }

const reader = new FileReader();


const WORDS = readTextFile('../racetyping/blob/master/dictionary.txt');
const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min; // exclude upper max number

const generateText = () => {
  let words = "";
  for ( let i = 0; i < 20; i++){
    words += WORDS[(generateRandomNumber(0, WORDS.length))];
    words += " ";
  }
  return words;
}

export default generateText;
