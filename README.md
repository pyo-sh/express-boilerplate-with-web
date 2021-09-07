# Express with Web(VanilaJS)

### 구조

* 프론트엔드를 작성할 때
    - 브라우저가 지원하지 않는 scss를 쓰려고 한다.
    - 여러 개의 파일로 분할하여 작성할 예정이다.

**`web` 이라는 폴더에 프론트 코드를 넣고 `webpack`에서 번들링 한 뒤, `/public`폴더에서 이를 제공**


### 실행

`webpack-dev-middleware` 라이브러리를 사용해 express 가 실행 할 때마다 bundling하며 클라이언트에서 public에 요청할 때 bundling된 파일을 줄 수 있도록 한다.


### Webpack이란?

> 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러

* 자바스크립트는 모듈화를 지원하지 않았다.
    - CommonJS, Asynchronous Module Definition(RequireJS) -> node JS
    - ECMAScript6 (ES6)
        * CommonJS보다 문법이 더 간결함.
        * 구조가 static하게 분석 가능하고, 최적화도 됨.
        * CommonJS보다 순환 의존성 지원이 잘됨

* bundling : 모듈을 하나의 파일로 묶어 네트워크 비용을 최소화
    - 모듈화를 지원하지 않는 브라우저도 볼 수 있다.


### Options

1. devtools
    * `eval-source-map`을 통해 하나의 js, html, css 파일로 번들링하고 브라우저에서 mapping 할 수 있게 함

2. mini-css-extract-plugin
    * css, sass, scss 파일들을 모아 하나의 css파일로 변경하기 위한 플러그인

3. HtmlWebpackPlugin
    * bundling하는 과정에서 생성된 파일들을 연결 시킨 html을 반환하게 해주는 플러그인

4. file-loader
    * 사용된 사진(png,svg,jpe,jpeg,gif)들을 번들링하게 해준다.

5. input
    * `web/index.js`에서 파생된 파일들을 번들링한다.

6. output
    * `public/` 아래에 번들링 된 파일들을 반환한다.

7. babel
    * `babel.config.json` 설정에 맞춰 번들링한다.

