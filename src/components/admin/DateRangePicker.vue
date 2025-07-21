<template>
  <div class="relative flex items-center space-x-2">
    <div class="flex items-center border border-gray-300 rounded-md px-3 py-2">
      <CalendarIcon class="h-5 w-5 text-gray-400 mr-2" />
      <input type="date" :value="startString" @input="onStartChange($event.target.value)" class="text-sm text-gray-700 bg-transparent outline-none" />
      <span class="mx-1 text-gray-400">-</span>
      <input type="date" :value="endString" @input="onEndChange($event.target.value)" class="text-sm text-gray-700 bg-transparent outline-none" />
    </div>
  </div>
</template>

<script setup>
import { CalendarIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
const props = defineProps({
  modelValue: Object
})
const emit = defineEmits(['update:modelValue'])
const startString = computed(() => props.modelValue.start ? props.modelValue.start.toISOString().slice(0,10) : '')
const endString = computed(() => props.modelValue.end ? props.modelValue.end.toISOString().slice(0,10) : '')
const onStartChange = (val) => {
  emit('update:modelValue', { ...props.modelValue, start: new Date(val) })
}
const onEndChange = (val) => {
  emit('update:modelValue', { ...props.modelValue, end: new Date(val) })
}
</script>