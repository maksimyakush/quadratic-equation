module.exports = function solveEquation(equation) {
  let newEquation = equation.split(" ");
  newEquation = newEquation.map(a => {
    if (a.includes("^")) {
      return a = a.replace("x^2", "mulTwo");
    }
    return a;
  })
  for (let i = 0; i < newEquation.length; i++) {
    if (newEquation[i - 1] === "*") {
      newEquation[i] = newEquation[i - 2] + newEquation[i];
      delete newEquation[i - 2];
      delete newEquation[i - 1];
    }
  }
  newEquation = newEquation.filter(String);
  for (let i = 0; i < newEquation.length; i++) {
    if (newEquation[i - 1] === "-") {
      newEquation[i] = "-" + newEquation[i];
      delete newEquation[i - 1]
    }
    if (newEquation[i - 1] === "+") {
      newEquation[i] = "+" + newEquation[i];
      delete newEquation[i - 1]
    }
  }
  newEquation = newEquation.filter(String);
  let c = newEquation.reduce((a, b, i, arr) => {
    if (Number(b)) {
      a += +b;
      delete arr[i];
    }
    return a;
  }, 0)
  newEquation = newEquation.filter(String);
  let b = newEquation.reduce((a, b, i, arr) => {
    if (b.includes("x")) {
      a += parseInt(b);
      delete arr[i];
    }
    return a;
  }, 0)
  let a = 0;
  newEquation.forEach(item => {
    if (item.includes("mul")) {
      a = parseInt(item);
    }
  })
  let D = Math.pow(b, 2) - 4 * a * c;
  let res1 = -b + Math.sqrt(D);
  res1 = res1 / 2 / a;
  let res2 = -b - Math.sqrt(D);
  res2 = res2 / 2 / a;
  return [Math.round(res1), Math.round(res2)].sort((a, b) => a - b);
}
