<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let visible = false;

  const handleConfirm = () => {
    dispatch('confirm');
  };
  const handleCancel = () => {
    dispatch('cancel');
  };
</script>

<input
  bind:checked="{visible}"
  class="modal-state"
  type="checkbox"> 
<div class="modal">
  <div
    class="modal-bg"
    on:click="{handleCancel}"></div> 
  <div class="modal-body">
    <h4 class="modal-title">정말로 추천사를 추가하시겠습니까?</h4>
    <p class="modal-content">
      한 번 추가 된 추천사는 <b>수정하실 수 없습니다!</b>
    </p>
    <div class="modal-footer">
      <button
        class="paper-btn btn-secondary btn-small"
        type="button"
        on:click="{handleConfirm}">
        확인
      </button>
      <button
        class="paper-btn btn-danger btn-small"
        type="button"
        on:click="{handleCancel}">
        취소
      </button>
    </div>
  </div>
</div>