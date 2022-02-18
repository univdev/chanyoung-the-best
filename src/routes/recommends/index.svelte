<script>
  import { onMount, onDestroy } from 'svelte';
  import firebase from 'plugins/firebase';
  import { getFirestore, collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
  import moment from 'moment';
  import Recommend from "./.components/Recommend.svelte";
  import RecommendEditor from './.components/RecommendEditor.svelte';
  import ConfirmModal from './.components/ConfirmModal.svelte';
  import CompleteModal from './.components/CompleteModal.svelte';

  let recommends = [];
  let recommendsSubscriber = null;
  let isVisibleRecommendEditor = false;
  let isVisibleConfirmModal = false;
  let isVisibleCompleteModal = false;
  const payload = {
    author: '',
    group: '',
    content: '',
  };
  const recommendEditorId = 'recommend-add-modal';
  const getRecommendsSubscriber = () => {
    const db = getFirestore(firebase.app);
    const col = collection(db, 'recommends');
    const q = query(
      col,
      where('isVisible', '==', true),
      orderBy('createdAt', 'asc'),
    );
    return onSnapshot(q, (snapshot) => {
      const items = [...snapshot.docs].map((doc) => doc.data());
      recommends = [...items];
    });
  };
  const addRecommendation = ({ author, group, content }) => {
    const db = getFirestore(firebase.app);
    const col = collection(db, 'recommends');
    const createdAt = moment().toDate();
    const updatedAt = moment().toDate();
    const payload = {
      author,
      group,
      content,
      createdAt,
      updatedAt,
      isVisible: false,
    };
    return addDoc(col, payload);
  }
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
  const handleShowConfirmModal = () => {
    isVisibleConfirmModal = true;
  };
  const handleHideConfirmModal = () => {
    isVisibleConfirmModal = false;
  };
  const handleAddRecommendation = () => {
    const recommendation = {
      ...payload,
    };
    addRecommendation(recommendation).then(() => {
      isVisibleCompleteModal = true;
    });
  };
  const handleHideCompleteModal = () => {
    isVisibleCompleteModal = false;
    handleHideConfirmModal();
    handleHideRecommendEditor();
  };
  onMount(() => {
    recommendsSubscriber = getRecommendsSubscriber();
  });
  onDestroy(() => {
    if (recommendsSubscriber) recommendsSubscriber();
  });
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
    on:cancel="{handleHideRecommendEditor}"
    on:submit="{handleShowConfirmModal}"/>
  <ConfirmModal
    bind:visible="{isVisibleConfirmModal}"
    on:confirm="{handleAddRecommendation}"
    on:cancel="{handleHideConfirmModal}"/>
  <CompleteModal
    bind:visible="{isVisibleCompleteModal}"
    on:close="{handleHideCompleteModal}"/>
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