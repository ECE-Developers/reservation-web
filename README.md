# Reservation Web

## Description

서울시립대학교 전자전기컴퓨터공학부 학실 예약 서비스의 web을 담당하는 레포지토리입니다.

## Installation

- react는 node.js를 사용하기 때문에 node.js의 설치가 필요합니다.
- node: v18.7.0
- npm: 9.1.1

Checking Version
```bash
$ node -v
$ npm -v
```

## Local Setting
```bash
# 로컬로 프로젝트 파일 복사
$ git clone https://github.com/ECE-Developers/reservation-web

# 디렉토리 이동
$ cd reservation-web

# 의존성 설치
$ npm install 

# 앱 실행 (http://localhost:3000에서 실행됨)
$ npm start
```

## Available Script

### 실행 

```bash
$ npm start
```

- 3000 port에서 app을 실행합니다.

### 테스트

```bash
$ npm test
```

- watch 모드로 실행하기 때문에 개발 환경에서 사용합니다.
### 빌드

```bash
$ npm run build
```

- 배포 환경에서 사용할 용량이 압축된 빌드 파일을 생성합니다.