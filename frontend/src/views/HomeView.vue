<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import NeighborhoodMap from "../components/NeighborhoodMap.vue";
import {
  startSimulation as apiStartSimulation,
  stopSimulation as apiStopSimulation,
  getSimulationStatus,
} from "../api/simulation";
import { getDetections } from "../api/detections";
import { getStreetlights } from "../api/streetlights";
import { getPedestrians } from "../api/pedestrians";
import { getSnapshots } from "../api/snapshots";

const simulationRunning = ref(false);
const detections = ref([]);
const pedestrians = ref([]);
const streetlights = ref([]);
const detectionCount = ref(0);
const pedestrianCount = ref(0);
const coveragePercentage = ref(0);

let statusInterval;

async function updateSimulationStatus() {
  try {
    const status = await getSimulationStatus();

    simulationRunning.value = status.running;
  } catch (error) {
    console.error("Failed to get simulation status:", error);
  }
}

async function startSimulation() {
  try {
    const data = await apiStartSimulation();

    simulationRunning.value = data.running;
    detections.value = [];
    detectionCount.value = 0;
  } catch (error) {
    console.error("Failed to start simulation:", error);
  }
}

async function stopSimulation() {
  try {
    const data = await apiStopSimulation();

    simulationRunning.value = data.running;
  } catch (error) {
    console.error("Failed to stop simulation:", error);
  }
}

async function toggleSimulation() {
  if (simulationRunning.value) {
    await stopSimulation();
  } else {
    await startSimulation();
  }
}

async function updateDetections() {
  try {
    const data = await getDetections();

    detections.value = data;
  } catch (error) {
    console.error("Failed to get detections:", error);
  }
}

async function updatePedestrians() {
  try {
    pedestrians.value = await getPedestrians();
  } catch (error) {
    console.error("Failed to get pedestrians:", error);
  }
}

async function updateStreetlights() {
  try {
    streetlights.value = await getStreetlights();
  } catch (error) {
    console.error("Failed to get streetlights:", error);
  }
}

async function updateSnapshot() {
  try {
    const snapshots = await getSnapshots();

    if (snapshots.length > 0) {
      const latest = snapshots[snapshots.length - 1];

      pedestrianCount.value = latest.pedestrianCount;
      detectionCount.value = latest.totalDetectionCount;
      coveragePercentage.value = latest.coveragePercentage;
    }
  } catch (error) {
    console.error("Failed to get snapshot:", error);
  }
}

onMounted(() => {
  updateSimulationStatus();
  updateDetections();
  updatePedestrians();
  updateStreetlights();
  updateSnapshot();

  statusInterval = setInterval(() => {
    updateSimulationStatus();
    updateDetections();
    updatePedestrians();
    updateStreetlights();
    updateSnapshot();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(statusInterval);
});
</script>

<template>
  <div class="dashboard">
    <header class="topbar">
      <div>
        <p class="eyebrow">SURVEILLANCE CONTROL</p>
        <h2>Neighborhood Dashboard</h2>
      </div>

      <div class="simulation-controls">
        <button class="simulation-button" @click="toggleSimulation">
          {{ simulationRunning ? "Stop Simulation" : "Start Simulation" }}
        </button>

        <div class="live-status" :class="{ inactive: !simulationRunning }">
          <span></span>
          {{ simulationRunning ? "LIVE" : "STOPPED" }}
        </div>
      </div>
    </header>

    <section class="stats">
      <div class="stat-card">
        <span>PEDESTRIANS</span>
        <strong>{{ pedestrians.length }}</strong>
      </div>

      <div class="stat-card">
        <span>STREETLIGHTS</span>
        <strong>{{ streetlights.length }}</strong>
      </div>

      <div class="stat-card">
        <span>DETECTIONS</span>
        <strong>{{ detectionCount }}</strong>
      </div>

      <div class="stat-card">
        <span>COVERAGE</span>
        <strong>{{ coveragePercentage.toFixed(0) }}%</strong>
      </div>
    </section>

    <section class="content-grid">
      <div class="map-panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">LIVE VIEW</span>
            <h3>Neighborhood</h3>
          </div>

          <span class="panel-badge">SIMULATION</span>
        </div>

        <div class="map-placeholder">
          <div class="map-grid">
            <NeighborhoodMap />
          </div>
        </div>
      </div>

      <div class="activity-panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">INVESTIGATION</span>
            <h3>People of Interest</h3>
          </div>

          <span class="panel-badge"> {{ pedestrians.length }} PEOPLE </span>
        </div>

        <div v-if="pedestrians.length === 0" class="empty-state">
          <span class="empty-icon">—</span>
          <strong>No pedestrians</strong>
          <small>Start the simulation to investigate.</small>
        </div>

        <div v-else class="people-list">
          <div v-for="pedestrian in pedestrians" :key="pedestrian.uid" class="person-card">
            <div class="person-header">
              <strong>{{ pedestrian.name }}</strong>

              <span class="person-status"> ACTIVE </span>
            </div>

            <div class="person-info">
              <div>
                <span>POSITION</span>
                <strong>
                  X {{ Math.round(pedestrian.position.x) }}, Y
                  {{ Math.round(pedestrian.position.y) }}
                </strong>
              </div>

              <div>
                <span>DISTANCE</span>
                <strong>
                  {{ pedestrian.totalDistance?.toFixed(1) || "0.0" }}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 30px;
  width: 100%;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #6b7280;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

h2,
h3 {
  margin: 0;
}

h2 {
  font-size: 26px;
}

.live-status {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  border-radius: 6px;
  background: #dcfce7;
  color: #166534;
  font-size: 11px;
  font-weight: bold;
}

.live-status span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
}

.simulation-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.simulation-button {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: #111827;
  color: white;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
}

.simulation-button:hover {
  background: #1f2937;
}

.live-status.inactive {
  background: #f3f4f6;
  color: #6b7280;
}

.live-status.inactive span {
  background: #9ca3af;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.stat-card span {
  display: block;
  color: #6b7280;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
}

.stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 28px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.map-panel,
.activity-panel {
  min-height: 450px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.panel-header h3 {
  font-size: 17px;
}

.panel-badge {
  padding: 5px 8px;
  border-radius: 4px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 9px;
  font-weight: bold;
}

.people-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 370px;
  overflow-y: auto;
}

.person-card {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
}

.person-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.person-header strong {
  font-size: 12px;
  color: #111827;
}

.person-status {
  padding: 3px 6px;
  border-radius: 4px;
  background: #dcfce7;
  color: #166534;
  font-size: 8px;
  font-weight: bold;
}

.person-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.person-info div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.person-info span {
  color: #9ca3af;
  font-size: 8px;
  font-weight: bold;
  letter-spacing: 0.7px;
}

.person-info strong {
  color: #374151;
  font-size: 10px;
  font-weight: 600;
}

.coordinates {
  margin-top: 5px;
  color: #111827;
  font-weight: 600;
}

.tick {
  margin-top: 3px;
  color: #9ca3af;
  font-size: 9px;
}

.map-placeholder {
  position: relative;
  height: 370px;
  overflow: hidden;
  border-radius: 6px;
  background: #e5e7eb;
}

.map-grid {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background-image:
    linear-gradient(#d1d5db 1px, transparent 1px),
    linear-gradient(90deg, #d1d5db 1px, transparent 1px);
  background-size: 40px 40px;
}

.map-message {
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #374151;
}

.map-message strong {
  font-size: 16px;
}

.map-message span {
  margin-top: 5px;
  color: #6b7280;
  font-size: 12px;
}

.empty-state {
  height: 370px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  color: #6b7280;
}

.empty-icon {
  margin-bottom: 15px;
  font-size: 30px;
}

.empty-state strong {
  color: #374151;
  font-size: 14px;
}

.empty-state small {
  margin-top: 5px;
  font-size: 11px;
}

@media (max-width: 900px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
