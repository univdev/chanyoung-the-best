<script>
  import { Button } from 'spaper';
  import Recommend from "./.components/Recommend.svelte";
</script>

<svelte:head>
	<title>찬영이를 칭찬해주세요!</title>
</svelte:head>

<div class="recommends">
  <ul class="list">
    <li class="list__item">
      <Recommend
        author="박 찬영"
        belong="asd"
        content="Good!"
      />
    </li>
    <li class="list__item">
      <Recommend
        author="박 찬영"
        belong="asd"
        content="Good!"
      />
    </li>
    <li class="list__item">
      <Recommend
        author="박 찬영"
        belong="asd"
        content="Good!"
      />
    </li>
  </ul>
  <Button
    class="add-button"
    type="secondary"
  >
    +
  </Button>
</div>

<style>
  .recommends {
    max-width: 500px;
    width: 100%;
    padding: 16px;
    background-color: white;
    margin: auto;
    font-size: 24px;
  }
  .list .list__item {
    margin-bottom: 16px;
  }
  .recommends :global(.add-button) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 25px;
    bottom: 25px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
</style>