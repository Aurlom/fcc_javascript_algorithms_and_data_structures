let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const values = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1.00,
  "FIVE": 5.00,
  "TEN": 10.00,
  "TWENTY": 20.00,
  "ONE HUNDRED": 100.00
}

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDiv = document.getElementById("change-due");

const checkRemainingChange = (changeArr) => {
  let remainingCash = 0;
  for (let i = 0; i < changeArr.length; i++) {
    remainingCash += parseFloat(changeArr[i][1].toFixed(2));
  }

  return remainingCash;
}

const updateChangeDueDiv = (count, denomination) => {
  const value = count * values[denomination]
  changeDueDiv.innerHTML += `${denomination}: \$${value.toFixed(2)}<br>`
};

const getChange = () => {
  let customerCash = Number(cashInput.value);
  let changeDue = parseFloat((customerCash - price).toFixed(2));
  let status = "OPEN"
  let changeRemaining = [...cid].reverse();
  const totalRemainingChange = checkRemainingChange(changeRemaining);
  
  changeDueDiv.innerHTML = '';

  if (customerCash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (customerCash === price) {
    changeDueDiv.innerHTML = "No change due - customer paid with exact cash";
    return;
  }

  if (changeDue > totalRemainingChange) {
    changeDueDiv.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (changeDue === totalRemainingChange) {
    status = "CLOSED";
  }

  changeDueDiv.innerHTML += `Status: ${status}<br>`

  for (let i = 0; i < changeRemaining.length; i++) {
    let count = 0;
    while (parseFloat(changeDue.toFixed(2)) >= values[changeRemaining[i][0]]) {
      if (parseFloat(changeRemaining[i][1].toFixed(2)) > 0.00){
        changeDue -= values[changeRemaining[i][0]];
        changeRemaining[i][1] -= values[changeRemaining[i][0]];
        count++;
      } else {
        break;
      }
    }
    
    if (count) {
      updateChangeDueDiv(count, changeRemaining[i][0]);
    }
  }
  console.log(changeDue)
  if (parseFloat(changeDue.toFixed(2)) > 0.00) {
    changeDueDiv.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  console.log(cid);
};

purchaseBtn.addEventListener("click", getChange);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getChange();
  }
});
