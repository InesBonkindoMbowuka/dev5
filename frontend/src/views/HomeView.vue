<template>
  <div class="dashboard">
    <header class="topbar">
      <div>
        <p class="eyebrow">SURVEILLANCE CONTROL</p>
        <h2>Neighborhood Dashboard</h2>
      </div>

      <div class="live-status">
        <span></span>
        LIVE
      </div>
    </header>

    <section class="stats">
      <div class="stat-card">
        <span>PEDESTRIANS</span>
        <strong>10</strong>
      </div>

      <div class="stat-card">
        <span>STREETLIGHTS</span>
        <strong>5</strong>
      </div>

      <div class="stat-card">
        <span>DETECTIONS</span>
        <strong>0</strong>
      </div>

      <div class="stat-card">
        <span>COVERAGE</span>
        <strong>13%</strong>
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
          <div class="map-grid"></div>

          <div class="map-message">
            <strong>Neighborhood Map</strong>
            <span>Map visualization coming next</span>
          </div>
        </div>
      </div>

      <div class="activity-panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">RECENT ACTIVITY</span>
            <h3>Activity Feed</h3>
          </div>
        </div>

        <div class="empty-state">
          <span class="empty-icon">—</span>
          <strong>No recent detections</strong>
          <small>Detection events will appear here.</small>
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
