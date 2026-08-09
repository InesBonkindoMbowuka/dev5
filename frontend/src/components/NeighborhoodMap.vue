<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getPedestrians } from "../api/pedestrians";

const pedestrians = ref([]);

let updateInterval;

async function updatePedestrians() {
  try {
    pedestrians.value = await getPedestrians();
  } catch (error) {
    console.error("Failed to load pedestrians:", error);
  }
}

onMounted(() => {
  updatePedestrians();
  updateInterval = setInterval(updatePedestrians, 1000);
});

onUnmounted(() => {
  clearInterval(updateInterval);
});
</script>

<template>
  <div class="neighborhood-map">
    <div class="road road-horizontal road-one"></div>
    <div class="road road-horizontal road-two"></div>
    <div class="road road-vertical road-three"></div>

    <div class="building building-one"></div>
    <div class="building building-two"></div>
    <div class="building building-three"></div>
    <div class="building building-four"></div>

    <div class="streetlight light-one">
      <span class="light"></span>
    </div>

    <div class="streetlight light-two">
      <span class="light"></span>
    </div>

    <div class="streetlight light-three">
      <span class="light"></span>
    </div>

    <div class="streetlight light-four">
      <span class="light"></span>
    </div>

    <div class="streetlight light-five">
      <span class="light"></span>
    </div>

    <div
      v-for="pedestrian in pedestrians"
      :key="pedestrian.uid"
      class="pedestrian"
      :style="{
        left: `${pedestrian.position.x}%`,
        top: `${pedestrian.position.y}%`,
      }"
    >
      •
    </div>
  </div>
</template>

<style scoped>
.neighborhood-map {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 340px;
  overflow: hidden;
  background: #d1d5db;
}

.road {
  position: absolute;
  background: #9ca3af;
}

.road-horizontal {
  width: 100%;
  height: 55px;
  left: 0;
}

.road-one {
  top: 30%;
}

.road-two {
  top: 68%;
}

.road-vertical {
  width: 55px;
  height: 100%;
  top: 0;
}

.road-three {
  left: 48%;
}

.building {
  position: absolute;
  background: #f9fafb;
  border: 2px solid #d1d5db;
  border-radius: 4px;
}

.building-one {
  width: 110px;
  height: 80px;
  top: 7%;
  left: 8%;
}

.building-two {
  width: 130px;
  height: 90px;
  top: 8%;
  right: 10%;
}

.building-three {
  width: 100px;
  height: 75px;
  bottom: 8%;
  left: 10%;
}

.building-four {
  width: 120px;
  height: 85px;
  bottom: 8%;
  right: 12%;
}

.streetlight {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #374151;
  border: 3px solid #111827;
  z-index: 5;
}

.light {
  position: absolute;
  width: 70px;
  height: 70px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgba(250, 204, 21, 0.15);
  z-index: -1;
}

.light-one {
  top: 30%;
  left: 25%;
}

.light-two {
  top: 30%;
  left: 70%;
}

.light-three {
  top: 68%;
  left: 25%;
}

.light-four {
  top: 68%;
  left: 70%;
}

.light-five {
  top: 48%;
  left: 48%;
}

.pedestrian {
  position: absolute;
  z-index: 10;

  width: 14px;
  height: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #2563eb;
  font-size: 18px;
}

.pedestrian-one {
  top: 25%;
  left: 40%;
}

.pedestrian-two {
  top: 55%;
  left: 60%;
}

.pedestrian-three {
  top: 78%;
  left: 38%;
}
</style>
