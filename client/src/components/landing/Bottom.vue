<template>
  <div>
    <div class="bottom-div">
      <div class="paragraph-bottom-div">
        <p>
          Beyond the maps and membership timelines, this project digs into the data behind NATO's military capabilities.
          By examining equipment inventories across member nations, we can see how contributions to the alliance vary
          considerably in scale and type. Some nations field large armored forces, while others specialize in naval power
          or air assets. Together, these inventories form a complex and layered picture of collective defense.
        </p>
        <p>
          The operations and missions dataset adds another dimension to the story. NATO has been involved in conflicts
          and peacekeeping efforts across Europe, the Middle East, and beyond. Visualizing these missions alongside
          member-state data reveals how the alliance has adapted its role over the decades, shifting from a Cold War
          deterrent to an organization engaged in active crisis response.
        </p>
        <p>
          Taken together, the dataset offers a rich foundation for exploration. The goal of this project is not
          simply to display numbers, but to find the stories hidden within them. Whether through a chart comparing
          defense spending, a map tracing expansion, or a timeline of operations, each visualization is an attempt
          to better understand one of the most enduring alliances in modern history.
        </p>
      </div>
      <div class="picture-div">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Bottom',
}
</script>

<style scoped>

.bottom-div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 100px;
  padding: 2% 5%;
  align-items: center;
}

.picture-div {
  border-radius: 16px;
  background: url("../../assets/images/transport_plane.jpg") center/cover no-repeat;
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

.paragraph-bottom-div {
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

.paragraph-bottom-div p {
  margin: 0;
  letter-spacing: 0.01em;
}

@media (max-width: 900px) {
  .bottom-div {
    grid-template-columns: 1fr;
    padding: 4%;
    gap: 1.5rem;
  }

  .picture-div {
    min-height: 320px;
    order: -1;
  }

  .paragraph-bottom-div {
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
