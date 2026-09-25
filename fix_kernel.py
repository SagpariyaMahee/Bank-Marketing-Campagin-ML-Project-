import json
import io
import contextlib
from pathlib import Path

ROOT = Path("c:/Users/91972/Desktop/ML/Project")
NB_PATH = ROOT / "BMC.ipynb"

with open(NB_PATH, "r", encoding="utf-8") as f:
    nb = json.load(f)

# Update metadata kernel name to python3
nb["metadata"] = {
    "kernelspec": {
        "display_name": "Python 3 (ipykernel)",
        "language": "python",
        "name": "python3"
    },
    "language_info": {
        "codemirror_mode": {"name": "ipython", "version": 3},
        "file_extension": ".py",
        "mimetype": "text/x-python",
        "name": "python",
        "nbconvert_exporter": "python",
        "pygments_lexer": "ipython3",
        "version": "3.11"
    }
}

# Add id to every cell if missing
for idx, cell in enumerate(nb["cells"]):
    if "id" not in cell:
        cell["id"] = f"cell_id_{idx}"

with open(NB_PATH, "w", encoding="utf-8") as f:
    json.dump(nb, f, indent=1, ensure_ascii=False)

print("Notebook metadata updated successfully!")
