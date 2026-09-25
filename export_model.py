"""Train and export the Bank Marketing Campaign model from BMC.ipynb."""

from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder

ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "bank-full.csv"
MODEL_PATH = ROOT / "models" / "bank_marketing_pipeline.joblib"


def load_clean_data() -> pd.DataFrame:
    df = pd.read_csv(DATA_PATH, sep=";")
    df = df.drop_duplicates()

    q1 = df["age"].quantile(0.25)
    q3 = df["age"].quantile(0.75)
    iqr = q3 - q1
    lower_limit = q1 - 1.5 * iqr
    upper_limit = q3 + 1.5 * iqr

    return df[(df["age"] >= lower_limit) & (df["age"] <= upper_limit)]


def train_and_export() -> None:
    clean_df = load_clean_data()
    x = clean_df.drop("y", axis=1)
    y = clean_df["y"].map({"no": 0, "yes": 1})

    categorical_columns = x.select_dtypes(include="object").columns
    numerical_columns = x.select_dtypes(exclude="object").columns

    preprocessor = ColumnTransformer(
        transformers=[
            ("categorical", OneHotEncoder(handle_unknown="ignore"), categorical_columns),
            ("numerical", "passthrough", numerical_columns),
        ]
    )

    x_train, _, y_train, _ = train_test_split(
        x,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y,
    )

    x_train_encoded = preprocessor.fit_transform(x_train)
    model = LogisticRegression(max_iter=6000)
    model.fit(x_train_encoded, y_train)

    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(
        {
            "preprocessor": preprocessor,
            "model": model,
            "feature_columns": list(x.columns),
            "categorical_options": {
                col: sorted(x[col].unique().tolist()) for col in categorical_columns
            },
        },
        MODEL_PATH,
    )
    print(f"Saved model pipeline to {MODEL_PATH}")


if __name__ == "__main__":
    train_and_export()
