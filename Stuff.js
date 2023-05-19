function isPalidrome(string) {
  string = string.replace(/[^a-zA-Z]/g, "");
  if (string.length === 1) return true;
  const firstLetter = string[0];
  const lastLetter = string[string.length - 1];
  if (firstLetter === lastLetter) {
    const newString = string.substring(1, string.length - 1);
    const answer = isPalidrome(newString);
    return answer;
  } else return false;
}

const answer = isPalidrome("racecar");

answer;

// const string = 'abaa'

// const g = string.length

// g

// const newString = string.substring(1, 3);

// newString
