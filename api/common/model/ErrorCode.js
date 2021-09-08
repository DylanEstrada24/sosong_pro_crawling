exports.ErrorCode = Object.freeze({

    CODE_500 : {500: "internal error"},
    CODE_403 : {403: "Forbidden"},

    /** token, login */
    CODE_1101 : {1101: "token is expired"},
    CODE_1103 : {1103: "token parsing error"},
    CODE_1104 : {1104: "token is null"},
    CODE_1107 : {1107: "token type is not an access"},
    CODE_1108 : {1108: "invalid token"},
    CODE_1109 : {1109: "token malformed"},
    CODE_1110 : {1110: "token must be provided"},
    CODE_1111 : {1111: "access deni"},
    CODE_1112 : {1112: "유저 정보를 가져오는데 실패 했습니다."},
    CODE_1113 : {1113: "일치하는 사용자가 없습니다."},
    CODE_1114 : {1114: "입력 값이 잘못 됐습니다."},
    CODE_1115 : {1115: "가입불가, 이미 있는 계정 입니다."},

    CODE_1117 : {1117: "메일 전송에 실패했습니다."},
    CODE_1118 : {1118: "인증코드 전송에 실패했습니다."},
    CODE_1119 : {1119: "인증이 만료됐습니다."},
    CODE_1120 : {1120: "인증 횟수가 초과 됐습니다."},
    CODE_1121 : {1121: "잘못된 인증입니다."},
    CODE_1122 : {1122: "getAuthFromPlatform error"},
    CODE_1123 : {1123: "비밀번호 재설정 실패"},
    CODE_1124 : {1124: "아이디 혹은 비밀번호가 틀립니다."},
    CODE_1125 : {1125: "지원하지 않는 플랫폼 입니다."},
    CODE_1126 : {1126: "가입된 네이버 계정이 없습니다."},
    CODE_1127 : {1127: "계정연동에 실패했습니다."},

    CODE_2101 : {2101: "해당 사용자 case 없음"},
    CODE_2102 : {2102: "해당 case 이미 존재합니다."},

    CODE_2201 : {2101: "해당 사용자 todo list 없음"},

    CODE_2301 : {2101: "해당 사용자 user note 없음"},

    CODE_2401 : {2401: "게시판 업로드 실패"},
    CODE_2402 : {2402: "comment upload fail"},
    CODE_2403 : {2403: "delete board fail"},
    CODE_2404 : {2404: "게시판 업로드 실패"},


    /** */
    CODE_5101 : {5101: "internal error"},

})
// let code;
// let msg;
//
// exports.ErrorCode = (code, msg) => {
//     this.code = code;
//     this.msg = msg;
// }

