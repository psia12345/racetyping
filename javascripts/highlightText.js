let laterString = "";
const currentWord = document.createElement('span');
const pText = document.getElementById('text');

const highlightCurrentWord = (position, wordsArray) => {
  laterString = wordsArray.slice(position + 1, wordsArray.length).join(" ");
  currentWord.textContent = wordsArray[position] + " ";
  const highlightedElement = document.getElementsByClassName("highlight")[0];

  if (highlightedElement){
    highlightedElement.nextSibling.textContent = "";
    pText.removeChild(highlightedElement);
  } else {
    pText.textContent = "";
  }
  currentWord.className = 'highlight';
  pText.appendChild(currentWord);
  pText.appendChild(document.createTextNode(laterString));
}
export default highlightCurrentWord;
