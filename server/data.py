#Main file to examine the CSV data. 

# importing supporting libraries
import numpy as np
import pandas as pd

class BuildData():
  
  def __init__(self): 
    self.data = pd.read_csv('./data/NATO_Data.csv')
  
  def test(self):
    print(self.data.head())
  
  # This method will need 
  def get_data_for_year(self, year):
    distinct_by_year = self.data[self.data['Year'] == int(year)]['Country'].unique().tolist()
    return distinct_by_year


# ['Belgium' 'Canada' 'Denmark' 'France' 'Iceland' 'Italy' 'Luxembourg'
#  'Netherlands' 'Norway' 'Portugal' 'United Kingdom' 'United States']


obj = BuildData()
obj.get_data_for_year('1960') 
