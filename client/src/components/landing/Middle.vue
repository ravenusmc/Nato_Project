<template>
  <div>
    <div class="middle-div">
      <div class="paragraph-middle-div">
        <p>
          One of the most interesting aspects of this project is examining NATO's geographic growth over time. Using mapping visualizations,
          I will explore how the alliance expanded from its original founding members to include countries across Europe and North America.
          This allows us to see how NATO's influence and security partnerships have changed throughout its history.
        </p>
        <p>
          The map visualization will highlight the countries that joined NATO during different periods. By displaying membership
          chronologically, viewers can better understand how historical events such as the Cold War, the collapse of the Soviet Union,
          and modern security concerns influenced the alliance's expansion. This type of visualization provides a clear picture of NATO's
          evolution over the decades.
        </p>
        <p>
          Although portions of the dataset contain simulated military and equipment data, NATO membership itself is based on real historical
          events. For this reason, the expansion map represents one of the most reliable visualizations in the project. It combines geographic
          information with historical timelines to show how the alliance has grown into one of the world's most significant international
          security organizations.
        </p>
      </div>
      <div class="picture-div">
      </div>
    </div>

  </div>
</template>

<script>



</script>

<style scoped>

.middle-div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #003B75;
  margin-top: 100px;
  padding: 2% 4%;
}

.paragraph-middle-div {
  color: white;
  font-size: clamp(1rem, 1.4vw, 1.5rem);
  padding: 5% 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.picture-div {
  border-radius: 10px;
  background: url("../../assets/images/nato_and_bullets.jpg") center/cover no-repeat;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  min-height: 400px;
  align-self: stretch;
  margin: 2%;
}

@media (max-width: 900px) {
  .middle-div {
    grid-template-columns: 1fr;
    padding: 4%;
  }

  .picture-div {
    min-height: 320px;
    margin: 0 0 4%;
    order: -1;
  }

  .paragraph-middle-div {
    padding: 4%;
  }
}

@media (max-width: 480px) {
  .picture-div {
    min-height: 240px;
  }
}

</style>