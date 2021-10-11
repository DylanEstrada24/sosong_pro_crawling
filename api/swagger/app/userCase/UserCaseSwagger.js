/**
 * @swagger
 * paths:
 *  /api/v1/user/case:
 *    post:
 *      tags: [User Case]
 *      summary: user case input
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InputUserCase'
 *      responses:
 *       200:
 *        description:
 */


/**
 * @swagger
 * paths:
 *  /api/v1/user/case/userIdx/ASC/{page}:
 *    get:
 *      tags: [User Case]
 *      summary: 토큰으로 유저 케이스 들고오기 오름차순 - 접수일기준
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: page
 *          example: 0
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/userIdx/DESC/{page}:
 *    get:
 *      tags: [User Case]
 *      summary: 토큰으로 유저 케이스 들고오기 내림차순 - 접수일기준
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: page
 *          example: 0
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/userIdx/title/ASC/{page}:
 *    get:
 *      tags: [User Case]
 *      summary: 토큰으로 유저 케이스 들고오기 오름차순 - title기준
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: page
 *          example: 0
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/userIdx/title/DESC/{page}:
 *    get:
 *      tags: [User Case]
 *      summary: 토큰으로 유저 케이스 들고오기 내림차순 - title기준
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: page
 *          example: 0
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/userIdx/todo/DESC/{page}:
 *    get:
 *      tags: [User Case]
 *      summary: 토큰으로 유저 케이스 들고오기 내림차순 - todo날짜
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: page
 *          example: 0
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/caseIdx/{caseIdx}:
 *    get:
 *      tags: [User Case]
 *      summary: caseIdx 로 유저 케이스 들고오기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: caseIdx
 *          example: 5
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/favorite/{caseIdx}:
 *    put:
 *      tags: [User Case]
 *      summary: 즐겨찾기 등록/해제
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: caseIdx
 *          example: 5
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */


/**
 * @swagger
 * paths:
 *  /api/v1/user/case/progress/{caseNumber}:
 *    get:
 *      tags: [User Case]
 *      summary: 사건 진행 사항 들고오기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: caseNumber
 *          example: 2020가소377585
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */



/**
 * @swagger
 * paths:
 *  /api/v1/user/case/title/{title}/{caseIdx}:
 *    put:
 *      tags: [User Case]
 *      summary: title 변경
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: title
 *          example: 제목수정
 *        - in: path
 *          name: caseIdx
 *          example: 6
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/progress/date/{date}:
 *    get:
 *      tags: [User Case]
 *      summary: 사건 진행 사항 들고오기 By Date
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: date
 *          example: 2020-12-28
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/progress/type/{type}:
 *    get:
 *      tags: [User Case]
 *      summary: 사건 진행 사항 type 별 들고오기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: type
 *          example: 1
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */


/**
 * @swagger
 * paths:
 *  /api/v1/user/case/caseIdx/{caseIdx}:
 *    delete:
 *      tags: [User Case]
 *      summary: 유저 케이스 삭제

 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: caseIdx
 *          example:
 *      responses:
 *       200:
 *        description:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/test:
 *    post:
 *      tags: [User Case]
 *      summary: user case input (웹크롤링 도구)
 *      description: 전자소송 아이디 / 비밀번호 입력
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/sosongCrawl'
 *      responses:
 *       200:
 *        description:
 */
