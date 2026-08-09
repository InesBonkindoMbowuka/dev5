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
<div class="coordinate-grid"></div>

<span class="axis-label x-axis-label">X</span>
<span class="axis-label y-axis-label">Y</span>

<span class="coordinate-label x0">0</span>
<span class="coordinate-label x25">25</span>
<span class="coordinate-label x50">50</span>
<span class="coordinate-label x75">75</span>
<span class="coordinate-label x100">100</span>

<span class="coordinate-label y0">0</span>
<span class="coordinate-label y25">25</span>
<span class="coordinate-label y50">50</span>
<span class="coordinate-label y75">75</span>
<span class="coordinate-label y100">100</span>

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
    top: `${100 - pedestrian.position.y}%`,
  }"
>
  <span class="pedestrian-dot"></span>

  <div class="pedestrian-info">
    <strong>{{ pedestrian.uid }}</strong>
    <small>
      X: {{ pedestrian.position.x.toFixed(1) }}
      Y: {{ pedestrian.position.y.toFixed(1) }}
    </small>
  </div>
</div>
```

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

.coordinate-grid {
  position: absolute;
  inset: 0;
  z-index: 1;

  background-image:
    linear-gradient(rgba(107, 114, 128, 0.25) 1px, transparent 1px),
    linear-gradient(90deg, rgba(107, 114, 128, 0.25) 1px, transparent 1px);

  background-size: 10% 10%;
}

.axis-label {
  position: absolute;
  z-index: 20;

  color: #374151;
  font-size: 11px;
  font-weight: bold;
}

.x-axis-label {
  right: 8px;
  bottom: 5px;
}

.y-axis-label {
  top: 5px;
  left: 8px;
}

.coordinate-label {
  position: absolute;
  z-index: 20;

  color: #6b7280;
  font-size: 8px;
}

.x0 {
  left: 2px;
  bottom: 2px;
}

.x25 {
  left: 25%;
  bottom: 2px;
}

.x50 {
  left: 50%;
  bottom: 2px;
}

.x75 {
  left: 75%;
  bottom: 2px;
}

.x100 {
  right: 2px;
  bottom: 2px;
}

.y0 {
  left: 2px;
  bottom: 2px;
}

.y25 {
  left: 2px;
  bottom: 25%;
}

.y50 {
  left: 2px;
  top: 50%;
}

.y75 {
  left: 2px;
  top: 25%;
}

.y100 {
  left: 2px;
  top: 2px;
}

.road {
  position: absolute;
  background: #9ca3af;
  z-index: 2;
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
  z-index: 3;

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
  z-index: 5;

  width: 18px;
  height: 18px;

  border-radius: 50%;
  background: #374151;
  border: 3px solid #111827;
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

  transform: translate(-50%, -50%);
}

.pedestrian-dot {
  display: block;

  width: 10px;
  height: 10px;

  border-radius: 50%;
  background: #2563eb;
  border: 2px solid white;
}

.pedestrian-info {
  display: none;

  position: absolute;
  left: 14px;
  top: -8px;

  padding: 6px 8px;

  min-width: 90px;

  border-radius: 4px;
  background: #111827;
  color: white;

  font-size: 9px;
  white-space: nowrap;
}

.pedestrian-info strong {
  display: block;
  font-size: 10px;
}

.pedestrian-info small {
  display: block;
  margin-top: 2px;
  color: #d1d5db;
}

.pedestrian:hover .pedestrian-info {
  display: block;
}
</style>
