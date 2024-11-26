<template>
    <div>
      <div 
        class="stack-container"
        ref="stackContainer"
        @wheel="handleMouseWheel"
      >
        <PokedexCard
          v-for="(card, index) in cards"
          :key="index"
          :class="['card', { 'is-active': index === activeIndex }]"
          :style="getCardStyle(index)"
        />
      </div>
      <!-- <div class="controls">
        <button @click="prevCard" :disabled="activeIndex === 0">Previous</button>
        <button @click="nextCard" :disabled="activeIndex === cards.length - 1">Next</button>
      </div> -->
    </div>
  </template>
  
  <script>
  import PokedexCard from "./pokedexcard.vue";
  
  export default {
    name: "PokedexSwiping",
    components: { PokedexCard },
    data() {
      return {
        activeIndex: 1, // Start with the second card as active
        cards: [
          { name: "Bulbasaur" },
          { name: "Charmander" },
          { name: "Squirtle" },
          { name: "Pikachu" },
          { name: "Pikachu" },
          { name: "Pikachu" },
        ],
      };
    },
    methods: {
      getCardStyle(index) {
        const offset = index - this.activeIndex;
        const zIndex = 100 - Math.abs(offset); // Higher z-index for the active card
        const scale = 1 - Math.abs(offset) * 0.1;
        const translateY = offset * 90;
        const opacity = 1 - Math.abs(offset) * 0.3;
  
        return {
          transform: `translateY(${translateY}px) scale(${scale})`,
          zIndex,
          opacity,
        };
      },
      handleMouseWheel(event) {
        // Handle mouse wheel scroll to move the stack
        if (event.deltaY > 0) {
          this.nextCard();
        } else {
          this.prevCard();
        }
      },
      nextCard() {
        if (this.activeIndex < this.cards.length - 1) {
          this.activeIndex++;
        }
      },
      prevCard() {
        if (this.activeIndex > 0) {
          this.activeIndex--;
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .stack-container {
    position: relative;
    width: 100%;
    height: 70vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    // cursor: pointer; /* Change cursor to indicate interaction area */
    flex-direction: column; /* Stack the cards vertically */
  
    .card {
      position: absolute;
      width: 100%;
      height: 300px;
      transition: transform 0.3s, opacity 0.3s, z-index 0.3s;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
      &.is-active {
        transform: translateY(0) scale(1);
        z-index: 10;
      }
    }
  }
  
  .controls {
    margin-top: 20px;
    text-align: center;
  
    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      margin: 0 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
  
      &:hover {
        background-color: #0056b3;
      }
  
      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    }
  }
  </style>
  