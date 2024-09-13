const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const outputBox = document.getElementById("output");

const romanTens = [ 'I', 'X', 'C', 'M' ];
const romanFives = [ 'V', 'L', 'D' ];
const nums = [];

const formatInput = () => {
  const str = numberInput.value
  outputBox.style.display = "block";

  if (!str || str.match(/[e.]/g)) {
    outputBox.textContent = "Please enter a valid number";
    return null;
  } else if (Number(str) < 1 ) {
    outputBox.textContent = "Please enter a number greater than or equal to 1";
    return null;
  } else if (Number(str) > 3999) {
    outputBox.textContent = "Please enter a number less than or equal to 3999";
    return null;
  }

  return str.split('').reverse().map(Number);
}

const convertNum = () => {
  const arr = formatInput();
  const romanNumeralArr = [];

  if (!arr) {
    return;
  }
    
  arr.forEach((digit, index) => {
    if (digit < 5) {
      if (digit === 4) {
        romanNumeralArr.unshift(romanTens[index] + romanFives[index]);
      } else {
        romanNumeralArr.unshift(romanTens[index].repeat(digit));
      }
    } else if (digit > 5) {
      if (digit === 9) {
        romanNumeralArr.unshift(romanTens[index] + romanTens[index + 1]);
      } else {
        romanNumeralArr.unshift(romanFives[index] + romanTens[index].repeat(digit - 5));
      }
    } else {
      romanNumeralArr.unshift(romanFives[index])
    }
  });

  outputBox.style.display = "block";
  outputBox.textContent = romanNumeralArr.join('');
}

convertButton.addEventListener("click", convertNum);
