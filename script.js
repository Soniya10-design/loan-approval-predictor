const model = {
  // 👉 PASTE YOUR JSON HERE (weights, mins, maxs, eduLevels)
};

// --- Sigmoid ---
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

// --- Dot Product ---
function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

// --- Normalize (IMPORTANT FIX) ---
function normalize(features) {
  return features.map((val, i) => {
    if (model.maxs[i] === model.mins[i]) return val;
    return (val - model.mins[i]) / (model.maxs[i] - model.mins[i]);
  });
}

// --- Encode Input (ORDER MUST MATCH TRAINING) ---
function encodeInput(age, gender, education, marital, income, credit) {
  let features = [];

  // SAME ORDER as training
  features.push(age);
  features.push(income);
  features.push(credit);

  features.push(gender === "Female" ? 1 : 0);
  features.push(marital === "Married" ? 1 : 0);

  model.eduLevels.forEach(level => {
    features.push(education === level ? 1 : 0);
  });

  return normalize(features);
}

// --- Prediction ---
function predict(features) {
  const z = dot(features, model.weights);
  const prob = sigmoid(z);

  console.log("Z:", z, "Prob:", prob); // debug

  return prob >= 0.5 ? "Approved ✅" : "Denied ❌";
}

// --- Form ---
document.getElementById("loanForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const age = Number(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const education = document.getElementById("education").value;
  const marital = document.getElementById("marital").value;
  const income = Number(document.getElementById("income").value);
  const credit = Number(document.getElementById("credit").value);

  const features = encodeInput(age, gender, education, marital, income, credit);

  console.log("Features:", features);

  const result = predict(features);

  document.getElementById("result").innerText = result;
});
