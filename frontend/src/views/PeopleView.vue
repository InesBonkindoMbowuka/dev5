<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getPedestrians } from "../api/pedestrians";
import { getMovementHistory } from "../api/movementHistory";

const pedestrians = ref([]);
const selectedPerson = ref(null);
const personHistory = ref([]);

let updateInterval;

async function updatePedestrians() {
  try {
    pedestrians.value = await getPedestrians();
  } catch (error) {
    console.error("Failed to load pedestrians:", error);
  }
}

async function selectPerson(pedestrian) {
  selectedPerson.value = pedestrian;

  try {
    personHistory.value = await getMovementHistory(
      pedestrian.uid
    );
  } catch (error) {
    console.error("Failed to load movement history:", error);
    personHistory.value = [];
  }
}

function closeHistory() {
  selectedPerson.value = null;
  personHistory.value = [];
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
  <div class="people-page">

    <div class="page-header">
      <div>
        <p class="eyebrow">SURVEILLANCE CONTROL</p>
        <h2>People</h2>
      </div>
    </div>
    <div v-if="!selectedPerson" class="people-list">

      <div
        v-for="pedestrian in pedestrians"
        :key="pedestrian.uid"
        class="person-card"
        @click="selectPerson(pedestrian)"
      >

        <div class="person-header">
          <strong>{{ pedestrian.name }}</strong>

          <span class="person-status">
            ACTIVE
          </span>
        </div>

        <div class="person-info">

          <div>
            <span>POSITION</span>

            <strong>
              X {{ Math.round(pedestrian.position.x) }},
              Y {{ Math.round(pedestrian.position.y) }}
            </strong>
          </div>

          <div>
            <span>DISTANCE</span>

            <strong>
              {{ pedestrian.totalDistance?.toFixed(1) || "0.0" }}
            </strong>
          </div>

        </div>

        <div class="view-history">
          VIEW ACTIVITY →
        </div>

      </div>

    </div>
    <div v-else class="history-panel">

      <div class="history-header">

        <div>
          <p class="eyebrow">ACTIVITY HISTORY</p>

          <h2>
            {{ selectedPerson.name }}
          </h2>
        </div>

        <button
          class="back-button"
          @click="closeHistory"
        >
          ← Back
        </button>

      </div>

      <div
        v-if="personHistory.length === 0"
        class="empty-history"
      >
        No activity recorded yet.
      </div>

      <div v-else class="history-list">

        <div
          v-for="event in personHistory.slice().reverse()"
          :key="`${event.tick}-${event.timestamp}`"
          class="history-item"
        >

          <div class="history-tick">
            TICK {{ event.tick }}
          </div>

          <div class="history-content">

            <strong>
              {{ event.description }}
            </strong>

            <small>
              X {{ Math.round(event.position.x) }},
              Y {{ Math.round(event.position.y) }}
            </small>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.people-page {
  min-height: 100vh;
  padding: 30px;
}

.page-header {
  margin-bottom: 25px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #6b7280;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

h2 {
  margin: 0;
  font-size: 26px;
}

.people-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.person-card {
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: 0.15s;
}

.person-card:hover {
  border-color: #9ca3af;
  transform: translateY(-1px);
}

.person-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.person-header strong {
  font-size: 15px;
}

.person-status {
  color: #166534;
  background: #dcfce7;
  padding: 4px 7px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: bold;
}

.person-info {
  display: flex;
  gap: 40px;
  margin-top: 18px;
}

.person-info span {
  display: block;
  margin-bottom: 5px;
  color: #6b7280;
  font-size: 9px;
  font-weight: bold;
}

.person-info strong {
  font-size: 12px;
}

.view-history {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  color: #374151;
  font-size: 10px;
  font-weight: bold;
}

.history-panel {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.back-button {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.history-list {
  margin-top: 10px;
}

.history-item {
  display: flex;
  gap: 20px;
  padding: 15px 5px;
  border-bottom: 1px solid #e5e7eb;
}

.history-tick {
  width: 60px;
  flex-shrink: 0;
  color: #9ca3af;
  font-size: 9px;
  font-weight: bold;
}

.history-content strong {
  display: block;
  font-size: 13px;
}

.history-content small {
  display: block;
  margin-top: 5px;
  color: #6b7280;
  font-size: 10px;
}

.empty-history {
  padding: 60px;
  text-align: center;
  color: #6b7280;
}

@media (max-width: 900px) {
  .people-list {
    grid-template-columns: 1fr;
  }
}
</style>
