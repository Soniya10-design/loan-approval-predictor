// --- PASTE YOUR MODEL JSON HERE ---
const model = {
  "weights": [...],
  "mins": [...],
  "maxs": [...],
  "eduLevels": [...]
};

// --- Encoding ---
function encodeInput(age, gender, education, marital, income, credit) {
  let features = [];

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

// --- Normalization (same as training!) ---


// --- Prediction ---
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

function dot(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function predict(features) {
  const z = dot(features, model.weights);
  const prob = sigmoid(z);
  return prob >= 0.5 ? "Approved ✅" : "Denied ❌";
}
function normalize(features) {
  return features.map((val, i) => {
    if (model.maxs[i] === model.mins[i]) return val;
    return (val - model.mins[i]) / (model.maxs[i] - model.mins[i]);
  });
}
// --- Form Handling ---
document.getElementById("loanForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const age = Number(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const education = document.getElementById("education").value;
  const marital = document.getElementById("marital").value;
  const income = Number(document.getElementById("income").value);
  const credit = Number(document.getElementById("credit").value);

  const features = encodeInput(age, gender, education, marital, income, credit);

  const result = predict(features);

  document.getElementById("result").innerText = result;
});
