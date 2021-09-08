
/**
 * @swagger
 * paths:
 *  /api/v1/board:
 *    post:
 *      tags: [board]
 *      summary: 게시판 글올리기
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BoardUpload'
 *      responses:
 *       200:
 *        description:
 */


/**
 * @swagger
 * paths:
 *  /api/v1/board:
 *    get:
 *      tags: [board]
 *      summary: 변호사 게시판 불러오기
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
 *  /api/v1/board/{boardIdx}/{title}/{content}:
 *    put:
 *      tags: [board]
 *      summary: update board
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: boardIdx
 *          example:
 *        - in: path
 *          name: title
 *          example:
 *        - in: path
 *          name: content
 *          example:
 *      responses:
 *       200:
 *        description:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/board/{boardIdx}:
 *    delete:
 *      tags: [board]
 *      summary: delete board
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: boardIdx
 *          example:
 *      responses:
 *       200:
 *        description:
 */




/**
 * @swagger
 * paths:
 *  /api/v1/comment:
 *    post:
 *      tags: [board]
 *      summary: Write Comment
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentUpload'
 *      responses:
 *       200:
 *        description:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/board/comment/{boardIdx}:
 *    get:
 *      tags: [board]
 *      summary: 변호사 게시판의 댓글 불러오기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: boardIdx
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
 *  /api/v1/comment/{boardIdx}/{commentIdx}/{content}:
 *    put:
 *      tags: [board]
 *      summary: update Comment
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: boardIdx
 *          example:
 *        - in: path
 *          name: commentIdx
 *          example:
 *        - in: path
 *          name: content
 *      responses:
 *       200:
 *        description:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/comment/{boardIdx}/{commentIdx}:
 *    delete:
 *      tags: [board]
 *      summary: delete Comment
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: boardIdx
 *          example:
 *        - in: path
 *          name: commentIdx
 *          example:
 *      responses:
 *       200:
 *        description:
 */
