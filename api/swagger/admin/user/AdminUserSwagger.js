/**
 * @swagger
 * paths:
 *  /api/v1/admin/user:
 *    get:
 *      tags: [Admin]
 *      summary: 회원 조회
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
 *  /api/v1/admin/update/user/status:
 *    post:
 *      tags: [Admin]
 *      summary: 유저 상태값 변경
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AdminUpdateUserStatus'
 *      responses:
 *       200:
 *        description:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/admin/update/user/type:
 *    post:
 *      tags: [Admin]
 *      summary: 유저 타입 변경
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AdminUpdateUserType'
 *      responses:
 *       200:
 *        description:
 */


