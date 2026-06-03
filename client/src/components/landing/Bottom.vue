<template>
  <div>
    <div class="bottom-div">
      <div class="picture-div">
        <div class="picture-inner-div">
          <p>The Study</p>
        </div>
      </div> 
    </div>
  </div>
</template>

<style scoped>

.bottom-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.picture-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  background: url("../../assets/images/transport_plane.jpg") center/cover no-repeat;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  height: 500px;
  border-radius: 16px;
  margin: 5% auto;
}

.picture-inner-div {
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 12px;
}

p {
  font-size: 50px;
  color: white;
}

</style>