const express = require('express');
const router = express.Router();

require('dotenv').config();

router.get('/v1/test4_2', (req, res) => {
    res.send('<html lang="ko">\n' +
        '<head>\n' +
        '    <title>민사사건 진행내용</title>\n' +
        '    <meta http-equiv="Content-Type" content="text/html; charset=euc-kr">\n' +
        '        <meta name="viewport"\n' +
        '              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi">\n' +
        '            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n' +
        '                <link rel="stylesheet" type="text/css" href="/common/css/reset_safind.css">\n' +
        '                    <link rel="stylesheet" type="text/css" href="/common/css/layout_safind.css">\n' +
        '\n' +
        '                        <script language="javascript" type="text/javascript"\n' +
        '                                src="/common/js/jquery-1.12.1.min.js"></script>\n' +
        '                        <script language="javascript" type="text/javascript" src="/common/js/basic.js"></script>\n' +
        '                        <script language="javascript" type="text/javascript"\n' +
        '                                src="/js/SfCommon.js?ver=20190829"></script>\n' +
        '\n' +
        '                        <script language="javascript" type="text/javascript">\n' +
        '                            //\n' +
        '                            <\n' +
        '                            ![CDATA[\n' +
        '                            window.document.oncontextmenu = new Function("return false\n' +
        '                        ");\n' +
        '                            //]]>\n' +
        '                        </script>\n' +
        '\n' +
        '</head>\n' +
        '<body>\n' +
        '\n' +
        '<form name="print_preview" method="post" action="">\n' +
        '    <input type="hidden" name="print_html" value="">\n' +
        '</form>\n' +
        '\n' +
        '<div className="contentIn">\n' +
        '\n' +
        '    <!--  Tab (사건번호로조회/인증서검색) -->\n' +
        '    <h1 className="title">사건번호로 검색</h1>\n' +
        '    <div className="tab">\n' +
        '\n' +
        '        <ul className="tabTitle">\n' +
        '            <li id="btnSafindTab" className="tab1 active first"><a href="#" tabIndex="1" className="active">사건번호로 검색</a>\n' +
        '            </li>\n' +
        '            <li id="btnGongInTab" className="tab2 mhid" onKeyPress="if(event.keyCode == 13){tabEnter(\'gonginGo\');}"><a\n' +
        '                href="#" tabIndex="1">인증서로 검색</a></li>\n' +
        '        </ul>\n' +
        '\n' +
        '\n' +
        '        <script language="javascript" type="text/javascript" src="/js/sfr/sfrUtil.js?ver=20190829"></script>\n' +
        '        <script language="javascript" type="text/javascript" src="/js/sfr/sfr_inc_new.js?ver=20190829"></script>\n' +
        '        <script language="JavaScript" type="text/JavaScript">\n' +
        '            //\n' +
        '            <\n' +
        '            ![CDATA[\n' +
        '\n' +
        '            //소스보기 제어\n' +
        '            window.document.oncontextmenu = new Function("return false");\n' +
        '\n' +
        '            //]]>\n' +
        '        </script>\n' +
        '\n' +
        '        <form id="sanoform2" name="sanoform2" method="post" action="">\n' +
        '            <input type="hidden" name="cmd" value="">\n' +
        '                <input type="hidden" name="sch_sa_gbn" value="">\n' +
        '                    <input type="hidden" name="sa_serial" value="">\n' +
        '                        <input type="hidden" name="sa_year" value="">\n' +
        '                            <input type="hidden" name="ds_nm" value="">\n' +
        '                                <input type="hidden" name="link" value="N">\n' +
        '                                    <input type="hidden" name="gongYn" value="Y">\n' +
        '                                        <input type="hidden" name="gongListLinkYn" value="Y">\n' +
        '                                            <input type="hidden" name="sch_bub_cd" value="">\n' +
        '                                                <input type="hidden" name="sch_bub_nm" value="">\n' +
        '                                                    <input type="hidden" name="auth" value="">\n' +
        '        </form>\n' +
        '\n' +
        '\n' +
        '        <form id="gonginform" name="gonginform" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '            <input type="hidden" name="cmd" value="cm.SFCM02s05Cmd">\n' +
        '                <input type="hidden" name="initChk" value="Y">\n' +
        '        </form>\n' +
        '\n' +
        '\n' +
        '        <form id="logoutform" name="logoutform" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '            <input type="hidden" name="cmd" value="cm.SFCM02s06Cmd">\n' +
        '                <input type="hidden" name="gongIn" value="Y">\n' +
        '        </form>\n' +
        '\n' +
        '\n' +
        '        <script language="JavaScript" type="text/JavaScript">\n' +
        '            //\n' +
        '            <\n' +
        '            ![CDATA[\n' +
        '            var vGong = "";\n' +
        '            if ( "Y" == vGong ){\n' +
        '            $("#btnSafindTab").attr("class", "first");\n' +
        '            $("#btnGongInTab").attr("class", "active mhid");\n' +
        '        }\n' +
        '            //]]>\n' +
        '        </script>\n' +
        '\n' +
        '\n' +
        '        <!--  tabContents -->\n' +
        '        <div id="tabContents" className="tabContents">\n' +
        '            <!-- tab1 -->\n' +
        '            <div id="tab1" className="tabContent active">\n' +
        '\n' +
        '                <!--  bannerHor2  -->\n' +
        '                <div className="bannerHor2">\n' +
        '                    <ul>\n' +
        '                        <li><a href="http://ecfs.scourt.go.kr" tabIndex="1" target="_blank"><img\n' +
        '                            src="/common/images/banner_01.png"\n' +
        '                            alt="본 사이트에서 제공된 사건정보는 법적인 효력이 없으니, 참고자료로만 활용하시기 바랍니다. 민사, 특허 등 전자소송으로 진행되는 사건에 대해서는 전자소송홈페이지를 이용하시면 판결문이나 사건기록을 모두 인터넷으로 보실 수 있습니다.(새창열림)"></a>\n' +
        '                        </li>\n' +
        '                    </ul>\n' +
        '                </div>\n' +
        '                <!--  //bannerHor2 -->\n' +
        '\n' +
        '                <!-- subTab (사건일반내용/사건진행내용)-->\n' +
        '                <h1 className="title">사건진행내용</h1>\n' +
        '                <div className="subTab2">\n' +
        '                    <ul className="subTabTitle2">\n' +
        '                        <li className="subTab1 first" onKeyPress="if(event.keyCode == 13){goMove(\'default\');}"\n' +
        '                            onClick="javascript:goMove(\'default\');"><a href="#" tabIndex="1">사건일반내용</a></li>\n' +
        '                        <li className="subTab2 active"><a href="#" tabIndex="1" className="active">사건진행내용</a></li>\n' +
        '                        <li className="btn">\n' +
        '                            <div>\n' +
        '                                <a className="blueBtn" href="#" onClick="javascript:printPreview(\'scourt\');"\n' +
        '                                   title="인쇄하기(새창열림)">인쇄하기</a>\n' +
        '\n' +
        '                                <a className="blueBtn" href="/sf/mysafind.jsp?theme=scourt">나의 사건 검색하기</a>\n' +
        '\n' +
        '                            </div>\n' +
        '                        </li>\n' +
        '                    </ul>\n' +
        '\n' +
        '                    <!--  tabContents -->\n' +
        '                    <div className="subTabContents">\n' +
        '                        <!--  tab2 -->\n' +
        '                        <div id="subTab2" className="subTabContent active">\n' +
        '\n' +
        '                            <div className="infoBox">\n' +
        '                                <div className="conTextBul">\n' +
        '                                    <span className="blue">사건번호 : 부산지방법원 동부지원 2020가소377585</span>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '\n' +
        '                            <div className="titleH2">기본내용\n' +
        '\n' +
        '                                <a className="fr blueBtn" href="#"\n' +
        '                                   onClick="javascript:goLocation(\'https://www.scourt.go.kr/BubLocLink.jsp?bub_cd=000412\');"\n' +
        '                                   title="청사배치(새창열림)">청사배치</a>\n' +
        '\n' +
        '                            </div>\n' +
        '\n' +
        '                            <!-- tableVer  -->\n' +
        '                            <table className="tableVer" summary="사건의 기본내용을 조회 합니다.">\n' +
        '                                <caption>기본내용</caption>\n' +
        '\n' +
        '                                <tbody>\n' +
        '                                <tr>\n' +
        '                                    <th>사건번호</th>\n' +
        '                                    <td>&nbsp;2020가소377585</td>\n' +
        '                                    <th>사건명</th>\n' +
        '                                    <!-- 2010.10.25 [11LG-SF0022][CJS2] 전자소송 사건인 경우 사건명 앞에 전자표시 - 최형욱 -->\n' +
        '                                    <td><font color="green">[전자]</font>  &nbsp;임금</td>\n' +
        '                                </tr>\n' +
        '\n' +
        '                                <tr>\n' +
        '                                    <th>원고</th>\n' +
        '                                    <td>&nbsp;김병철</td>\n' +
        '                                    <th>피고</th>\n' +
        '                                    <td>&nbsp;김진식</td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        '                                    <th>재판부</th>\n' +
        '                                    <td colSpan="3">&nbsp;민사28단독 (전화:780-1337(재판 관련),1307(이행권고결정 및 각종 보정 관련 문의))</td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        '                                    <th>접수일</th>\n' +
        '                                    <td>&nbsp;2020.12.28</td>\n' +
        '                                    <th>종국결과</th>\n' +
        '                                    <td>&nbsp; </td>\n' +
        '                                </tr>\n' +
        '                                </tbody>\n' +
        '                            </table>\n' +
        '                            <!-- //tableVer  -->\n' +
        '\n' +
        '\n' +
        '                            <div className="titleH2">진행내용\n' +
        '                                <div className="fr">\n' +
        '                                    <label htmlFor="select" className="hidden">진행내용구분</label>\n' +
        '                                    <select name="select" id="select" className="graySelect" title="진행내용구분">\n' +
        '                                        <option value="0">전 체</option>\n' +
        '                                        <option value="1">기 일</option>\n' +
        '                                        <option value="2" selected="selected">명 령</option>\n' +
        '                                        <option value="3">제출서류</option>\n' +
        '                                        <option value="4">송 달</option>\n' +
        '                                    </select>\n' +
        '                                    <a className="fr blueBtn" href="#"\n' +
        '                                       ><a href="http://localhost:8883/api/v1/test4_3">선택</a>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '\n' +
        '                            <!-- tableHor-->\n' +
        '                            <table className="tableHor" summary="진행내용(기일, 명령, 제출서류, 송달)의 목록 조회 입니다.">\n' +
        '                                <caption>진행내용리스트</caption>\n' +
        '                                <thead>\n' +
        '                                <tr>\n' +
        '\n' +
        '                                    <th scope="col" width="10%">일자</th>\n' +
        '                                    <th scope="col" width="70%">내용</th>\n' +
        '                                    <th scope="col" width="20%">결과</th>\n' +
        '\n' +
        '                                </tr>\n' +
        '                                </thead>\n' +
        '                                <tbody>\n' +
        '\n' +
        '                                <tr>\n' +
        '                                    <td style="color: #336633;">&nbsp;2021.01.19</td>\n' +
        '                                    <td className="tit" style="color: #336633;">&nbsp;이행권고결정</td>\n' +
        '                                    <td style="color: #336633;">&nbsp;</td>\n' +
        '                                </tr>\n' +
        '\n' +
        '                                </tbody>\n' +
        '                            </table>\n' +
        '                            <!-- //tableHor  -->\n' +
        '\n' +
        '\n' +
        '                            <div className="btnBox"><a href="#top" className="topBtn">Top</a></div>\n' +
        '\n' +
        '                        </div>\n' +
        '                        <!-- subTab1 -->\n' +
        '                    </div>\n' +
        '                    <!-- tabContents -->\n' +
        '                </div>\n' +
        '                <!-- subTab2 -->\n' +
        '            </div>\n' +
        '            <!-- tab1 -->\n' +
        '        </div>\n' +
        '        <!-- tabContents -->\n' +
        '    </div>\n' +
        '    <!-- tab -->\n' +
        '</div>\n' +
        '<!-- contentIn -->\n' +
        '\n' +
        '<form name="goForm" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '    <input type="hidden" name="cmd" value="cv.SFCV02s01Cmd">\n' +
        '        <input type="hidden" name="sch_bub_cd" value="000412">    <!-- 2011.10.04 장진범 [11LG-SF0047]  -->\n' +
        '            <input type="hidden" name="sch_bub_nm" value="부산지법동부지원">\n' +
        '                <input type="hidden" name="sa_year" value="2020">\n' +
        '                    <input type="hidden" name="sch_sa_gbn" value="가소">\n' +
        '                        <input type="hidden" name="sa_serial" value="377585">\n' +
        '                            <input type="hidden" name="ds_nm" value="김병철">\n' +
        '                                <input type="hidden" name="type" value="2">\n' +
        '                                    <input type="hidden" name="theme" value="scourt">\n' +
        '                                        <input type="hidden" name="mode" value="">\n' +
        '                                            <input type="hidden" name="gongYn" value="">\n' +
        '                                                <input type="hidden" name="mysafindYn" value="Y">\n' +
        '                                                    <input type="hidden" name="auth"\n' +
        '                                                           value="T3yBH65sf8HeTGDlojZea/z6x1ks/TEGeozeRmvQtVQ=">\n' +
        '                                                        <input type="hidden" name="page" value="1">\n' +
        '                                                            <input type="hidden" name="perPage" value="1000">\n' +
        '</form>\n' +
        '\n' +
        '<form name="goIgongForm" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '    <input type="hidden" name="cmd" value="igong.SD208s01Cmd">\n' +
        '        <input type="hidden" name="bub_nm" value="부산지방법원 동부지원">\n' +
        '            <input type="hidden" name="bub_abb" value="부산지법동부지원">\n' +
        '                <input type="hidden" name="sa_year" value="2020">\n' +
        '                    <input type="hidden" name="sa_gubun" value="가소">\n' +
        '                        <input type="hidden" name="sa_searial" value="377585">\n' +
        '                            <input type="hidden" name="jp_nm" value="민사28단독">\n' +
        '                                <input type="hidden" name="sdm_name">\n' +
        '                                    <input type="hidden" name="prt_sdc_nm">\n' +
        '                                        <input type="hidden" name="cr_day">\n' +
        '                                            <input type="hidden" name="sd_day">\n' +
        '</form>\n' +
        '\n' +
        '<script language="javascript" type="text/Javascript">\n' +
        '    //\n' +
        '    <\n' +
        '    ![CDATA[\n' +
        '\n' +
        '\n' +
        '    function goMove(type)\n' +
        '    {\n' +
        '        if( type=="default" ) {\n' +
        '        document.goForm.cmd.value = "cv.SFCV01s01Cmd";\n' +
        '    } else {\n' +
        '        document.goForm.type.value = type;\n' +
        '    }\n' +
        '        document.goForm.page.value = "1";\n' +
        '\n' +
        '        document.goForm.submit();\n' +
        '    }\n' +
        '\n' +
        '\n' +
        '    function goPageMove( page )\n' +
        '    {\n' +
        '        document.goForm.page.value = page;\n' +
        '        document.goForm.submit();\n' +
        '    }\n' +
        '\n' +
        '    // 2011.10.04 [11LG-SF0047] 홈페이지 사건검색에서 호출함수에 대한 파라미터 방식 변경 - 장진범\n' +
        '    function goLinkMove(bub_cd, bub_nm, cmd, sa_year, sa_gbn, sa_serial, auth)\n' +
        '    {\n' +
        '        document.goForm.cmd.value = cmd;\n' +
        '        document.goForm.sch_bub_cd.value = bub_cd;\n' +
        '        document.goForm.sch_bub_nm.value = bub_nm;\n' +
        '        document.goForm.sa_year.value = sa_year;\n' +
        '        document.goForm.sch_sa_gbn.value = sa_gbn;\n' +
        '        document.goForm.sa_serial.value = sa_serial;\n' +
        '        document.goForm.auth.value = auth;\n' +
        '        document.goForm.submit();\n' +
        '    }\n' +
        '\n' +
        '\n' +
        '    function clickSongdalchk() {\n' +
        '    setCookieSongdal(document.getElementsByName("songdalchk")[0].checked);\n' +
        '    goMove(2);\n' +
        '}\n' +
        '\n' +
        '\n' +
        '    // ----------------------------------------------------------\n' +
        '    // 설 명 : 파이어폭스 브라우저에서 결과 화면 깨짐 방지\n' +
        '    // 파라메터 : 없음\n' +
        '    // History : 2014.01.02 [14A-SF-0002] [사건검색]진행내용 Tab의 안내문구 깨지는 현상 수정 - 김윤수\n' +
        '    // ----------------------------------------------------------\n' +
        '    function doCrossBrowse() {\n' +
        '    var name = navigator.appName;\n' +
        '    var ver = navigator.appVersion;\n' +
        '    var ver_int = parseInt(navigator.appVersion);\n' +
        '    var ua = navigator.userAgent;\n' +
        '    var infostr;\n' +
        '    if(name == "Microsoft Internet Explorer") {\n' +
        '    var real_ver = parseInt(ua.substring(ua.indexOf("MSIE ") + 5));\n' +
        '    if(real_ver < 7) {\n' +
        '    return;\n' +
        '}\n' +
        '}\n' +
        '    var oDiv = document.getElementById("div_jinhaeng_naeyong");\n' +
        '    if (null != oDiv) {\n' +
        '    oDiv.style.clear = "left";\n' +
        '    /* 아래라인은 익스플로러 8에서는 clear가 적용안되는 문제를 해결하기 위해 넣었음. */\n' +
        '    oDiv.innerHTML = oDiv.innerHTML;\n' +
        '}\n' +
        '}\n' +
        '    window.onload = doCrossBrowse;\n' +
        '    //]]>\n' +
        '\n' +
        '</script>\n' +
        '\n' +
        '\n' +
        '</body>\n' +
        '<whale-quicksearch translate="no"></whale-quicksearch>\n' +
        '</html>');
})

module.exports = router;
