const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const validateNumber = (str) => {
  const regex = /^(1?\s?)(\(\d{3}\)|\d{3})[-\s]?(\d{3}[-\s]?\d{4})$/
  return regex.test(str);
}

checkButton.addEventListener("click", () => {
  const inputStr = userInput.value;

  if (!inputStr) {
    alert("Please provide a phone number");
  } else {
    const validity = validateNumber(inputStr) ? "Valid" : "Invalid";
    const output = document.createElement("p")
    
    output.textContent = `${validity} US number: ${inputStr}`;
    output.style.color = (validity === "Valid") ? "lightgreen" : "pink";
    resultsDiv.prepend(output);
  }
});

clearButton.addEventListener("click", () => {
  resultsDiv.innerHTML = "";
});