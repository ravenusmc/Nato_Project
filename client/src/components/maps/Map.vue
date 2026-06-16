<template>
  <div style="position: relative;">
    <h3 class="Map-Title">World Map of NATO States: {{ initialMapYear }}</h3>
    <div ref="natoMap"></div>
    <div ref="tooltip" class="map-tooltip" style="display: none;"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

// World GeoJSON where every feature has a `properties.name` string we can
// match against our NATO_States list.  Download this file and place it in
// public/world.geojson if you prefer a local copy instead of a network fetch.
const WORLD_GEOJSON_URL =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

// Some GeoJSON sources spell country names differently from our NATO_States
// list (e.g. "USA" vs "United States").  Add any mismatches here so the
// highlight still works.
const NAME_ALIASES = {
  "USA": "United States",
  "United States of America": "United States",
  "England": "United Kingdom",
  "Turkey": "Türkiye"
};

export default {
  name: "Map",
  computed: {
    ...mapGetters("datapage", ["NATO_States", "initialMapYear"]),
  },
  watch: {
    // Re-draw whenever the store's NATO_States list changes (e.g. after a
    // form submission fetches new data from the server).
    NATO_States: {
      handler: "buildWorldMap",
      deep: true,
    },
  },
  mounted() {
    this.buildWorldMap();
  },
  methods: {
    async buildWorldMap() {
      // ── 1. Clear any previous render ────────────────────────────────────
      // Always wipe the container first so we start with a blank slate.
      d3.select(this.$refs.natoMap).selectAll("*").remove();

      // ── 2. Canvas dimensions ─────────────────────────────────────────────
      // These are the internal coordinate units of the SVG.  The viewBox +
      // width:"100%" below make it responsive to its parent container.
      const width = 960;
      const height = 500;

      // ── 3. Create the SVG element ────────────────────────────────────────
      const svg = d3
        .select(this.$refs.natoMap)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "95%")
        .style("display", "block")
        .style("margin", "0 auto")
        .style("background-color", "#c8e6f5"); // light blue "ocean"

      // ── 4. Map projection ────────────────────────────────────────────────
      // A projection converts (longitude, latitude) pairs into (x, y) pixels.
      // geoNaturalEarth1 gives a balanced, visually pleasing world view.
      // .scale()     → zoom level (higher = bigger map)
      // .translate() → shifts the centre of the projection to the middle of
      //                our SVG canvas
      const projection = d3
        .geoNaturalEarth1()
        .scale(160)
        .translate([width / 2, height / 2]);

      // ── 5. Path generator ────────────────────────────────────────────────
      // d3.geoPath converts GeoJSON geometry (arrays of lat/lng points) into
      // the SVG "d" attribute string that actually draws the country shape.
      const pathGenerator = d3.geoPath().projection(projection);

      // ── 6. Fetch world GeoJSON ───────────────────────────────────────────
      // Each feature in this file represents one country and has a
      // `feature.properties.name` string (e.g. "France", "Germany", …).
      let worldData;
      try {
        worldData = await d3.json(WORLD_GEOJSON_URL);
      } catch (err) {
        console.error("Could not load world map data:", err);
        return;
      }

      // ── 7. Build a fast NATO lookup ──────────────────────────────────────
      // A Set gives O(1) membership checks — much faster than .includes()
      // inside the fill callback, which runs once per country on every render.
      const natoSet = new Set(this.NATO_States);

      // Returns true when a GeoJSON feature belongs to a NATO member state.
      // We also check NAME_ALIASES so minor spelling differences don't break
      // the highlight (e.g. the GeoJSON might say "USA" but our list has
      // "United States").
      const isNATO = (geoName) =>
        natoSet.has(geoName) || natoSet.has(NAME_ALIASES[geoName]);

      // ── 8. Draw every country as an SVG <path> ───────────────────────────
      const tooltip = d3.select(this.$refs.tooltip);

      svg
        .selectAll("path")
        .data(worldData.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", (d) =>
          isNATO(d.properties.name)
            ? "#4a90d9"  // NATO member  → blue
            : "#cccccc"  // non-member   → grey
        )
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 0.5)
        .on("mouseover", (event, d) => {
          const name = d.properties.name;
          const nato = isNATO(name);
          tooltip
            .style("display", "block")
            .html(
              nato
                ? `<strong>${name}</strong><br/><span class="nato-badge">NATO Member</span>`
                : `<strong>${name}</strong>`
            );
          if (nato) {
            d3.select(event.currentTarget).attr("fill", "#2c5f9e");
          }
        })
        .on("mousemove", (event) => {
          const mapRect = this.$refs.natoMap.getBoundingClientRect();
          tooltip
            .style("left", `${event.clientX - mapRect.left + 12}px`)
            .style("top",  `${event.clientY - mapRect.top  - 28}px`);
        })
        .on("mouseout", (event, d) => {
          tooltip.style("display", "none");
          if (isNATO(d.properties.name)) {
            d3.select(event.currentTarget).attr("fill", "#4a90d9");
          }
        });
    },
  },
};
</script>

<style scoped>
.Map-Title {
  text-align: center;
  text-transform: uppercase;
}

.map-tooltip {
  position: absolute;
  background: rgba(20, 20, 20, 0.85);
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 13px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 10;
}

.map-tooltip .nato-badge {
  font-size: 11px;
  color: #7ec8f7;
}
</style>
