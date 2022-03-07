<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import firebase from 'plugins/firebase';
  import { getFirestore, collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
  import moment from 'moment';
  import Confetti from 'canvas-confetti';
  import animateScrollTo from 'animated-scroll-to';
  import LoadingOverlay from './.components/LoadingOverlay.svelte';
  import Recommend from "./.components/Recommend.svelte";
  import RecommendEditor from './.components/RecommendEditor.svelte';
  import ConfirmModal from './.components/ConfirmModal.svelte';
  import CompleteModal from './.components/CompleteModal.svelte';

  let confettiCanvas = null;
  let recommends = [];
  let recommendsSubscriber = null;
  let isVisibleRecommendEditor = false;
  let isVisibleConfirmModal = false;
  let isVisibleCompleteModal = false;
  let isLoading = true;
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
    return onSnapshot(q, async (snapshot) => {
      isLoading = true;
      const items = [...snapshot.docs].map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      recommends = [...items];
      isLoading = false;
      await tick();
      scrollToTarget(getRedirectTarget());
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
    showCompleteEffect(confettiCanvas, new Date());
  };
  const createConfettiCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'confetti-canvas');
    document.body.appendChild(canvas);
    const confetti = Confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    return confetti;
  };
  const destroyConfettiCanvas = () => {
    document.querySelector('canvas').remove();
  };
  const showCompleteEffect = (confetti, startTime, duration = 3) => {
    if (!confetti) throw new Error('Confetti Canvas를 정의해주세요.');
    const now = moment().toDate();
    const endTime = moment(startTime).add(duration, 'seconds').toDate();
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
    window.setTimeout(() => {
      if (now <= endTime) showCompleteEffect(confetti, startTime, duration);
    }, 10);
  };
  const getRedirectTarget = () => {
    const currentLocation = window.location;
    const hash = currentLocation.hash || null;
    if (!hash) return null;
    return window.document.querySelector(`.recommend${hash}`) || null;
  };
  const scrollToTarget = (target) => {
    if (!target) return;
    const top = target.offsetTop;
    animateScrollTo.default(top);
  };
  onMount(() => {
    confettiCanvas = createConfettiCanvas();
    recommendsSubscriber = getRecommendsSubscriber();
  });
  onDestroy(() => {
    if (recommendsSubscriber) recommendsSubscriber();
    if (confettiCanvas) destroyConfettiCanvas();
  });
</script>

<svelte:head>
	<title>찬영이를 칭찬해주세요!</title>
</svelte:head>

{#if isLoading}
  <LoadingOverlay />
{/if}

<div class="recommends">
  {#if recommends.length > 0}
    <ul class="list">
      {#each recommends as recommend}
        <li class="list__item">
          <a
            class="recommend-link"
            href="/recommends/{recommend.id}">
            <Recommend
              id="{recommend.id}"
              author="{recommend.author}"
              group="{recommend.group}"
              content="{recommend.content}"/>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="no-recommend">
      <h4 class="no-recommend--title">추천사가 존재하지 않습니다...</h4>
      <p class="no-recommend--description">
        추천사를 작성해주세요!
      </p>
    </div>
  {/if}
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
  <slot></slot>
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
  .recommend-link {
    color: inherit;
  }
  .no-recommend {
    text-align: center;
  }
  .no-recommend .no-recommend--description {
    margin-top: 8px;
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
  :global(.confetti-canvas) {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
</style>