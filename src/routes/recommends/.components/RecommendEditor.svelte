<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let id = '';
  export let visible = false;
  export let author = '';
  export let group = '';
  export let content = '';

  const handleSubmit = () => {
    dispatch('submit');
  };
  const handleCancel = () => {
    dispatch('cancel');
  };
</script>

<input
  bind:checked="{visible}"
  type="checkbox"
  class="modal-state"
  id="{id}"> 
<div class="modal">
  <div
    class="modal-bg"
    on:click="{ handleCancel }">
  </div> 
  <div class="modal-body">
    <h4 class="modal-title">추천사 작성</h4>
    <form
      action="#"
      class="modal-form"
      on:submit|preventDefault="{ handleSubmit }">
      <div class="modal-content">
        <input
          bind:value="{author}"
          class="recommend-input recommend-input--author"
          type="text"
          placeholder="이름이 어떻게 되세요?"
          required>
        <input
          bind:value="{group}"
          class="recommend-input recommend-input--group"
          type="text"
          placeholder="소속이나 박찬영과의 관계는 어떻게 되세요?">
        <textarea
          bind:value="{content}"
          class="recommend-input recommend-input--content"
          placeholder="박찬영에 대해 느낀점을 작성해주세요!"
          required></textarea>
      </div>
      <div class="modal-footer">
        <button
          type="submit"
          class="paper-btn modal-footer__button btn-secondary btn-small">
          저장
        </button>
        <button
          type="button"
          class="paper-btn modal-footer__button btn-danger btn-small"
          on:click="{ handleCancel }">
          취소
        </button>
      </div>
    </form>
  </div>
</div>

<style>
  .modal {
    width: 100%;
    padding: 16px;
  }
  .modal .modal-body {
    max-width: 750px;
    max-height: calc(100vh - 32px);
    width: calc(100% - 32px);
  }
  .modal .modal-body .recommend-input {
    width: 100%;
    margin-bottom: 8px;
  }
  .modal .modal-body .recommend-input--content {
    margin-bottom: 0;
    height: 150px;
    resize: none;
  }
  .modal .modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;
  }
  .modal .modal-footer .paper-btn {
    margin-left: 8px;
  }
</style>