<template>
  <div>
    <div class="top-div">
      <div class="picture-div">
      </div>
      <div class="paragraph-div">
        <p>As a young child, I remember watching The Longest Day, a film about the D-Day landings during World War II. Afterward, 
          my mother explained that it was not just Americans fighting in Europe. Soldiers from many nations fought side by side, 
          united in a common cause. That idea fascinated me. There was something inspiring about the thought that countries could come 
          together, relying on one another in moments of crisis. As I grew older and learned more about NATO, that same sense of wonder 
          remained. The alliance represented the idea that nations are often stronger when they stand together rather than alone.
        </p>
        <p>
          This project is a study of NATO and the member nations that make up the alliance. To explore this topic, I will be working with 
          three large datasets. The first contains statistics about NATO countries, the second focuses on military equipment inventories, 
          and the third covers NATO operations and missions. By analyzing these datasets and creating visualizations, I hope to uncover 
          interesting patterns, trends, and relationships within the alliance.
        </p>
        <p>
          Beyond my interest in NATO itself, this project also combines another hobby of mine: data science and data visualization. 
          I enjoy taking large datasets and transforming them into graphs and charts that tell a story. NATO provides an ideal subject 
          for this kind of analysis because of the wide variety of information available, from military capabilities and equipment 
          inventories to operational history and member-state statistics. Through this project, I hope not only to learn more about the 
          alliance but also to improve my skills in analyzing and presenting complex data in a meaningful way.
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
  padding: 2% 4%;
}

.picture-div {
  border-radius: 10px;
  background: url("../../assets/images/NATO_Woman.jpg") center/cover no-repeat;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  min-height: 400px;
  align-self: stretch;
  margin: 2%;
  margin-top: 50px;
}

.paragraph-div {
  color: white;
  font-size: clamp(1rem, 1.4vw, 1.5rem);
  padding: 5% 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 900px) {
  .top-div {
    grid-template-columns: 1fr;
    padding: 4%;
  }

  .picture-div {
    min-height: 320px;
    margin: 0 0 4%;
  }

  .paragraph-div {
    padding: 4%;
  }
}

@media (max-width: 480px) {
  .picture-div {
    min-height: 240px;
  }
}

</style>