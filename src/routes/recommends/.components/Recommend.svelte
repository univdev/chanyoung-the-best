<script>
  import { Card } from 'spaper';

  export let author = '';
  export let belong = '';
  export let content = '';
</script>

<div class="recommend">
  <Card
    title="{ author }"
    subTitle="{ belong }"
  >
    { content }
  </Card>
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