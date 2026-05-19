<template>
  <nav class="navbar">
    <!-- Logo / Identity -->
    <div class="brand">
      <div class="callsign">MC</div>
      <div class="brand-text">
        <span class="brand-name">NATO</span>
        <span class="brand-sub">A STUDY</span>
      </div>
    </div>

    <!-- Status indicator -->
    <div class="status">
      <span class="pulse-dot"></span>
      <span class="status-label">ONLINE</span>
    </div>

    <!-- Nav links -->
    <ul class="nav-links">
      <li>
        <a href="/about" class="nav-link">ABOUT</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped>
/* ── Base ── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  background: rgba(8, 8, 8, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #c9a84c;
  animation: dropIn 0.5s ease both;
}

/* gold scan-line that sweeps across the bottom border on load */
.navbar::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: -100%;
  width: 40%;
  height: 1px;
  background: linear-gradient(to right, transparent, #ffd166, transparent);
  animation: scan 2.4s ease-out 0.4s both;
}

/* ── Brand / Logo ── */
.brand {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.callsign {
  width: 42px;
  height: 42px;
  border: 2px solid #c9a84c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #c9a84c;
  border-radius: 4px;
  flex-shrink: 0;
  box-shadow: inset 0 0 12px rgba(201, 168, 76, 0.08);
  transition: box-shadow 0.3s;
}

.callsign:hover {
  box-shadow: inset 0 0 18px rgba(201, 168, 76, 0.2), 0 0 10px rgba(201, 168, 76, 0.15);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 3px;
}

.brand-name {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #ffffff;
}

.brand-sub {
  font-size: 0.6rem;
  letter-spacing: 2.5px;
  color: #c9a84c;
  opacity: 0.8;
}

/* ── Status dot ── */
.status {
  display: flex;
  align-items: center;
  gap: 6px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4caf6e;
  box-shadow: 0 0 0 0 rgba(76, 175, 110, 0.4);
  animation: pulse 2s infinite;
}

.status-label {
  font-size: 0.55rem;
  letter-spacing: 3px;
  color: #4caf6e;
  font-weight: 600;
}

/* ── Nav links ── */
.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #aaa;
  transition: color 0.2s;
  position: relative;
  padding: 2px 0;
}

/* brackets slide in from center on hover */
.nav-link::before,
.nav-link::after {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: #c9a84c;
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
}

.nav-link::before {
  content: '[';
  right: calc(100% + 4px);
  transform: translateY(-50%) translateX(6px);
}

.nav-link::after {
  content: ']';
  left: calc(100% + 4px);
  transform: translateY(-50%) translateX(-6px);
}

.nav-link:hover {
  color: #ffffff;
}

.nav-link:hover::before {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.nav-link:hover::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* ── Keyframes ── */
@keyframes dropIn {
  from { opacity: 0; transform: translateY(-100%); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes scan {
  from { left: -40%; }
  to   { left: 140%; }
}

@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(76, 175, 110, 0.5); }
  70%  { box-shadow: 0 0 0 7px rgba(76, 175, 110, 0); }
  100% { box-shadow: 0 0 0 0 rgba(76, 175, 110, 0); }
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .navbar {
    padding: 0 1.2rem;
  }

  .status {
    display: none;
  }

  .brand-sub {
    display: none;
  }
}
</style>
