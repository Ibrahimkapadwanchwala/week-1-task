// Function to validate user input
function validateInput(value) {
    const number = parseInt(value, 10);
    if (isNaN(number) || number < 0) {
      alert("Please enter a valid positive integer.");
      return null;
    }
    return number;
  }
  
  // Iterative Factorial
  function factorialIterative(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  }
  
  // Recursive Factorial
  function factorialRecursive(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * factorialRecursive(n - 1);
  }
  
  // Display Result
  function displayResult(value, method, result) {
    const output = document.getElementById("output");
    output.innerHTML = `
          <p><strong>Input:</strong> ${value}</p>
          <p><strong>Method:</strong> ${method}</p>
          <p><strong>Factorial:</strong> ${result}</p>
      `;
  }
  
  // Event Listeners for Buttons
  document.getElementById("iterativeButton").addEventListener("click", () => {
    const input = document.getElementById("numberInput").value;
    const number = validateInput(input);
    if (number !== null) {
      const result = factorialIterative(number);
      displayResult(number, "Iterative", result);
    }
  });
  
  document.getElementById("recursiveButton").addEventListener("click", () => {
    const input = document.getElementById("numberInput").value;
    const number = validateInput(input);
    if (number !== null) {
      const result = factorialRecursive(number);
      displayResult(number, "Recursive", result);
    }
  });