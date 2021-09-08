/**
 * @swagger
 * paths:
 *  /api/v1/user/case/usertodo:
 *    post:
 *      tags: [User Todo]
 *      summary: 유저 todo 삽입
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InputUserTodo'
 *      responses:
 *       200:
 *        description:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/todo/caseIdx/{caseIdx}:
 *    get:
 *      tags: [User Todo]
 *      summary: 사건 개인 todo 들고오기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: caseIdx
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
 *  /api/v1/user/case/todo/userIdx:
 *    get:
 *      tags: [User Todo]
 *      summary: 개인 사건별 todo 모두 들고오기
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */


/**
 * @swagger
 * paths:
 *  /api/v1/user/case/todo/favorite/{caseIdx}/{todoIdx}:
 *    put:
 *      tags: [User Todo]
 *      summary: 즐겨찾기 등록/해제
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: caseIdx
 *          example:
 *        - in: path
 *          name: todoIdx
 *          example:
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */


/**
 * @swagger
 * paths:
 *  /api/v1/user/case/todo/isCheck/{caseIdx}/{todoIdx}:
 *    put:
 *      tags: [User Todo]
 *      summary: check 등록/해제
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: caseIdx
 *          example:
 *        - in: path
 *          name: todoIdx
 *          example:
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */


