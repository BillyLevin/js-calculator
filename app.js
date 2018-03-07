function handleClick(e) {
  const currentValue = e.target.value;
  let main = document.querySelector(".output-main");
  let sub = document.querySelector(".output-sub");
  if (main.textContent.length === 8) {
    main.textContent = "0";
    sub.textContent = "8 digits max";
    return;
  }
  if (sub.textContent === "8 digits max") {
    sub.textContent = "0";
  }
  if (e.target.value === "clear") {
    clear();
    return;
  } else if (e.target.classList.contains("number")) {
    handleNumber(currentValue);
  } else if (e.target.classList.contains("operation")) {
    handleOperation(currentValue);
  } else if (e.target.classList.contains("decimal")) {
    handleDecimal(currentValue);
  } else if (e.target.classList.contains("equals-btn")) {
    calculate();
  }
}

function clear() {
  document.querySelector(".output-main").textContent = "0";
  document.querySelector(".output-sub").textContent = "0";
}

function updateOutputs(main, sub) {
  let mainOutput = document.querySelector(".output-main");
  let subOutput = document.querySelector(".output-sub");
  if (sub[0] === "0") {
    newSub = sub.substr(1);
    subOutput.textContent = newSub;
  } else {
    subOutput.textContent = sub;
  }
  mainOutput.textContent = main;
}

function handleNumber(num) {
  const prevOutput = document.querySelector(".output-main").textContent;
  const prevSub = document.querySelector(".output-sub").textContent;
  let newOutput = "";
  let newSub = "";
  if (prevOutput === "0") {
    newOutput = num;
    newSub = prevSub + num;
  } else if (isNaN(prevOutput.slice(-1)) && prevOutput.slice(-1) !== ".") {
    newOutput = num;
    newSub = prevSub + num;
  } else {
    newOutput = prevOutput + num;
    newSub = prevSub + num;
  }
  updateOutputs(newOutput, newSub);
}

function handleOperation(operation) {
  const prevOutput = document.querySelector(".output-main").textContent;
  const prevSub = document.querySelector(".output-sub").textContent;
  if (prevOutput === "0" || isNaN(prevOutput.slice(-1))) return;
  updateOutputs(operation, prevSub + operation);
}

function handleDecimal(decimal) {
  const prevOutput = document.querySelector(".output-main").textContent;
  const prevSub = document.querySelector(".output-sub").textContent;
  if (prevOutput.split("").indexOf(".") !== -1) return;
  if (prevSub === "8 digits max") {
    updateOutputs(prevOutput + decimal, decimal);
  } else {
    updateOutputs(prevOutput + decimal, prevSub + decimal);
  }
}

function calculate() {
  const sub = document.querySelector(".output-sub").textContent;
  const answer = eval(sub);
  if (answer.toString().length > 8) {
    document.querySelector(".output-main").textContent = "0";
    document.querySelector(".output-sub").textContent = "8 digits max";
  } else {
    document.querySelector(".output-main").textContent = answer;
  }
}

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", handleClick);
});
