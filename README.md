# Greem Light 🎨

(2023.03.11 ~ ing)

> Front-end : React(cra) / Vanilla-js  
> Back-end : Firebase (Auth, DB) 이용  
> All : Css(Tailwind) / Babel / Webpack /  
> Deploy : Netlify(도메인, 호스팅) / Cloudinary(저장소) - 이미지 처리

### "한국의 아트스테이션을 만들자!"

<a href="https://fabulous-elf-ae7759.netlify.app/" target="_blank">Go to Greem-Light 🚀</a>

<a href="https://fabulous-elf-ae7759.netlify.app/" target="_blank"><img src="https://user-images.githubusercontent.com/57241573/235341361-68964357-0e1a-42e2-b7ba-8ba291b216ab.png"></a>

### 소스 구조

```
📦src
┣ 📂api
┃ ┣ 📜firebase.js
┃ ┣ 📜firebase_origin.js
┃ ┗ 📜uploader.js
┣ 📂assets
┃ ┗ 📂images
┣ 📂components
┃ ┣ 📂ui
┃ ┃ ┗ 📜Button.jsx
┃ ┣ 📜AddNewProducts.jsx
┃ ┣ 📜AllProducts.jsx
┃ ┣ 📜Banner.jsx
┃ ┣ 📜Comment.jsx
┃ ┣ 📜Details.jsx
┃ ┣ 📜MyFvArt.jsx
┃ ┣ 📜MyProducts.jsx
┃ ┣ 📜Navbar.jsx
┃ ┣ 📜ProductCard.jsx
┃ ┣ 📜SignIn.jsx
┃ ┣ 📜SignUp.jsx
┃ ┣ 📜SignUpIn copy.jsx
┃ ┣ 📜SignUpIn.jsx
┃ ┗ 📜User.jsx
┣ 📂context
┃ ┣ 📜AuthContext.jsx
┃ ┗ 📜AuthContext_origin.jsx
┣ 📂hooks
┃ ┣ 📜useArtwork.jsx
┃ ┗ 📜useLiked.jsx
┣ 📂pages
┃ ┣ 📜AddProduct.jsx
┃ ┣ 📜Home.jsx
┃ ┣ 📜Join.jsx
┃ ┣ 📜Liked.jsx
┃ ┣ 📜Login.jsx
┃ ┣ 📜MyArtwork.jsx
┃ ┣ 📜NotFound.jsx
┃ ┣ 📜ProductDetail.jsx
┃ ┗ 📜ProtectedRoute.jsx
┣ 📜App.css
┣ 📜App.js
┣ 📜App.test.js
┣ 📜index.css
┣ 📜index.js
┣ 📜reportWebVitals.js
┗ 📜setupTests.js
```

## 📒 개발 프로세스 리스팅

### 알파 1.0 (개발 완료) - (2023.04.25) ✅

0.  React 개발 환경 세팅
1.  페이지 구성 (라우터 설정)
2.  네비게이션 구현
3.  Firebase 세팅 (로그인 인증, DB 관련..)
4.  구글 로그인 기능 개발 (firebase authentication 이용)
5.  제품(이미지) 업로드 기능 개발
6.  제품(이미지) 리스팅
7.  내가 올린 그림만 보여주는 '내그림' 페이지 라우팅 (나의 그림만 리스팅)
8.  '좋아요' 기능 구축을 위한 DB 설계
    > -   '좋아요' 누른 그림 데이터 따로 담아서 리스팅
    > -   '좋아요' 기능 개발 시작
    > -   제품(그림) 상세에서 버튼으로 '좋아요' 누르기 할 때, 동일한 유저가 누르면 좋아요 개수 빼기 - (실시간 DB 처리 구현)
9.  실시간 업데이트를 위한 리액트 쿼리 리펙토링 하기 ('좋아요' 누르면 리스트에 상태가 즉각적으로 변하도록..) - 캐싱 날리기

    > -   그림 업로드(쓰기)와 표시(읽기)하는 Query 정의를 한곳(커스텀훅 만들어) 에서 처리하도록 분리하기
    > -   '좋아요' 관련 Query 정의를 한곳(Hook을 만들어) 에서 처리하도록 분리하기

10. 이미지 기반 사이트이기 떄문에 저장소에 용량 과부하가 걸리지 않는 방법 모색하기
    > -   업로드 시에 이미지 다운 그레이드 처리 하기 (스케일 조절) - 저장소 기능 활용 Cloudinary Preset 설정후 적용함
11. 로그인/아웃 상태 분기 하기
    > -   로그아웃 하면 홈으로 보내기
    > -   내그림 에서 로그인 되어있으면 삭제, 수정 페이지 버튼 노출하기
    > -   그림 삭제 구현 완료
12. 수정 페이지 구현하기 (완로)
    > -   앞단 기능 & UI
    > -   쿼리 구현
    > -   artwork Update api 만들기
    > -   artwork Delete 쿼리 수정 (캐쉬 키 변동된 이유..)
13. <strike>카카오톡 로그인 붙이기</strike> (베타 2.0 진행으로 변경)
    > -   개발 연기 이유 : firebase로 카카오 로그인을 붙일 시, 여러가지 체크 사항이 발견됨 (express 도입 고민중)
14. 회원가입 시스템 전면 수정
    > -   변경 이유 : 구글 로그인 시, 유저 닉네임 설정의 부재 (초기 버전에서는 제외)
    > -   이메일, 패스워드 방식으로
    > -   구현 완료
15. 모바일 UI 구현
16. 알파 1.0 배포 완료 (2023-04-25, 01:12)

<hr>

### 알파 2.0 (개발중) - (2023.04.30~) ✅

> 1. 이메일 가입 시, 이메일 인증 절차 개발
> 2. 유효성 체크 강화하기
> 3. 마이페이지 개발 (유저박스 강화)
> 4. 이미지(리소스) 워터마크 구현 개발
> 5. UI 디자인 개선

<hr>

### 베타 1.0 (예정) ✅

1. 간편아이디 로그인 개발 (구글로그인, 카카오로그인)
2. 유저 레벨링 시스템 (권한에 따른 서비스 이용 차별화)
   ...

```

```
