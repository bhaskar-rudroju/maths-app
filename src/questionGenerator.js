// questionGenerator.js

export function generateQuestions(count = 1000) {
  const questions = [];

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const templates = [
    () => {
      const num = rand(1000, 99999);
      const str = String(num);
      const idx = rand(0, str.length - 1);
      return {
        q: `What is the value of the digit ${str[idx]} in the number ${num}?`,
        a: String(Number(str[idx]) * Math.pow(10, str.length - idx - 1))
      };
    },

    () => {
      const a = rand(1000, 9000);
      const b = rand(1000, 9000);
      return { q: `${a} + ${b} = ?`, a: String(a + b) };
    },

    () => {
      const a = rand(2000, 9000);
      const b = rand(1000, a - 1);
      return { q: `${a} - ${b} = ?`, a: String(a - b) };
    },

    () => {
      const a = rand(10, 99);
      const b = rand(2, 12);
      return { q: `${a} × ${b} = ?`, a: String(a * b) };
    },

    () => {
      const a = rand(100, 999);
      const b = rand(2, 12);
      return { q: `${a} ÷ ${b} = ?`, a: String((a / b).toFixed(2)) };
    },

    () => {
      const n1 = rand(1, 9);
      const n2 = rand(1, 9);
      return {
        q: `What is ${n1}/10 + ${n2}/10?`,
        a: `${(n1 + n2)}/10`
      };
    },

    () => {
      const d = rand(10, 99);
      return {
        q: `Write the decimal ${d / 10} as a fraction.`,
        a: `${d}/10`
      };
    },

    () => {
      const a = rand(5, 20);
      const b = rand(5, 20);
      return {
        q: `What is the area of a rectangle ${a} cm × ${b} cm?`,
        a: `${a * b} cm²`
      };
    },

    () => {
      const a = rand(3, 12);
      return {
        q: `What is the perimeter of a square with side ${a} cm?`,
        a: `${4 * a} cm`
      };
    },

    () => {
      const a = rand(2, 10);
      const b = rand(2, 10);
      const c = rand(2, 10);
      return {
        q: `What is the volume of a rectangular prism ${a} × ${b} × ${c} cm?`,
        a: `${a * b * c} cm³`
      };
    }
  ];

  // generate N questions
  for (let i = 0; i < count; i++) {
    const t = templates[rand(0, templates.length - 1)];
    questions.push(t());
  }

  return questions;
}
