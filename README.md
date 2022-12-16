## 🛠️ 기술 및 환경

---

- Backend: Python 3.10.8, Django 3.2.13, DRF 3.14.0
- Frontend: Javascript, HTML, CSS
- DevOps : Docker, AWS EC2, S3, RDS
- etc : Jira, Figma, Notion

<br>

## 🖋️ Devket 프로젝트 목표와 방향성

---

**1. `클론 코딩`하는 웹 서비스의 서버 구조 및 핵심 기능들을 구현**

- 하지만 그대로 만드는 것보다 사용자의 관점에서 해당 기능의 필요성을 논의하여, 다른 기능으로 바꿔서 사용자 편의성을 더 높이는 방향으로 개발합니다.

**2. `문서화` 작업과 `스프린트 단위`로 협업 진행**

- 클론 코딩이기 때문에 먼저 해당 서비스에 대해 기술적인 분석을 한 후, 이를 notion을 통해 `문서화 작업`을 남겨서 해당 서비스의 이해와 협업 효율성을 높이고자 노력합니다.

- 1주일을 `스프린트`로 정하고, 스프린트별 목표와 진행 상황, 차후 고려사항을 `jira`를 통해 관리합니다.

**3. `코드 리뷰` 진행**
- 매주 일요일에 각자 스프린트 단위로 진행한 코드 내용을 `팀원들에게 공유`하는 방식으로 코드 리뷰를 진행하고자 노력합니다.


**4. 프론트와 백엔드를 직접 구현하여 `전체 흐름 이해`하기**

- 프론트와 백엔드 간 흐름을 이해하기 위해서 Django 뿐만 아니라 `vanilla JS`와 `DRF`를 사용하여 `프론트와 백엔드를 직접 구현`하고자 노력합니다.

**5. `RESTful API` 설계**
- DRF를 사용하여 RESTful API를 구축하여 RESTful의 의미를 이해하고자 노력합니다.


<br>

## 🎯 클론 코딩 [Target](https://getpocket.com/) 설명
---
1. 사용자가 간편하게 읽고 싶은 타 웹 사이트 컨텐츠를 `크롤링`으로 저장하는 기능
1. 크롤링한 컨텐츠에 `하이라이트` 표시로 원하는 부분을 강조하는 기능
2. 각 컨텐츠에 `태그`를 사용자가 직접 추가하여 태그 단위로 컨텐츠 조회 기능
3. 그 외 `즐겨찾기`, `하이라이트`, `아티클`, `동영상` 별로 저장한 웹 사이트 조회
4. `로그인` / `회원가입`을 통해 포켓 사이트 접속 및 `결제`를 통한 사용 서비스 제한


<br>

## 🔖 Infra structure
---
![image](https://user-images.githubusercontent.com/78094972/208154658-f918a1dd-bf44-4531-b5df-4b2a286d98a3.png)


<br>

## 🔖 DB 설계
---

![image](https://user-images.githubusercontent.com/78094972/208154171-1a6ac0f6-f55a-4e59-87c1-0a1f8d7c7c26.png)



<br>

## 🔖 WorkFlow
---

![image](https://user-images.githubusercontent.com/78094972/208156226-d8ee9112-1c64-4fb8-a309-d2b5189dc0a6.png)


<br>



## 🔳 Prototype
---

- tool : [figma](https://www.figma.com/proto/6gqC7eF7A3CYNdEsnEEJmz/%EC%93%B0%EC%82%90%EC%9A%A9's-team-library?node-id=416%3A50&scaling=scale-down&page-id=0%3A1&starting-point-node-id=416%3A50&show-proto-sidebar=1)


<br>

## 📈 git branch 전략

---

- 개발은 로컬 환경에서 작업 단위로 `feature` branch를 생성해서 개발 및 테스트 후, remote `feature` branch로 푸시하고 remote `develop` branch에 PR을 생성하여 코드 리뷰 후에 병합합니다. 그 후, `develop` 와 `main` branch 간 commit 수 차이가 10개 이상 벌어지면 `main` 브랜치에 PR을 생성하여 병합합니다.


- 기본 브랜치 : `main` 브랜치로 항상 존재하는 브랜치
- 보조 브랜치 : `각 목적에 맞게 사용`하며 기본 브랜치에 병합하고 더 이상 사용하지 않으면 삭제
    - feature(기능) / bugfix(버그 수정) / hotfix(긴급 버그 수정) / refactor(리팩토링) / docs(문서) / test(테스트) / conf(설정)


<br>

## 🔆 프로젝트 중점사항
---

### Common

- 문서화

### Django

- Django Rest Framework 기능 활용
- Serializer, decorator, orm 등 기능에 대한 이론적인 구조를 숙지
- Iamport를 이용한 결제 로직 구현

### Develop

- Restful URL 규칙 준수
- vanilla JS를 이용한 비동기 프론트 화면 렌더링
- 웹 컨텐츠 크롤링 시 비디오, 아티클 카테고리 구분 기능
- 유료 결제에 따른 기능 제한 - 프리미엄 결제 시 하이라이트 기능 제한 없이 사용가능
- 중복되는 코드의 함수화를 진행하여 코드의 간결성 추구

### Code Quality

- Code Convention을 준수
- 매주 프로젝트 코드 리뷰 진행

### Collaboration

- 코드 리뷰를 위한 PR Template 작성: [Project: Pull Request templates를 도입한 이유](https://jeha00.github.io/post/project/01_why-pr-template/)
- commit message convention 사용: 
- 브랜치 전략을 통해 프로젝트 Repo 관리
- Jira를 이용한 기능별 주기 스프린트로 일정관리


<br>

## 💁‍♂️ UseCase

---

### User

- user는 `회원가입`을 할 수 있다.
- user는 `로그인`을 통해 서비스를 이용 할 수 있다.
- user는 `로그아웃`을 할 수 있다.
- user는 `웹 사이트`를  `저장` 할 수 있다.
- user는 `저장한 웹 사이트`를 `조회` 할 수 있다.
- user는 `저장한 웹 사이트`를 `삭제` 할 수 있다.
- user는 `저장한 웹 사이트`를 `조회` 하여 원하는 구절이나 단어에 `하이라이트 적용  저장` 할 수  있다.
- user는 `저장한 하이라이트 내용`을 `삭제` 할 수 있다.
- user는 `저장한 웹 사이트`에 원하는 `태그` 를 `추가` 할 수 있다.
- user는 `태그 또는 검색`을 통해 저장된 웹 사이트 중 원하는 `웹 사이트` 를 `조회` 할 수 있다.
- user는 `즐겨찾기` 기능을 통해 `저장한 웹 사이트` 를 `분류` 할 수 있다.

### Payment

- user는 유료 서비스를 `결제` 할 수 있다.
- user는 유료 서비스 `결제 시 하이라이트 기능을 제한 없이 사용` 할 수 있다.


<br>

## 🥊 개발 이슈 및 해결방안
---

### API

[[**REST api get방식에서 post방식으로]**](https://www.notion.so/22-11-17-Rest-Api-get-post-8d7ae73253ee4b7ca8adda1ba2bd236a)

**[[APIview를 DestroyAPIView로 변경하여 시도]](https://www.notion.so/22-11-20-APIview-DestroyAPIView-c19cbfec72e542109ead0609df94f0f5)**

**[[2종류 데이터를 받아오는 api, restful하게 변경 작업]](https://www.notion.so/22-11-29-2-api-restful-371ab80cc2624291be29ee4a5ae2d063)**

### Javascript

**[[Javascript 요소 노드에 이벤트 주기]](https://www.notion.so/22-11-18-Javascript-7cfd973c316b4a78820c9e3e177676da)** 

**[[Javascript 비동기 처리 시점 맞추기]](https://www.notion.so/22-11-20-Javascript-4ab27f6785f3482e81de5f2049a9d374)**

### Bulk

**[[APIView bulk update 구현]](https://www.notion.so/22-11-23-APIView-bulk-update-4a3ca6f22086494c8efd92da36f73e86)**

**[[함수의 사전에 처리되는 중복 작업 decorator 처리]](https://www.notion.so/22-11-26-decorator-5ad3263c37ec487bb84627aac6b49533)**

### Signup

**[[Signup-AbstractBaseUser]](https://www.notion.so/22-11-24-Signup-AbstractBaseUser-b142da019ef74e98896a20ca8a3b7f06)**

### Iamport

[[**Project: Iamport를 선택한 이유, 사용 시 결제 과정, 그리고 얻는 장점**]](https://jeha00.github.io/post/project/08_payment_overall_flow/)

### Tag

**[[ManytoMany 관계를 가진 두 모델 Bulk Create 작업]](https://www.notion.so/22-11-26-ManytoMany-Bulk-Create-943fe5d9479c4b1f88534df0fdd37dbd)**

**[[Tag가 포함된 Site serialize (many-to-many)]](https://www.notion.so/22-11-27-Tag-Site-serialize-many-to-many-6ea923f587c341b59cf5a12bf4587468)**

### AWS

[[**Project: deployment issue - S3 CORS**]](https://jeha00.github.io/post/project/16_deployment_cors/)

[[1차 배포 일지]](https://www.notion.so/22-11-30-1-ff33b1564ccc4e27b2460b88c7a45213)

[[2차 배포일지]](https://www.notion.so/22-12-05-2-dce5a5a061f6431aa2705cbdf0bba7ef)


<br>

## 🗂 [Wiki](https://github.com/backendnanodegree/Devket/wiki)

---
- 요구사항 정의서
- 테이블 정의서
- 프로세스 정의서 
