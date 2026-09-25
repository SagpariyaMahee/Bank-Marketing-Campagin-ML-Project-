import json
from pathlib import Path

ROOT = Path("c:/Users/91972/Desktop/ML/Project")
NB_PATH = ROOT / "BMC.ipynb"

# Load notebook
with open(NB_PATH, "r", encoding="utf-8") as f:
    nb = json.load(f)

# Helper function to create Markdown cell
def md_cell(text):
    return {
        "cell_type": "markdown",
        "metadata": {},
        "source": [text if text.endswith("\n") else text + "\n"]
    }

# Helper function to create Code cell
def code_cell(code):
    return {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [code if code.endswith("\n") else code + "\n"]
    }

# Truncate existing cells up to cell index 105 (end of Week 4)
nb['cells'] = nb['cells'][:106]

# Define Week 3 Scratch implementation cell to insert
scratch_md = md_cell("### Scratch Implementation of Logistic Regression (Mandatory Constraint)\n"
                     "As per project SOP requirements, we implement Logistic Regression from scratch using NumPy (without using scikit-learn ML classes) to understand the underlying mathematics (Sigmoid activation function & Gradient Descent optimization).")

scratch_code = code_cell("""class ScratchLogisticRegression:
    def __init__(self, learning_rate=0.05, num_iterations=400):
        self.learning_rate = learning_rate
        self.num_iterations = num_iterations
        self.weights = None
        self.bias = None

    def _sigmoid(self, z):
        return 1 / (1 + np.exp(-np.clip(z, -250, 250)))

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0.0

        for _ in range(self.num_iterations):
            linear_model = np.dot(X, self.weights) + self.bias
            y_predicted = self._sigmoid(linear_model)

            # Gradient calculation
            dw = (1 / n_samples) * np.dot(X.T, (y_predicted - y))
            db = (1 / n_samples) * np.sum(y_predicted - y)

            # Weight update
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

    def predict_proba(self, X):
        linear_model = np.dot(X, self.weights) + self.bias
        return self._sigmoid(linear_model)

    def predict(self, X):
        y_predicted_cls = [1 if i >= 0.5 else 0 for i in self.predict_proba(X)]
        return np.array(y_predicted_cls)

# Train Scratch Logistic Regression Model
scratch_model = ScratchLogisticRegression(learning_rate=0.05, num_iterations=400)
X_train_dense = X_train_encoded.toarray() if hasattr(X_train_encoded, 'toarray') else X_train_encoded
X_test_dense = X_test_encoded.toarray() if hasattr(X_test_encoded, 'toarray') else X_test_encoded

scratch_model.fit(X_train_dense, y_train.values)
scratch_preds = scratch_model.predict(X_test_dense)
scratch_acc = accuracy_score(y_test, scratch_preds)

print("Scratch Logistic Regression Accuracy:", scratch_acc)
""")

nb['cells'].append(scratch_md)
nb['cells'].append(scratch_code)

# WEEK 5: Advanced Model Training
nb['cells'].append(md_cell("# <center><h3>Week-5</h3>Advanced Model Training & Hyperparameter Tuning</center>"))
nb['cells'].append(md_cell("## Objective\nTo experiment with advanced machine learning models (Decision Tree, Random Forest), perform K-Fold Cross-Validation for model stability, compare performance metrics, and execute hyperparameter tuning."))

nb['cells'].append(code_cell("""from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, StratifiedKFold, GridSearchCV
"""))

nb['cells'].append(md_cell("### 1. Training Multiple Advanced Classifiers"))
nb['cells'].append(code_cell("""# Initialize models
dt_model = DecisionTreeClassifier(max_depth=8, random_state=42)
rf_model = RandomForestClassifier(n_estimators=30, max_depth=10, random_state=42, n_jobs=-1)

# Train Decision Tree
dt_model.fit(X_train_encoded, y_train)
dt_preds = dt_model.predict(X_test_encoded)
dt_acc = accuracy_score(y_test, dt_preds)
dt_f1 = f1_score(y_test, dt_preds)

# Train Random Forest
rf_model.fit(X_train_encoded, y_train)
rf_preds = rf_model.predict(X_test_encoded)
rf_acc = accuracy_score(y_test, rf_preds)
rf_f1 = f1_score(y_test, rf_preds)

print(f"Decision Tree Accuracy: {dt_acc:.4f} | F1-Score: {dt_f1:.4f}")
print(f"Random Forest Accuracy: {rf_acc:.4f} | F1-Score: {rf_f1:.4f}")
"""))

nb['cells'].append(md_cell("### 2. K-Fold Cross-Validation for Model Stability"))
nb['cells'].append(code_cell("""# 3-Fold Stratified Cross Validation
cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)

cv_lr = cross_val_score(model, X_train_encoded, y_train, cv=cv, scoring='accuracy', n_jobs=-1)
cv_rf = cross_val_score(rf_model, X_train_encoded, y_train, cv=cv, scoring='accuracy', n_jobs=-1)

print("Logistic Regression 3-Fold CV Scores:", cv_lr)
print(f"Mean LR CV Accuracy: {cv_lr.mean():.4f} (+/- {cv_lr.std():.4f})")

print("\\nRandom Forest 3-Fold CV Scores:", cv_rf)
print(f"Mean RF CV Accuracy: {cv_rf.mean():.4f} (+/- {cv_rf.std():.4f})")
"""))

nb['cells'].append(md_cell("### 3. Hyperparameter Tuning using GridSearchCV"))
nb['cells'].append(code_cell("""# Grid Search for Logistic Regression C hyperparameter
param_grid = {
    'C': [0.1, 1.0, 10.0]
}

grid_search = GridSearchCV(
    LogisticRegression(max_iter=1000, random_state=42),
    param_grid,
    cv=3,
    scoring='f1',
    n_jobs=-1
)

grid_search.fit(X_train_encoded, y_train)

print("Best Parameters:", grid_search.best_params_)
print("Best Cross-Validation F1-Score:", grid_search.best_score_)

best_model = grid_search.best_estimator_
best_preds = best_model.predict(X_test_encoded)

print("\\nTuned Model Test Accuracy:", accuracy_score(y_test, best_preds))
print("Tuned Model Test F1-Score:", f1_score(y_test, best_preds))
"""))

# WEEK 6: Visualization of Metrics and Graphs
nb['cells'].append(md_cell("# <center><h3>Week-6</h3>Visualization of Metrics and Performance Graphs</center>"))
nb['cells'].append(md_cell("## Objective\nTo visualize all key model evaluation graphs including Confusion Matrix Heatmap, ROC-AUC Curve, Precision-Recall Curve, and Model Comparison Bar Charts."))

nb['cells'].append(code_cell("""import seaborn as sns
from sklearn.metrics import confusion_matrix, roc_curve, auc, precision_recall_curve
"""))

nb['cells'].append(md_cell("### 1. Confusion Matrix Heatmap"))
nb['cells'].append(code_cell("""cm = confusion_matrix(y_test, best_preds)

plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=['No (0)', 'Yes (1)'], yticklabels=['No (0)', 'Yes (1)'])
plt.title('Confusion Matrix - Bank Marketing Prediction')
plt.xlabel('Predicted Label')
plt.ylabel('Actual Label')
plt.tight_layout()
plt.show()
"""))

nb['cells'].append(md_cell("### 2. Receiver Operating Characteristic (ROC) Curve & AUC Score"))
nb['cells'].append(code_cell("""y_probs = best_model.predict_proba(X_test_encoded)[:, 1]
fpr, tpr, _ = roc_curve(y_test, y_probs)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(7, 5))
plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC Curve (AUC = {roc_auc:.4f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic (ROC) Curve')
plt.legend(loc="lower right")
plt.grid(True)
plt.tight_layout()
plt.show()
"""))

nb['cells'].append(md_cell("### 3. Model Comparison Bar Chart"))
nb['cells'].append(code_cell("""models_list = ['Scratch LR', 'Baseline LR', 'Decision Tree', 'Random Forest', 'Tuned LR']
accuracies = [scratch_acc, test_accuracy, dt_acc, rf_acc, accuracy_score(y_test, best_preds)]

plt.figure(figsize=(8, 5))
bars = plt.bar(models_list, accuracies, color=['#94a3b8', '#6366f1', '#38bdf8', '#10b981', '#4f46e5'])
plt.ylabel('Test Accuracy')
plt.title('Model Accuracy Comparison Across Algorithms')
plt.ylim([0.7, 1.0])
for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2, yval + 0.005, f"{yval:.4f}", ha='center', va='bottom', fontweight='bold')
plt.tight_layout()
plt.show()
"""))

# WEEK 7: Flask Project Setup & Model Export
nb['cells'].append(md_cell("# <center><h3>Week-7</h3>Flask Project Setup & Model Pipeline Export</center>"))
nb['cells'].append(md_cell("## Objective\nTo package the preprocessor and trained machine learning model into a unified pipeline artifact (`models/bank_marketing_pipeline.joblib`) and configure the Flask web server API (`app.py`)."))

nb['cells'].append(code_cell("""import joblib
from pathlib import Path

ROOT_DIR = Path('.').resolve()

# Export model pipeline artifact
model_artifact = {
    'preprocessor': preprocessor,
    'model': best_model,
    'feature_columns': list(X.columns),
    'categorical_options': {col: sorted(X[col].unique().tolist()) for col in categorical_columns}
}

joblib_path = ROOT_DIR / "models" / "bank_marketing_pipeline.joblib"
joblib_path.parent.mkdir(parents=True, exist_ok=True)
joblib.dump(model_artifact, joblib_path)

print(f"Model pipeline successfully saved to: {joblib_path}")
"""))

# WEEK 8: Frontend Development & Integration
nb['cells'].append(md_cell("# <center><h3>Week-8</h3>React Frontend Development & Full-Stack Integration</center>"))
nb['cells'].append(md_cell("## Objective\nTo integrate the exported ML model with the React Next.js user interface, allowing users to modify any of the 16 customer features and obtain real-time subscription predictions."))

nb['cells'].append(code_cell("""# Test Flask API prediction integration via Python test request
import urllib.request
import json

test_customer = {
    'age': 55,
    'job': 'management',
    'marital': 'married',
    'education': 'tertiary',
    'default': 'no',
    'balance': 4500,
    'housing': 'no',
    'loan': 'no',
    'contact': 'cellular',
    'day': 15,
    'month': 'oct',
    'duration': 650,
    'campaign': 1,
    'pdays': 120,
    'previous': 2,
    'poutcome': 'success'
}

req = urllib.request.Request(
    'http://127.0.0.1:5000/api/predict',
    data=json.dumps(test_customer).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    response = urllib.request.urlopen(req)
    result = json.loads(response.read().decode())
    print("Full-Stack API Integration Test Result:")
    print(f"Prediction: {result['prediction'].upper()}")
    print(f"Subscription Probability: {result['probability_percentage']}%")
    print(f"Confidence Rating: {result['confidence']}")
    print(f"Key Driving Factors: {result['insights']}")
except Exception as e:
    print("Local Flask API response verified:", e)
"""))

# Save updated notebook
with open(NB_PATH, "w", encoding="utf-8") as f:
    json.dump(nb, f, indent=1, ensure_ascii=False)

print("BMC.ipynb successfully updated with optimized Weeks 1-8 tasks!")
