from flask import Flask,request, jsonify

from flask_cors import CORS


import json
import numpy as np
import pandas as pd
import tensorflow as tensor

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import cosineSimilarity
from collaborativeFiltering import userRecommendation

# Import File
places = pd.read_csv('./DATASET/tourism_with_id.csv')
ratings = pd.read_csv('./DATASET/tourism_rating.csv')


# preprocessing
places = places.drop(['Description', 'City', 'Price', 'Rating', 'Time_Minutes', 'Coordinate', 'Lat', 'Long', 'Unnamed: 11', 'Unnamed: 12'], axis=1)
ratings.drop_duplicates(inplace = True)

app = Flask(__name__)

cors = CORS(app)

@app.route("/", methods=['GET'])
def check():
    return {
            "message": "success",
            "data": []}

# Place Recommendation
@app.route('/place-recommendations', methods=['POST'])
def placeRecommendation():
    # Check Method 
    if request.method != 'POST':
        return {"message": "Error Method not Allower", "data":[]}
    
    data = json.loads(request.data)
    
    # check if body request validity
    if 'place_name' not in data:
        return {"message": "Error Body Request", "data":[]}
    
    
    try :
        data = cosineSimilarity.place_recommendations(data['place_name']).to_json(orient="records")
    except Exception as e:
        errMessage = "Error " + str(e) + ", Please check your body request"
        return {"message": errMessage,
                "error_type" : type(e).__name__,
                "data":[]}
        
    
    formatted_data = json.loads(data)

    return jsonify({
        "message": "success",
        "data": formatted_data
        })
    
    
# For Prediction
@app.route('/user-based-recommendation',methods=['POST'])
def predict():
    # Check Method
    if request.method != 'POST':
        return {"message": "Error Method not Allower", "data":[]}
    # final_features = pd.DataFrame(int_features)
    # prediction = model.predict(final_features)
    # output = round(prediction[0], 2) 
    
    data = json.loads(request.data)
    print(data)
    
    try :
        data = userRecommendation( np.int64(data['user_id']))
        print(data)
    except Exception as e:
        print(e)
        errMessage = "Error " + str(e) + ", Please check your body request"
        return {"message": errMessage,
                "error_type" : type(e).__name__,
                "data":[]}
    
    return {
        "message": "success",
        "data": 
            {"Place_Id" : data}
    }


 
if __name__ == "__main__":
        app.run(host='0.0.0.0', port=8080, debug=True)

