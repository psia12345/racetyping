const moveCursor = (cursorPos, words, input) => {
  while (cursorPos < words.length) {
    //check for letter at the point
    // if (input === 'backspace')
    console.log(input); 
    if (word[cursorPos] === input){
      word[cursorPos].style.color = 'gray';
    } else {
      word[cursorPos].style.color = 'red';
    }
    cursorPos++;
  }
};

export default moveCursor;
