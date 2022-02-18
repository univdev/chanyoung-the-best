<script>
  import Recommend from "./.components/Recommend.svelte";
  import RecommendEditor from './.components/RecommendEditor.svelte';

  let recommends = [];
  let isVisibleRecommendEditor = false;
  const payload = {
    author: '',
    group: '',
    content: '',
  };
  const recommendEditorId = 'recommend-add-modal';
  const clearPayload = () => {
    payload.author = '';
    payload.group = '';
    payload.content = '';
  };
  const handleShowRecommendEditor = () => {
    isVisibleRecommendEditor = true;
  };
  const handleHideRecommendEditor = () => {
    isVisibleRecommendEditor = false;
    clearPayload();
  };
</script>

<svelte:head>
	<title>찬영이를 칭찬해주세요!</title>
</svelte:head>

<div class="recommends">
  <ul class="list">
    {#each recommends as recommend}
      <li class="list__item">
        <Recommend
          author="{recommend.author}"
          group="{recommend.group}"
          content="{recommend.content}"/>
      </li>
    {/each}
  </ul>
  <button
    type="button"
    class="paper-btn btn-secondary add-button"
    on:click="{handleShowRecommendEditor}">
    +
  </button>
  <RecommendEditor
    id="{recommendEditorId}"
    bind:visible="{isVisibleRecommendEditor}"
    bind:author="{payload.author}"
    bind:group="{payload.group}"
    bind:content="{payload.content}"
    on:cancel="{handleHideRecommendEditor}"/>
  <input
    id="recommend-add-confirm-modal"
    class="modal-state"
    type="checkbox"> 
  <div class="modal">
    <label class="modal-bg" for="recommend-add-confirm-modal"></label> 
    <div class="modal-body">
      <h4 class="modal-title">정말로 추천사를 추가하시겠습니까?</h4>
      <p class="modal-content">
        한 번 추가 된 추천사는 <b>수정하실 수 없습니다!</b>
      </p>
      <div class="modal-footer">
        <button class="paper-btn btn-secondary btn-small" type="button">
          확인
        </button>
        <button class="paper-btn btn-danger btn-small" type="button">
          취소
        </button>
      </div>
    </div>
  </div>
  <input for="recommend-notice-modal" class="modal-state" type="checkbox"> 
  <div class="modal">
    <label class="modal-bg" for="recommend-notice-modal"></label> 
    <div class="modal-body">
      <h4 class="modal-title">귀하의 추천사 작성에 감사를 표합니다!</h4>
      <p class="modal-content">작성하신 추천사가 승인되면 화면에 표시되게 됩니다.<br>
        다시 한번, 감사드립니다!
      </p>
      <div class="modal-footer"><button type="button">확인</button></div>
    </div>
  </div>
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