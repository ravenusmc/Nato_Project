<template>
  <footer class="footer">
    <!-- left: brand -->
    <div class="footer-left">
      <div class="brand-mark">◈</div>
      <div class="brand-info">
        <span class="brand-name">DOUBLE SUN PRODUCTIONS</span>
        <span class="brand-copy">&copy; 2026 &mdash; ALL RIGHTS RESERVED</span>
      </div>
    </div>

    <!-- center: live status -->
    <div class="footer-center">
      <span class="pulse-dot"></span>
      <span class="status-text">TRANSMISSION ACTIVE</span>
    </div>

    <!-- right: social links -->
    <div class="footer-right">
      <a
        href="https://www.linkedin.com/in/mcuddy1/"
        target="_blank"
        rel="noopener noreferrer"
        class="social-btn"
        aria-label="LinkedIn"
      >
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a
        href="https://github.com/ravenusmc"
        target="_blank"
        rel="noopener noreferrer"
        class="social-btn"
        aria-label="GitHub"
      >
        <i class="fab fa-github"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FootComponent',
};
</script>

<style scoped>
/* ── Base ── */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  background: rgba(8, 8, 8, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid #c9a84c;
  animation: riseIn 0.5s ease both;
}

/* gold scan line that sweeps across the top border on load */
.footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -100%;
  width: 40%;
  height: 1px;
  background: linear-gradient(to right, transparent, #ffd166, transparent);
  animation: scan 2.4s ease-out 0.6s both;
  pointer-events: none;
}

/* ── Left: brand ── */
.footer-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-mark {
  width: 36px;
  height: 36px;
  border: 1.5px solid #c9a84c;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9a84c;
  font-size: 0.9rem;
  flex-shrink: 0;
  box-shadow: inset 0 0 10px rgba(201, 168, 76, 0.08);
  transition: box-shadow 0.3s;
}

.brand-mark:hover {
  box-shadow: inset 0 0 18px rgba(201, 168, 76, 0.22), 0 0 10px rgba(201, 168, 76, 0.15);
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1;
}

.brand-name {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #ffffff;
}

.brand-copy {
  font-size: 0.55rem;
  letter-spacing: 1.5px;
  color: #c9a84c;
  opacity: 0.7;
}

/* ── Center: status ── */
.footer-center {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4caf6e;
  box-shadow: 0 0 6px rgba(76, 175, 110, 0.8);
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

.status-text {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #aaa;
}

/* ── Right: social ── */
.footer-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.social-btn {
  width: 34px;
  height: 34px;
  border: 1.5px solid rgba(201, 168, 76, 0.35);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.25s, border-color 0.25s, box-shadow 0.25s;
}

.social-btn:hover {
  color: #c9a84c;
  border-color: #c9a84c;
  box-shadow: 0 0 12px rgba(201, 168, 76, 0.18);
}

/* ── Keyframes ── */
@keyframes riseIn {
  from { opacity: 0; transform: translateY(100%); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes scan {
  from { left: -40%; }
  to   { left: 140%; }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 4px rgba(76, 175, 110, 0.6); opacity: 1; }
  50%       { box-shadow: 0 0 10px rgba(76, 175, 110, 1); opacity: 0.75; }
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .footer {
    padding: 0 1.2rem;
  }

  .footer-center {
    display: none;
  }

  .brand-copy {
    display: none;
  }
}
</style>
