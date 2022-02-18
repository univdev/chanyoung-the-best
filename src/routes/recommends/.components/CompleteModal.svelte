<script>
  import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let visible = false;

const handleClose = () => {
  dispatch('close');
};
</script>

<input
  bind:checked="{visible}"
  class="modal-state"
  type="checkbox"> 
<div class="modal">
  <div
    class="modal-bg"
    on:click="{ handleClose }"></div> 
  <div class="modal-body">
    <h4 class="modal-title">
      귀하의 추천사 작성에 감사를 표합니다!
    </h4>
    <p class="modal-content">
      작성하신 추천사가 승인되면 화면에 표시되게 됩니다.<br>
      다시 한번, 감사드립니다!
    </p>
    <div class="modal-footer">
      <button
        class="paper-btn"
        type="button"
        on:click="{ handleClose }">확인</button>
    </div>
  </div>
</div>

<style>
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