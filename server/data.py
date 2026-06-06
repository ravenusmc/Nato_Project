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
    distinct_by_year = self.data.groupby('Year')['Country'].unique()
    print(distinct_by_year)
    # I need to start at the min year and then show each country growing by year 




obj = BuildData()
obj.get_data_for_year(1949) 
