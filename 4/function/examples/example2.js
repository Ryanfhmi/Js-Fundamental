// example2.js — higher-order, recursion

function applyTwice(fn, v) {
  return fn(fn(v));
}

const inc = x => x + 1;
console.log(applyTwice(inc, 5)); // 7

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n-1);
}
console.log('5! =', factorial(5));
