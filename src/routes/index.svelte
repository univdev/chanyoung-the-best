<script>
	import { Button } from 'spaper';
</script>

<svelte:head>
	<title>찬영이를 칭찬해주세요!</title>
</svelte:head>

<div class="home">
	<h1 class="home__title">찬영이를 칭찬해주세요!</h1>
	<p class="home__description">칭찬이 많이 고픈 아이예요..!</p>
	<nav class="home__navigation navigation">
		<Button
			type="secondary"
			href="/recommends"
		>
			칭찬하러 가기
		</Button>
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
	.navigation {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>