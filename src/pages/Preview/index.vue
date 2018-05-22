<template>
  <div class="container column">
    <div class="item">
      <h2>Preview</h2>
    </div>
    <div class="item">
      <DragNDrop :exercise="exercise"/>
    </div>
  </div>
</template>
<script>
import DragNDrop from '@/components/DragNDrop'

export default {
  name: "Preview",
  components: {
    DragNDrop
  },
  computed: {
    exercise () {
      return {...this.$store.getters['getExercise']}
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
