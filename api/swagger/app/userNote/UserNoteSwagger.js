/**
 * @swagger
 * paths:
 *  /api/v1/user/case/usernote:
 *    post:
 *      tags: [User Note]
 *      summary: 유저 노트 삽입
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InputUserNote'
 *      responses:
 *       200:
 *        description:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/user/case/usernote/{caseIdx}:
 *    get:
 *      tags: [User Note]
 *      summary: 사건 개인 usernote 들고오기
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
 *  /api/v1/user/case/note/userIdx:
 *    get:
 *      tags: [User Note]
 *      summary: 개인 사건별 note 모두 들고오기
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */





