# Reservation Web

## 소개

서울시립대학교 전자전기컴퓨터공학부 학실 예약 서비스의 web을 담당하는 레포지토리입니다.

## 개발 환경 설정

- react는 node.js를 사용하기 때문에 node.js의 설치가 필요합니다.
- node: v18.7.0
- npm: 9.1.1

```bash
# node 및 npm의 버전 확인
$ node -v
$ npm -v
```

```bash
# 로컬 개발환경 세팅
$ git clone https://github.com/ece-beta/reservation-web
```

## 사용 가능한 스크립트

### 실행 

```bash
$ npm start
```

### 테스트 ( 개발용 )

```bash
# watch 모드로 실행합니다.
$ npm test
```

### 빌드

```bash
$ npm run build
```

배포 환경에서 사용할 빌드 파일을 생성합니다.