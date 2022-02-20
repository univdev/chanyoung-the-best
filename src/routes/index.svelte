<script>
	import { onDestroy, onMount } from 'svelte';
	import Confetti from 'canvas-confetti';
	import Icon from 'mdi-svelte';
	import { mdiGithub } from '@mdi/js';

	let particleHandler = null;
	let confettiCanvas = null;
	let canvas = null;
	const createCanvas = () => {
		const canvas = document.createElement('canvas');
		canvas.setAttribute('id', 'ConfettiCanvas');
    document.body.appendChild(canvas);
		return canvas;
	};
	const createParticleCanvas = (canvas) => {
		if (!canvas) throw new Error('canvas를 인자로 전달해주세요!');
    const confetti = Confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    return confetti;
	};
	const randomInRange = (min, max) => {
  	return Math.random() * (max - min) + min;
	}
	const destroyParticleCanvas = (canvas) => {
		// if (!canvas) throw new Error('canvas를 인자로 전달해주세요!');
		canvas.remove();
	};
	const showParticle = (confetti) => {
		if (!confetti) throw new Error('confetti 객체를 인자로 전달해주세요!');
		confetti({
			particleCount: 1,
			startVelocity: 0,
			origin: {
				x: Math.random(),
				// since particles fall down, skew start toward the top
				y: (Math.random()) - 0.2
			},
			shapes: ['circle'],
			gravity: randomInRange(0.4, 0.6),
			scalar: randomInRange(0.4, 1),
			drift: randomInRange(-0.4, 0.4)
		});
	};

	onMount(() => {
		canvas = createCanvas();
		confettiCanvas = createParticleCanvas(canvas);
		particleHandler = window.setInterval(() => {
			showParticle(confettiCanvas);
		}, 20);
	});	
	onDestroy(() => {
		if (canvas) destroyParticleCanvas(canvas);
		if (particleHandler) clearInterval(particleHandler);
	});
</script>

<svelte:head>
	<title>찬영이를 칭찬해주세요!</title>
</svelte:head>

<div class="home">
	<h1 class="home__title">찬영이를 칭찬해주세요!</h1>
	<p class="home__description">
		박찬영과 함께한 그 어떤 경험이라도 괜찮으니<br/>
		그것으로 인해 긍정적인 느낌을 느끼셨다면 누구나 추천사를 작성하실 수 있습니다!
	</p>
	<nav class="home__navigations navigations">
		<a
			class="paper-btn btn-secondary navigations__item"
			href="/recommends">
			<span>칭찬하러 가기</span>
		</a>
		<a
			class="paper-btn btn-default navigations__item"
			href="https://github.com/univdev"
			target="_blank">
			<Icon
				class="navigation-icon"
				path={mdiGithub} />
			<span>Github 방문하기</span>
		</a>
	</nav>
</div>

<style>
	.home {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 48px;
		font-weight: normal;
		padding: 0 16px;
	}
	.home__title {
		margin: 0 0 16px;
		text-align: center;
	}
	.home__description {
		font-size: 24px;
		margin-bottom: 32px;
		text-align: center;
	}
	.navigations {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.navigations .navigations__item:first-child {
		margin-left: 0;
	}
	.navigations .navigations__item {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 8px;
	}
	.navigations span {
		margin-left: 8px;
	}
	:global(#ConfettiCanvas) {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		pointer-events: none;
	}
</style>