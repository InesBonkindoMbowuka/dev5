```vue
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getPedestrians } from "../api/pedestrians";
import { accusePedestrian } from "../api/investigation";
import { startSimulation } from "../api/simulation";

const pedestrians = ref([]);
const selectedPedestrian = ref(null);
const accusationResult = ref(null);
const accusing = ref(false);
const router = useRouter();

async function loadPedestrians() {
  try {
    pedestrians.value = await getPedestrians();
  } catch (error) {
    console.error("Failed to load pedestrians:", error);
  }
}

function selectPedestrian(pedestrian) {
  selectedPedestrian.value = pedestrian;
  accusationResult.value = null;
}

async function accuse() {
  if (!selectedPedestrian.value || accusing.value) {
    return;
  }

  accusing.value = true;

  try {
    const result = await accusePedestrian(selectedPedestrian.value.uid);

    accusationResult.value = result;
  } catch (error) {
    console.error("Failed to make accusation:", error);
  } finally {
    accusing.value = false;
  }
}

function continueInvestigation() {
  accusationResult.value = null;
  selectedPedestrian.value = null;
}

async function restartSimulation() {
  try {
    await startSimulation();

    accusationResult.value = null;
    selectedPedestrian.value = null;

    await loadPedestrians();

    router.push("/");
  } catch (error) {
    console.error("Failed to restart simulation:", error);
  }
}

onMounted(() => {
  loadPedestrians();
});
</script>

<template>
  <div class="investigation-page">
    <div class="page-header">
      <div>
        <p class="eyebrow">SURVEILLANCE CONTROL</p>
        <h2>Investigation</h2>
      </div>
    </div>

    <div class="accusation-panel">
      <div class="panel-header">
        <div>
          <h2>Identify the Burglar</h2>
        </div>
      </div>

      <p class="instruction">
        Review the suspects behaviors in "People" tab and select the person you believe is the
        burglar.
      </p>

      <div class="suspect-list">
        <div
          v-for="pedestrian in pedestrians"
          :key="pedestrian.uid"
          class="suspect-card"
          :class="{
            selected: selectedPedestrian?.uid === pedestrian.uid,
          }"
          @click="selectPedestrian(pedestrian)"
        >
          <div class="suspect-header">
            <div class="suspect-name">
              <span class="radio">
                {{ selectedPedestrian?.uid === pedestrian.uid ? "●" : "○" }}
              </span>

              <strong>
                {{ pedestrian.name }}
              </strong>
            </div>

            <span class="person-status"> SUSPECT </span>
          </div>

          <div class="select-text">
            {{ selectedPedestrian?.uid === pedestrian.uid ? "SELECTED" : "SELECT SUSPECT →" }}
          </div>
        </div>
      </div>

      <div class="accusation-footer">
        <div v-if="accusationResult" class="result-overlay">
          <div
            class="result-modal"
            :class="{
              correct: accusationResult.correct,
              wrong: !accusationResult.correct,
            }"
          >
            <div class="result-icon">
              {{ accusationResult.correct ? "✓" : "✕" }}
            </div>

            <p class="eyebrow">
              {{ accusationResult.correct ? "CASE SOLVED" : "INVESTIGATION CONTINUES" }}
            </p>

            <h2>
              {{ accusationResult.correct ? "Correct!" : "Wrong accusation" }}
            </h2>

            <p class="result-message">
              {{ accusationResult.message }}
            </p>

            <div class="result-actions">
              <button
                v-if="accusationResult.correct"
                class="result-button primary"
                @click="restartSimulation"
              >
                RESTART SIMULATION
              </button>

              <button v-else class="result-button secondary" @click="continueInvestigation">
                KEEP INVESTIGATING
              </button>
            </div>
          </div>
        </div>

        <div v-else>Select a suspect to continue.</div>

        <button
          class="accuse-button"
          :disabled="!selectedPedestrian || accusing || accusationResult"
          @click="accuse"
        >
          {{ accusing ? "CHECKING..." : "ACCUSE" }}
        </button>
      </div>
    </div>
    <div v-if="accusationResult" class="modal-overlay">
      <div
        class="result-modal"
        :class="{
          correct: accusationResult.correct,
          wrong: !accusationResult.correct,
        }"
      >
        <div class="result-icon">
          {{ accusationResult.correct ? "✓" : "✕" }}
        </div>

        <p class="eyebrow">INVESTIGATION RESULT</p>

        <h2>
          {{ accusationResult.correct ? "Case Solved" : "Wrong Accusation" }}
        </h2>

        <p class="result-message">
          {{ accusationResult.message }}
        </p>
        <button v-if="accusationResult.correct" class="result-button" @click="restartSimulation">
          RESTART SIMULATION
        </button>
        <button v-else class="result-button" @click="continueInvestigation">
          KEEP INVESTIGATING
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.investigation-page {
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

.accusation-panel {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.panel-header {
  margin-bottom: 5px;
}

.panel-header h2 {
  font-size: 20px;
}

.instruction {
  margin: 8px 0 22px;
  color: #6b7280;
  font-size: 12px;
}

.suspect-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.suspect-card {
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: 0.15s;
}

.suspect-card:hover {
  border-color: #9ca3af;
  transform: translateY(-1px);
}

.suspect-card.selected {
  border-color: #111827;
  background: #f9fafb;
}

.suspect-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.suspect-name {
  display: flex;
  align-items: center;
  gap: 9px;
}

.suspect-name strong {
  font-size: 15px;
}

.radio {
  width: 18px;
  color: #111827;
  font-size: 16px;
}

.person-status {
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 7px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: bold;
}

.select-text {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  color: #374151;
  font-size: 10px;
  font-weight: bold;
}

.accusation-footer {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid #e5e7eb;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #6b7280;
  font-size: 12px;
}

.accusation-footer strong {
  color: #111827;
}

.accuse-button {
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  background: #111827;
  color: white;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
}

.accuse-button:hover:not(:disabled) {
  background: #1f2937;
}

.accuse-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(17, 24, 39, 0.55);
  backdrop-filter: blur(2px);
}

.result-modal {
  width: 420px;
  max-width: calc(100% - 40px);

  padding: 35px;

  border-radius: 10px;
  background: white;

  text-align: center;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.result-icon {
  width: 50px;
  height: 50px;

  margin: 0 auto 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-size: 24px;
  font-weight: bold;
}

.result-modal.correct .result-icon {
  background: #dcfce7;
  color: #166534;
}

.result-modal.wrong .result-icon {
  background: #fee2e2;
  color: #991b1b;
}

.result-modal h2 {
  margin-top: 5px;
  font-size: 24px;
}

.result-message {
  margin: 12px 0 25px;

  color: #6b7280;
  font-size: 13px;
  line-height: 1.5;
}

.result-button {
  width: 100%;

  padding: 12px;

  border: none;
  border-radius: 6px;

  background: #111827;
  color: white;

  font-size: 11px;
  font-weight: bold;

  cursor: pointer;
}

.result-button:hover {
  background: #1f2937;
}

.result-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(17, 24, 39, 0.45);
}

.result-modal {
  width: 360px;
  padding: 30px;

  border-radius: 10px;
  background: white;

  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.result-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-size: 24px;
  font-weight: bold;
}

.result-modal.correct .result-icon {
  background: #dcfce7;
  color: #166534;
}

.result-modal.wrong .result-icon {
  background: #fee2e2;
  color: #991b1b;
}

.result-modal h2 {
  margin: 5px 0 10px;
  font-size: 22px;
}

.result-message {
  margin: 0;

  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
}

.result-actions {
  margin-top: 25px;
}

.result-button {
  width: 100%;
  padding: 11px 18px;

  border: none;
  border-radius: 6px;

  font-size: 11px;
  font-weight: bold;

  cursor: pointer;
}

.result-button.primary {
  background: #111827;
  color: white;
}

.result-button.primary:hover {
  background: #1f2937;
}

.result-button.secondary {
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
}

.result-button.secondary:hover {
  background: #f9fafb;
}

@media (max-width: 900px) {
  .suspect-list {
    grid-template-columns: 1fr;
  }
}
</style>
