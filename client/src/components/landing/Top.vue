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
  gap: 2rem;
  margin-top: 100px;
  padding: 2% 5%;
  align-items: center;
}

.picture-div {
  border-radius: 16px;
  background: url("../../assets/images/NATO_Woman.jpg") center/cover no-repeat;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.4),
    0 8px 32px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.06);
  min-height: 420px;
  align-self: stretch;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.picture-div:hover {
  transform: translateY(-4px);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.45),
    0 16px 48px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.paragraph-div {
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.95rem, 1.3vw, 1.3rem);
  line-height: 1.8;
  padding: 4% 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
  border-left: 3px solid rgba(255, 255, 255, 0.2);
}

.paragraph-div p {
  margin: 0;
  letter-spacing: 0.01em;
}

@media (max-width: 900px) {
  .top-div {
    grid-template-columns: 1fr;
    padding: 4%;
    gap: 1.5rem;
  }

  .picture-div {
    min-height: 320px;
  }

  .paragraph-div {
    padding: 4%;
    border-left: none;
    border-top: 3px solid rgba(255, 255, 255, 0.2);
    padding-top: 1.5rem;
  }
}

@media (max-width: 480px) {
  .picture-div {
    min-height: 240px;
  }
}

</style>