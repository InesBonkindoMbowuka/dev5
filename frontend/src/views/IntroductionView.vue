<script setup>
import { useRouter } from "vue-router";
import { startSimulation } from "../api/simulation";


const router = useRouter();

async function startInvestigation() {
  try {
    await startSimulation();
    router.push("/dashboard");
  } catch (error) {
    console.error("Failed to start simulation:", error);
  }
}
</script>

<template>
  <div class="introduction-page">
    <div class="introduction-card">

      <div class="intro-content">
        <p class="eyebrow">INVESTIGATION BRIEFING</p>

        <h2>Identify the Burglar</h2>

        <p class="description">
          A burglary has been reported in the neighborhood last night.
          The last 24 hours picked up by the surveillance streetlights have been sent to you.
          Your job is to investigate their activity history, and identify the person whose
          behavior doesn't belong.
        </p>
        <div class="how-to-play">
          <p class="eyebrow">HOW TO PLAY</p>
          <div class="step">
            <span>01</span>
            <div>
              <strong>OBSERVE</strong>
              <p>Watch the neighborhood map.</p>
            </div>
          </div>

          <div class="step">
            <span>02</span>
            <div>
              <strong>INVESTIGATE</strong>
              <p>Review each person's activity history in the "People" tab.</p>
            </div>
          </div>

          <div class="step">
            <span>03</span>
            <div>
              <strong>FIND THE PATTERN</strong>
              <p>Look for suspicious behavior.</p>
            </div>
          </div>

          <div class="step">
            <span>04</span>
            <div>
              <strong>ACCUSE</strong>
              <p>Select the person you believe is the burglar.</p>
            </div>
          </div>
        </div>

        <button
          class="start-button"
          @click="startInvestigation"
        >
          START INVESTIGATION
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.introduction-page {
  width: 100%;
  min-height: 100vh;
  padding: 50px px;
  box-sizing: border-box;

  background: #f9fafb;
}

.introduction-card {
  width: 100%;
  min-height: calc(100vh - 100px);
  box-sizing: border-box;

  padding: 30px 50px;

  border: 1px solid #e5e7eb;
  border-radius: 10px;

  background: white;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 60px;
}

.brand-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: #111827;
  color: white;

  font-weight: bold;
}

.brand h1 {
  margin: 0;

  font-size: 15px;
  letter-spacing: 1.5px;
}

.brand span {
  color: #9ca3af;
  font-size: 10px;
}

.eyebrow {
  margin: 0 0 8px;

  color: #6b7280;

  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

.intro-content {
  max-width: 850px;
}

.intro-content h2 {
  margin: 0;

  font-size: 38px;
}

.description {
  max-width: 700px;

  margin: 14px 0 0;

  color: #6b7280;

  font-size: 14px;
  line-height: 1.7;
}

.how-to-play {
  margin-top: 40px;

  padding-top: 25px;

  border-top: 1px solid #e5e7eb;
}

.step {
  display: flex;
  gap: 20px;

  padding: 16px 0;

  border-bottom: 1px solid #f3f4f6;
}

.step > span {
  width: 30px;
  flex-shrink: 0;

  color: #9ca3af;

  font-size: 10px;
  font-weight: bold;
}

.step strong {
  display: block;

  font-size: 11px;
  letter-spacing: 0.5px;
}

.step p {
  margin: 4px 0 0;

  color: #6b7280;

  font-size: 12px;
}

.warning {
  max-width: 700px;

  margin-top: 25px;
  padding: 14px;

  border-radius: 6px;

  background: #f3f4f6;

  color: #6b7280;

  font-size: 11px;
}

.warning strong {
  color: #111827;
}

.start-button {
  width: 100%;
  max-width: 700px;

  margin-top: 25px;
  padding: 14px;

  border: none;
  border-radius: 6px;

  background: #111827;
  color: white;

  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.5px;

  cursor: pointer;
}

.start-button:hover {
  background: #1f2937;
}

@media (max-width: 700px) {
  .introduction-page {
    padding: 20px;
  }

  .introduction-card {
    min-height: calc(100vh - 40px);
    padding: 30px 25px;
  }

  .intro-content h2 {
    font-size: 30px;
  }
}
</style>
