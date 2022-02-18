<script>
  import Recommend from "./.components/Recommend.svelte";
</script>

<svelte:head>
	<title>찬영이를 칭찬해주세요!</title>
</svelte:head>

<div class="recommends">
  <ul class="list">
    <li key="0" class="list__item" style="">
      <div class="recommend">
        <div class="card">
          <div class="card-body">
            <div class="card-title">박현 님</div>
            <div class="card-subtitle">한국전력공사 정보보안실</div>
            <div class="card-text">'22년 상반기 자체 전산망 침투 대응훈련에 대한 귀하의 협력에 감사를 표합니다. 수준높은 Scripting으로 비교적 빠른 취약점 분석에 큰 도움이 되었습니다.</div>
          </div>
        </div>
      </div>
    </li>
    <li key="1" class="list__item" style="">
      <div class="recommend">
        <div class="card">
          <div class="card-body">
            <div class="card-title">김주연 님</div>
            <div class="card-subtitle">프레제뉴 (CEO)</div>
            <div class="card-text">박찬영 개발자님 덕분에 서비스를 잘 런칭할 수 있었습니다. 항상 빠르고 정확하게 처리해주셔서 정말 감사드립니다!
              - RocketPunch에서 작성 됨 -
            </div>
          </div>
        </div>
      </div>
    </li>
    <li key="2" class="list__item" style="">
      <div class="recommend">
        <div class="card">
          <div class="card-body">
            <div class="card-title">김성년 님</div>
            <div class="card-subtitle">숭실대 IT 융합 재학생 (고등학교 친구)</div>
            <div class="card-text">☆☆☆☆☆
              "과제를 받았을 때 아무런 걱정이 되지 않았다. 박찬영이란 선생님이 있다는것은 그런 의미"
              박찬영! 박찬영! 박찬영! 박찬영!
            </div>
          </div>
        </div>
      </div>
    </li>
    <li key="3" class="list__item" style="">
      <div class="recommend">
        <div class="card">
          <div class="card-body">
            <div class="card-title">장남혁 님</div>
            <div class="card-subtitle">이제 막 프론트 취뽀한 취준생 (대학교 선배)</div>
            <div class="card-text">"네? 프로젝트를 완성하지 못했다구요? 걱정마세요! 박찬영은 하루면 완성시켜드립니다!
              츤데레의 정석 박찬영!"
            </div>
          </div>
        </div>
      </div>
    </li>
    <li key="4" class="list__item" style="">
      <div class="recommend">
        <div class="card">
          <div class="card-body">
            <div class="card-title">이근서 님</div>
            <div class="card-subtitle">안산대 유아교육과 재학생 (고등학교 친구)</div>
            <div class="card-text">포트폴리오 제작에 조언과 충고를 아끼지 않고 알려주신 덕에, 포트폴리오 제작을 잘 마칠 수 있게 되었습니다. 감사합니다!</div>
          </div>
        </div>
      </div>
    </li>
  </ul>
  <label class="paper-btn btn-secondary add-button" for="recommend-add-modal">+</label> <input type="checkbox" class="modal-state" id="recommend-add-modal"> 
  <div class="modal svelte-437hlh">
    <label class="modal-bg" for="recommend-add-modal"></label> 
    <div class="modal-body svelte-437hlh">
      <h4 class="modal-title">추천사 작성</h4>
      <form action="#" class="modal-form">
        <div class="modal-content"><input class="recommend-input recommend-input--author svelte-437hlh" type="text" placeholder="이름이 어떻게 되세요?" required=""> <input class="recommend-input recommend-input--group svelte-437hlh" type="text" placeholder="소속이나 박찬영과의 관계는 어떻게 되세요?"> <textarea class="recommend-input recommend-input--content svelte-437hlh" placeholder="박찬영에 대해 느낀점을 작성해주세요!" required=""></textarea></div>
        <div class="modal-footer svelte-437hlh"><button class="paper-btn modal-footer__button btn-secondary btn-small svelte-437hlh">저장</button> <button type="button" class="paper-btn modal-footer__button btn-danger btn-small svelte-437hlh">취소</button></div>
      </form>
    </div>
  </div>
  <input id="recommend-add-confirm-modal" class="modal-state" type="checkbox"> 
  <div class="modal svelte-saf6bn">
    <label class="modal-bg" for="recommend-add-confirm-modal"></label> 
    <div class="modal-body">
      <h4 class="modal-title">정말로 추천사를 추가하시겠습니까?</h4>
      <p class="modal-content">한 번 추가 된 추천사는 <b>수정하실 수 없습니다!</b></p>
      <div class="modal-footer svelte-saf6bn"><button class="paper-btn btn-secondary btn-small svelte-saf6bn" type="button">확인</button> <button class="paper-btn btn-danger btn-small svelte-saf6bn" type="button">취소</button></div>
    </div>
  </div>
  <input for="recommend-notice-modal" class="modal-state" type="checkbox"> 
  <div class="modal svelte-1158ut3">
    <label class="modal-bg" for="recommend-notice-modal"></label> 
    <div class="modal-body">
      <h4 class="modal-title">귀하의 추천사 작성에 감사를 표합니다!</h4>
      <p class="modal-content">작성하신 추천사가 승인되면 화면에 표시되게 됩니다.<br>
        다시 한번, 감사드립니다!
      </p>
      <div class="modal-footer svelte-1158ut3"><button type="button">확인</button></div>
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