<script context="module">
import firebase from 'plugins/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export async function preload(page) {
  console.log(getFirestore);
};
</script>

<script>
  export let recommendId;
</script>

<input
  checked
  type="checkbox"
  class="modal-state">
<div class="modal modal--recommend">
  <div class="modal-bg"></div>
  <div class="modal-body">
    <h4 class="modal-title">{recommendId}</h4>
  </div>
</div>

<style></style>