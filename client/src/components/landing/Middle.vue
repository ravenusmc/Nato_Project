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
  gap: 2rem;
  margin-top: 100px;
  padding: 2% 5%;
  align-items: center;
}

.paragraph-middle-div {
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

.paragraph-middle-div p {
  margin: 0;
  letter-spacing: 0.01em;
}

.picture-div {
  border-radius: 16px;
  background: url("../../assets/images/nato_and_bullets.jpg") center/cover no-repeat;
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

@media (max-width: 900px) {
  .middle-div {
    grid-template-columns: 1fr;
    padding: 4%;
    gap: 1.5rem;
  }

  .picture-div {
    min-height: 320px;
    order: -1;
  }

  .paragraph-middle-div {
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