<script>
  import { Circle3 } from 'svelte-loading-spinners';
</script>

<div class="loading-overlay">
  <Circle3 />
</div>

<style>
  .loading-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .3);
    z-index: 1000;
  }
</style>