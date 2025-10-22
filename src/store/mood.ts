// src/store/mood.ts
import { defineStore } from 'pinia'

export const useMoodStore = defineStore('mood', {
  state: () => ({
    moodText: '',
    moodScore: 0,
    moodName: '',
    moodEmoji: '',
  }),
  actions: {
    setMood(payload: { text: string; score: number; name: string; emoji: string }) {
      this.moodText = payload.text
      this.moodScore = payload.score
      this.moodName = payload.name
      this.moodEmoji = payload.emoji
    },
    resetMood() {
      this.moodText = ''
      this.moodScore = 0
      this.moodName = ''
      this.moodEmoji = ''
    },
  },
})