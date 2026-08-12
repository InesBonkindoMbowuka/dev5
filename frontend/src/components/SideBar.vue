<template>
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-icon">N</div>

      <div>
        <h1>NIGHTWATCH</h1>
        <span>Surveillance System</span>
      </div>
    </div>

    <nav class="navigation">
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/people">People</RouterLink>
      <RouterLink to="/investigation">Investigation</RouterLink>
    </nav>

    <div class="system-status">
      <span class="status-dot"></span>
      <div>
        <strong>System online</strong>
        <small>Surveillance active</small>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  min-height: 100vh;
  padding: 24px 18px;
  box-sizing: border-box;

  background: #111827;
  color: #f9fafb;

  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 45px;
}

.brand-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #374151;
  font-weight: bold;
}

.brand h1 {
  margin: 0;
  font-size: 15px;
  letter-spacing: 1px;
}

.brand span {
  font-size: 10px;
  color: #9ca3af;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.navigation a {
  padding: 12px;
  border-radius: 6px;

  color: #9ca3af;
  text-decoration: none;
  font-size: 14px;
}

.navigation a:hover,
.navigation a.router-link-exact-active {
  background: #1f2937;
  color: #ffffff;
}

.system-status {
  margin-top: auto;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px;
  border-top: 1px solid #374151;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
}

.system-status strong,
.system-status small {
  display: block;
}

.system-status strong {
  font-size: 12px;
}

.system-status small {
  margin-top: 2px;
  color: #9ca3af;
  font-size: 10px;
}
</style>
