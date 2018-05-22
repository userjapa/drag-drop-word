<template>
  <div class="container column">
    <div class="item">
      <h1>Home</h1>
    </div>
    <div class="item">
      <button class="btn" @click="$router.replace({ name: 'Create' })">Create</button>
      <button class="btn" @click="$router.replace({ name: 'Preview' })">Preview</button>
    </div>
    <div class="item">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: "home"
}
</script>
<style lang="scss" scoped>
</style>
