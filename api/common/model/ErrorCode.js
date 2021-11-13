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
    CODE_1124 : {1124: "아이디 혹은 비밀번호가 틀립니다."},


    CODE_2101 : {2101: "해당 사용자 case 없음"},
    CODE_2102 : {2102: "해당 case 이미 존재합니다."},
    CODE_2103 : {2103: "사건이 존재하지 않습니다."},
    CODE_2104 : {2104: "사건검색에 실패했습니다."},
    CODE_2105 : {2105: "올바른 사건 구분을 입력하세요"},
    CODE_2106 : {2106: "사건이 없는 사용자입니다."},
    CODE_2107 : {2107: "모든사건이 추가되있음"},

    CODE_2201 : {2201: "해당 사용자 todo list 없음"},

    CODE_2301 : {2301: "해당 사용자 user note 없음"},

    CODE_2401 : {2401: "공지사항이 없습니다."},
    CODE_2402 : {2402: "comment upload fail"},
    CODE_2403 : {2403: "delete board fail"},
    CODE_2404 : {2404: "게시판 업로드 실패"},

	CODE_3000 : {3000: "send email fail try again."}, // when user find pw from email ... dk

    /** */
    CODE_5101 : {5101: "internal error"},
})

