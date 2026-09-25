import warnings
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", module="scipy")

from pathlib import Path
import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "models" / "bank_marketing_pipeline.joblib"

app = Flask(__name__)
CORS(app)

# Load trained model pipeline artifact
if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model file not found at {MODEL_PATH}. Run export_model.py first!"
    )

saved_data = joblib.load(MODEL_PATH)
preprocessor = saved_data["preprocessor"]
model = saved_data["model"]
feature_columns = saved_data["feature_columns"]
categorical_options = saved_data["categorical_options"]

DEFAULT_VALUES = {
    "age": 35,
    "job": "management",
    "marital": "single",
    "education": "tertiary",
    "default": "no",
    "balance": 1500,
    "housing": "no",
    "loan": "no",
    "contact": "cellular",
    "day": 15,
    "month": "may",
    "duration": 300,
    "campaign": 1,
    "pdays": -1,
    "previous": 0,
    "poutcome": "unknown",
}

NUMERIC_RANGES = {
    "age": {"min": 18, "max": 95, "step": 1, "label": "Age", "unit": "years"},
    "balance": {"min": -5000, "max": 50000, "step": 100, "label": "Average Annual Balance", "unit": "€"},
    "day": {"min": 1, "max": 31, "step": 1, "label": "Last Contact Day", "unit": "day of month"},
    "duration": {"min": 0, "max": 3600, "step": 10, "label": "Last Contact Duration", "unit": "seconds"},
    "campaign": {"min": 1, "max": 50, "step": 1, "label": "Campaign Contacts", "unit": "calls"},
    "pdays": {"min": -1, "max": 870, "step": 1, "label": "Days Since Last Contact", "unit": "days (-1 = none)"},
    "previous": {"min": 0, "max": 50, "step": 1, "label": "Previous Campaign Contacts", "unit": "contacts"},
}

PRESETS = [
    {
        "id": "high_likelihood",
        "name": "🌟 High Potential Executive",
        "description": "Long call duration, high balance, previous success",
        "values": {
            "age": 58,
            "job": "retired",
            "marital": "married",
            "education": "tertiary",
            "default": "no",
            "balance": 8500,
            "housing": "no",
            "loan": "no",
            "contact": "cellular",
            "day": 15,
            "month": "oct",
            "duration": 720,
            "campaign": 1,
            "pdays": 180,
            "previous": 3,
            "poutcome": "success",
        },
    },
    {
        "id": "student_profile",
        "name": "🎓 Tech Student",
        "description": "Young student, no loans, moderate contact",
        "values": {
            "age": 22,
            "job": "student",
            "marital": "single",
            "education": "secondary",
            "default": "no",
            "balance": 450,
            "housing": "no",
            "loan": "no",
            "contact": "cellular",
            "day": 10,
            "month": "sep",
            "duration": 320,
            "campaign": 1,
            "pdays": -1,
            "previous": 0,
            "poutcome": "unknown",
        },
    },
    {
        "id": "standard_applicant",
        "name": "💼 Standard Applicant",
        "description": "Middle-aged worker with housing loan",
        "values": {
            "age": 40,
            "job": "blue-collar",
            "marital": "married",
            "education": "secondary",
            "default": "no",
            "balance": 1200,
            "housing": "yes",
            "loan": "no",
            "contact": "cellular",
            "day": 20,
            "month": "may",
            "duration": 180,
            "campaign": 2,
            "pdays": -1,
            "previous": 0,
            "poutcome": "unknown",
        },
    },
    {
        "id": "low_likelihood",
        "name": "⚠️ Low Engagement Contact",
        "description": "Short duration, repeated calls, existing loan debt",
        "values": {
            "age": 45,
            "job": "services",
            "marital": "married",
            "education": "primary",
            "default": "yes",
            "balance": -200,
            "housing": "yes",
            "loan": "yes",
            "contact": "unknown",
            "day": 5,
            "month": "may",
            "duration": 45,
            "campaign": 6,
            "pdays": -1,
            "previous": 0,
            "poutcome": "unknown",
        },
    },
]


def generate_insights(features: dict, prob_yes: float) -> list:
    """Generate dynamic insights explaining the prediction probability."""
    insights = []
    duration = features.get("duration", 0)
    poutcome = features.get("poutcome", "unknown")
    balance = features.get("balance", 0)
    housing = features.get("housing", "no")
    loan = features.get("loan", "no")
    campaign = features.get("campaign", 1)

    if duration >= 400:
        insights.append(
            f"⏱️ Extended call duration ({duration}s) strongly increases client interest."
        )
    elif duration < 120:
        insights.append(
            f"⏱️ Short call duration ({duration}s) limits engagement time with client."
        )

    if poutcome == "success":
        insights.append(
            "🎉 Client's successful outcome in previous campaign is a top positive indicator."
        )
    elif poutcome == "failure":
        insights.append(
            "⚠️ Previous campaign failed, requiring strategic follow-up."
        )

    if balance >= 3000:
        insights.append(
            f"💰 Solid account balance (€{balance:,}) signals strong financial capacity."
        )
    elif balance < 0:
        insights.append(
            f"🔻 Negative balance (€{balance:,}) lowers term deposit likelihood."
        )

    if housing == "no" and loan == "no":
        insights.append("✅ Absence of housing & personal loans frees up disposable income.")
    elif housing == "yes" and loan == "yes":
        insights.append("💳 Existing housing and personal loans increase monthly financial liabilities.")

    if campaign > 4:
        insights.append(
            f"📞 High campaign contact count ({campaign} calls) may lead to client fatigue."
        )

    if not insights:
        if prob_yes > 0.5:
            insights.append("👍 Overall client feature profile is favorable for subscription.")
        else:
            insights.append("ℹ️ Standard campaign parameters suggest standard conversion probability.")

    return insights


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "message": "Bank Marketing Campaign ML Backend API is Running!",
        "status": "online",
        "frontend_url": "http://localhost:3000",
        "health_check": "http://127.0.0.1:5000/api/health",
        "features_endpoint": "http://127.0.0.1:5000/api/features"
    })


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": True, "features_count": len(feature_columns)})


@app.route("/api/features", methods=["GET"])
def get_features():
    return jsonify({
        "feature_columns": feature_columns,
        "categorical_options": categorical_options,
        "defaults": DEFAULT_VALUES,
        "numeric_ranges": NUMERIC_RANGES,
        "presets": PRESETS,
    })


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json() or {}
        
        # Build features dict with fallback defaults
        input_data = {}
        for col in feature_columns:
            if col in NUMERIC_RANGES:
                val = data.get(col, DEFAULT_VALUES.get(col, 0))
                try:
                    input_data[col] = float(val)
                except (ValueError, TypeError):
                    input_data[col] = float(DEFAULT_VALUES.get(col, 0))
            else:
                input_data[col] = str(data.get(col, DEFAULT_VALUES.get(col, "")))

        # Convert to single-row DataFrame
        df_input = pd.DataFrame([input_data])
        
        # Transform via fitted preprocessor pipeline
        X_encoded = preprocessor.transform(df_input)
        
        # Make model prediction
        pred = int(model.predict(X_encoded)[0])
        probabilities = model.predict_proba(X_encoded)[0]
        
        prob_no = float(probabilities[0])
        prob_yes = float(probabilities[1])
        
        prediction_label = "yes" if pred == 1 else "no"
        probability_percentage = round(prob_yes * 100, 1)
        
        confidence = "High" if abs(prob_yes - 0.5) > 0.3 else ("Moderate" if abs(prob_yes - 0.5) > 0.15 else "Borderline")
        insights = generate_insights(input_data, prob_yes)

        return jsonify({
            "prediction": prediction_label,
            "binary_prediction": pred,
            "subscribed": pred == 1,
            "probability_yes": prob_yes,
            "probability_no": prob_no,
            "probability_percentage": probability_percentage,
            "confidence": confidence,
            "insights": insights,
            "input_summary": input_data,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    print("Starting Bank Marketing Flask API on http://127.0.0.1:5000 (0.0.0.0:5000) ...")
    app.run(host="0.0.0.0", port=5000, debug=True)
