from flask import Flask,request
import pickle 
import numpy as np
import pandas as pd
from xgboost import XGBRegressor
from xgboost import XGBRFRegressor

# Inisiasi model
MODEL = 'model.pkl'    #<---- Ganti dengan nama model yang sudah di training

model = pickle.load(open(MODEL, 'rb'))

app = Flask(__name__)

@app.route('/')
def home():
    # Check Method 
    if request.method == 'GET':
        

    return render_template('index.html')

# For Prediction
@app.route('/predict',methods=['POST'])
def predict():
    # Check Method
    if request.method == 'POST':
        
    int_features = [[float(x) for x in request.form.values()]]
    final_features = pd.DataFrame(int_features)
    prediction = model.predict(final_features)
    output = round(prediction[0], 2) 


if __name__ == "__main__":
    app.run(debug=True)

