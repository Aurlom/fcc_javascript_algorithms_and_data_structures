const inputBox = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultField = document.getElementById("result");

checkButton.addEventListener("click", () => {
  if (!inputBox.value) {
    alert("Please input a value");
  }
  
  resultField.innerText = `${inputBox.value} ${checkPalindrome(inputBox.value)} a Palindrome`;
  resultField.style.display = "block";
});

const checkPalindrome = (userInput) => {
  const cleanedStr = [...cleanInput(userInput)];
  return cleanedStr.join('') === cleanedStr.reverse().join('') ? "is" : "is not";
}

const cleanInput = (str) => {
  const regex = /[^a-z0-9]/gi;
  return str.replace(regex, '').toLowerCase();
};
