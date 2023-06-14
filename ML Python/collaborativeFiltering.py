import pandas as pd
import numpy as np
from zipfile import ZipFile
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers


places = pd.read_csv('./DATASET/tourism_with_id.csv')
ratings = pd.read_csv('./DATASET/tourism_rating.csv')

# preprocessing
places = places.drop(['Description', 'City', 'Price', 'Rating', 'Time_Minutes', 'Coordinate', 'Lat', 'Long', 'Unnamed: 11', 'Unnamed: 12'], axis=1)
ratings.drop_duplicates(inplace = True)


# Inisiasi model
MODEL = './Model/Model'    #<---- Ganti dengan nama model yang sudah di training

model =  tf.keras.models.load_model(MODEL)

place_df = places
ratings_df = ratings

#Proses encoding fitur User_Id pada dataset ratings menjadi array.


#assumes that there is a DataFrame called ratings with a column named 'User_Id'
user_ids = ratings['User_Id'].unique().tolist()

#creates a dictionary called user_to_user_encoded.
user_to_user_encoded = {x: i for i, x in enumerate(user_ids)}

#creates another dictionary called user_encoded_to_user.
user_encoded_to_user = {i: x for i, x in enumerate(user_ids)}


#Proses encoding fitur Place_Id pada dataset ratings menjadi array.

#assumes there is a DataFrame called ratings that contains a column named 'Place_Id'
place_ids = ratings['Place_Id'].unique().tolist()

#creates a dictionary called place_to_place_encoded
place_to_place_encoded = {x: i for i, x in enumerate(place_ids)}

#creates another dictionary called place_encoded_to_place.
place_encoded_to_place = {i: x for i, x in enumerate(place_ids)}

'''
body request POST
{
    "user_id" : "1",
    
}

'''


def userRecommendation(user_id):
    
    place_rated = ratings_df[ratings_df.User_Id == user_id]
    
    
    place_not_rated = place_df[~place_df['Place_Id'].isin(
        place_rated.Place_Id.values)]['Place_Id']
    place_not_rated = list(
        set(place_not_rated).intersection(set(place_to_place_encoded.keys()))
    )

    place_not_rated = [
        [place_to_place_encoded.get(x)] for x in place_not_rated]
    
    user_encoder = user_to_user_encoded.get(user_id)
    user_place_array = np.hstack(
        ([[user_encoder]] * len(place_not_rated), place_not_rated)
    )
    
    user_place_array = tf.cast(user_place_array, tf.int64)
    
    print(type(user_place_array))
    ratings = model.predict(user_place_array).flatten()
    top_ratings_indices = ratings.argsort()[-10:][::-1]
    
    recommended_place_ids = [
        place_encoded_to_place.get(place_not_rated[x][0]) for x in top_ratings_indices
    ]
    
    return recommended_place_ids