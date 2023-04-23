# Greem Light

### 프로세스 리스팅..

    > 0. 초기 세팅
    > 1. 라우터 설정
    > 2. 페이징 구성 하기
    > 3. 네비게이션 바 구현
    > 4. Firebase 세팅 (로그인 인증, DB 관련..)
    > 5. 로그인 기능 개발 (firebase authentication 이용 구글로그인 붙이기)
    > 6. 제품(이미지) 업로드 기능 개발
    > 7. 제품(이미지) 리스팅
    > 8. 내가 올린 그림만 보여주는 '내그림' 페이지 라우팅 (나의 그림만 리스팅)
    > 8. '좋아요' 기능 구축을 위한 DB 설계
    > 9. '좋아요' 누른 그림 데이터 따로 담아서 리스팅
    > 10. '좋아요' 기능 개발
    > 11. 제품(그림) 상세에서 버튼으로 '좋아요' 누르기 구현 / 동일한 유저가 누르면 좋아요 개수 빼기 - (실시간 DB 처리 구현)
    > 12. 실시간 업데이트를 위한 리액트 쿼리 리펙토링 하기 ('좋아요' 누르면 리스트에 상태가 즉각적으로 변하도록..) - 캐싱 날리기
    > 13. 그림 업로드(쓰기)와 표시(읽기)하는 Query 정의를 한곳(커스텀훅 만들어) 에서 처리하도록 분리하기
    > 14. '좋아요' 관련 Query 정의를 한곳(Hook을 만들어) 에서 처리하도록 분리하기
    > 15. 로그아웃 하면 홈으로 보내기
    > 16. 이미지 기반 사이트이기 떄문에 저장소에 용량 과부하가 걸리지 않는 방법 모색하기
    > 17. 업로드 시에 이미지 다운 그레이드 처리 하기 (스케일 조절) - 저장소 기능 활용 Cloudinary Preset 설정후 적용하기 - 문서 읽기
    > 16. 내그림 에서 로그인 되어있으면 삭제, 수정 페이지 버튼 노출하기
    > 17. 그림 삭제 구현 완료
    > 18. 수정 페이지 구현하기 (완로)
        - 앞단 기능 & UI
        - 쿼리 구현
        - artwork Update api 만들기
        - artwork Delete 쿼리 수정 (캐쉬 키 변동된 이유..)


    > 19. 카카오톡 로그인 붙이기 (베타 2.0 진행으로 변경)
    > 20. 회원가입 전면 수정 (이메일, 패스워드 방식)
    > 20. 마이페이지 새로 구성하기
    > 21. 알파 1.0 배포
    //
    //
    //
    //
    > xx. 워터마크 달기 -

<!-- <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
    <script>
      Kakao.init("c43f869d0029e6ac8b2e705f7f077d8f");
      console.log(Kakao);
    </script> -->

// /global Kakao
// const redirectUri = "http://localhost:3000";
// const onClickToAuthorize = () => {
// Kakao.Auth.authorize({
// redirectUri: redirectUri,
// });
// };

// useEffect(() => {
// const authorizeCodeFromKakao = window.location.search.split("=")[1];
// if (authorizeCodeFromKakao !== "undefine") {
// // console.log(`authorizeCodeFromKakao : ${authorizeCodeFromKakao}`);

// const body = {
// grant_type: "authorization_code",
// client_id: "82b2cfe2070dc6367ccd415496e4109d",
// redirect_uri: "http://localhost:3000",
// code: authorizeCodeFromKakao,
// };

// const queryStringBody = Object.keys(body)
// .map((k) => encodeURIComponent(k) + "=" + encodeURI(body[k]))
// .join("&");

// const getToken = async () => {
// const res = await fetch("https://kauth.kakao.com/oauth/token", {
// method: "POST",
// headers: {
// "content-type": "application/x-www-form-urlencoded;charset=utf-8",
// },
// body: queryStringBody,
// });
// if (!res) {
// return;
// } else {
// const data = await res.json();
// return data.access_token;
// }
// };

// const getProfile = async (accessToken) => {
// const res = await fetch("https://kapi.kakao.com/v2/user/me", {
// headers: {
// Authorization: `Bearer ${accessToken}`,
// },
// });
// const data = await res.json();
// return data;
// };

// const fetchData = async () => {
// const accessToken = await getToken();
// const profileData = await getProfile(accessToken);
// console.log(profileData);
// // 여기서 회원 정보를 처리
// };

// fetchData();
// }
// }, []);
