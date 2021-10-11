const express = require('express');
const router = express.Router();

require('dotenv').config();

// 유저 정보 불러오기
router.get('/v1/test2', (req, res) => {
    res.send(''+
        '<html lang="ko"><head>\n' +
        '<title>민사사건 일반내용</title>\n' +

        '</head>\n' +
        '<body>\n' +
        '\n' +
        '<form name="print_preview" method="post" action="">\n' +
        '  <input type="hidden" name="print_html" value="">\n' +
        '</form>\n' +
        '\n' +
        '<div class="contentIn">\n' +
        '  <h1 class="title">사건번호로 검색</h1>\n' +
        '  <div class="tab">\n' +
        '\n' +
        '    <!--  Tab (사건번호로조회/인증서검색) -->\n' +
        '    <ul class="tabTitle">\n' +
        '      <li id="btnSafindTab" class="tab1 active first"><a href="#" tabindex="1" class="active">사건번호로 검색</a></li>\n' +
        '      <li id="btnGongInTab" class="tab2 mhid" onkeypress="if(event.keyCode == 13){tabEnter(\'gonginGo\');}"><a href="#" tabindex="1">인증서로 검색</a></li>\n' +
        '    </ul>\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '<script language="javascript" type="text/javascript" src="/js/sfr/sfrUtil.js?ver=20190829"></script>\n' +
        '<script language="javascript" type="text/javascript" src="/js/sfr/sfr_inc_new.js?ver=20190829"></script>\n' +
        '<script language="JavaScript" type="text/JavaScript">\n' +
        '  //<![CDATA[\n' +
        '\n' +
        '  //소스보기 제어\n' +
        '  window.document.oncontextmenu = new Function("return false");\n' +
        '\n' +
        '//]]>\n' +
        '</script> \n' +
        '\n' +
        '<form id="sanoform2" name="sanoform2" method="post" action=""> \t\n' +
        '  <input type="hidden" name="cmd" value="">\n' +
        '  <input type="hidden" name="sch_sa_gbn" value="">\n' +
        '  <input type="hidden" name="sa_serial" value="">\n' +
        '  <input type="hidden" name="sa_year" value="">\n' +
        '  <input type="hidden" name="ds_nm" value="">\n' +
        '  <input type="hidden" name="link" value="N">\n' +
        '  <input type="hidden" name="gongYn" value="Y">\n' +
        '  <input type="hidden" name="gongListLinkYn" value="Y">\n' +
        '  <input type="hidden" name="sch_bub_cd" value="">\n' +
        '  <input type="hidden" name="sch_bub_nm" value="">\n' +
        '  <input type="hidden" name="auth" value="">\n' +
        '</form>\n' +
        '\n' +
        '\n' +
        '\n' +
        '<form id="gonginform" name="gonginform" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '  <input type="hidden" name="cmd" value="cm.SFCM02s05Cmd">\n' +
        '  <input type="hidden" name="initChk" value="Y">\n' +
        '</form>\n' +
        '\n' +
        '\n' +
        '\n' +
        '<form id="logoutform" name="logoutform" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '  <input type="hidden" name="cmd" value="cm.SFCM02s06Cmd">\n' +
        '  <input type="hidden" name="gongIn" value="Y">\n' +
        '</form>\n' +
        '\n' +
        '\n' +
        '\n' +
        '<script language="JavaScript" type="text/JavaScript">\n' +
        '//<![CDATA[\n' +
        '    var vGong = "";\n' +
        '    if ( "Y" == vGong ){ \n' +
        '      $("#btnSafindTab").attr("class", "first");\n' +
        '      $("#btnGongInTab").attr("class", "active mhid");\n' +
        '    }\n' +
        '//]]>\n' +
        '</script> \n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '    <!--  tabContents -->\n' +
        '    <div id="tabContents" class="tabContents">\n' +
        '      <!-- tab1 -->\n' +
        '      <div id="tab1" class="tabContent active">\n' +
        '\n' +
        '        <!--  bannerHor2  -->\n' +
        '        <div class="bannerHor2">\n' +
        '          <ul>\n' +
        '            <li><a href="http://ecfs.scourt.go.kr" tabindex="1" target="_blank"><img src="/common/images/banner_01.png" alt="본 사이트에서 제공된 사건정보는 법적인 효력이 없으니, 참고자료로만 활용하시기 바랍니다. 민사, 특허 등 전자소송으로 진행되는 사건에 대해서는 전자소송홈페이지를 이용하시면 판결문이나 사건기록을 모두 인터넷으로 보실 수 있습니다.(새창열림)"></a></li>\n' +
        '          </ul>\n' +
        '        </div>\n' +
        '        <!--  //bannerHor2 -->\n' +
        '\n' +
        '        <!-- subTab (사건일반내용/사건진행내용) -->\n' +
        '        <h1 class="title">사건일반내용</h1>\n' +
        '        <div class="subTab2">\n' +
        '          <ul class="subTabTitle2">\n' +
        '            <li class="subTab1 active first"><a href="#" tabindex="1" class="active">사건일반내용</a></li>\n' +
        '            <li class="subTab2" <!--onkeypress="if(event.keyCode == 13){goMove(\'0\');}" onclick="javascript:goMove(\'0\');-->"><a href="http://localhost:8883/api/v1/test3"><!--<a href="#" tabindex="1">-->사건진행내용</a></li>\n' +
        '            <li class="btn">\n' +
        '              <div>\n' +
        '                <a class="blueBtn" href="#" onclick="javascript:printPreview(\'scourt\');" title="인쇄하기(새창열림)">인쇄하기</a>\n' +
        '\n' +
        '                <a class="blueBtn" href="/sf/mysafind.jsp?theme=scourt">나의 사건 검색하기</a>\n' +
        '\n' +
        '                </div>\n' +
        '              </li>\n' +
        '          </ul>\n' +
        '\n' +
        '          <!--  tabContents -->\n' +
        '          <div class="subTabContents">\n' +
        '            <!-- tab1 -->\n' +
        '            <div id="subTab1" class="subTabContent active">\n' +
        '              <div class="infoBox">\n' +
        '                <div class="conTextBul">\n' +
        '                  <span class="blue">사건번호 : 부산지방법원 동부지원 2020가소377585</span>\n' +
        '                </div>\n' +
        '              </div>\n' +
        '\n' +
        '              <div class="titleH2">기본내용\n' +
        '\n' +
        '              <a class="fr blueBtn" href="#" onclick="javascript:goLocation(\'https://www.scourt.go.kr/BubLocLink.jsp?bub_cd=000412\');" title="청사배치(새창열림)">청사배치</a>\n' +
        '\n' +
        '              </div>\n' +
        '\n' +
        '              <!-- tableVer  -->\n' +
        '              <table class="tableVer" summary="사건의 기본내용을 조회 합니다.">\n' +
        '                <caption>기본내용</caption>\n' +
        '                <tbody><tr>\n' +
        '                  <th>사건번호</th>\n' +
        '                  <td>&nbsp;2020가소377585</td>\n' +
        '                  <th>사건명</th>\n' +
        '                  <td>&nbsp;<font color="green">[전자]</font>  임금</td>\n' +
        '                </tr>\n' +
        '\n' +
        '                <tr>\n' +
        '                  <th>원고</th>\n' +
        '                  <td>&nbsp;김병철</td>\n' +
        '                  <th>피고</th>\n' +
        '                  <td>&nbsp;김진식</td>\n' +
        '                </tr>\n' +
        '                <tr>\n' +
        '                  <th>재판부</th>\n' +
        '                  <td colspan="3">&nbsp;민사24단독 (전화:780-1337(재판 관련),1307(이행권고결정 및 각종 보정 관련 문의))</td>\n' +
        '                </tr>\n' +
        '                <tr>\n' +
        '                  <th>접수일</th>\n' +
        '                  <td>&nbsp;2020.12.28</td>\n' +
        '                  <th>종국결과</th>\n' +
        '                  <td>&nbsp; </td>\n' +
        '                </tr>\n' +
        '                <tr>\n' +
        '                  <th>원고소가</th>\n' +
        '                  <td>&nbsp;1,090,000</td>\n' +
        '                  <th>피고소가</th>\n' +
        '                  <td>&nbsp;</td>\n' +
        '                </tr>\n' +
        '                <tr>\n' +
        '                  <th>수리구분</th>\n' +
        '                  <td>&nbsp;제소</td>\n' +
        '                  <th>병합구분</th>\n' +
        '                  <td>&nbsp;없음</td>\n' +
        '                </tr>\n' +
        '\n' +
        '\n' +
        '                <tr>\n' +
        '                  <th>상소인</th>\n' +
        '                  <td>&nbsp;</td>\n' +
        '                  <th>상소일</th>\n' +
        '                  <td>&nbsp;</td>\n' +
        '                </tr>\n' +
        '                <tr>\n' +
        '                  <th>상소각하일</th>\n' +
        '\n' +
        '                  <td colspan="3">&nbsp;</td>\n' +
        '\n' +
        '                </tr>\n' +
        '\n' +
        '                <tr>\n' +
        '                  <th>인지액</th>\n' +
        '                  <td colspan="3">&nbsp;4,800원</td>\n' +
        '                </tr>\n' +
        '\n' +
        '\n' +
        '\n' +
        '                <tr>\n' +
        '                  <th colspan="2">송달료, 보관금, 종결에 따른 잔액조회</th>\n' +
        '                  <td colspan="2">사건이 종결되고 송달료 종결 혹은 보관금계좌가 종결된 경우에만 조회 가능합니다.</td>\n' +
        '                </tr>\n' +
        '\n' +
        '                <tr>\n' +
        '                  <th>판결도달일</th>\n' +
        '                  <td>&nbsp;</td>\n' +
        '                  <th>확정일</th>\n' +
        '                  <td>&nbsp;</td>\n' +
        '                </tr>\n' +
        '              </tbody></table>\n' +
        '              <!-- //tableVer  -->\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '              <div class="titleH2">최근기일내용\n' +
        '\n' +
        '\n' +
        '              </div>\n' +
        '\n' +
        '              <!-- tableHor-->\n' +
        '              <table class="tableHor" summary="최근기일내용 4건만 표시 됩니다.">\n' +
        '                <caption>최근기일내용</caption>\n' +
        '                <thead>\n' +
        '                  <tr>\n' +
        '\n' +
        '                    <th scope="col">일자</th>\n' +
        '                    <th scope="col">시각</th>\n' +
        '                    <th scope="col">기일구분</th>\n' +
        '                    <th scope="col">기일장소</th>\n' +
        '                    <th scope="col">결과</th>\n' +
        '\n' +
        '                  </tr>\n' +
        '                </thead>\n' +
        '                <tbody>\n' +
        '\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td colspan="5">지정된 기일내용이 없습니다.</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                </tbody>\n' +
        '              </table>\n' +
        '              <div class="conTextBul">최근 기일 순으로 일부만 보입니다. 반드시 상세보기로 확인하시기 바랍니다.</div>\n' +
        '\n' +
        '\n' +
        '\n' +
        '              <div class="titleH2">최근 제출서류 접수내용\n' +
        '\n' +
        '                <a class="fr blueBtn" href="#" onclick="javascript:goMove(\'3\');">상세보기</a>\n' +
        '\n' +
        '              </div>\n' +
        '\n' +
        '              <!-- tableHor-->\n' +
        '              <table class="tableHor" summary="최근 제출서류 4건만 표시 됩니다.">\n' +
        '                <caption>최근 제출서류 접수내용</caption>\n' +
        '                <thead>\n' +
        '                  <tr>\n' +
        '                    <th scope="col">일 자</th>\n' +
        '                    <th scope="col">내 용</th>\n' +
        '                  </tr>\n' +
        '                </thead>\n' +
        '                <tbody>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td>2021.01.29</td>\n' +
        '                    <td class="tit">피고 김진식 답변서 제출</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                </tbody>\n' +
        '              </table>\n' +
        '              <div class="conTextBul">최근 제출서류 순으로 일부만 보입니다. 반드시 상세보기로 확인하시기 바랍니다.</div>\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '              <div class="titleH2">당사자내용</div>\n' +
        '\n' +
        '              <!-- tableHor-->\n' +
        '              <table class="tableHor" summary="당사자내용을 조회 합니다.">\n' +
        '                <caption>당사자내용</caption>\n' +
        '                <thead>\n' +
        '                  <tr>\n' +
        '                    <th scope="col">구 분</th>\n' +
        '                    <th scope="col">이 름</th>\n' +
        '                    <th scope="col">종국결과</th>\n' +
        '\n' +
        '                    <th scope="col">판결도달일</th>\n' +
        '                    <th scope="col">확정일</th>\n' +
        '                  </tr>\n' +
        '                </thead>\n' +
        '                <tbody>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td>&nbsp;원고</td>\n' +
        '                    <td class="tit">&nbsp;1. 김병철 </td>\n' +
        '                    <td>&nbsp;  </td>\n' +
        '                    <td>&nbsp;</td>\n' +
        '                    <td>&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td>&nbsp;피고</td>\n' +
        '                    <td class="tit">&nbsp;1. 김진식 </td>\n' +
        '                    <td>&nbsp;  </td>\n' +
        '                    <td>&nbsp;</td>\n' +
        '                    <td>&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                </tbody>\n' +
        '              </table>\n' +
        '\n' +
        '\n' +
        '\n' +
        '              <div class="titleH2">대리인내용</div>\n' +
        '\n' +
        '              <!-- tableHor-->\n' +
        '              <table class="tableHor" summary="대리인내용을 조회 합니다.">\n' +
        '                <caption>대리인내용</caption>\n' +
        '                <thead>\n' +
        '                  <tr>\n' +
        '                    <th scope="col">구 분</th>\n' +
        '                    <th scope="col">이 름</th>\n' +
        '                  </tr>\n' +
        '                </thead>\n' +
        '                <tbody>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td>&nbsp;원고 소송대리인</td>\n' +
        '                    <td class="tit">&nbsp;변호사 강청현</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                </tbody>\n' +
        '              </table>\n' +
        '\n' +
        '\n' +
        '\n' +
        '               <div class="btnBox"><a href="#top" class="topBtn">Top</a></div>\n' +
        '\n' +
        '            </div>  <!-- subTab1 -->\n' +
        '          </div> <!-- tabContents -->\n' +
        '        </div> <!-- subTab2 -->\n' +
        '      </div> <!-- tab1 -->\n' +
        '    </div> <!-- tabContents -->\n' +
        '  </div> <!-- tab -->\n' +
        '</div> <!-- contentIn -->\n' +
        '\n' +
        '<form name="goForm" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '<input type="hidden" name="cmd" value="cv.SFCV02s01Cmd">\n' +
        '<input type="hidden" name="sch_bub_cd" value="000412">    <!-- 2011.10.04 장진범 [11LG-SF0047]  -->\n' +
        '<input type="hidden" name="sch_bub_nm" value="부산지법동부지원">\n' +
        '<input type="hidden" name="sa_year" value="2020">\n' +
        '<input type="hidden" name="sch_sa_gbn" value="가소">\n' +
        '<input type="hidden" name="sa_serial" value="377585">\n' +
        '<input type="hidden" name="ds_nm" value="김병철">\n' +
        '<input type="hidden" name="link" value="N">\n' +
        '<input type="hidden" name="type" value="">\n' +
        '<input type="hidden" name="theme" value="scourt">\n' +
        '<input type="hidden" name="mode" value="">\n' +
        '<input type="hidden" name="gongYn" value="">   \n' +
        '<input type="hidden" name="mysafindYn" value="Y">   \n' +
        '<input type="hidden" name="auth" value="rgIO94GV7fltbMUPWQxgloI0iiOz/c78AZ3rbHlEKaA=">\n' +
        '</form>\n' +
        '\n' +
        '<form name="goLinkForm" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '<input type="hidden" name="cmd" value="">\n' +
        '<input type="hidden" name="sch_bub_cd" value="">\n' +
        '<input type="hidden" name="sch_bub_nm" value="">\n' +
        '<input type="hidden" name="sa_year" value="">\n' +
        '<input type="hidden" name="sch_sa_gbn" value="">\n' +
        '<input type="hidden" name="sa_serial" value="">\n' +
        '<input type="hidden" name="ds_nm" value="김병철">\n' +
        '<input type="hidden" name="link" value="N">\n' +
        '<input type="hidden" name="type" value="">\n' +
        '<input type="hidden" name="theme" value="scourt">\n' +
        '<input type="hidden" name="mode" value="">\n' +
        '<input type="hidden" name="gongYn" value="">   \n' +
        '<input type="hidden" name="mysafindYn" value="Y">   \n' +
        '<input type="hidden" name="linkValue" value="cv.SFCV01s01Cmd#000412#부산지법동부지원#2020#가소#377585#김병철#20200030377585#N">\n' +
        '<input type="hidden" name="auth" value="">\n' +
        '</form>\n' +
        '\n' +
        '<form name="goPopupForm" method="post" action="/sf/servlet/SFSuperSvl" target="_blank">\n' +
        '<input type="hidden" name="cmd" value="cm.SFCM01s02Cmd">\n' +
        '<input type="hidden" name="sch_bub_cd" value="000412">    <!-- 2011.10.04 장진범 [11LG-SF0047]  -->\n' +
        '<input type="hidden" name="sch_bub_nm" value="부산지법동부지원">\n' +
        '<input type="hidden" name="sa_year" value="2020">\n' +
        '<input type="hidden" name="sch_sa_gbn" value="가소">\n' +
        '<input type="hidden" name="sa_serial" value="377585">\n' +
        '<input type="hidden" name="ds_nm" value="김병철">\n' +
        '<input type="hidden" name="jp_nm" value="민사24단독">\n' +
        '<input type="hidden" name="tel" value="(전화:780-1337(재판 관련),1307(이행권고결정 및 각종 보정 관련 문의))">\n' +
        '<input type="hidden" name="link" value="N">\n' +
        '<input type="hidden" name="type" value="">\n' +
        '<input type="hidden" name="theme" value="scourt">\n' +
        '<input type="hidden" name="mode" value="">\n' +
        '<input type="hidden" name="gongYn" value="">   \n' +
        '<input type="hidden" name="mysafindYn" value="Y">   \n' +
        '</form>\n' +
        '\n' +
        '<script language="javascript" type="text/javascript">\n' +
        '//<![CDATA[\n' +
        '\n' +
        'function goMove(type)\n' +
        '{\n' +
        ' console.log("123")' +
        // '  document.goForm.type.value = type;\n' +
        // '  document.goForm.submit();\n' +
        '}\n' +
        '\n' +
        '// 2011.10.04 [11LG-SF0047] 홈페이지 사건검색에서 호출함수에 대한 파라미터 방식 변경 - 장진범\n' +
        'function goLinkMove(bub_cd, bub_nm, cmd, sa_year, sa_gbn, sa_serial, auth)\n' +
        '{\n' +
        '  document.goLinkForm.cmd.value = cmd;\n' +
        '  document.goLinkForm.sch_bub_cd.value = bub_cd;\n' +
        '  document.goLinkForm.sch_bub_nm.value = bub_nm;\n' +
        '  document.goLinkForm.sa_year.value = sa_year;\n' +
        '  document.goLinkForm.sch_sa_gbn.value = sa_gbn;\n' +
        '  document.goLinkForm.sa_serial.value = sa_serial;\n' +
        '  document.goLinkForm.link.value = "Y";\n' +
        '  document.goLinkForm.auth.value = auth;\n' +
        '  document.goLinkForm.submit();\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function goCheckReturn() {\n' +
        '  goCheckBalance(\'000412\',\n' +
        '                 \'2020\',\n' +
        '                 \'가소\',\n' +
        '                 \'377585\',\n' +
        '                 \'김병철\',\n' +
        '                 \'민사24단독\',\n' +
        '                 \'(전화:780-1337(재판 관련),1307(이행권고결정 및 각종 보정 관련 문의))\',\n' +
        '                 \'scourt\'\n' +
        '                );\n' +
        '}\n' +
        '\n' +
        '//]]>\n' +
        '</script>\n' +
        '\n' +
        '\n' +
        '\n' +
        '</body><whale-quicksearch translate="no"></whale-quicksearch></html>');
})

router.get('/v1/test2', (req, res) => {
    res.send(''+'<html lang="ko"><head>\n' +
        '<title>민사사건 진행내용</title>\n' +
        '</head>\n' +
        '<body>\n' +
        '\n' +
        '<form name="print_preview" method="post" action="">\n' +
        '  <input type="hidden" name="print_html" value="">\n' +
        '</form>\n' +
        '\n' +
        '<div class="contentIn">\n' +
        '  \n' +
        '  <!--  Tab (사건번호로조회/인증서검색) -->\n' +
        '  <h1 class="title">사건번호로 검색</h1>\n' +
        '  <div class="tab">\n' +
        '\n' +
        '    <ul class="tabTitle">\n' +
        '      <li id="btnSafindTab" class="tab1 active first"><a href="#" tabindex="1" class="active">사건번호로 검색</a></li>\n' +
        '      <li id="btnGongInTab" class="tab2 mhid" onkeypress="if(event.keyCode == 13){tabEnter(\'gonginGo\');}"><a href="#" tabindex="1">인증서로 검색</a></li>\n' +
        '    </ul>\n' +
        '\n' +
        '    \n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '<script language="javascript" type="text/javascript" src="/js/sfr/sfrUtil.js?ver=20190829"></script>\n' +
        '<script language="javascript" type="text/javascript" src="/js/sfr/sfr_inc_new.js?ver=20190829"></script>\n' +
        '<script language="JavaScript" type="text/JavaScript">\n' +
        '  //<![CDATA[\n' +
        '\n' +
        '  //소스보기 제어\n' +
        '  window.document.oncontextmenu = new Function("return false");\n' +
        '\n' +
        '//]]>\n' +
        '</script> \n' +
        '\n' +
        '<form id="sanoform2" name="sanoform2" method="post" action=""> \t\n' +
        '  <input type="hidden" name="cmd" value="">\n' +
        '  <input type="hidden" name="sch_sa_gbn" value="">\n' +
        '  <input type="hidden" name="sa_serial" value="">\n' +
        '  <input type="hidden" name="sa_year" value="">\n' +
        '  <input type="hidden" name="ds_nm" value="">\n' +
        '  <input type="hidden" name="link" value="N">\n' +
        '  <input type="hidden" name="gongYn" value="Y">\n' +
        '  <input type="hidden" name="gongListLinkYn" value="Y">\n' +
        '  <input type="hidden" name="sch_bub_cd" value="">\n' +
        '  <input type="hidden" name="sch_bub_nm" value="">\n' +
        '  <input type="hidden" name="auth" value="">\n' +
        '</form>\n' +
        '\n' +
        '\n' +
        '\n' +
        '<form id="gonginform" name="gonginform" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '  <input type="hidden" name="cmd" value="cm.SFCM02s05Cmd">\n' +
        '  <input type="hidden" name="initChk" value="Y">\n' +
        '</form>\n' +
        '\n' +
        '\n' +
        '\n' +
        '<form id="logoutform" name="logoutform" method="post" action="/sf/servlet/SFSuperSvl">\n' +
        '  <input type="hidden" name="cmd" value="cm.SFCM02s06Cmd">\n' +
        '  <input type="hidden" name="gongIn" value="Y">\n' +
        '</form>\n' +
        '\n' +
        '\n' +
        '\n' +
        '<script language="JavaScript" type="text/JavaScript">\n' +
        '//<![CDATA[\n' +
        '    var vGong = "";\n' +
        '    if ( "Y" == vGong ){ \n' +
        '      $("#btnSafindTab").attr("class", "first");\n' +
        '      $("#btnGongInTab").attr("class", "active mhid");\n' +
        '    }\n' +
        '//]]>\n' +
        '</script> \n' +
        '\n' +
        ' \n' +
        '\n' +
        '  \n' +
        '    <!--  tabContents -->\n' +
        '    <div id="tabContents" class="tabContents">\n' +
        '      <!-- tab1 -->\n' +
        '      <div id="tab1" class="tabContent active">\n' +
        '        \n' +
        '        <!--  bannerHor2  -->\n' +
        '        <div class="bannerHor2">\n' +
        '          <ul>\n' +
        '            <li><a href="http://ecfs.scourt.go.kr" tabindex="1" target="_blank"><img src="/common/images/banner_01.png" alt="본 사이트에서 제공된 사건정보는 법적인 효력이 없으니, 참고자료로만 활용하시기 바랍니다. 민사, 특허 등 전자소송으로 진행되는 사건에 대해서는 전자소송홈페이지를 이용하시면 판결문이나 사건기록을 모두 인터넷으로 보실 수 있습니다.(새창열림)"></a></li>\n' +
        '          </ul>\n' +
        '        </div>\n' +
        '        <!--  //bannerHor2 -->\n' +
        '\n' +
        '        <!-- subTab (사건일반내용/사건진행내용)-->\n' +
        '        <h1 class="title">사건진행내용</h1>\n' +
        '        <div class="subTab2">\n' +
        '          <ul class="subTabTitle2">\n' +
        '            <li class="subTab1 first" onkeypress="if(event.keyCode == 13){goMove(\'default\');}" onclick="javascript:goMove(\'default\');"><a href="#" tabindex="1">사건일반내용</a></li>\n' +
        '            <li class="subTab2 active"><a href="#" tabindex="1" class="active">사건진행내용</a></li>\n' +
        '            <li class="btn">\n' +
        '              <div>\n' +
        '                <a class="blueBtn" href="#" onclick="javascript:printPreview(\'scourt\');" title="인쇄하기(새창열림)">인쇄하기</a>\n' +
        '\n' +
        '                <a class="blueBtn" href="/sf/mysafind.jsp?theme=scourt">나의 사건 검색하기</a>\n' +
        '\n' +
        '              </div>\n' +
        '            </li>\n' +
        '          </ul>\n' +
        '\n' +
        '          <!--  tabContents -->\n' +
        '          <div class="subTabContents">\n' +
        '            <!--  tab2 -->\n' +
        '            <div id="subTab2" class="subTabContent active">\n' +
        '              \n' +
        '              <div class="infoBox">\n' +
        '                <div class="conTextBul">\n' +
        '                  <span class="blue">사건번호 : 부산지방법원 동부지원 2020가소377585</span>\n' +
        '                </div>\n' +
        '              </div>\n' +
        '              \n' +
        '              <div class="titleH2">기본내용\n' +
        '\n' +
        '              <a class="fr blueBtn" href="#" onclick="javascript:goLocation(\'https://www.scourt.go.kr/BubLocLink.jsp?bub_cd=000412\');" title="청사배치(새창열림)">청사배치</a>\n' +
        '\n' +
        '              </div>\n' +
        '              \n' +
        '              <!-- tableVer  -->\n' +
        '              <table class="tableVer" summary="사건의 기본내용을 조회 합니다.">\n' +
        '                <caption>기본내용</caption>\n' +
        '\n' +
        '                <tbody><tr>\n' +
        '                  <th>사건번호</th>\n' +
        '                  <td>&nbsp;2020가소377585</td>\n' +
        '                  <th>사건명</th>\n' +
        '                  <!-- 2010.10.25 [11LG-SF0022][CJS2] 전자소송 사건인 경우 사건명 앞에 전자표시 - 최형욱 -->\n' +
        '                  <td><font color="green">[전자]</font>  &nbsp;임금</td>\n' +
        '                </tr>\n' +
        '\n' +
        '                <tr>\n' +
        '                  <th>원고</th>\n' +
        '                  <td>&nbsp;김병철</td>\n' +
        '                  <th>피고</th>\n' +
        '                  <td>&nbsp;김진식</td>\n' +
        '                </tr>\n' +
        '                <tr>\n' +
        '                  <th>재판부</th>\n' +
        '                  <td colspan="3">&nbsp;민사24단독 (전화:780-1337(재판 관련),1307(이행권고결정 및 각종 보정 관련 문의))</td>\n' +
        '                </tr>\n' +
        '                <tr>\n' +
        '                  <th>접수일</th>\n' +
        '                  <td>&nbsp;2020.12.28</td>\n' +
        '                  <th>종국결과</th>\n' +
        '                  <td>&nbsp; </td>\n' +
        '                </tr>\n' +
        '              </tbody></table>\n' +
        '              <!-- //tableVer  -->\n' +
        '\n' +
        '\n' +
        '              <div class="titleH2">진행내용 \n' +
        '                <div class="fr">\n' +
        '                  <label for="select" class="hidden">진행내용구분</label>\n' +
        '                  <select name="select" id="select" class="graySelect" title="진행내용구분">\n' +
        '                    <option value="0" selected="selected">전 체</option>\n' +
        '                    <option value="1">기 일</option>\n' +
        '                    <option value="2">명 령</option>\n' +
        '                    <option value="3">제출서류</option>\n' +
        '                    <option value="4">송 달</option>\n' +
        '                  </select>\n' +
        '                  <a class="fr blueBtn" href="#" onclick="javascript:goMove(document.getElementsByName(\'select\')[0].options[document.getElementsByName(\'select\')[0].selectedIndex].value);">선택</a>\n' +
        '                </div>\n' +
        '              </div>\n' +
        '\n' +
        '              <div class="infoBox">\n' +
        '                        <!-- 2013.12.06 [13A-SF-1021] [사건검색]홈페이지 사건검색 진행내용 Tab 화면설명문구 수정 - 김윤수 -->\n' +
        '                        <div class="conTextBul">\n' +
        '                          송달결과(2007.03.12전에는 재판부에서 등록한 내용에, 그 이후에는 우정사업본부로부터 전송받은 내용에 한함) 를 조회하고자 \n' +
        '                          할 경우에는 아래 ‘확인’ 항목에 체크하시기 바랍니다.\n' +
        '                        </div>\n' +
        '                        <div class="mt10">\n' +
        '                          <label for="songdalchk">결과저장</label>\n' +
        '                          <input name="songdalchk" type="checkbox" id="songdalchk" class="noLine" checked="checked" onclick="javascript:clickSongdalchk();"> 확인\n' +
        '                        </div>\n' +
        '                        <div class="conTextBul red">\n' +
        '                          송달결과는 법적인 효력이 없는 참고사항에 불과하고, 추후 송달이 착오에 말미암은 것이거나 부적법한 경우 변경될 수 있습니다. \n' +
        '                        </div>\n' +
        '                        <div class="conTextBul red">\n' +
        '                          송달결과는 ‘0시 도달’로 나타나는 경우에는 기간 계산 시 초일이 산입된다는 점에 유의하시기 바랍니다. \n' +
        '                        </div>\n' +
        '\n' +
        '                      </div>\n' +
        '\n' +
        '              <!-- tableHor-->\n' +
        '              <table class="tableHor" summary="진행내용(기일, 명령, 제출서류, 송달)의 목록 조회 입니다.">\n' +
        '                <caption>진행내용리스트</caption>\n' +
        '                <thead>\n' +
        '                  <tr>\n' +
        '\n' +
        '                    <th scope="col" width="10%">일자</th>\n' +
        '                    <th scope="col" width="55%">내용</th>\n' +
        '                    <th scope="col" width="20%">결과</th>\n' +
        '                    <th scope="col" width="15%">공시문</th>\n' +
        '\n' +
        '                  </tr>\n' +
        '                </thead>\n' +
        '                <tbody>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td style="color: #000000;">&nbsp;2020.12.28</td>\n' +
        '                    <td class="tit" style="color: #000000;">&nbsp;소장접수</td>\n' +
        '<!-- 2007.03.23 [재판 SF 07-0031] -->\n' +
        '<!-- 2012.05.14 [12LG-SF0013] [홈페이지 사건검색] 송달이 되었을때 송달자 확인이 가능하도록 개선 - 장진범 -->\n' +
        '\n' +
        '                    <td style="color: #000000;">&nbsp;</td>\n' +
        '\n' +
        '                    <td scope="col" style="color: #000000;">&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td style="color: #336633;">&nbsp;2021.01.19</td>\n' +
        '                    <td class="tit" style="color: #336633;">&nbsp;이행권고결정</td>\n' +
        '<!-- 2007.03.23 [재판 SF 07-0031] -->\n' +
        '<!-- 2012.05.14 [12LG-SF0013] [홈페이지 사건검색] 송달이 되었을때 송달자 확인이 가능하도록 개선 - 장진범 -->\n' +
        '\n' +
        '                    <td style="color: #336633;">&nbsp;</td>\n' +
        '\n' +
        '                    <td scope="col" style="color: #336633;">&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td style="color: #CC6600;">&nbsp;2021.01.20</td>\n' +
        '                    <td class="tit" style="color: #CC6600;">&nbsp;피고 김진식에게 이행권고결정등본/소송안내서(21.01.19) 송달</td>\n' +
        '<!-- 2007.03.23 [재판 SF 07-0031] -->\n' +
        '<!-- 2012.05.14 [12LG-SF0013] [홈페이지 사건검색] 송달이 되었을때 송달자 확인이 가능하도록 개선 - 장진범 -->\n' +
        '\n' +
        '                    <td>&nbsp;<a onclick="javascript:goSongdalResult(\'부산지방법원 동부지원\',\'2020가소377585\',\'2021.01.20\', \'피고 김진식에게 이행권고결정등본/소송안내서(21.01.19) 송달\', \'2021.01.22 도달\', \'동거인(자녀)\')">\n' +
        '                      <font color="#CC6600">2021.01.22 도달</font></a></td>\n' +
        '\n' +
        '                    <td scope="col" style="color: #CC6600;">&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td style="color: #000000;">&nbsp;2021.01.29</td>\n' +
        '                    <td class="tit" style="color: #000000;">&nbsp;피고 김진식 이의신청</td>\n' +
        '<!-- 2007.03.23 [재판 SF 07-0031] -->\n' +
        '<!-- 2012.05.14 [12LG-SF0013] [홈페이지 사건검색] 송달이 되었을때 송달자 확인이 가능하도록 개선 - 장진범 -->\n' +
        '\n' +
        '                    <td style="color: #000000;">&nbsp;</td>\n' +
        '\n' +
        '                    <td scope="col" style="color: #000000;">&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td style="color: #660000;">&nbsp;2021.01.29</td>\n' +
        '                    <td class="tit" style="color: #660000;">&nbsp;피고 김진식 답변서 제출</td>\n' +
        '<!-- 2007.03.23 [재판 SF 07-0031] -->\n' +
        '<!-- 2012.05.14 [12LG-SF0013] [홈페이지 사건검색] 송달이 되었을때 송달자 확인이 가능하도록 개선 - 장진범 -->\n' +
        '\n' +
        '                    <td style="color: #660000;">&nbsp; </td>\n' +
        '\n' +
        '                    <td scope="col" style="color: #660000;">&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td style="color: #CC6600;">&nbsp;2021.02.02</td>\n' +
        '                    <td class="tit" style="color: #CC6600;">&nbsp;원고 소송대리인 변호사 강청현에게 답변서부본(21.01.29.자) 송달</td>\n' +
        '<!-- 2007.03.23 [재판 SF 07-0031] -->\n' +
        '<!-- 2012.05.14 [12LG-SF0013] [홈페이지 사건검색] 송달이 되었을때 송달자 확인이 가능하도록 개선 - 장진범 -->\n' +
        '\n' +
        '                    <td>&nbsp;<a onclick="javascript:goSongdalResult(\'부산지방법원 동부지원\',\'2020가소377585\',\'2021.02.02\', \'원고 소송대리인 변호사 강청현에게 답변서부본(21.01.29.자) 송달\', \'2021.02.03 도달\', \'본인\')">\n' +
        '                      <font color="#CC6600">2021.02.03 도달</font></a></td>\n' +
        '\n' +
        '                    <td scope="col" style="color: #CC6600;">&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                  <tr>\n' +
        '                    <td style="color: #660000;">&nbsp;2021.08.11</td>\n' +
        '                    <td class="tit" style="color: #660000;">&nbsp;원고 소송대리인 강청현 소송대리인 사임서 제출</td>\n' +
        '<!-- 2007.03.23 [재판 SF 07-0031] -->\n' +
        '<!-- 2012.05.14 [12LG-SF0013] [홈페이지 사건검색] 송달이 되었을때 송달자 확인이 가능하도록 개선 - 장진범 -->\n' +
        '\n' +
        '                    <td style="color: #660000;">&nbsp; </td>\n' +
        '\n' +
        '                    <td scope="col" style="color: #660000;">&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '<tr>\n' +
        '                    <td style="color: #660000;">&nbsp;2021.08.11</td>\n' +
        '                    <td class="tit" style="color: #660000;">&nbsp;원고 소송대리인 강청현 소송위임장 제출</td>\n' +
        '<!-- 2007.03.23 [재판 SF 07-0031] -->\n' +
        '<!-- 2012.05.14 [12LG-SF0013] [홈페이지 사건검색] 송달이 되었을때 송달자 확인이 가능하도록 개선 - 장진범 -->\n' +
        '\n' +
        '                    <td style="color: #660000;">&nbsp; </td>\n' +
        '\n' +
        '                    <td scope="col" style="color: #660000;">&nbsp;</td>\n' +
        '                  </tr>\n' +
        '\n' +
        '                </tbody>\n' +
        '              </table>\n' +
        '              <!-- //tableHor  -->\n' +
        '              \n' +
        '\n' +
        '              <div class="infoBox">\n' +
        '                <div class="conTextBul">\n' +
        '                  송달내용은 법원에서 해당 당사자(대리인)에게 해당 내용의 송달물을 발송한 내용입니다.\n' +
        '                </div>\n' +
        '                <div class="conTextBul">\n' +
        '                  송달간주(발송송달)는 민사소송법 제189조에 의하여 서류를 당사자가 직접 송달 받지 않았다 하더라도 우체국 접수 시 송달된 것으로 간주되어 송달효력이 발생하는 제도입니다.\n' +
        '                </div>\n' +
        '              </div>\n' +
        '\n' +
        '              <div class="btnBox"><a href="#top" class="topBtn">Top</a></div>\n' +
        '\n' +
        '            </div>  <!-- subTab1 -->\n' +
        '          </div> <!-- tabContents --> \n' +
        '        </div> <!-- subTab2 -->\n' +
        '      </div> <!-- tab1 -->\n' +
        '    </div> <!-- tabContents -->\n' +
        '  </div> <!-- tab -->\n' +
        '</div> <!-- contentIn -->\n' +
        '\n' +
        '<form name="goForm" method="post" action="/sf/servlet/SFSuperSvl"> \n' +
        '<input type="hidden" name="cmd" value="cv.SFCV02s01Cmd">\n' +
        '<input type="hidden" name="sch_bub_cd" value="000412">    <!-- 2011.10.04 장진범 [11LG-SF0047]  -->\n' +
        '<input type="hidden" name="sch_bub_nm" value="부산지법동부지원">\n' +
        '<input type="hidden" name="sa_year" value="2020">\n' +
        '<input type="hidden" name="sch_sa_gbn" value="가소">\n' +
        '<input type="hidden" name="sa_serial" value="377585">\n' +
        '<input type="hidden" name="ds_nm" value="김병철">\n' +
        '<input type="hidden" name="type" value="0">\n' +
        '<input type="hidden" name="theme" value="scourt">\n' +
        '<input type="hidden" name="mode" value="">\n' +
        '<input type="hidden" name="gongYn" value="">   \n' +
        '<input type="hidden" name="mysafindYn" value="Y">   \n' +
        '<input type="hidden" name="auth" value="rgIO94GV7fltbMUPWQxgloI0iiOz/c78AZ3rbHlEKaA=">\n' +
        '<input type="hidden" name="page" value="1">\n' +
        '<input type="hidden" name="perPage" value="1000">\n' +
        '</form>\n' +
        '\n' +
        '<form name="goIgongForm" method="post" action="/sf/servlet/SFSuperSvl"> \n' +
        '<input type="hidden" name="cmd" value="igong.SD208s01Cmd">\n' +
        '<input type="hidden" name="bub_nm" value="부산지방법원 동부지원">\n' +
        '<input type="hidden" name="bub_abb" value="부산지법동부지원">\n' +
        '<input type="hidden" name="sa_year" value="2020">\n' +
        '<input type="hidden" name="sa_gubun" value="가소">\n' +
        '<input type="hidden" name="sa_searial" value="377585">\n' +
        '<input type="hidden" name="jp_nm" value="민사24단독">\n' +
        '<input type="hidden" name="sdm_name">\n' +
        '<input type="hidden" name="prt_sdc_nm">\n' +
        '<input type="hidden" name="cr_day">\n' +
        '<input type="hidden" name="sd_day">\n' +
        '</form>\n' +
        '\n' +
        '<script language="javascript" type="text/Javascript">\n' +
        '//<![CDATA[\n' +
        '\n' +
        '\n' +
        'function goMove(type)\n' +
        '{\n' +
        '  if( type=="default" ) {\n' +
        '    document.goForm.cmd.value = "cv.SFCV01s01Cmd";\n' +
        '  } else {\n' +
        '    document.goForm.type.value = type;\n' +
        '  }\n' +
        '  document.goForm.page.value = "1";\n' +
        '\n' +
        '  document.goForm.submit();\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function goPageMove( page )\n' +
        '{\n' +
        '  document.goForm.page.value = page;\n' +
        '  document.goForm.submit();\n' +
        '}\n' +
        '\n' +
        '// 2011.10.04 [11LG-SF0047] 홈페이지 사건검색에서 호출함수에 대한 파라미터 방식 변경 - 장진범\n' +
        'function goLinkMove(bub_cd, bub_nm, cmd, sa_year, sa_gbn, sa_serial, auth)\n' +
        '{\n' +
        '  document.goForm.cmd.value = cmd;\n' +
        '  document.goForm.sch_bub_cd.value = bub_cd;\n' +
        '  document.goForm.sch_bub_nm.value = bub_nm;\n' +
        '  document.goForm.sa_year.value = sa_year;\n' +
        '  document.goForm.sch_sa_gbn.value = sa_gbn;\n' +
        '  document.goForm.sa_serial.value = sa_serial;\n' +
        '  document.goForm.auth.value = auth;\n' +
        '  document.goForm.submit();\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function clickSongdalchk() {\n' +
        '  setCookieSongdal(document.getElementsByName("songdalchk")[0].checked);\n' +
        '  goMove(0);\n' +
        '}\n' +
        '\n' +
        '\n' +
        '// ----------------------------------------------------------\n' +
        '// 설    명 : 파이어폭스 브라우저에서 결과 화면 깨짐 방지\n' +
        '// 파라메터 : 없음\n' +
        '// History  : 2014.01.02 [14A-SF-0002] [사건검색]진행내용 Tab의 안내문구 깨지는 현상 수정 - 김윤수\n' +
        '// ----------------------------------------------------------\n' +
        'function doCrossBrowse() {\n' +
        '    var name = navigator.appName;\n' +
        '    var ver = navigator.appVersion;\n' +
        '    var ver_int = parseInt(navigator.appVersion);\n' +
        '    var ua = navigator.userAgent;\n' +
        '    var infostr;\n' +
        '    if(name == "Microsoft Internet Explorer") {\n' +
        '        var real_ver = parseInt(ua.substring(ua.indexOf("MSIE ") + 5));\n' +
        '        if(real_ver < 7) {\n' +
        '            return;\n' +
        '        }\n' +
        '    }\n' +
        '    var oDiv = document.getElementById("div_jinhaeng_naeyong");\n' +
        '    if (null != oDiv) {\n' +
        '        oDiv.style.clear = "left";\n' +
        '        /* 아래라인은 익스플로러 8에서는 clear가 적용안되는 문제를 해결하기 위해 넣었음. */\n' +
        '        oDiv.innerHTML = oDiv.innerHTML;\n' +
        '    }\n' +
        '}\n' +
        'window.onload = doCrossBrowse;\n' +
        '//]]>\n' +
        '\n' +
        '</script>\n' +
        '\n' +
        '\n' +
        '\n' +
        '</body><whale-quicksearch translate="no"></whale-quicksearch></html>')
})

module.exports = router;
