alert("JS is connected");
var currentWorkoutGoal = "";


/* ===============================
   CALORIE CALCULATOR
================================ */

function calculateCalories() {
  var age = Number(document.getElementById("age").value);
  var weight = Number(document.getElementById("weight").value);
  var height = Number(document.getElementById("height").value);
  var activity = Number(document.getElementById("activity").value);
  var gender = document.getElementById("gender").value;

  if (!age || !weight || !height || !activity) {
    document.getElementById("result").innerText =
      "Please fill all fields.";
    return;
  }

  var bmr = 0;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  var maintenanceCalories = bmr * activity;
  window.maintenance = maintenanceCalories;

  document.getElementById("bmrResult").innerText =
    "BMR: " + Math.round(bmr) + " kcal/day";

  document.getElementById("result").innerText =
    "Maintenance Calories: " +
    Math.round(maintenanceCalories) +
    " kcal/day";
}

/* ===============================
   SECTION NAVIGATION
================================ */

function showSection(sectionId) {
  var sections = document.querySelectorAll(".box");

  sections.forEach(function (section) {
    section.classList.add("hidden");
  });

  document.getElementById(sectionId).classList.remove("hidden");
}

/* ===============================
   LANGUAGE INFO
================================ */

function setLanguage(lang) {
  var text = "";

  if (lang === "en") {
    text =
      "BMR is the calories your body needs at rest. Maintenance calories keep your weight stable.";
  }

  if (lang === "hi") {
    text =
      "BMR वह कैलोरी है जो शरीर को आराम की स्थिति में चाहिए। Maintenance Calories वजन बनाए रखती है।";
  }

  if (lang === "bn") {
    text =
      "BMR হলো শরীর বিশ্রামে থাকার জন্য প্রয়োজনীয় ক্যালোরি। Maintenance Calories ওজন স্থির রাখে।";
  }

  document.getElementById("explanation").innerText = text;
}

/* ===============================
   GOAL & MACROS
================================ */

function setGoal(goal) {
  if (!window.maintenance) {
    document.getElementById("goalResult").innerText =
      "Please calculate calories first.";
    return;
  }

  var targetCalories = 0;

  if (goal === "loss") targetCalories = window.maintenance - 500;
  if (goal === "maintain") targetCalories = window.maintenance;
  if (goal === "gain") targetCalories = window.maintenance + 500;

  document.getElementById("goalResult").innerText =
    "Target Calories: " +
    Math.round(targetCalories) +
    " kcal/day";

  var weight = Number(document.getElementById("weight").value);

  var proteinGrams = weight * 2;
  var proteinCalories = proteinGrams * 4;

  var fatCalories = targetCalories * 0.25;
  var fatGrams = fatCalories / 9;

  var remainingCalories =
    targetCalories - (proteinCalories + fatCalories);
  var carbsGrams = remainingCalories / 4;

  document.getElementById("macroResult").innerText =
    "Macros → Protein: " +
    Math.round(proteinGrams) +
    " g | Carbs: " +
    Math.round(carbsGrams) +
    " g | Fat: " +
    Math.round(fatGrams) +
    " g";
}

/* ===============================
   MEAL TRACKER
================================ */

var mealCalories = 0;
var mealProtein = 0;
var mealCarbs = 0;
var mealFat = 0;

function addMeal() {
  var food = document.getElementById("food").value;
  var grams = Number(document.getElementById("grams").value);

  if (!grams || grams <= 0) {
    document.getElementById("mealResult").innerText =
      "Enter valid grams.";
    return;
  }

  var data = {
  rice: { c: 130, p: 2.7, cb: 28, f: 0.3 },
  brown_rice: { c: 123, p: 2.7, cb: 25.6, f: 1 },
  whole_wheat_bread: { c: 247, p: 13, cb: 41, f: 4 },
  white_bread: { c: 266, p: 9, cb: 49, f: 3 },
  oats: { c: 389, p: 17, cb: 66, f: 7 },
  pasta: { c: 131, p: 5, cb: 25, f: 1 },
  potato: { c: 77, p: 2, cb: 17, f: 0.1 },
  sweet_potato: { c: 86, p: 1.6, cb: 20, f: 0.1 },
  corn: { c: 96, p: 3.4, cb: 21, f: 1.5 },
  quinoa: { c: 120, p: 4.4, cb: 21, f: 1.9 },

  chicken_breast: { c: 165, p: 31, cb: 0, f: 3.6 },
  chicken_thigh: { c: 209, p: 26, cb: 0, f: 10.9 },
  chicken: { c: 165, p: 31, cb: 0, f: 3.6 }, // keep for safety
  egg: { c: 155, p: 13, cb: 1.1, f: 11 },
  egg_white: { c: 52, p: 11, cb: 0.7, f: 0.2 },
  fish: { c: 120, p: 22, cb: 0, f: 2 },
  tuna: { c: 132, p: 29, cb: 0, f: 1 },
  salmon: { c: 208, p: 20, cb: 0, f: 13 },
  beef: { c: 250, p: 26, cb: 0, f: 15 },
  mutton: { c: 294, p: 25, cb: 0, f: 21 },
  paneer: { c: 265, p: 18, cb: 6, f: 20 },

  milk: { c: 60, p: 3.2, cb: 5, f: 3.2 },
  low_fat_milk: { c: 42, p: 3.4, cb: 5, f: 1 },
  yogurt: { c: 59, p: 10, cb: 3.6, f: 0.4 },
  greek_yogurt: { c: 59, p: 10, cb: 3.6, f: 0.4 },
  cheese: { c: 402, p: 25, cb: 1.3, f: 33 },
  butter: { c: 717, p: 0.9, cb: 0.1, f: 81 },
  whey: { c: 412, p: 80, cb: 7, f: 6 },

  lentils: { c: 116, p: 9, cb: 20, f: 0.4 },
  chickpeas: { c: 164, p: 9, cb: 27, f: 2.6 },
  rajma: { c: 127, p: 9, cb: 23, f: 0.5 },
  black_beans: { c: 132, p: 9, cb: 23, f: 0.5 },
  tofu: { c: 76, p: 8, cb: 1.9, f: 4.8 },

  peanuts: { c: 567, p: 26, cb: 16, f: 49 },
  almonds: { c: 579, p: 21, cb: 22, f: 50 },
  cashews: { c: 553, p: 18, cb: 30, f: 44 },
  walnuts: { c: 654, p: 15, cb: 14, f: 65 },
  peanut_butter: { c: 588, p: 25, cb: 20, f: 50 },
  olive_oil: { c: 884, p: 0, cb: 0, f: 100 },

  banana: { c: 89, p: 1.1, cb: 23, f: 0.3 },
  apple: { c: 52, p: 0.3, cb: 14, f: 0.2 },
  orange: { c: 47, p: 0.9, cb: 12, f: 0.1 },
  mango: { c: 60, p: 0.8, cb: 15, f: 0.4 },
  papaya: { c: 43, p: 0.5, cb: 11, f: 0.3 },
  grapes: { c: 69, p: 0.6, cb: 18, f: 0.2 },
  dates: { c: 277, p: 1.8, cb: 75, f: 0.2 },

  spinach: { c: 23, p: 2.9, cb: 3.6, f: 0.4 },
  broccoli: { c: 34, p: 2.8, cb: 7, f: 0.4 },
  carrot: { c: 41, p: 0.9, cb: 10, f: 0.2 },
  tomato: { c: 18, p: 0.9, cb: 3.9, f: 0.2 },
  onion: { c: 40, p: 1.1, cb: 9, f: 0.1 }
};


  var item = data[food];
  if (!item) return;

  var calories = (item.c * grams) / 100;
  var protein = (item.p * grams) / 100;
  var carbs = (item.cb * grams) / 100;
  var fat = (item.f * grams) / 100;

  mealCalories += calories;
  mealProtein += protein;
  mealCarbs += carbs;
  mealFat += fat;

  document.getElementById("mealResult").innerText =
    "Added " + Math.round(calories) + " kcal";

  document.getElementById("mealTotal").innerText =
    "Total → Calories: " +
    Math.round(mealCalories) +
    " kcal | Protein: " +
    mealProtein.toFixed(1) +
    " g | Carbs: " +
    mealCarbs.toFixed(1) +
    " g | Fat: " +
    mealFat.toFixed(1) +
    " g";

  if (window.maintenance) {
    document.getElementById("dailyStatus").innerText =
      Math.round(mealCalories) +
      " / " +
      Math.round(window.maintenance) +
      " kcal consumed";
  }
}

function resetMeal() {
  mealCalories = 0;
  mealProtein = 0;
  mealCarbs = 0;
  mealFat = 0;

  document.getElementById("mealResult").innerText = "";
  document.getElementById("mealTotal").innerText =
    "Total → Calories: 0 kcal";
  document.getElementById("dailyStatus").innerText = "";
}

/* ===============================
   WORKOUT PLANS
================================ */

function selectWorkout(goal) {
  currentWorkoutGoal = goal;
  var html = "";


  if (goal === "loss") {
    html = `
      <h3>Fat Loss Workout Plan</h3>
      <ul>
        <li>
  <b style="cursor:pointer;color:#2e7d32;"
   onclick="showDayWorkout('monday')">
     Monday:
  </b> Chest + Triceps + HIIT
</li>

        <li><b>Tuesday:</b> Back + Biceps + Cardio</li>
        <li><b>Wednesday:</b> Legs + Core + HIIT</li>
        <li><b>Thursday:</b> Chest + Shoulders</li>
        <li><b>Friday:</b> Back + Arms + Cardio</li>
        <li><b>Saturday:</b> Legs + Core</li>
        <li><b>Sunday:</b> Rest</li>
      </ul>
      <p><b>Reps:</b> 12–15</p>
      <p><b>Rest:</b> 30–45 sec</p>
    `;
  }

  if (goal === "maintain") {
    html = `
      <h3>Maintenance Workout Plan</h3>
      <ul>
        <li><b>Monday:</b> Chest + Triceps</li>
        <li><b>Tuesday:</b> Back + Biceps</li>
        <li><b>Wednesday:</b> Legs + Core</li>
        <li><b>Thursday:</b> Chest + Shoulders</li>
        <li><b>Friday:</b> Back + Arms</li>
        <li><b>Saturday:</b> Legs</li>
        <li><b>Sunday:</b> Rest</li>
      </ul>
      <p><b>Reps:</b> 8–12</p>
      <p><b>Rest:</b> 60 sec</p>
    `;
  }

  if (goal === "gain") {
    html = `
      <h3>Muscle Gain Workout Plan</h3>
      <ul>
        <li><b>Monday:</b> Chest + Triceps (Heavy)</li>
        <li><b>Tuesday:</b> Back + Biceps (Heavy)</li>
        <li><b>Wednesday:</b> Legs (Heavy)</li>
        <li><b>Thursday:</b> Shoulders + Abs</li>
        <li><b>Friday:</b> Arms</li>
        <li><b>Saturday:</b> Legs + Core</li>
        <li><b>Sunday:</b> Rest</li>
      </ul>
      <p><b>Reps:</b> 6–8</p>
      <p><b>Rest:</b> 90–120 sec</p>
    `;
  }

  document.getElementById("workoutResult").innerHTML = html;
}
function showDayWorkout(day) {
  var goal = currentWorkoutGoal;
  var html = "";


  /* ===== FAT LOSS ===== */
  if (goal === "loss" && day === "monday") {
    html = `
      <h3>Monday – Chest & Triceps (Fat Loss)</h3>
      <ul>
        <li>Bench Press – 4 × 12–15</li>
        <li>Incline DB Press – 3 × 12–15</li>
        <li>Cable Fly – 3 × 15</li>
        <li>Triceps Pushdown – 3 × 15</li>
        <li>Bench Dips – 2 × Max</li>
      </ul>
      <p><b>Rest:</b> 30–45 sec</p>
      <p><b>Cardio:</b> 15–20 min HIIT</p>
    `;
  }

    if (goal === "maintain" && day === "monday") {
    html = `
      <h3>Monday – Chest & Triceps (Maintain)</h3>
      <ul>
        <li>Barbell Bench Press – 4 × 8–12</li>
        <li>Incline Dumbbell Press – 3 × 10–12</li>
        <li>Machine Chest Press – 3 × 10</li>
        <li>Triceps Pushdown – 3 × 10–12</li>
        <li>Overhead Dumbbell Extension – 3 × 12</li>
      </ul>
      <p><b>Rest:</b> 60 sec</p>
    `;
  }


    if (goal === "gain" && day === "monday") {
    html = `
      <h3>Monday – Chest & Triceps (Muscle Gain)</h3>
      <ul>
        <li>Barbell Bench Press – 5 × 5–8</li>
        <li>Incline Barbell Press – 4 × 6–8</li>
        <li>Weighted Dips – 3 × 6–8</li>
        <li>Close-Grip Bench Press – 4 × 6–8</li>
        <li>Heavy Cable Pushdown – 3 × 8–10</li>
      </ul>
      <p><b>Rest:</b> 90–120 sec</p>
    `;
  }


  document.getElementById("dayWorkout").innerHTML = html;
}
/* ===============================
   DIET CHART
================================ */

function showDiet(goal) {
  var html = "";

  if (goal === "loss") {
    html = `
      <h3>Fat Loss Diet (USA / UAE / Africa)</h3>
      <ul>
        <li><b>Breakfast:</b> Eggs / Oats / Black Coffee</li>
        <li><b>Lunch:</b> Grilled Chicken / Brown Rice / Vegetables</li>
        <li><b>Snack:</b> Fruits or Nuts</li>
        <li><b>Dinner:</b> Fish or Chicken + Salad</li>
      </ul>
      <p><b>Tip:</b> Avoid sugar, soft drinks, fried food</p>
    `;
  }

  if (goal === "maintain") {
    html = `
      <h3>Maintenance Diet (USA / UAE / Africa)</h3>
      <ul>
        <li><b>Breakfast:</b> Eggs + Toast / Milk</li>
        <li><b>Lunch:</b> Rice or Bread + Chicken / Beans</li>
        <li><b>Snack:</b> Yogurt / Fruits</li>
        <li><b>Dinner:</b> Balanced Protein + Carbs</li>
      </ul>
      <p><b>Tip:</b> Eat on time, don’t skip meals</p>
    `;
  }

  if (goal === "gain") {
    html = `
      <h3>Muscle Gain Diet (USA / UAE / Africa)</h3>
      <ul>
        <li><b>Breakfast:</b> Eggs + Oats + Milk</li>
        <li><b>Lunch:</b> Chicken / Beef + Rice / Pasta</li>
        <li><b>Snack:</b> Peanut Butter / Banana / Shake</li>
        <li><b>Dinner:</b> Fish / Chicken + Potatoes</li>
      </ul>
      <p><b>Tip:</b> Eat more calories + enough protein</p>
    `;
  }

  document.getElementById("dietResult").innerHTML = html;
}
function showDiet(type) {
  const diet = document.getElementById("dietResult");

  if (type === "loss") {
    diet.innerHTML = `
      <h3>Fat Loss Diet (Global)</h3>
      <ul>
        <li><b>Breakfast:</b> Eggs + Fruit</li>
        <li><b>Lunch:</b> Chicken/Fish + Vegetables</li>
        <li><b>Snack:</b> Nuts or Fruit</li>
        <li><b>Dinner:</b> Light protein + Veggies</li>
      </ul>
      <p><b>Tip:</b> Eat fewer calories, high protein</p>
    `;
  }

  if (type === "maintain") {
    diet.innerHTML = `
      <h3>Maintenance Diet (Global)</h3>
      <ul>
        <li><b>Breakfast:</b> Eggs + Bread + Milk</li>
        <li><b>Lunch:</b> Protein + Rice/Bread</li>
        <li><b>Snack:</b> Fruit + Nuts</li>
        <li><b>Dinner:</b> Balanced meal</li>
      </ul>
      <p><b>Tip:</b> Balance calories & activity</p>
    `;
  }

  if (type === "gain") {
    diet.innerHTML = `
      <h3>Muscle Gain Diet (Global)</h3>
      <ul>
        <li><b>Breakfast:</b> Eggs + Oats + Milk</li>
        <li><b>Lunch:</b> Chicken/Beef + Rice/Pasta</li>
        <li><b>Snack:</b> Peanut Butter / Banana / Shake</li>
        <li><b>Dinner:</b> Fish/Chicken + Potatoes</li>
      </ul>
      <p><b>Tip:</b> Eat more calories + enough protein</p>
    `;
  }
}
function showInfo(type) {
  const info = document.getElementById("infoResult");

  if (type === "loss") {
    info.innerHTML = `
      <h3>Fat Loss – Pros & Cons</h3>
      <h4>✅ Pros</h4>
      <ul>
        <li>Reduces body fat</li>
        <li>Improves heart health</li>
        <li>Better stamina</li>
      </ul>
      <h4>❌ Cons</h4>
      <ul>
        <li>Low energy if calories too low</li>
        <li>Muscle loss if protein is low</li>
      </ul>
    `;
  }

  if (type === "maintain") {
    info.innerHTML = `
      <h3>Maintenance – Pros & Cons</h3>
      <h4>✅ Pros</h4>
      <ul>
        <li>Stable energy levels</li>
        <li>Easy to follow</li>
        <li>Good lifestyle balance</li>
      </ul>
      <h4>❌ Cons</h4>
      <ul>
        <li>No major fat loss</li>
        <li>No fast muscle gain</li>
      </ul>
    `;
  }

  if (type === "gain") {
    info.innerHTML = `
      <h3>Muscle Gain – Pros & Cons</h3>
      <h4>✅ Pros</h4>
      <ul>
        <li>Increases strength</li>
        <li>Better body shape</li>
        <li>Higher metabolism</li>
      </ul>
      <h4>❌ Cons</h4>
      <ul>
        <li>Fat gain if calories not controlled</li>
        <li>Needs consistent training</li>
      </ul>
    `;
  }
}
