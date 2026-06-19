#Main file to examine the CSV data. 

# importing supporting libraries
import numpy as np
import pandas as pd

class BuildData():
  
  def __init__(self): 
    self.data = pd.read_csv('./data/NATO_Data.csv')
  
  def test(self):
    print(self.data.head())
  
  def get_data_for_year(self, year):
    distinct_by_year = self.data[self.data['Year'] == int(year)]['Country'].unique().tolist()
    return distinct_by_year
  
  def get_NATO_join_by_decade(self):
    # Keep only one row per country
    unique_countries = self.data.drop_duplicates(subset=["Country"])
    # Make sure Join_Year is numeric
    unique_countries["Join_Year"] = unique_countries["Join_Year"].astype(int)
    # Determine the decade (1949 -> 1940, 1952 -> 1950, etc.)
    unique_countries["Decade_Start"] = (unique_countries["Join_Year"] // 10) * 10
    # Count countries per decade
    result = (
          unique_countries.groupby("Decade_Start")
          .size()
          .reset_index(name="Count")
    )
    # Create nicer labels
    result["Decade"] = result["Decade_Start"].apply(
        lambda x: f"{x}-{x + 9}"
    )
    # Keep only the columns you want
    result = result[["Decade", "Count"]]
    join_year_data = []
    for _, row in result.iterrows():
      rows = [
        row["Decade"],
        row["Count"]
      ]
      join_year_data.append(rows)
    print(join_year_data)


# ['Belgium' 'Canada' 'Denmark' 'France' 'Iceland' 'Italy' 'Luxembourg'
#  'Netherlands' 'Norway' 'Portugal' 'United Kingdom' 'United States']


obj = BuildData()
obj.get_NATO_join_by_decade() 
