<script>
  export let author = '';
  export let belong = '';
  export let content = '';
</script>

<div class="recommend">
  <div class="card">
    <h4 class="card-title">{ author }</h4>
  </div>
</div>

<style>
  .recommend :global(.card-body) {
    padding: 16px 24px;
  }
  .recommend :global(.card-title) {
    margin-bottom: 0;
  }
  .recommend :global(.card-subtitle) {
    padding: 4px 0;
  }
  .recommend :global(.card-content) {
    font-size: 24px;
  }
</style>