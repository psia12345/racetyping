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
  rawFile.send(null);
  return wordsArray;
}
export default readTextFile;
