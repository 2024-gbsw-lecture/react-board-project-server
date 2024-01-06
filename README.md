# API 목록

## 인증

### 회원가입

> [POST] /auth/sign-up

#### 요청

```json
{
  "email": "이메일",
  "name": "이름",
  "password": "비밀번호"
}
```

#### 응답

```json
{
  "status": "200",
  "message": "성공"
}
```

#### 오류 (이미 사용중인 이메일)

```json
{
  "status": 409,
  "message": "이미 사용중인 이메일"
}
```

### 로그인

> [POST] /auth/sign-in

#### 요청

```json
{
  "email": "이메일",
  "password": "비밀번호"
}
```

#### 응답

```json
{
  "status": "200",
  "message": "성공",
  "data": {
    "accessToken": "액세스 토큰",
    "refreshToken": "리프레쉬 토큰"
  }
}
```

#### 오류 (이메일, 비밀번호가 맞지 않음)

```json
{
  "status": 404,
  "message": "존재하지 않는 사용자"
}
```

### 리프레쉬 토큰

> [POST] /auth/refresh

#### 요청

```json
{
  "refreshToken": "리프레쉬 토큰"
}
```

#### 응답

```json
{
  "status": "200",
  "message": "성공",
  "data": {
    "accessToken": "액세스 토큰",
    "refreshToken": "리프레쉬 토큰"
  }
}
```

#### 오류 (인증 오류, 토큰 만료)

```json
{
  "status": 401,
  "message": "인증 실패"
}
```

## 게시판

### 게시글 목록 조회

> [GET] /posts

| Query Parameter | 용도        | 기본값 |
| --------------- | ----------- | ------ |
| page            | 요청 페이지 | 0      |
| size            | 요청 사이즈 | 20     |

#### 응답

```json
{
  "status": 200,
  "message": "성공",
  "data": {
    "totalCount": "총 게시글 개수",
    "totalPages": "총 페이지 수",
    "content": [
      {
        "id": "글 아이디",
        "title": "글 제목",
        "createdAt": "글 작성 시간",
        "updatedAt": "글 수정 시간",
        "user": {
          "id": "사용자 아이디",
          "name": "사용자 이름",
          "email": "사용자 이메일"
        }
      },
      ...
    ],
    "last": false // 마지막 페이지 여부
  }
}
```

### 게시글 상세 조회

> [GET] /posts/:id

#### 응답

```json
{
  "status": 200,
  "message": "성공",
  "data": {
    "id": "글 아이디",
    "title": "글 제목",
    "content": "글 내용",
    "createdAt": "글 작성 시간",
    "updatedAt": "글 수정 시간",
    "user": {
      "id": "사용자 아이디",
      "name": "사용자 이름",
      "email": "사용자 이메일"
    }
  }
}
```

#### 오류 (게시글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "글이 존재하지 않음"
}
```

### 게시글 수정

> [PATCH] /posts/:id

#### 요청

```json
{
  "title": "게시글 제목",
  "content": "게시글 내용"
}
```

#### 응답

```json
{
  "status": "200",
  "message": "성공",
  "data": {
    "id": "글 아이디",
    "title": "글 제목",
    "content": "글 내용"
  }
}
```

#### 오류 (인증 오류, 토큰 만료)

```json
{
  "status": 401,
  "message": "인증 실패"
}
```

#### 오류 (수정 권한 없음)

```json
{
  "status": 403,
  "message": "권한 없음"
}
```

#### 오류 (게시글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "글이 존재하지 않음"
}
```

### 게시글 삭제

> [DELETE] /posts/:id

#### 응답

```json
{
  "status": "200",
  "message": "성공"
}
```

#### 오류 (인증 오류, 토큰 만료)

```json
{
  "status": 401,
  "message": "인증 실패"
}
```

#### 오류 (삭제 권한 없음)

```json
{
  "status": 403,
  "message": "권한 없음"
}
```

#### 오류 (게시글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "글이 존재하지 않음"
}
```

### 게시글 댓글 목록 조회

> [GET] /posts/:id/comments

#### 응답

```json
{
  "status": 200,
  "message": "성공",
  "data": [
    {
      "id": "댓글 아이디",
      "content": "댓글 내용",
      "createdAt": "댓글 작성 시간",
      "updatedAt": "댓글 수정 시간",
      "user": {
        "id": "사용자 아이디",
        "name": "사용자 이름",
        "email": "사용자 이메일"
      }
    },
    ...
  ],
}
```

#### 오류 (게시글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "게시글이 존재하지 않음"
}
```

### 댓글 상세 조회

> [GET] /posts/:id/comments/:id

#### 응답

```json
{
  "status": 200,
  "message": "댓글 작성 성공",
  "data": {
    "id": "댓글 아이디",
    "content": "댓글 내용",
    "createdAt": "댓글 작성 시간",
    "updatedAt": "댓글 수정 시간",
    "user": {
      "id": "사용자 아이디",
      "name": "사용자 이름",
      "email": "사용자 이메일"
    }
  }
}
```

#### 오류 (게시글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "게시글이 존재하지 않음"
}
```

#### 오류 (댓글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "댓글이 존재하지 않음"
}
```

### 댓글 수정

> [PATCH] /posts/:id/comments/:id

#### 요청

```json
{
  "content": "댓글 내용"
}
```

#### 응답

```json
{
  "status": "200",
  "message": "댓글 수정 성공",
  "data": {
    "id": "댓글 아이디",
    "content": "댓글 내용",
    "createdAt": "댓글 작성 시간",
    "updatedAt": "댓글 수정 시간",
    "user": {
      "id": "사용자 아이디",
      "name": "사용자 이름",
      "email": "사용자 이메일"
    }
  }
}
```

#### 오류 (인증 오류, 토큰 만료)

```json
{
  "status": 401,
  "message": "인증 실패"
}
```

#### 오류 (수정 권한 없음)

```json
{
  "status": 403,
  "message": "권한 없음"
}
```

#### 오류 (게시글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "게시글이 존재하지 않음"
}
```

#### 오류 (댓글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "댓글이 존재하지 않음"
}
```

### 댓글 삭제

> [DELETE] /posts/:id/comments/:id

#### 응답

```json
{
  "status": "200",
  "message": "성공"
}
```

#### 오류 (인증 오류, 토큰 만료)

```json
{
  "status": 401,
  "message": "인증 실패"
}
```

#### 오류 (삭제 권한 없음)

```json
{
  "status": 403,
  "message": "권한 없음"
}
```

#### 오류 (게시글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "게시글이 존재하지 않음"
}
```

#### 오류 (댓글 찾을 수 없음)

```json
{
  "status": 404,
  "message": "댓글이 존재하지 않음"
}
```
