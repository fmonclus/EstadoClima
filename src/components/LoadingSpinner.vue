<template>
  <div class="center">
    <svg class="loading-spinner">
      <circle
        :cx="circlePositions[index] && circlePositions[index].x"
        :cy="circlePositions[index] && circlePositions[index].y"
        :r="item.radius"
        :fill="item.color"
        v-for="(item, index) in circles"
        :key="index"
      />
    </svg>
    <p class="text-description">Cargando ...</p>
  </div>
</template>

<script>
const CENTER_X = 50;
const CENTER_Y = 50;
const RADIUS = 20;

function positionOnCircle(radius, angle, center) {
  return {
    x: center.x + radius * Math.cos(toRadians(angle)),
    y: center.y + radius * Math.sin(toRadians(angle)),
  };
}

function toRadians(angle) {
  return (angle * Math.PI) / 180;
}

function calculatePositions(component) {
  let angleIncrement = 360 / component.circles.length;
  let positions = {};
  component.circles.forEach((circle, index) => {
    positions[index] = positionOnCircle(RADIUS, angleIncrement * index, {
      x: CENTER_X,
      y: CENTER_Y,
    });
  });
  return positions;
}

export default {
  data() {
    return {
      circles: [
        { color: "#E3AC3C", radius: 0 },
        { color: "#E5B147", radius: 0 },
        { color: "#E6B552", radius: 0 },
        { color: "#E8BA5D", radius: 0 },
        { color: "#EABF69", radius: 0 },
        { color: "#ECC474", radius: 0 },
        { color: "#EDC980", radius: 0 },
        { color: "#EFCE8C", radius: 0 },
        { color: "#F1D498", radius: 0 },
      ],
      counter: 0,
      interval: null,
    };
  },
  computed: {
    circlePositions: calculatePositions,
  },
  created() {
    this.interval = setInterval(() => {
      this.counter++;
      this.circles = this.circles.map((item, index) => ({
        ...item,
        radius: (this.counter + index) % 8,
      }));
    }, 70);
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.loading-spinner {
  width: 100px;
  height: 100px;
}

.text-description {
  text-align: center;
  font-size: 1.8rem;
  color: #E3AC3C;
}

.center {
    text-align: center
}
</style>
