const readTextFile = file => {
  const rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
      const allText = rawFile.responseText;
      console.log(allText);
    }
  }
  rawFile.send(null);
}
export default readTextFile;
