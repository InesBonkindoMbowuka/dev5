<script setup>
import { ref, onMounted } from "vue";
import { getUserUid } from "../api/user";

const stats = ref(null);

async function loadStats() {
  const userUid = getUserUid();

  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${userUid}/stats`
    );

    if (!response.ok) {
      throw new Error("Failed to load stats");
    }

    stats.value = await response.json();
  } catch (error) {
    console.error("Failed to load user stats:", error);
  }
}

onMounted(loadStats);
</script>

<template>
  <div class="history-page">

    <div class="page-header">
      <div>
        <p class="eyebrow">SURVEILLANCE CONTROL</p>
        <h2>My History</h2>
      </div>
    </div>

    <div class="stats-panel">

      <div class="panel-header">
        <div>
          <p class="eyebrow">INVESTIGATION HISTORY</p>
          <h2>Your Results</h2>
        </div>
      </div>

      <div class="stats-list">

        <div class="stat-card">
          <span class="stat-label">CASES SOLVED</span>
          <strong>{{ stats?.wins ?? 0 }}</strong>
        </div>

        <div class="stat-card">
          <span class="stat-label">WRONG GUESSES</span>
          <strong>{{ stats?.wrongGuesses ?? 0 }}</strong>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.history-page {
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

.stats-panel {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.panel-header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.panel-header h2 {
  font-size: 18px;
}

.stats-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.stat-card {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.stat-label {
  display: block;
  margin-bottom: 10px;
  color: #6b7280;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 1px;
}

.stat-card strong {
  font-size: 28px;
}

@media (max-width: 900px) {
  .stats-list {
    grid-template-columns: 1fr;
  }
}
</style>
