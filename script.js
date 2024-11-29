function calculateScore() {
    let score = 0;
    let feedback = [];

    // Get user inputs
    const leanBodyMass = parseFloat(document.getElementById("lean-body-mass").value);
    const agRatio = parseFloat(document.getElementById("ag-ratio").value);
    const vo2Max = parseFloat(document.getElementById("vo2-max").value);
    const age = parseInt(document.getElementById("age").value);
    const sex = document.getElementById("sex").value;
    const waist = parseFloat(document.getElementById("waist-circumference").value);
    const a1c = parseFloat(document.getElementById("a1c").value);
    const triglycerides = parseFloat(document.getElementById("triglycerides").value);
    const systolic = parseFloat(document.getElementById("systolic").value);
    const diastolic = parseFloat(document.getElementById("diastolic").value);
    const apob = parseFloat(document.getElementById("apob").value);

    // Scoring Logic with Feedback
    if ((sex === "M" && leanBodyMass > 40) || (sex === "F" && leanBodyMass > 35)) {
        score += 1;
    } else {
        feedback.push("Improve lean body mass with resistance training and protein-rich diets to achieve the optimal level.");
    }

    if (agRatio < 1.0) {
        score += 1;
    } else {
        feedback.push("Consider reducing visceral fat with regular aerobic exercise and a balanced diet.");
    }

    const vo2Score = calculateVO2Score(age, sex, vo2Max);
    score += vo2Score;
    if (vo2Score < 4) {
        feedback.push("Increase your VO2 Max through consistent cardiovascular exercise, such as running, swimming, or cycling.");
    }

    if ((sex === "M" && waist < 37) || (sex === "F" && waist < 31.5)) {
        score += 1;
    } else {
        feedback.push("Reduce waist circumference by focusing on overall weight loss through a calorie deficit and increased physical activity.");
    }

    if (a1c < 5.6) {
        score += 1;
    } else {
        feedback.push("Lower your Hemoglobin A1C by reducing sugar intake, eating a low-glycemic diet, and managing stress.");
    }

    if (triglycerides < 100) {
        score += 1;
    } else {
        feedback.push("Lower triglycerides by reducing refined carbohydrates and increasing omega-3 fatty acids in your diet.");
    }

    if (systolic < 120 && diastolic < 80) {
        score += 1;
    } else {
        feedback.push("Manage blood pressure by reducing sodium intake, exercising regularly, and managing stress levels.");
    }

    if (apob < 80) {
        score += 1;
    } else {
        feedback.push("Lower ApoB levels by avoiding trans fats, adopting a heart-healthy diet, and considering medical consultation.");
    }

    // Ensure the score doesn't exceed 10
    score = Math.min(score, 10);

    // Display result
    const result = document.getElementById("result");
    result.innerHTML = `Your Vital10 Score: ${score}/10<br>`;
    if (score === 10) {
        result.innerHTML += "Congratulations! You're in peak health!";
    } else if (score >= 7) {
        result.innerHTML += "Great job! You're doing well, but there are areas for improvement.<br><br>";
    } else {
        result.innerHTML += "There's significant room for improvement. Focus on key health metrics.<br><br>";
    }

    // Display feedback
    if (feedback.length > 0) {
        result.innerHTML += `<strong>Personalized Feedback:</strong><ul>`;
        feedback.forEach((tip) => {
            result.innerHTML += `<li>${tip}</li>`;
        });
        result.innerHTML += `</ul>`;
    }
}

function calculateVO2Score(age, sex, vo2Max) {
    const vo2Ranges = {
        "30-39": { M: [54.0, 52.4, 47.0, 43.0], F: [42.0, 40.6, 35.0, 30.0] },
        "40-49": { M: [50.0, 48.4, 43.0, 38.0], F: [39.0, 37.4, 32.0, 28.0] },
        "50-59": { M: [46.0, 44.2, 39.0, 35.0], F: [36.0, 33.0, 28.0, 25.0] }
    };

    let ageRange = null;
    if (age >= 30 && age <= 39) ageRange = "30-39";
    else if (age >= 40 && age <= 49) ageRange = "40-49";
    else if (age >= 50 && age <= 59) ageRange = "50-59";

    if (ageRange && vo2Ranges[ageRange][sex]) {
        const [top5, top10, top20, top30] = vo2Ranges[ageRange][sex];
        if (vo2Max >= top5) return 4; // Top 5%
        if (vo2Max >= top10) return 3; // Top 10%
        if (vo2Max >= top20) return 2; // Top 20%
        if (vo2Max >= top30) return 1; // Top 30%
    }
    return 0;
}
