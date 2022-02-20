<script>
  export let author = '';
  export let group = '';
  export let content = '';

  $: nl2brContent = content.split('\n').join('<br>');
</script>

<div class="recommend">
  <div class="card">
    <div class="card-body">
      <div class="card-title">{ author } 님</div>
      <div class="card-subtitle">{ group }</div>
      <div class="card-text">{@html nl2brContent}</div>
    </div>
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