import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import PuzzleButton from './components/PuzzleButton.vue?shadow'

window.customElements.define('puzzle-button', wrap(Vue, PuzzleButton));
