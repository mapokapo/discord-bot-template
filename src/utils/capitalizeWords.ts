function capitalizeWords(text: string): string {
  let newWord = [];
  for (const word of text.split(" ")) {
    newWord.push(word.charAt(0).toUpperCase() + word.slice(1));
  }
  return newWord.join(" ");
}

export default capitalizeWords;
