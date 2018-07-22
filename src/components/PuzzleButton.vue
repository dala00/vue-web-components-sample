<template>
  <div>
    <div class="wrapper">
      <div v-for="(panel, i) in panels" :key="i" :style="panelStyle(panel)" @click="move(panel)">
      </div>
      <div :style="lastPanelStyle()"></div>
    </div>
    <button type="submit" :disabled="!finished()">Submit</button>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

.wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #888888;
}

.wrapper div {
  position: absolute;
  width: 75px;
  height: 75px;
  border: gray solid 1px;
  transition-duration: 0.3s;
}
</style>

<script>
import Panel from "../Panel";

export default {
  props: {
    img: {
      type: String,
      required: true
    }
  },
  data() {
    let panels = [];
    for (let index = 0; index < 15; index++) {
      const x = index % 4;
      const y = Math.floor(index / 4);
      const panel = new Panel(index, x, y);
      panels.push(panel);
    }

    return {
      panels,
      lastPanel: new Panel(15, 3, 3)
    };
  },
  mounted() {
    this.shuffle();
  },
  methods: {
    move(panel) {
      const position = this.getAvailablePosition(panel);
      if (position === null) {
        return;
      }

      panel.x = position.x;
      panel.y = position.y;
    },
    getAvailablePosition(panel) {
      if (
        panel.x > 0 &&
        this.getPanelByPosition(panel.x - 1, panel.y) === undefined
      ) {
        return { x: panel.x - 1, y: panel.y };
      }
      if (
        panel.x < 3 &&
        this.getPanelByPosition(panel.x + 1, panel.y) === undefined
      ) {
        return { x: panel.x + 1, y: panel.y };
      }
      if (
        panel.y > 0 &&
        this.getPanelByPosition(panel.x, panel.y - 1) === undefined
      ) {
        return { x: panel.x, y: panel.y - 1 };
      }
      if (
        panel.y < 3 &&
        this.getPanelByPosition(panel.x, panel.y + 1) === undefined
      ) {
        return { x: panel.x, y: panel.y + 1 };
      }
      return null;
    },
    getPanelByPosition(x, y) {
      return this.panels.find(panel => panel.x == x && panel.y == y);
    },
    panelStyle(panel) {
      const left = panel.x * 75;
      const top = panel.y * 75;
      return {
        backgroundImage: `url(${this.img})`,
        backgroundPosition: `${panel.backgroundLeft}px ${
          panel.backgroundTop
        }px`,
        left: `${left}px`,
        top: `${top}px`
      };
    },
    lastPanelStyle() {
      let style = this.panelStyle(this.lastPanel);
      if (!this.finished()) {
        style.display = "none";
      }
      return style;
    },
    finished() {
      for (let i = 0; i < this.panels.length; i++) {
        const panel = this.panels[i];
        const x = i % 4;
        const y = Math.floor(i / 4);
        if (panel.x != x || panel.y != y) {
          return false;
        }
      }
      return true;
    },
    shuffle() {
      for (let i = 0; i < 100; i++) {
        const position = this.getOpeningPosition();
        let enables = [];
        if (position.x > 0) {
          enables.push({ x: position.x - 1, y: position.y });
        }
        if (position.x < 3) {
          enables.push({ x: position.x + 1, y: position.y });
        }
        if (position.y > 0) {
          enables.push({ x: position.x, y: position.y - 1 });
        }
        if (position.y < 3) {
          enables.push({ x: position.x, y: position.y + 1 });
        }
        const enablePosition =
          enables[Math.floor(Math.random() * enables.length)];
        const panel = this.getPanelByPosition(
          enablePosition.x,
          enablePosition.y
        );
        this.move(panel);
      }
    },
    getOpeningPosition() {
      for (let i = 0; i < this.panels.length + 1; i++) {
        const x = i % 4;
        const y = Math.floor(i / 4);
        const found = this.panels.find(panel => {
          return panel.x == x && panel.y == y;
        });
        if (found === undefined) {
          return { x, y };
        }
      }
      return null;
    }
  }
};
</script>
