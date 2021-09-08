/**
 * @swagger
 * paths:
 *  /api/v1/admin/notice:
 *    post:
 *      tags: [Notice]
 *      summary: 공지사항 등록
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NoticeUpload'
 *      responses:
 *       200:
 *        description:
 */

/**
 * @swagger
 * paths:
 *  /api/v1/admin/notice:
 *    get:
 *      tags: [Notice]
 *      summary: 공지사항 불러오기
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
 *  /api/v1/admin/notice/noticeIdx/{noticeIdx}:
 *    get:
 *      tags: [Notice]
 *      summary: 공지사항 idx로 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: noticeIdx
 *          example: 1
 *      responses:
 *       200:
 *        description:
 *          content:
 *            application/json:
 */
//
// /**
//  * @swagger
//  * paths:
//  *  /api/v1/admin/notice/type/{type}:
//  *    get:
//  *      tags: [Notice]
//  *      summary: 공지사항 type으로 조회
//  *      produces:
//  *      - application/json
//  *      parameters:
//  *        - in: path
//  *          name: type
//  *          example:
//  *      responses:
//  *       200:
//  *        description:
//  *          content:
//  *            application/json:
//  */


/**
 * @swagger
 * paths:
 *  /api/v1/admin/notice/{noticeIdx}/{title}/{content}:
 *    put:
 *      tags: [Notice]
 *      summary: 공지사항 수정
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: noticeIdx
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
 *  /api/v1/admin/notice/{noticeIdx}:
 *    delete:
 *      tags: [Notice]
 *      summary: 공지사항 삭제
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: noticeIdx
 *          example:
 *      responses:
 *       200:
 *        description:
 */
