// example1.js — variasi function

// Function declaration
function greet(name) {
  return `Halo, ${name}!`;
}

// Function expression
const add = function(a, b) {
  return a + b;
};

// Arrow function
const square = x => x * x;

console.log(greet('Sari'));
console.log('2+3=', add(2,3));
console.log('5^2=', square(5));
