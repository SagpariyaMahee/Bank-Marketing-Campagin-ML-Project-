import json
import os
import sys
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

ROOT = "c:/Users/91972/Desktop/ML/Project"
os.chdir(ROOT)

with open("BMC.ipynb", "r", encoding="utf-8") as f:
    nb = json.load(f)

# Global execution dictionary
exec_globals = {
    '__name__': '__main__',
    'pd': pd,
    'np': np,
    'plt': plt,
    'sns': sns,
}

print(f"Executing {len(nb['cells'])} cells in BMC.ipynb...")

executed_count = 0
for idx, cell in enumerate(nb["cells"]):
    if cell["cell_type"] == "code":
        code = "".join(cell["source"])
        if not code.strip():
            continue
        try:
            # Silence plt.show in non-interactive execution
            code_to_exec = code.replace("plt.show()", "# plt.show()").replace("plt.show", "# plt.show")
            exec(code_to_exec, exec_globals)
            cell["execution_count"] = executed_count + 1
            executed_count += 1
        except Exception as e:
            print(f"Error in cell {idx}: {e}")
            raise e

# Write notebook back
with open("BMC.ipynb", "w", encoding="utf-8") as f:
    json.dump(nb, f, indent=1, ensure_ascii=False)

print(f"Successfully executed all {executed_count} code cells in BMC.ipynb!")
