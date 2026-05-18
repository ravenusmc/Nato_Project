<template>
  <section class="about">

    <!-- Header -->
    <header class="about-header">
      <div class="eyebrow">[ MY STORY ]</div>
      <h1 class="title">Driven by Service.<br>Defined by Code.</h1>
      <div class="title-rule"></div>
    </header>

    <!-- Hero: photo + stats -->
    <div class="hero">
      <div class="image-frame">
        <div class="image"></div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-number">2×</span>
          <span class="stat-label">SkillsUSA State Champion</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">10+</span>
          <span class="stat-label">Years in Tech</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">79</span>
          <span class="stat-label">Combat Convoy Briefs</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">40</span>
          <span class="stat-label">Marines Deployed</span>
        </div>
      </div>
    </div>

    <!-- Chapters -->
    <div class="chapters">
      <div class="chapter">
        <div class="chapter-label">&#9658; MILITARY SERVICE</div>
        <p>
          The experience I gained in the Marine Corps and C.I.A. has given me the confidence
          and ability to succeed in any field. I've proven my ability to work well under pressure
          when I had three months to prepare 40 Marines for deployment to Camp Fallujah, Iraq.
          I've demonstrated strong communication skills writing a new convoy operations manual
          for my unit in Afghanistan and delivering 79 convoy briefs in Iraq. My planning skills
          were proven when I coordinated 15 convoys across South Korea, moving over 1,000 pieces
          of decking, tents, and aircraft equipment.
        </p>
      </div>

      <div class="chapter">
        <div class="chapter-label">&#9658; TECH JOURNEY</div>
        <p>
          In the spring of 2015, I chose to take a leap in a new direction and immerse myself in
          learning full stack web development. I attended the coding bootcamp Tech Talent South as
          well as Gwinnett Technical College for a degree in web development. Since then, I have
          fully immersed myself in the Atlanta tech community, attending meetups, conferences, and
          hackathons to grow as a developer. I've won first place two years in a row at the SkillsUSA
          state level in web design and competed at the national level. I've worked with Manning
          Publications to review many of their books and videos on the latest technology trends.
        </p>
      </div>

      <div class="chapter chapter--cta">
        <div class="chapter-label">&#9658; LET'S CONNECT</div>
        <p>Feel free to send me an invite — I'd love to connect with you.</p>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style scoped>
/* ── Layout ── */
.about {
  padding: 3rem 2rem;
  background: #121212;
  color: #e0e0e0;
  border-radius: 8px;
  margin: 75px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  animation: pageFade 0.6s ease both;
}

/* ── Header ── */
.about-header {
  text-align: center;
  animation: slideDown 0.6s ease both;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: #c9a84c;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.title {
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1.25;
  color: #ffffff;
  margin: 0 0 1.2rem;
}

.title-rule {
  width: 60px;
  height: 3px;
  background: #c9a84c;
  margin: 0 auto;
}

/* ── Hero ── */
.hero {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  align-items: start;
  animation: slideUp 0.7s 0.1s ease both;
}

.image-frame {
  position: relative;
}

.image-frame::before {
  content: '';
  position: absolute;
  inset: -6px;
  border: 2px solid #c9a84c;
  border-radius: 12px;
  opacity: 0.5;
}

.image {
  width: 100%;
  height: 340px;
  border-radius: 10px;
  background: url('../assets/images/person.jpg') center/cover no-repeat;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 1;
}

/* ── Stats ── */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-left: 3px solid #c9a84c;
  border-radius: 6px;
  padding: 1.4rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  transition: border-color 0.2s, background 0.2s;
}

.stat-card:hover {
  background: #1f1f1f;
  border-left-color: #ffd166;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 800;
  color: #c9a84c;
  line-height: 1;
  letter-spacing: -1px;
}

.stat-label {
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #888;
}

/* ── Chapters ── */
.chapters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: slideUp 0.7s 0.2s ease both;
}

.chapter {
  background: #1a1a1a;
  border-left: 3px solid #2a2a2a;
  border-radius: 0 8px 8px 0;
  padding: 1.5rem 1.8rem;
  transition: border-left-color 0.25s;
}

.chapter:hover {
  border-left-color: #c9a84c;
}

.chapter-label {
  font-size: 0.72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #c9a84c;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.chapter p {
  font-size: 1.05rem;
  line-height: 1.85;
  color: #ccc;
  margin: 0;
}

.chapter--cta {
  border-left-color: #c9a84c;
}

.chapter--cta p {
  color: #e0e0e0;
  font-style: italic;
}

/* ── Animations ── */
@keyframes pageFade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .about {
    margin: 20px;
    padding: 2rem 1.2rem;
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .image {
    height: 260px;
  }

  .title {
    font-size: 2rem;
  }
}
</style>
