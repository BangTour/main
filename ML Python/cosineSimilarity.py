
import pandas as pd
import tensorflow as tensor

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# Import File
places = pd.read_csv('./DATASET/tourism_with_id.csv')
ratings = pd.read_csv('./DATASET/tourism_rating.csv')


# preprocessing
places = places.drop(['Description', 'City', 'Price', 'Rating', 'Time_Minutes', 'Coordinate', 'Lat', 'Long', 'Unnamed: 11', 'Unnamed: 12'], axis=1)
ratings.drop_duplicates(inplace = True)


# creates an instance of the TfidfVectorizer class and assigns it to the variable tf.
tf = TfidfVectorizer()

# fits the TfidfVectorizer instance (tf) to the 'Category' column of the places dataset. 
tf.fit(places['Category'])

#Transformasi data tempat pada kolom category menjadi bentuk verktor matriks.
tfidf_matrix = tf.fit_transform(places['Category'])

#Mengubah bentuk vectorizer yaitu vektor menjadi bentuk matriks.
tfidf_matrix.todense()

#Scoring
pd.DataFrame(
    tfidf_matrix.todense(),
    columns=tf.get_feature_names_out(),
    index=places.Place_Name
)

#calculates the cosine similarity between the rows of the tfidf_matrix.
cosine_sim = cosine_similarity(tfidf_matrix)

#Mengubah matriks cosine similarity menjadi bentuk dataframe antar nama tempat (destinasi wisata).
cosine_sim_df = pd.DataFrame(
    cosine_sim, index=places.Place_Name, columns=places.Place_Name)


#Fungsi Rekomendasi Tempat
def place_recommendations(place_name, similarity_data=cosine_sim_df, items=places[['Place_Name', 'Category']], k=10): #defines the function place_recommendations with several parameters
    index = similarity_data.loc[:,place_name].to_numpy().argpartition(range(-1, -k, -1)) # retrieves the cosine similarity values for the specified place_name from the similarity_data DataFrame.
    closest = similarity_data.columns[index[-1:-(k+2):-1]] #selects the k most similar places based on the cosine similarity values.
    closest = closest.drop(place_name, errors='ignore') #removes the place_name from the closest Series
    
    return pd.DataFrame(closest).merge(items).head(k) #returns a DataFrame containing the k recommended places.
