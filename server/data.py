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

  def founding_member_pie_chart(self): 
    founding_member_data = []
    rows = []
    unique_states = self.data.drop_duplicates(subset=["Country"])
    founding_member = int((unique_states['Founding_Member'] == 'Yes').sum())
    non_founding_member = int((unique_states['Founding_Member'] == 'No').sum())
    rows.append(founding_member)
    rows.append(non_founding_member)
    founding_member_data.append(rows)
    print(founding_member_data)
  
  # Distribution of how long members have been in NATO
  def getDataForYearsInNato(self):
    # Get the current (max) years in NATO for each country
    max_years = self.data.groupby("Country")["Years_In_NATO"].max().reset_index()
    max_years["Years_In_NATO"] = max_years["Years_In_NATO"].astype(int)
    # Count how many countries have each years-in-NATO value
    counts = max_years.groupby("Years_In_NATO").size().reset_index(name="Count")
    years_in_nato_data = [[int(row["Years_In_NATO"]), int(row["Count"])] for _, row in counts.iterrows()]
    print(years_in_nato_data)
  
  # Get distrubution of founding vs non founding member by region 
  def getFoundingVsNonFoundingByRegion(self):
    FoundingVsNonFoundingByRegionData = []
    unique_states = self.data.drop_duplicates(subset=["Country"])
    #Need to get Unique regions. 
    unique_regions = ['Southern Europe', 'Western Europe', 'Eastern Europe', 'North America', 'Central Europe', 'Northern Europe']
    for region in unique_regions: 
      rows = []
      rows.append(region)
      founding_member_states = len(unique_states[(unique_states['Founding_Member'] == 'Yes') & (unique_states['Region'] == region)])
      Non_founding_member_states = len(unique_states[(unique_states['Founding_Member'] == 'No') & (unique_states['Region'] == region)])
      rows.append(founding_member_states)
      rows.append(Non_founding_member_states)
      FoundingVsNonFoundingByRegionData.append(rows)
    print(FoundingVsNonFoundingByRegionData)

      #I need the number of founding states and non-founding 


obj = BuildData()
obj.getFoundingVsNonFoundingByRegion() 
