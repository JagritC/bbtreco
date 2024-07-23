# %%
import os
import logging
import json
import numpy
import joblib

import pandas as pd
import sklearn

# %%
def init():
    """
    This function is called when the container is initialized/started, typically after create/update of the deployment.
    You can write the logic here to perform init operations like caching the model in memory
    """
    global model
    # AZUREML_MODEL_DIR is an environment variable created during deployment.
    # It is the path to the model folder (./azureml-models/$MODEL_NAME/$VERSION)
    # Please provide your model's folder name if there is one
    
    
    model_path = os.path.join(
        os.getenv("AZUREML_MODEL_DIR"), "xgboost_model.pkl"
    )

    # model_path = os.path.join(os.getcwd(), 'model', "output", 'xgboost_model.pkl')
    #model_path = r"../output/xgboost_model.pkl"
    # deserialize the model file back into a sklearn model
    model = joblib.load(model_path)
    logging.info("Init complete")


def run(raw_data):
    """
    This function is called for every invocation of the endpoint to perform the actual scoring/prediction.
    In the example we extract the data from the json input and call the scikit-learn model's predict()
    method and return the result back
    """
    logging.info("model 1: request received")
    data = json.loads(raw_data)
    available_drinks_raw = pd.DataFrame(data['available_bubble_teas'])
    user_preferences_raw = pd.DataFrame(data['user_preferences'])

        # Extract features for prediction
    available_drinks_features = [
        "drink_id", 'fruity_drink', 
        'milky_drink', 'with_tea_drink', 'refreshing_drink', 'fragrant_drink', 
        'cold_drink', 'distance', 'popularity'
    ]
    
    user_preferences_features = [
        "user_id", 'fruity_user', 'milky_user', 'with_tea_user', 'refreshing_user', 
        'fragrant_user', 'adventurous_user', 'cold_user'
    ]

    available_drinks = available_drinks_raw[available_drinks_features]
    user_preferences = user_preferences_raw[user_preferences_features]
    # create user-bubble_tea interaction pairs
    drinks_preferences_pairs = user_preferences.merge(available_drinks, how='cross')

    print(drinks_preferences_pairs.columns)

    drinks_preferences_pairs = drinks_preferences_pairs[['user_id', 'drink_id', 'fruity_user', 'milky_user', 'with_tea_user', 'refreshing_user', 'fragrant_user', 'adventurous_user', 'cold_user', 'fruity_drink', 'milky_drink', 'with_tea_drink', 'refreshing_drink', 'fragrant_drink', 'cold_drink', 'distance', 'popularity']] 

    print(drinks_preferences_pairs.columns)

    # predictions
    predictions = model.predict(drinks_preferences_pairs)
    
    # predictions = model.predict(drinks_preferences_pairs[available_drinks_features + user_preferences_features])
    
    drinks_preferences_pairs['score'] = predictions
    
    ranked = drinks_preferences_pairs.sort_values(by='score', ascending=False)
    logging.info("Request processed")
    return ranked.to_dict(orient='records')

    # # create predictions
    # result = model.predict(data)
    # logging.info("Request processed")
    # return result.tolist()

# %%
# import json
# import joblib
# import numpy as np
# import os

# # called when the deployment is created or updated
# def init():
#     global model
#     # get the path to the registered model file and load it
#     model_path = os.path.join(os.getenv('AZUREML_MODEL_DIR'), 'model.pkl')
#     model = joblib.load(model_path)

# # called when a request is received
# def run(raw_data):
#     # get the input data as a numpy array
#     data = np.array(json.loads(raw_data)['data'])
#     # get a prediction from the model
#     predictions = model.predict(data)
#     # return the predictions as any JSON serializable format
#     return predictions.tolist()


