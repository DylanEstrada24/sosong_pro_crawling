/**
 * @swagger
 * paths:
 *  /api/v1/auth/signin:
 *    post:
 *      tags: [Auth]
 *      summary: 유저 로그인
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthSignIn'
 *      responses:
 *       200:
 *        description:
 */


/**
 * @swagger
 * paths:
 *  /api/v1/auth/signup:
 *    post:
 *      tags: [Auth]
 *      summary: 유저 회원가입
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthSignUp'
 *      responses:
 *       200:
 *        description:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/auth/withdrawal:
 *    delete:
 *      tags: [Auth]
 *      summary: 유저 회원탈퇴
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
 *  /api/v1/auth/update/{email}/{gender}/{phoneNumber}:
 *    put:
 *      tags: [Auth]
 *      summary: 회원정보 수정
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: email
 *          example: 변경할 이메일
 *        - in: path
 *          name: gender
 *          example: 변경할 성별
 *        - in: path
 *          name: phoneNumber
 *          example: 변경할 폰넘버
 *        - in: path
 *          name: nickName
 *          example: 변경할 닉네임
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/auth/update/pwd:
 *    post:
 *      tags: [Auth]
 *      summary: 회원 비밀번호 수정
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthPasswordChange'
 *      responses:
 *       200:
 *        description:
 */
