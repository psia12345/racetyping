const typedText = document.getElementById('user-typing').textContent;
const charCount = typedText.length;

const calculateWPM = (timeInSec) => Math.floor(charCount / timeInSec * 60);
const adjustedWPM = (timeInSec, numWrong) => Math.floor(calculateWPM( (timeInSec - numWrong) / timeInSec * 60 ));

export default calculateWPM;
// export default adjustedWPM;
