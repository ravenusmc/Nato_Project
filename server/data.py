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
      type_of_member = {}
      rows.append(region)
      founding_member_states_count = len(unique_states[(unique_states['Founding_Member'] == 'Yes') & (unique_states['Region'] == region)])
      Non_founding_member_states_count = len(unique_states[(unique_states['Founding_Member'] == 'No') & (unique_states['Region'] == region)])
      type_of_member['Founding_Member'] = founding_member_states_count
      type_of_member['Non_Founding_Member'] = Non_founding_member_states_count
      rows.append(type_of_member)
      FoundingVsNonFoundingByRegionData.append(rows)
    print(FoundingVsNonFoundingByRegionData)
  
  def get_data_for_timeline(self):
    timeLineData = []
    unique_states = self.data.drop_duplicates(subset=["Country"])
    for country, year in zip(unique_states['Country'], unique_states['Join_Year']):
      country_data = {}
      country_data['Country'] = country 
      country_data['Join Year'] = year 
      timeLineData.append(country_data)
    print(timeLineData)
    # print(f"Country: {country}, Join Year: {year}")
  
  def largest_Nato_economies(self): 
    largest_Nato_economies = []
    unique_states = self.data.drop_duplicates(subset=["Country"])
    for country, GDP in zip(unique_states['Country'], unique_states['GDP_Billion_USD']):
      rows = []
      rows.append(country)
      rows.append(GDP)
      largest_Nato_economies.append(rows)
    largest_Nato_economies.sort(key=lambda x: x[1])
    print(largest_Nato_economies)

  def get_GDP_Per_Capita_Data(self):
    GDP_economies = []
    unique_states = self.data.drop_duplicates(subset=["Country"])
    for country, GDP_Per_Capita in zip(unique_states['Country'], unique_states['GDP_Per_Capita_USD']):
      rows = []
      rows.append(country)
      rows.append(GDP_Per_Capita)
      GDP_economies.append(rows)
    GDP_economies.sort(key=lambda x: x[1])
    print(GDP_economies)

  def economy_size_vs_military_spending(self): 
    economy_size_vs_military_spending_data = []
    unique_states = self.data.drop_duplicates(subset=["Country"])
    for GDP_Billion_USD, Defense_Budget_Billion_USD, country in zip(unique_states['GDP_Billion_USD'], unique_states['Defense_Budget_Billion_USD'], unique_states['Country']):
      rows = []
      rows.append(GDP_Billion_USD)
      rows.append(Defense_Budget_Billion_USD)
      rows.append(country)
      economy_size_vs_military_spending_data.append(rows)
      economy_size_vs_military_spending_data.sort(key=lambda x: x[1])
    print(economy_size_vs_military_spending_data)

  def population_vs_economy_size(self):
    population_vs_economy_size_data = []
    


obj = BuildData()
obj.economy_size_vs_military_spending() 
