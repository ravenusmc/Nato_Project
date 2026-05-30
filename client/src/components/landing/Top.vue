<template>
  <div>
    <div class="top-div">
      <div class="picture-div">
      </div>
      <div class="paragraph-div">
        <p>As a young child I can remember watching the longest Day, a movie about the D-Day. My mom told me about how it wasn't just the Americans
          in the fight. Instead, we had allies all going to invade Europe together. I was fascinated by this idea - we were not going into the fight alone 
          but with friends. Eventually I learned about NATO and I was always intrigued by it. I had the same sense of wonder that we had all of these allies 
          to help us in a fight. 
        </p>
        <p>
          This project is a study of NATO. I've got three massive datasets that we'll use and look at. There are three files that I will be using in this project. 
          The first is about NATO country stats, the second is equipment inventory and the third is Operations and missions. I will be using 
          these datasets to build some graphs to see what we can learn about the data. 
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Top',
}
</script>

<style scoped>

.top-div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #003B75;
  margin-top: 100px;
  padding-top: 2%;
  padding-bottom: 2%;
}

.picture-div {
  width: 100%;
  height: 750px;
  border-radius: 10px;
  background: url("../../assets/images/NATO_Woman.jpg") center/cover no-repeat;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5%;
} 

.paragraph-div {
  color: white; 
  font-size: 1.5rem;
  padding: 10%;
}

</style>