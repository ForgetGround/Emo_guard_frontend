import { defineStore } from 'pinia'
import type { ScaleResultResponse } from '@/service/app/types'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as ScaleResultResponse[],
    weekTasks: [] as { date: string; status: string }[],
    today: new Date().toISOString().slice(0, 10),
  }),
  actions: {
    setTasks(payload: ScaleResultResponse[]) {
      this.tasks = payload
    },
    setWeekTasks(payload: { date: string; status: string }[]) {
      this.weekTasks = payload
    },
  },
})