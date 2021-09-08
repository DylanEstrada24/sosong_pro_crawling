const express = require('express');
const router = express.Router();

require('dotenv').config();

const {validateToken} = require("../config/security/JwtTokenProvider")
// 유저 정보 불러오기
router.get('/v1/test1', (req, res) => {
    res.send(''+
    '<html lang="ko"><head>\n' +
        '  <title>나의 사건검색</title>\n' +
        '  <meta http-equiv="Content-Type" content="text/html; charset=euc-kr">\n' +
        '  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi">\n'+
        '  <link rel="stylesheet" type="text/css" href="/common/css/reset_safind.css">\n' +
        '  <link rel="stylesheet" type="text/css" href="/common/css/layout_safind.css">\n' +
        '  <script type="text/javascript" src="/common/js/jquery-1.12.1.min.js"></script>\n' +
        '  <script type="text/javascript" src="/common/js/basic.js"></script>\n' +
        '  <script type="text/javascript" src="/common/js/respond.min.js"></script>\n' +
        '  <script type="text/javascript" src="/js/SaGubun.js?ver=20210301"></script>\n' +
        '  <script type="text/javascript" src="/js/BubNm.js?ver=20210301"></script>\n' +
        '  <script type="text/javascript" src="/js/SfCommon.js?ver=20190829"></script>\n' +
        '\n' +
        '<script language="JavaScript" type="text/JavaScript">\n' +
        '//<![CDATA[\n' +
        '  var psBubNm    = "";\n' +
        '  var psSchBubNm = "";\n' +
        '  var psSchBubCd = "";\n' +
        '  var psSaYear   = "";\n' +
        '  var psSchSaGbn = "";\n' +
        '  var psSaGubun  = "";\n' +
        '  var psDsNm     = "";\n' +
        '  var psSerial   = "";\n' +
        '  var psSaNm     = "";\n' +
        '  var psStrCookie = "";\n' +
        '\n' +
        'function onLoad() {\n' +
        '  displayCode();\n' +
        '  text_clear();\n' +
        '  text_hint(); \n' +
        '}\n' +
        '\n' +
        '\n' +
        'function displayCode() {\n' +
        '  psStrCookie = \'\';\n' +
        '  var lines = psStrCookie.split("*");\n' +
        '  var tmpStr = "";\n' +
        '  \n' +
        '  if(  "" != ""   &&  "" != ""  )\n' +
        '  {\n' +
        '     ChangeGubun(document.sanoform.sch_bub_nm.options[document.sanoform.sch_bub_nm.selectedIndex].text,document.getElementsByName(\'saveSagbnSortYn\')[0].checked);\n' +
        '     psSchSaGbn = "";\n' +
        '     SetFocus( document.sanoform.sch_bub_nm.options[document.sanoform.sch_bub_nm.selectedIndex].text, \'\', \'\' );\n' +
        '     document.sanoform.sa_serial.value = "";\n' +
        '     document.sanoform.ds_nm.value = "";\n' +
        '     document.sanoform.input_sano.value = "";\n' +
        '  }\n' +
        '  else\n' +
        '  {\n' +
        '    // 2011.10.17 [11LG-SF0059] 홈페이지 사건검색 초기설정값 처리로직 보완 - 장진범\n' +
        '    if (lines.length > 1) {\n' +
        '      for (var i = 0; i <= lines.length-1; i++) {\n' +
        '        tmpstr = lines[i];\n' +
        '        \n' +
        '        var array2 = tmpstr.split("#");\n' +
        '        if(array2.length >= 6) {\n' +
        '            psSchBubNm = psBubNm    = getDBBubNm(array2[0]);\n' +
        '            psSaYear   = array2[1];\n' +
        '            psSchSaGbn = array2[2];\n' +
        '            psSerial   = array2[3];\n' +
        '            psDsNm     = array2[4];\n' +
        '            psSaGubun  = array2[5];\n' +
        '            if(array2.length > 6) psSaNm = array2[6];\n' +
        '            break;\n' +
        '        }\n' +
        '      }\n' +
        '  \n' +
        '      for( var i=0; i<document.sanoform.sch_bub_nm.options.length; i++ ) {\n' +
        '        if ( document.sanoform.sch_bub_nm.options[i].text == psBubNm ) {\n' +
        '          document.sanoform.sch_bub_nm.selectedIndex = i;\n' +
        '          break;\n' +
        '        }\n' +
        '      }\n' +
        '  \n' +
        '    // 2011.10.17 [11LG-SF0060] 홈페이지 나의사건검색 "사건구분 가나다순 정렬"처리로직 수정 - 장진범\n' +
        '      ChangeGubun(document.sanoform.sch_bub_nm.options[document.sanoform.sch_bub_nm.selectedIndex].text,document.getElementsByName(\'saveSagbnSortYn\')[0].checked);\n' +
        '      psSchBubCd = document.sanoform.sch_bub_nm.value; \n' +
        '      document.sanoform.sch_bub_cd.value = psSchBubCd;\n' +
        '      document.sanoform.sel_sa_year.value = psSaYear;\n' +
        '  \n' +
        '      for( var j=0; j<document.sanoform.sa_gubun.options.length; j++ ) {\n' +
        '        if ( document.sanoform.sa_gubun.options[j].text == psSchSaGbn ) {\n' +
        '          document.sanoform.sa_gubun.selectedIndex = j;\n' +
        '          break;\n' +
        '        }\n' +
        '      }  \n' +
        '    } else {\n' +
        '      psStrCookie = \'\';\n' +
        '      var array1 = psStrCookie.split("#");\n' +
        '  \n' +
        '      if (array1.length >= 6) {\n' +
        '        psSchBubNm = psBubNm    = getDBBubNm(array1[0]);\n' +
        '        psSaYear   = array1[1];\n' +
        '        psSchSaGbn = array1[2];\n' +
        '        psSerial   = array1[3];\n' +
        '        psDsNm     = array1[4];\n' +
        '        psSaGubun  = array1[5];\n' +
        '        if(array1.length > 6) psSaNm     = array1[6];\n' +
        '\n' +
        '        for( var i=0; i<document.sanoform.sch_bub_nm.options.length; i++ ) {\n' +
        '          if ( document.sanoform.sch_bub_nm.options[i].text == psBubNm ) {\n' +
        '            document.sanoform.sch_bub_nm.selectedIndex = i;\n' +
        '            break;\n' +
        '          }\n' +
        '        }\n' +
        '  \n' +
        '        // 2011.10.17 [11LG-SF0060] 홈페이지 나의사건검색 "사건구분 가나다순 정렬"처리로직 수정 - 장진범\n' +
        '        ChangeGubun(document.sanoform.sch_bub_nm.options[document.sanoform.sch_bub_nm.selectedIndex].text,document.getElementsByName(\'saveSagbnSortYn\')[0].checked);\n' +
        '        psSchBubCd = document.sanoform.sch_bub_nm.value; \n' +
        '        document.sanoform.sch_bub_cd.value = psSchBubCd;\n' +
        '        document.sanoform.sel_sa_year.value = psSaYear;\n' +
        '  \n' +
        '        for( var j=0; j<document.sanoform.sa_gubun.options.length; j++ ) {\n' +
        '          if ( document.sanoform.sa_gubun.options[j].text == psSchSaGbn ) {\n' +
        '            document.sanoform.sa_gubun.selectedIndex = j;\n' +
        '            break;\n' +
        '          }\n' +
        '        } \n' +
        '      } \n' +
        '      else {\n' +
        '        document.sanoform.sch_bub_nm.selectedIndex = 0;\n' +
        '        // 2011.10.17 [11LG-SF0060] 홈페이지 나의사건검색 "사건구분 가나다순 정렬"처리로직 수정 - 장진범\n' +
        '        ChangeGubun(document.sanoform.sch_bub_nm.options[document.sanoform.sch_bub_nm.selectedIndex].text,document.getElementsByName(\'saveSagbnSortYn\')[0].checked);\n' +
        '        document.sanoform.sel_sa_year.selectedIndex = 0;\n' +
        '        document.sanoform.sa_gubun.selectedIndex = 0;\n' +
        '        psSchBubNm = psBubNm = document.sanoform.sch_bub_nm.options[document.sanoform.sch_bub_nm.selectedIndex].text;\n' +
        '        psSaYear   = document.sanoform.sel_sa_year.value;\n' +
        '        psSchSaGbn = document.sanoform.sa_gubun.options[document.sanoform.sa_gubun.selectedIndex].text;\n' +
        '        psSaGubun  = document.sanoform.sa_gubun.options[document.sanoform.sa_gubun.selectedIndex].value;\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '  psSerial   = "";\n' +
        '  psDsNm     = "";\n' +
        '  psSaNm     = "";\n' +
        '\n' +
        '  document.sanoform.sch_sa_gbn.value = psSchSaGbn;\n' +
        '}\n' +
        '\n' +
        '\n' +
        '//팝업\n' +
        'function MM_openBrWindow(theURL,winName,features) { //v2.0\n' +
        '  window.open(theURL,winName,features);\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function changeSearchWay(checked) {\n' +
        '  if(checked) {\n' +
        '    document.all.div_sa_year.style.display = "none";\n' +
        '    document.all.div_sa_gubun.style.display = "none";\n' +
        '    document.all.div_sa_serial.style.display = "none";\n' +
        '    document.all.div_input_sano.style.display = "inline-block";\n' +
        '  } else {\n' +
        '    document.all.div_sa_year.style.display = "inline-block";\n' +
        '    document.all.div_sa_gubun.style.display = "inline-block";\n' +
        '    document.all.div_sa_serial.style.display = "inline-block";\n' +
        '    document.all.div_input_sano.style.display = "none";\n' +
        '  }\n' +
        '  document.sanoform.inputsano_ch.checked = checked;\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function setSearchWay(strChecked) {\n' +
        '  var checked = ("true" == strChecked)?true:false;\n' +
        '  if(checked) {\n' +
        '      document.all.div_sa_year.style.display = "none";\n' +
        '      document.all.div_sa_gubun.style.display = "none";\n' +
        '      document.all.div_sa_serial.style.display = "none";\n' +
        '      document.all.div_input_sano.style.display = "inline-block";\n' +
        '  } else {\n' +
        '      document.all.div_sa_year.style.display = "inline-block";\n' +
        '      document.all.div_sa_gubun.style.display = "inline-block";\n' +
        '      document.all.div_sa_serial.style.display = "inline-block";\n' +
        '      document.all.div_input_sano.style.display = "none";\n' +
        '  }\n' +
        '  document.sanoform.inputsano_ch.checked = checked;\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function jf_GetYear(year) {\n' +
        '  var iYear=0;\n' +
        '  year=year.replace(/\\s/g, \'\');\n' +
        '\n' +
        '  if (year.length != 2 && year.length != 4) {\n' +
        '    return "";\n' +
        '  }\n' +
        '\n' +
        '  for (var i=0; i< year.length ; i++ )\n' +
        '  {\n' +
        '    if ( year.charAt(i) < "0" || year.charAt(i) > "9" ) {\n' +
        '      return "";\n' +
        '    }\n' +
        '  }\n' +
        '\n' +
        '  iYear = parseInt(year, 10);\n' +
        '\n' +
        '  if (year.length == 2) {\n' +
        '    if(iYear >= 50) iYear = iYear + 1900;\n' +
        '    else iYear = iYear + 2000;\n' +
        '  }\n' +
        '\n' +
        '  if(iYear > 2021) {\n' +
        '    return "";\n' +
        '  } else {\n' +
        '    return iYear.toString();\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function text2SelectSano() {\n' +
        '  var pos = 0;\n' +
        '  var year = "";\n' +
        '  var saGbn = "";\n' +
        '  var saSerial = "";\n' +
        '  var tmp = ""\n' +
        '  var i = 0;\n' +
        '\n' +
        '  var saNo = document.sanoform.input_sano.value;\n' +
        '  saNo = saNo.replace(/\\s/g, \'\');\n' +
        '\n' +
        '  i = 0;\n' +
        '  for (;i< saNo.length ; i++ ) {\n' +
        '    if (saNo.charAt(i) < "0" || saNo.charAt(i) > "9") {\n' +
        '      pos = i;\n' +
        '      break;\n' +
        '    }\n' +
        '  }\n' +
        '\n' +
        '  // 년도\n' +
        '  year  = saNo.substr(0,pos);\n' +
        '  year = jf_GetYear(year);\n' +
        '  if (year.length != 4) {\n' +
        '    alert("올바른 연도를 입력하세요.");\n' +
        '    return false;\n' +
        '  }\n' +
        '  document.sanoform.sa_year.value = year;\n' +
        '\n' +
        '  i = 0;\n' +
        '  for( ; i < document.sanoform.sel_sa_year.options.length; i++ ) {\n' +
        '    if ( year == document.sanoform.sel_sa_year.options[i].value ) {\n' +
        '      document.sanoform.sel_sa_year.selectedIndex = i;\n' +
        '      break;\n' +
        '    }\n' +
        '  }\n' +
        '\n' +
        '  // 사건구분\n' +
        '  tmp = saNo.substr(pos,saNo.length);\n' +
        '  i = 0;\n' +
        '  for (;i< tmp.length ; i++ ) {\n' +
        '    if (tmp.charAt(i) >= "0" && tmp.charAt(i) <= "9") {\n' +
        '      pos = i;\n' +
        '      break;\n' +
        '    }\n' +
        '  }\n' +
        '\n' +
        '  saGbn = tmp.substr(0,pos);\n' +
        '  saSerial = tmp.substr(pos, tmp.length);\n' +
        '\n' +
        '  i = 0;\n' +
        '  for( ; i < document.sanoform.sa_gubun.options.length; i++ ) {\n' +
        '    if ( saGbn == document.sanoform.sa_gubun.options[i].text ) {\n' +
        '      document.sanoform.sa_gubun.selectedIndex = i;\n' +
        '      break;\n' +
        '    }\n' +
        '  }\n' +
        '  if( i == document.sanoform.sa_gubun.options.length ) {\n' +
        '    alert("올바른 사건구분을 입력하세요.");\n' +
        '    return false;\n' +
        '  }\n' +
        '\n' +
        '\n' +
        '  if (saSerial == "" || saSerial.length > 7) {\n' +
        '    alert("올바른 사건번호를 입력하세요.");\n' +
        '    return false;\n' +
        '  }\n' +
        '\n' +
        '  // 사건일련번호\n' +
        '  document.sanoform.sa_serial.value = saSerial;\n' +
        '  return true;\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function SearchSano() \n' +
        '{\n' +
        '  if(document.sanoform.inputsano_ch.checked) {\n' +
        '    if(!text2SelectSano()) return false;\n' +
        '  } else {\n' +
        '    document.sanoform.sa_year.value = document.sanoform.sel_sa_year.value;\n' +
        '  }\n' +
        '\n' +
        '  var bub_cd = document.sanoform.sch_bub_nm.value;\n' +
        '  var bub_nm = document.sanoform.sch_bub_nm.options[document.sanoform.sch_bub_nm.selectedIndex].text;\n' +
        '  var sa_year = document.sanoform.sa_year.value;\n' +
        '  var sa_gubun = document.sanoform.sa_gubun.options[document.sanoform.sa_gubun.selectedIndex].value;\n' +
        '  var sa_serial = document.sanoform.sa_serial.value;\n' +
        '  var ds_nm = document.sanoform.ds_nm.value;\n' +
        '  var answer = document.sanoform.answer.value;\n' +
        '\n' +
        '  document.sanoform.sch_sa_gbn.value = document.sanoform.sa_gubun.options[document.sanoform.sa_gubun.selectedIndex].text;\n' +
        '  document.sanoform.sch_bub_cd.value = bub_cd; \n' +
        '\n' +
        '  if( bub_nm == "-" ) {\n' +
        '    alert("법원을 다시 선택하십시오.");\n' +
        '    document.sanoform.sch_bub_nm.focus();\n' +
        '    return;\n' +
        '  }\n' +
        '\n' +
        '  if( sa_gubun == "-" ) {\n' +
        '    alert("사건구분을 다시 선택하십시오.");\n' +
        '    document.sanoform.sa_gubun.focus();\n' +
        '    return;\n' +
        '  }\n' +
        '\n' +
        '  sa_serial = sa_serial.replace(/^\\s*|\\s*$/g, \'\');\n' +
        '  document.sanoform.sa_serial.value = sa_serial;\n' +
        '\n' +
        '  if( sa_serial == "" ) {\n' +
        '    alert("사건일련번호를 입력하십시오.");\n' +
        '    document.sanoform.sa_serial.focus();\n' +
        '    return;\n' +
        '  }\n' +
        '\n' +
        '  // 2014.04.07 [14A-SF-0020] [사건검색]홈페이지 사건검색 금칙어 처리 개선  - 김윤수\n' +
        '  ds_nm = ds_nm.replace(/\\s/g, \'\');\n' +
        '  if(ds_nm == "당사자명필수입력" || ds_nm.length < 2 ) {\n' +
        '    alert("당사자명을 2자이상 입력하십시오.");\n' +
        '    document.sanoform.ds_nm.focus();\n' +
        '    return;\n' +
        '  }\n' +
        '  document.sanoform.ds_nm.value = ds_nm;\n' +
        '  // 2014.04.07 [14A-SF-0020] END\n' +
        '\n' +
        '  var  anum=/(^\\d+$)|(^\\d+\\.\\d+$)/  \n' +
        '\n' +
        '  if(!anum.test(sa_serial))\n' +
        '  {\n' +
        '    alert("사건일련번호는 숫자만 입력하십시오.");\n' +
        '    document.sanoform.sa_serial.value = "";\n' +
        '    document.sanoform.sa_serial.focus();\n' +
        '    return;\n' +
        '  }\n' +
        '\n' +
        // '' var filter_word = /[$\\\\\\\\#\\%\\^\\&\\*\\+\\_\\`\\~\\=\\|\\,\\'\\"\\-\\:\\;\\％\\/]/;//특수문자를 배열\n '+
    '  if (ds_nm.search(filter_word)>=0)\n' +
    '  {\n' +
    '    alert("당사자명에 특수문자는 사용할수없습니다.");\n' +
    '    document.sanoform.ds_nm.value = "";\n' +
    '    document.sanoform.ds_nm.focus();\n' +
    '    return;\n' +
    '  }\n' +
    '\n' +
    '  // ======================================================================\n' +
    '  // 2012.12.22 [12LG-SF0036] 대법원 홈페이지 사건검색에서 금칙어를 사용 할 수 없도록 수정 - 장진범\n' +
    '  var psBanWordList = "회사,주식,카드,현대,대표,한국,신용,삼성,우리,주식회,식회사,주식회사,식회,의료,법인,보험,손해,생명,화재,해상,보증,공사,기금,은행,저축,유동화,증권,유한회사";\n' +
    '  var lines = psBanWordList.split(",");\n' +
    '\n' +
    '  // 2014.04.07 [14A-SF-0020] [사건검색]홈페이지 사건검색 금칙어 처리 개선  - 김윤수\n' +
    '  if( psBanWordList.indexOf(ds_nm)>=0 ) {\n' +
    '    // 2013.02.20 [13LG-SF0009] [대법원홈페이지]사건검색에서 금칙어 추가 및 메세지 변경 - 김윤수\n' +
    '    alert( "[" + ds_nm + "]만 입력하는 경우 검색이 제한됩니다.\\n" + \n' +
    '           "당사자명 전부를 입력하거나, [" + ds_nm + "] 이외의 부분을 추가로 입력하시기 바랍니다.\\n" + \n' +
    '           "당사자명이 2자인 경우, 사건상대방의 이름을 입력하여 조회하시기 바랍니다.");\n' +
    '    document.sanoform.ds_nm.focus();\n' +
    '    return;\n' +
    '  }\n' +
    '\n' +
    '  answer = answer.replace(/\\s/g, \'\');\n' +
    '  if ( answer.length != 6 ) {\n' +
    '    alert("자동입력 방지 문자 6자를 입력하십시오.");\n' +
    '    document.sanoform.answer.focus();\n' +
    '    return;\n' +
    '  }\n' +
    '\n' +
    '  // ======================================================================\n' +
    '    \n' +
    '\n' +
    '  //=========================================================================================================\n' +
    '  // 업무별 Cmd 정의\n' +
    '  //=========================================================================================================\n' +
    '  // 공통시스템연계 2008.08.18 이진욱, 기존의 CMD를 호출하도록 사건구분 변경\n' +
    '  // 형통연계 2009.01.22 고성민, 기존의 CMD를 호출하도록 사건구분 변경\n' +
    '  var cmd_sa_gubun = sa_gubun;\n' +
    '  if(cmd_sa_gubun == "WKS" || cmd_sa_gubun == "wks") cmd_sa_gubun = "ks";\n' +
    '  else if(cmd_sa_gubun == "WHS" || cmd_sa_gubun == "whs") cmd_sa_gubun = "hs";\n' +
    '  else if(cmd_sa_gubun == "WPT" || cmd_sa_gubun == "wpt") cmd_sa_gubun = "pt";\n' +
    '  else if(cmd_sa_gubun == "WGJ" || cmd_sa_gubun == "wgj") cmd_sa_gubun = "gj";\n' +
    '  else if(cmd_sa_gubun == "WCR" || cmd_sa_gubun == "wcr") cmd_sa_gubun = "cr";\n' +
    '  else if(cmd_sa_gubun == "WYM" || cmd_sa_gubun == "wym") cmd_sa_gubun = "ym";\n' +
    '  else if(cmd_sa_gubun == "WGB" || cmd_sa_gubun == "wgb") cmd_sa_gubun = "gb";\n' +
    '  else if(cmd_sa_gubun == "WSB" || cmd_sa_gubun == "wsb") cmd_sa_gubun = "sb";\n' +
    '  else if(cmd_sa_gubun == "WET" || cmd_sa_gubun == "wet") cmd_sa_gubun = "et";\n' +
    '  else if(cmd_sa_gubun == "WKA" || cmd_sa_gubun == "wka") cmd_sa_gubun = "ka"; //2013.03.28 윤정현 [CJS4] 민사신청의 경우 기존 CMD를 호출하도록 사건구분 변경\n' +
    '  else if(cmd_sa_gubun == "WGO" || cmd_sa_gubun == "wgo") cmd_sa_gubun = "go"; //2013.03.28 윤정현 [CJS4] 공시최고의 경우 기존 CMD를 호출하도록 사건구분 변경\n' +
    '    \n' +
    '  document.sanoform.cmd.value = cmd_sa_gubun+".SF"+cmd_sa_gubun.toUpperCase()+"01s01Cmd";\n' +
    '  //=========================================================================================================\n' +
    '\n' +
    '  setCookie();\n' +
    '\n' +
    '  document.sanoform.submit();\n' +
    '}\n' +
    '\n' +
    '//History : 2013.01.22 윤정현 [CJS4] 민사신청, 공시최고 웹오픈 관계없이 기존 CMD 사용하도록 처리\n' +
    '//          김윤수, 2017.07.12 [17A-SF-0036] [사건검색] 인천지방법원 부천지원 법원명 변경\n' +
    '//          김윤수, 2017.07.27 [17A-SF-0027] [사건검색]관리되지 않는 통합테이블 사용 개선\n' +
    'function SearchLinkSano(bub_nm, sa_year, sa_gbn, sa_serial, ds_nm, sa_gubun, auth) \n' +
    '{\n' +
    '  document.sanoform.sa_year.value = sa_year;\n' +
    '  document.sanoform.sch_sa_gbn.value = sa_gbn; // ex) 가단, 타기...\n' +
    '  document.sanoform.sa_serial.value = sa_serial;\n' +
    '  document.sanoform.sa_gubun.value = sa_gubun;\n' +
    '  document.sanoform.ds_nm.value = ds_nm;\n' +
    '  document.sanoform.auth.value = auth;\n' +
    '  document.sanoform.answer.value = "";\n' +
    '  document.sanoform.listLinkYn.value = "Y";  //2014.03.15, 장영동, [SFR]결과저장목록 구분자 추가\n' +
    '\n' +
    '  bub_nm = getDBBubNm(bub_nm);\n' +
    '  var temp_bubnm = bub_nm.replace(/ /g,"");\n' +
    '\n' +
    '  for( var nI=0; nI<document.sanoform.sch_bub_nm.options.length; nI++ ) {\n' +
    '    if ( document.sanoform.sch_bub_nm.options[nI].text == bub_nm ||\n' +
    '         document.sanoform.sch_bub_nm.options[nI].text == temp_bubnm) {\n' +
    '      document.sanoform.sch_bub_nm.selectedIndex = nI;\n' +
    '      break;\n' +
    '    }\n' +
    '  }\n' +
    '  document.sanoform.sch_bub_cd.value = document.sanoform.sch_bub_nm.value; \n' +
    '\n' +
    '  //=========================================================================================================\n' +
    '  // 업무별 Cmd 정의\n' +
    '  //=========================================================================================================\n' +
    '  // 공통시스템연계 2008.08.18 이진욱, 기존의 CMD를 호출하도록 사건구분 변경\n' +
    '    // 형통연계 2009.01.22 고성민, 기존의 CMD를 호출하도록 사건구분 변경\n' +
    '  var cmd_sa_gubun = sa_gubun;\n' +
    '  if(cmd_sa_gubun == "WKS" || cmd_sa_gubun == "wks") cmd_sa_gubun = "ks";\n' +
    '  else if(cmd_sa_gubun == "WHS" || cmd_sa_gubun == "whs") cmd_sa_gubun = "hs";\n' +
    '  else if(cmd_sa_gubun == "WPT" || cmd_sa_gubun == "wpt") cmd_sa_gubun = "pt";\n' +
    '  else if(cmd_sa_gubun == "WGJ" || cmd_sa_gubun == "wgj") cmd_sa_gubun = "gj";\n' +
    '  else if(cmd_sa_gubun == "WCR" || cmd_sa_gubun == "wcr") cmd_sa_gubun = "cr";\n' +
    '  else if(cmd_sa_gubun == "WYM" || cmd_sa_gubun == "wym") cmd_sa_gubun = "ym";\n' +
    '  else if(cmd_sa_gubun == "WGB" || cmd_sa_gubun == "wgb") cmd_sa_gubun = "gb";\n' +
    '  else if(cmd_sa_gubun == "WSB" || cmd_sa_gubun == "wsb") cmd_sa_gubun = "sb";\n' +
    '  else if(cmd_sa_gubun == "WET" || cmd_sa_gubun == "wet") cmd_sa_gubun = "et";\n' +
    '  else if(cmd_sa_gubun == "WKA" || cmd_sa_gubun == "wka") cmd_sa_gubun = "ka"; //2013.03.28 윤정현 [CJS4] 민사신청의 경우 기존 CMD를 호출하도록 사건구분 변경\n' +
    '  else if(cmd_sa_gubun == "WGO" || cmd_sa_gubun == "wgo") cmd_sa_gubun = "go"; //2013.03.28 윤정현 [CJS4] 공시최고의 경우 기존 CMD를 호출하도록 사건구분 변경\n' +
    '    \n' +
    '  document.sanoform.cmd.value = cmd_sa_gubun+".SF"+cmd_sa_gubun.toUpperCase()+"01s01Cmd";\n' +
    '  //=========================================================================================================\n' +
    '\n' +
    '  setCookie();\n' +
    '  \n' +
    '  document.sanoform.submit();\n' +
    '\n' +
    '}\n' +
    '\n' +
    '// 2011.10.17 [11LG-SF0060] 홈페이지 나의사건검색 "사건구분 가나다순 정렬"처리로직 수정 - 장진범\n' +
    '// 2014.04.05, [SFR] 탭화면 추가로 인한 sch_bub_nm[0] -> sch_bub_nm[1] 변경 - 장영동\n' +
    'function ChkSagbnSort()\n' +
    '{\n' +
    '  var default_sa_gubun = document.getElementsByName(\'sa_gubun\')[0].options[document.getElementsByName(\'sa_gubun\')[0].selectedIndex].text;\n' +
    '  var default_bub_nm = document.getElementsByName(\'sch_bub_nm\')[1].options[document.getElementsByName(\'sch_bub_nm\')[1].selectedIndex].text;  //2014.04.05, [SFR] 탭화면 추가로 인한 sch_bub_nm[0] -> sch_bub_nm[1] 변경 - 장영동 \n' +
    '  \n' +
    '  ChangeGubun(getDBBubNm(default_bub_nm),document.getElementsByName(\'saveSagbnSortYn\')[0].checked);\n' +
    '  \n' +
    '  for( var nI=0; nI<document.sanoform.sa_gubun.options.length; nI++ ) {\n' +
    '    if ( document.sanoform.sa_gubun.options[nI].text == default_sa_gubun ) {\n' +
    '      document.sanoform.sa_gubun.selectedIndex = nI;\n' +
    '      break;\n' +
    '    }\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    'function ChkBubSort() {\n' +
    '  var default_bub = document.getElementsByName(\'sch_bub_nm\')[1].options[document.getElementsByName(\'sch_bub_nm\')[1].selectedIndex].text;   //2014.04.05, [SFR] 탭화면 추가로 인한 sch_bub_nm[0] -> sch_bub_nm[1] 변경 - 장영동\n' +
    '  ChangeBub(document.getElementsByName("saveBubSortYn")[0].checked);\n' +
    '  \n' +
    '  for( var i=0; i<document.sanoform.sch_bub_nm.options.length; i++ ) {\n' +
    '     if ( document.sanoform.sch_bub_nm.options[i].text == default_bub ) {\n' +
    '        document.sanoform.sch_bub_nm.selectedIndex = i;\n' +
    '        break;\n' +
    '     }\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    '\n' +
    'function onChangeBub() {\n' +
    '    var bub_nm = document.sanoform.sch_bub_nm.options[document.sanoform.sch_bub_nm.selectedIndex].text;\n' +
    '    var sort_yn = document.getElementsByName(\'saveSagbnSortYn\')[0].checked;\n' +
    '    var sa_gbn = document.sanoform.sa_gubun.options[document.sanoform.sa_gubun.selectedIndex].text;\n' +
    '    \n' +
    '    ChangeGubun(bub_nm, sort_yn);\n' +
    '    \n' +
    '    for( var nI=0; nI<document.sanoform.sa_gubun.options.length; nI++ ) {\n' +
    '      if ( document.sanoform.sa_gubun.options[nI].text == sa_gbn ) {\n' +
    '        document.sanoform.sa_gubun.selectedIndex = nI;\n' +
    '        break;\n' +
    '      }\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    '\n' +
    'function PopView() {\n' +
    '    window.open(\'/sf/cm/popup.jsp\',\'pop\',\'scrollbars=no,width=400,height=223\'); \n' +
    '    return false;\n' +
    '}\n' +
    '\n' +
    '\n' +
    'function reloadCaptcha() {\n' +
    '  $(\'#captcha\').html(\' <img src="/sf/captchaImg?t=image&rand=\' + Math.random() + \'" alt="자동입력방지문자">\');\n' +
    '}\n' +
    '\n' +
    'function winPlayer(objUrl) {\n' +
    '  $(\'#audiocaptcha\').html(\' <bgsound src="\' + objUrl + \'">\');\n' +
    '}\n' +
    '\n' +
    'function audio() {\n' +
    '\n' +
    '   var uAgent = navigator.userAgent;\n' +
    '   var soundUrl = \'/sf/captchaImg?t=audio\';\n' +
    '\n' +
    '   if (uAgent.indexOf(\'Trident\') > -1 || uAgent.indexOf(\'MSIE\') > -1) {\n' +
    '       //IE일 경우 호출\n' +
    '       winPlayer(soundUrl+\'&agent=msie&rand=\'+ Math.random());\n' +
    '   } else if (!!document.createElement(\'audio\').canPlayType) {\n' +
    '       //Chrome일 경우 호출\n' +
    '       try { new Audio(soundUrl).play(); } catch(e) { winPlayer(soundUrl); }\n' +
    '   } else window.open(soundUrl, \'\', \'width=1,height=1\');\n' +
    '} \n' +
    '\n' +
    '//==============================================================================\n' +
    'window.setInterval("reloadCaptcha();", 1000*60*4);\n' +
    'window.document.oncontextmenu = new Function("return false");\n' +
    '//]]>\n' +
    '\n' +
    '</script> \n' +
    '</head>\n' +
    '\n' +
    '<body onload="onLoad();">\n' +
    '\n' +
    '<form name="print_preview" method="post" action="">\n' +
    '  <input type="hidden" name="print_html" value="">\n' +
    '</form>\n' +
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
    '\n' +
    '        <!--  contentIn -->\n' +
    '        <div class="contentIn">\n' +
    '          \n' +
    '          <!--  Tab -->\n' +
    '          <div class="tab">\n' +
    '           <ul class="tabTitle">\n' +
    '            <li id="btnSafindTab" class="active first"><a href="#" tabindex="1" class="active">사건번호로 검색</a></li>\n' +
    '            <li id="btnGongInTab" onkeypress="if(event.keyCode == 13){tabEnter(\'gonginGo\');}" class="mhid"><a href="#" tabindex="1">인증서로 검색</a></li>\n' +
    '           </ul>\n' +
    '\n' +
    '            <!--  tabContents -->\n' +
    '            <div class="tabContents">\n' +
    '              <!-- tab1 -->\n' +
    '              <div id="tab1" class="tabContent active">\n' +
    '                <h1 class="title">사건번호로 검색</h1>\n' +
    '                <!--  bannerHor2  -->\n' +
    '                <div class="bannerHor2">\n' +
    '                 <ul>\n' +
    '                  <li><a href="https://ecfs.scourt.go.kr" target="_blank"><img src="/common/images/banner_01.png" alt="대법원 전자소송배너 - 본 사이트에서 제공된 사건정보는 법적인 효력이 없으니, 참고자료로만 활용하시기 바랍니다. 민사, 특허 등 전자소송으로 진행되는 사건에 대해서는 전자소송홈페이지를 이용하시면 판결문이나 사건기록을 모두 인터넷으로 보실 수 있습니다. (새창열림)"></a></li>\n' +
    '                 </ul>\n' +
    '                </div>\n' +
    '                <!--  //bannerHor2 -->   \n' +
    '                <!--  conTextBul -->\n' +
    '                <div class="conTextBul">\n' +
    '                <span class="blue bold">본 게시물은 대법원 홈페이지의 동의없이 링크하거나, 상업적인 용도 또는 다량 저장, 재가공 등 자료수집 목적으로 사용할 수 없습니다.</span>\n' +
    '                </div>\n' +
    '                <div class="conTextBul">\n' +
    '                부동산 및 동산 경매사건검색은 <a class="linkText underline" target="_blank" href="http://www.courtauction.go.kr/" title="법원경매정보 홈페이지(새창열림)">법원경매정보 홈페이지</a>를 이용하시기 바랍니다.\n' +
    '                </div>\n' +
    '                <div class="conTextBul">\n' +
    '                 <a class="linkText underline" target="_blank" href="http://banking.shinhan.com/rib/easy_integ/O_EASYRIBG9321.jsp" title="신한은행 송달료 조회(새창열림)">신한은행 송달료 조회</a>에서 예납 은행번호로 본인의 사건번호 및 송달료 확인이 가능합니다.\n' +
    '                </div>\n' +
    '                <div class="conTextBul">\n' +
    '                 <span class="blue bold">수원지방법원 가사사건은 2019. 3. 1.일부터 수원가정법원</span>으로 조회하시기 바랍니다.\n' +
    '                </div>\n' +
    '                <!-- //conTextBul -->\n' +
    '               \n' +
    '  <!--========================================================================================-->\n' +
    '  <form name="sanoform" method="post" action="/sf/servlet/SFSuperSvl">   \n' +
    '  <input type="hidden" name="cmd" value="">\n' +
    '  <input type="hidden" name="sch_sa_gbn" value="다">\n' +
    '  <input type="hidden" name="link" value="N">\n' +
    '  <input type="hidden" name="theme" value="scourt">\n' +
    '  <input type="hidden" name="sch_bub_cd" value="">\n' +
    '  <input type="hidden" name="mysafindYn" value="Y">  \n' +
    '  <input type="hidden" name="listLinkYn" value="">  \n' +
    '  <input type="hidden" name="auth" value="">\n' +
    '  <input type="hidden" name="sa_year" value="">\n' +
    '  <div id="audiocaptcha" style="display: none;"></div>\n' +
    '                <!-- Table  -->\n' +
    '                <table class="tableVer" summary="사건번호의 법원선택, 년도, 사건구분, 사건번호, 당사자명, 자동입력방지문자를 입력 후 검색 합니다.">\n' +
    '                  <caption>사건번호 입력 후 검색</caption>\n' +
    '                  <tbody><tr>\n' +
    '                    <th><div class="breakDiv">사건번호</div></th>\n' +
    '                    <td>\n' +
    '                      \n' +
    '                      <div class="breakDiv">\n' +
    '                        <label for="sch_bub_nm">법원목록</label>\n' +
    '                          <select class="graySelect" name="sch_bub_nm" id="sch_bub_nm" title="법원 선택" onchange="onChangeBub();">\n' +
    '                           \n' +
    '                          <option value="000100">대법원</option><option value="000200">서울고등법원</option><option value="000201">서울고등법원(춘천재판부)</option><option value="000202">서울고등법원(인천재판부)</option><option value="000600">대전고등법원</option><option value="000601">대전고등법원(청주재판부)</option><option value="000300">대구고등법원</option><option value="000400">부산고등법원</option><option value="000401">부산고등법원(창원재판부)</option><option value="000402">부산고등법원(울산재판부)</option><option value="000500">광주고등법원</option><option value="000501">광주고등법원(제주재판부)</option><option value="000502">광주고등법원(전주재판부)</option><option value="000800">수원고등법원</option><option value="000700">특허법원</option><option value="000230">서울가정법원</option><option value="000220">서울행정법원</option><option value="000221">서울회생법원</option><option value="-">------------</option><option value="000210">서울중앙지방법원</option><option value="000211">서울동부지방법원</option><option value="000212">서울남부지방법원</option><option value="000213">서울북부지방법원</option><option value="000215">서울서부지방법원</option><option value="-">------------</option><option value="000214">의정부지방법원</option><option value="214807">고양지원</option><option value="214801">파주시법원</option><option value="214802">포천시법원</option><option value="214804">남양주시법원</option><option value="214808">동두천시법원</option><option value="214803">가평군법원</option><option value="214805">연천군법원</option><option value="214806">철원군법원</option><option value="-">------------</option><option value="000240">인천지방법원</option><option value="000241">인천지방법원 부천지원</option><option value="240812">김포시법원</option><option value="240811">강화군법원</option><option value="000228">인천가정법원</option><option value="000229">인천가정법원 부천지원</option><option value="-">------------</option><option value="000250">수원지방법원</option><option value="000251">성남지원</option><option value="000252">여주지원</option><option value="000253">평택지원</option><option value="250826">안산지원</option><option value="000254">안양지원</option><option value="250823">용인시법원</option><option value="250824">오산시법원</option><option value="250825">광명시법원</option><option value="250821">안성시법원</option><option value="251827">광주시법원</option><option value="252828">양평군법원</option><option value="252829">이천시법원</option><option value="000302">수원가정법원</option><option value="000303">수원가정법원 성남지원</option><option value="000304">수원가정법원 여주지원</option><option value="000305">수원가정법원 평택지원</option><option value="000322">수원가정법원 안산지원</option><option value="000306">수원가정법원 안양지원</option><option value="-">------------</option><option value="000260">춘천지방법원</option><option value="000261">강릉지원</option><option value="000262">원주지원</option><option value="000263">속초지원</option><option value="000264">영월지원</option><option value="260842">홍천군법원</option><option value="260843">양구군법원</option><option value="261845">삼척시법원</option><option value="261846">동해시법원</option><option value="264851">정선군법원</option><option value="264853">평창군법원</option><option value="264852">태백시법원</option><option value="262847">횡성군법원</option><option value="260841">인제군법원</option><option value="260844">화천군법원</option><option value="263848">고성군법원</option><option value="263849">양양군법원</option><option value="-">------------</option><option value="000280">대전지방법원</option><option value="000281">대전지방법원 홍성지원</option><option value="000284">대전지방법원 공주지원</option><option value="000282">대전지방법원 논산지원</option><option value="000285">대전지방법원 서산지원</option><option value="000283">대전지방법원 천안지원</option><option value="280872">금산군법원</option><option value="280871">세종특별자치시법원</option><option value="281874">보령시법원</option><option value="281873">서천군법원</option><option value="281875">예산군법원</option><option value="283877">아산시법원</option><option value="285879">태안군법원</option><option value="285881">당진시법원</option><option value="282876">부여군법원</option><option value="284878">청양군법원</option><option value="000286">대전가정법원</option><option value="000292">대전가정법원 홍성지원</option><option value="000295">대전가정법원 공주지원</option><option value="000293">대전가정법원 논산지원</option><option value="000296">대전가정법원 서산지원</option><option value="000294">대전가정법원 천안지원</option><option value="-">------------</option><option value="000270">청주지방법원</option><option value="000271">충주지원</option><option value="000272">제천지원</option><option value="000273">영동지원</option><option value="270863">진천군법원</option><option value="270861">보은군법원</option><option value="272865">단양군법원</option><option value="271864">음성군법원</option><option value="273866">옥천군법원</option><option value="270862">괴산군법원</option><option value="-">------------</option><option value="000310">대구지방법원</option><option value="000320">대구지방법원 서부지원</option><option value="000311">대구지방법원 안동지원</option><option value="000312">대구지방법원 경주지원</option><option value="000317">대구지방법원 포항지원</option><option value="000313">대구지방법원 김천지원</option><option value="000314">대구지방법원 상주지원</option><option value="000315">대구지방법원 의성지원</option><option value="000316">대구지방법원 영덕지원</option><option value="310895">경산시법원</option><option value="310893">칠곡군법원</option><option value="310891">청도군법원</option><option value="310892">영천시법원</option><option value="310894">성주군법원</option><option value="310896">고령군법원</option><option value="311897">영주시법원</option><option value="311898">봉화군법원</option><option value="313901">구미시법원</option><option value="314903">문경시법원</option><option value="314902">예천군법원</option><option value="315904">청송군법원</option><option value="315905">군위군법원</option><option value="316906">울진군법원</option><option value="316907">영양군법원</option><option value="000318">대구가정법원</option><option value="000399">대구가정법원 안동지원</option><option value="000390">대구가정법원 경주지원</option><option value="000395">대구가정법원 포항지원</option><option value="000391">대구가정법원 김천지원</option><option value="000392">대구가정법원 상주지원</option><option value="000393">대구가정법원 의성지원</option><option value="000394">대구가정법원 영덕지원</option><option value="-">------------</option><option value="000410">부산지방법원</option><option value="000412">부산지방법원 동부지원</option><option value="000414">부산지방법원 서부지원</option><option value="000413">부산가정법원</option><option value="-">------------</option><option value="000411">울산지방법원</option><option value="411911">양산시법원</option><option value="000477">울산가정법원</option><option value="-">------------</option><option value="000420">창원지방법원</option><option value="000431">마산지원</option><option value="000421">진주지원</option><option value="000422">통영지원</option><option value="000423">밀양지원</option><option value="000424">거창지원</option><option value="420922">창원남부시법원</option><option value="420923">김해시법원</option><option value="420921">함안군법원</option><option value="420924">의령군법원</option><option value="421927">사천시법원</option><option value="421928">남해군법원</option><option value="421926">하동군법원</option><option value="422931">거제시법원</option><option value="422932">고성군법원(경)</option><option value="423933">창녕군법원</option><option value="424934">합천군법원</option><option value="424935">함양군법원</option><option value="421929">산청군법원</option><option value="-">------------</option><option value="000510">광주지방법원</option><option value="000511">광주지방법원 목포지원</option><option value="000512">광주지방법원 장흥지원</option><option value="000513">광주지방법원 순천지원</option><option value="000514">광주지방법원 해남지원</option><option value="510946">담양군법원</option><option value="511947">함평군법원</option><option value="512951">강진군법원</option><option value="513955">구례군법원</option><option value="510942">영광군법원</option><option value="510943">나주시법원</option><option value="510944">장성군법원</option><option value="510945">화순군법원</option><option value="510941">곡성군법원</option><option value="513956">광양시법원</option><option value="513953">고흥군법원</option><option value="513954">여수시법원</option><option value="513952">보성군법원</option><option value="511949">무안군법원</option><option value="511948">영암군법원</option><option value="514958">완도군법원</option><option value="514959">진도군법원</option><option value="000515">광주가정법원</option><option value="000599">광주가정법원 목포지원</option><option value="000590">광주가정법원 장흥지원</option><option value="000591">광주가정법원 순천지원</option><option value="000592">광주가정법원 해남지원</option><option value="-">------------</option><option value="000520">전주지방법원</option><option value="000521">군산지원</option><option value="000522">정읍지원</option><option value="000523">남원지원</option><option value="520971">진안군법원</option><option value="520972">김제시법원</option><option value="520973">무주군법원</option><option value="520974">임실군법원</option><option value="521975">익산시법원</option><option value="522976">부안군법원</option><option value="522977">고창군법원</option><option value="523978">장수군법원</option><option value="523979">순창군법원</option><option value="-">------------</option><option value="000530">제주지방법원</option><option value="530991">서귀포시법원</option><option value="-">------------</option><option value="000110">법원행정처</option></select>\n' +
    '                      </div>\n' +
    '                      <div class="breakDiv" id="div_sa_year" style="display: inline-block;">\n' +
    '                        <label for="sel_sa_year">년도 목록선택 </label>\n' +
    '                        <select class="graySelect" name="sel_sa_year" id="sel_sa_year" title="사건년도 선택">\n' +
    '\n' +
    '                          <option value="2021">2021</option>\n' +
    '\n' +
    '                          <option value="2020">2020</option>\n' +
    '\n' +
    '                          <option value="2019">2019</option>\n' +
    '\n' +
    '                          <option value="2018">2018</option>\n' +
    '\n' +
    '                          <option value="2017">2017</option>\n' +
    '\n' +
    '                          <option value="2016">2016</option>\n' +
    '\n' +
    '                          <option value="2015">2015</option>\n' +
    '\n' +
    '                          <option value="2014">2014</option>\n' +
    '\n' +
    '                          <option value="2013">2013</option>\n' +
    '\n' +
    '                          <option value="2012">2012</option>\n' +
    '\n' +
    '                          <option value="2011">2011</option>\n' +
    '\n' +
    '                          <option value="2010">2010</option>\n' +
    '\n' +
    '                          <option value="2009">2009</option>\n' +
    '\n' +
    '                          <option value="2008">2008</option>\n' +
    '\n' +
    '                          <option value="2007">2007</option>\n' +
    '\n' +
    '                          <option value="2006">2006</option>\n' +
    '\n' +
    '                          <option value="2005">2005</option>\n' +
    '\n' +
    '                          <option value="2004">2004</option>\n' +
    '\n' +
    '                          <option value="2003">2003</option>\n' +
    '\n' +
    '                          <option value="2002">2002</option>\n' +
    '\n' +
    '                          <option value="2001">2001</option>\n' +
    '\n' +
    '                          <option value="2000">2000</option>\n' +
    '\n' +
    '                          <option value="1999">1999</option>\n' +
    '\n' +
    '                          <option value="1998">1998</option>\n' +
    '\n' +
    '                          <option value="1997">1997</option>\n' +
    '\n' +
    '                          <option value="1996">1996</option>\n' +
    '\n' +
    '                          <option value="1995">1995</option>\n' +
    '\n' +
    '                          <option value="1994">1994</option>\n' +
    '\n' +
    '                          <option value="1993">1993</option>\n' +
    '\n' +
    '                          <option value="1992">1992</option>\n' +
    '\n' +
    '                          <option value="1991">1991</option>\n' +
    '\n' +
    '                          <option value="1990">1990</option>\n' +
    '\n' +
    '                          <option value="1989">1989</option>\n' +
    '\n' +
    '                          <option value="1988">1988</option>\n' +
    '\n' +
    '                          <option value="1987">1987</option>\n' +
    '\n' +
    '                          <option value="1986">1986</option>\n' +
    '\n' +
    '                          <option value="1985">1985</option>\n' +
    '\n' +
    '                          <option value="1969">1969</option>\n' +
    '                        </select>\n' +
    '                      </div>\n' +
    '                      <div class="breakDiv" id="div_sa_gubun" style="display: inline-block;">\n' +
    '                          <!--  2013.03.28 [13LG-SF0018] [사건검색] 홈페이지 웹 접근성 사건검색 관련 부분 개선 - 장진범 -->\n' +
    '                        <label for="sa_gubun">사건구분 목록선택 </label>\n' +
    '                        <select class="graySelect" name="sa_gubun" id="sa_gubun" title="사건구분 선택">\n' +
    '                          \n' +
    '                        <option value="cv">다</option><option value="cv">재다</option><option value="cv">머</option><option value="-"></option><option value="hs">두</option><option value="hs">재두</option><option value="hs">누</option><option value="hs">재누</option><option value="hs">수</option><option value="hs">재수</option><option value="hs">추</option><option value="-"></option><option value="cr">도</option><option value="cr">감도</option><option value="cr">동도</option><option value="cr">보도</option><option value="cr">보모</option><option value="cr">보오</option><option value="cr">보초</option><option value="cr">전도</option><option value="cr">전모</option><option value="cr">전오</option><option value="cr">전초</option><option value="cr">재도</option><option value="cr">재감도</option><option value="cr">재고약</option><option value="cr">초적</option><option value="cr">초보</option><option value="cr">초기</option><option value="cr">초사</option><option value="cr">감초</option><option value="cr">모</option><option value="cr">감모</option><option value="cr">오</option><option value="cr">감오</option><option value="cr">동오</option><option value="cr">초</option><option value="cr">동초</option><option value="cr">초치</option><option value="cr">치도</option><option value="cr">치모</option><option value="cr">치오</option><option value="cr">치초</option><option value="cr">코</option><option value="-"></option><option value="ks">므</option><option value="ks">재므</option><option value="ks">준재므</option><option value="-"></option><option value="hg">마</option><option value="hg">무</option><option value="hg">스</option><option value="hg">흐</option><option value="hg">히</option><option value="hg">수흐</option><option value="hg">재마</option><option value="hg">재무</option><option value="hg">재스</option><option value="hg">정스</option><option value="hg">준재스</option><option value="hg">그</option><option value="hg">부</option><option value="hg">재부</option><option value="hg">으</option><option value="hg">재으</option><option value="hg">재그</option><option value="hg">바</option><option value="hg">사</option><option value="hg">인라</option><option value="hg">인마</option><option value="-"></option><option value="pt">후</option><option value="pt">재후</option><option value="-"></option><option value="et">비단</option><option value="et">비합</option><option value="et">아</option><option value="et">인</option><option value="et">인카</option><option value="et">재아</option><option value="et">재카기</option><option value="et">재카담</option><option value="et">주</option><option value="et">책</option><option value="et">카열</option><option value="-"></option><option value="ka">즈기</option><option value="ka">즈단</option><option value="ka">즈합</option><option value="ka">카</option><option value="ka">카경</option><option value="ka">재카경</option><option value="ka">카구</option><option value="ka">카기</option><option value="ka">카담</option><option value="ka">카명</option><option value="ka">카불</option><option value="ka">카소</option><option value="ka">카임</option><option value="ka">카정</option><option value="ka">카합</option><option value="ka">카기전</option><option value="ka">카확</option><option value="-"></option><option value="sb">트</option><option value="-"></option><option value="gb">어</option><option value="gb">동어</option><option value="gb">재동어</option><option value="gb">터</option><option value="gb">동터</option><option value="gb">성로</option><option value="gb">성모</option><option value="gb">성초</option></select>\n' +
    '                      </div>\n' +
    '                      <div class="breakDiv" id="div_sa_serial" style="display: inline-block;">\n' +
    '                        <label for="sa_serial">사건일련번호</label>\n' +
    '                        <input name="sa_serial" type="text" size="7" maxlength="7" id="sa_serial" title="사건일련번호 입력" class="grayInput" onkeypress="if(event.keyCode == 13){SearchSano();}">\n' +
    '                      </div>\n' +
    '                      <div class="breakDiv" id="div_input_sano" style="display: none;">\n' +
    '                        <label for="input_sano">사건번호</label>\n' +
    '                        <input name="input_sano" type="text" size="28" value="입력예:17가단10" title="사건번호 입력" maxlength="14" class="grayInput" onfocus="sano_clear()" onblur="sano_hint()" onkeypress="if(event.keyCode == 13){SearchSano();}">\n' +
    '                      </div>\n' +
    '<script language="javascript" type="text/JavaScript">\n' +
    '//<![CDATA[\n' +
    '\n' +
    '\n' +
    'function sano_clear() {\n' +
    '  if( document.sanoform.input_sano.value == "입력예:17가단10" )\n' +
    '    document.sanoform.input_sano.value = "";\n' +
    '}\n' +
    '\n' +
    '\n' +
    'function sano_hint() {\n' +
    '  if( document.sanoform.input_sano.value == "" )\n' +
    '    document.sanoform.input_sano.value = "입력예:17가단10";\n' +
    '}\n' +
    '\n' +
    'function text_clear()\n' +
    '{\n' +
    '  if( document.sanoform.ds_nm.value == "당사자명 필수입력" )\n' +
    '    document.sanoform.ds_nm.value = "";\n' +
    '}\n' +
    '\n' +
    '\n' +
    'function answer_clear()\n' +
    '{\n' +
    '    if( document.sanoform.answer.value == "자동입력 방지문자를 입력 하십시오" )\n' +
    '        document.sanoform.answer.value = "";\n' +
    '}\n' +
    '\n' +
    '\n' +
    'function answer_hint()\n' +
    '{\n' +
    '    if( document.sanoform.answer.value == "" )\n' +
    '        document.sanoform.answer.value = "자동입력 방지문자를 입력 하십시오";\n' +
    '}\n' +
    '\n' +
    'function text_hint()\n' +
    '{\n' +
    '  if( document.sanoform.ds_nm.value == "" )\n' +
    '    document.sanoform.ds_nm.value = "당사자명 필수입력";\n' +
    '}\n' +
    '//]]>\n' +
    '</script>\n' +
    '                      <div class="breakDiv">\n' +
    '                          <label for="ds_nm" class="hidden">당사자명 입력</label>\n' +
    '                          <!-- 2013.12.10 [13A-SF-1019][사건검색]홈페이지 사건검색 웹접근성 개선 진행 - 장진범  -->\n' +
    '                          <input name="ds_nm" id="ds_nm" type="text" size="11" maxlength="40" value="당사자명 필수입력" title="당사자명 입력" class="grayInput" onfocus="text_clear()" onblur="text_hint()" onkeypress="if(event.keyCode == 13){SearchSano();}">\n' +
    '                      </div>\n' +
    '                      <div class="breakDiv">\n' +
    '                          <label for="inputsano_ch" class="hidden">사건번호 입력모드 선택</label>\n' +
    '                          <input type="checkbox" name="inputsano_ch" id="inputsano_ch" title="사건번호 입력모드 선택 및 해제" value="" onclick="changeSearchWay(this.checked);">사건번호입력모드\n' +
    '                      </div>\n' +
    '                      <br>\n' +
    '                      <div class="breakDiv" id="captcha"><img src="/sf/captchaImg?t=image" alt="자동입력방지문자"></div>\n' +
    '                      <div class="breakDiv"><a class="blueBtn" href="#" onclick="javascript:reloadCaptcha();" title="자동입력방지문자 새로고침">새로고침</a></div>\n' +
    '                      <div class="breakDiv"><a class="blueBtn" href="#" onclick="javascript:audio();" title="자동입력방지문자 음성듣기">음성듣기</a></div>\n' +
    '                      <div class="breakDiv">\n' +
    '                          <label for="answer">자동입력방지문자 입력</label>\n' +
    '                          <input id="answer" name="answer" value="자동입력 방지문자를 입력 하십시오" title="자동입력방지문자 입력" class="grayInput" onfocus="answer_clear()" onblur="answer_hint()" onkeypress="if(event.keyCode == 13){SearchSano();}"> \n' +
    '                      </div>\n' +
    '                      <div class="breakDiv"><a href="http://localhost:8883/api/v1/test2"><!--<a class="redBtn" href="#" onclick="javascript:SearchSano();" title="">-->검색</a></div>\n' +
    '                    </td>\n' +
    '                  </tr>\n' +
    '                </tbody></table>\n' +
    '                <!-- //Table  -->\n' +
    '                \n' +
    '                <!--  infoBoxGray -->\n' +
    '                <div class="infoBoxGray">\n' +
    '                  <div class="conTextBul blue">\n' +
    '                    2016. 6. 17. 부터 대법원 나의사건검색에 개인정보보호 및 무차별 정보수집 방지 등을 위하여 자동입력방지문자가 도입되었습니다. 안정적인 서비스 제공을 위한 조치이오니 이점 양해해 주시기 바랍니다.\n' +
    '                  <br>\n' +
    '                  </div>\n' +
    '                  <div class="mt10">\n' +
    '                    &nbsp;&nbsp;&nbsp;<b>사건번호 입력 값 정렬 : </b>\n' +
    '                    <label for="BubSort">법원명 가나다순 정렬</label>\n' +
    '                    <input name="saveBubSortYn" type="checkbox" title="법원명 가나다순 정렬 선택" onclick="ChkBubSort();" id="BubSort"> <b>법원명 가나다순 정렬</b>\n' +
    '                    <label for="SagbnSort">사건구분 가나다순 정렬</label>\n' +
    '                    <input name="saveSagbnSortYn" type="checkbox" title="사건구분 가나다순 정렬 선택" onclick="ChkSagbnSort();" id="SagbnSort"> <b>사건구분 가나다순 정렬</b>\n' +
    '                    <label for="saveCookieYn">사건검색결과 저장</label>\n' +
    '                    <input name="saveCookieYn" type="checkbox" title="사건검색결과 저장 선택" id="saveCookieYn"> <b>사건검색 결과 저장</b>\n' +
    '                  </div>\n' +
    '                  <div class="conTextBul red">사건번호와 사건관련 당사자명(1인)을 2글자 이상 필수로 입력하여야 조회가 가능합니다. \n' +
    '                  <a href="#" class="empha_blue01" onclick="javascript:PopView();" onkeypress="if(event.keyCode == 13){PopView();}" title="입력방법예시(새창열림)">(입력예시)<span style="display:none;">(새창)</span></a>\n' +
    '                  </div>\n' +
    '                 <div class="conTextBul red">\n' +
    '                    <span class="attenL">[주의]</span>\n' +
    '                    <span class="attenR">검색한 사건번호는 <span class="bold">\'사건검색 결과 저장\'</span> 체크 시 PC에 저장됩니다. \n' +
    '                    저장된 사건번호는 당사자명 입력없이 사건내용이 바로 조회 되므로 PC방등 공공장소에서는 <span class="bold">\'사건검색 결과 저장\' 기능 \n' +
    '                    사용 시 주의</span>하여 주시기 바랍니다.</span>\n' +
    '                  </div>\n' +
    '                  <div class="conTextBul red">\n' +
    '                    <span class="attenL">[주의]</span>\n' +
    '                    <span class="attenR">채권집행 등 기타집행 사건의 경우 제3채무자 명을 입력하여 사건검색을 할 수 없고, 기타집행과 (가)압류 등 밀행성이 강조되는 사건은 (가)압류결정문이 제3채무자에게 도달되지 않았거나 사건종국일로부터 일정기간이 경과되기 전에는 사건조회가 되지 않습니다.(사건진행내역은 재판부담당자에게 문의)</span>\n' +
    '                  </div>\n' +
    '                  <div class="conTextBul red">\n' +
    '                    <span class="attenL">[주의]</span>\n' +
    '                    <span class="attenR">회사, 주식 등 금칙어로 등록되어 2자로 검색 시 검색을 제한하고 있습니다. 3자 이상으로 입력하여야 검색이 가능합니다. \n' +
    '                    예시) 기존 : 회사 -&gt; 현재 : 우리회사, 우리회 등 </span>\n' +
    '                  </div>\n' +
    '                  <div class="conTextBul red">\n' +
    '                    <span class="attenL">[참고]</span>\n' +
    '                    <span class="attenR">\'사건검색 결과 저장\' 내용은 사용자 PC에 저장되며 웹 브라우저 인터넷 옵션의 \'쿠키삭제\' 혹은 각종 백신(Virus) 치료옵션에 \n' +
    '                    쿠키를 함께 지우도록 설정된 경우와 PC 복원작업 등으로 저장된 내용이 사라질 수 있으므로 유의 하시기 바랍니다.  \n' +
    '                    (사건별 조회조건 등의 내용을 사용자가 직접 별도의 파일로 관리 필요) </span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '          </form>\n' +
    '                <!--  //infoBoxGray -->\n' +
    '                \n' +
    '<script language="JavaScript" type="text/JavaScript">\n' +
    '//<![CDATA[\n' +
    '\n' +
    'setSearchWay(\'false\');\n' +
    '// 쿠키저장여부세팅\n' +
    '\n' +
    '\n' +
    '// 사건구분정렬저장여부세팅\n' +
    '\n' +
    '\n' +
    '// 법원명정렬저장여부세팅\n' +
    '\n' +
    '//====================================================================\n' +
    '\n' +
    '//검색한 법원에 해당하는 사건구분 세팅\n' +
    'bub_nm = getDBBubNm(\'\');\n' +
    'ChangeBub(document.getElementsByName("saveBubSortYn")[0].checked);\n' +
    'ChangeGubun( bub_nm ,document.getElementsByName("saveSagbnSortYn")[0].checked );\n' +
    'SetFocus( bub_nm, \'\', \'\' );\n' +
    'document.sanoform.ds_nm.value = \'\'; \n' +
    'text_hint();\n' +
    '\n' +
    '//]]>\n' +
    '</script>\n' +
    '\n' +
    '                <div class="conTextBul">\n' +
    '                기존 사건검색 결과(최근 검색사건중 최대 50건까지 조회가능)\n' +
    '                </div>\n' +
    '                <!--  tableResult -->\n' +
    '                <div class="tableResult">\n' +
    '                <a class="blueBtn" href="#" onclick="javascript:AllCheck(1);" title="기존 사건검색 결과 전체 선택">전체선택</a> \n' +
    '                <a class="blueBtn" href="#" onclick="javascript:AllCheck(0);" title="기존 사건검색 결과 선택 취소">선택취소</a>\n' +
    '                <div class="tableSearch">\n' +
    '                  <a class="redBtn" href="#" onclick="javascript:DelSelCook();" title="선택된 기존 사건검색 결과 삭제">삭제</a>\n' +
    '                  <a class="blueBtn" href="#" onclick="javascript:printPreview(\'\',\'resultList\');" title="인쇄하기(새창열림)">인쇄하기</a>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '                <!--  //tableResult -->\n' +
    '            <form name="CookieForm" action="">\n' +
    '                <div id="resultList">\n' +
    '                <!-- tableHor-->\n' +
    '                <table class="tableHor" summary="기존 사건검색 결과목록 (최근 검색사건 중 50건까지 조회 가능하며 기존사건의 번호, 선택, 법원명, 사건번호, 사건명등을 확인 할 수 있습니다.)">\n' +
    '                  <caption>기존 사건검색 결과목록</caption>\n' +
    '                  <thead>\n' +
    '                    <tr>\n' +
    '                      <!-- 2013.12.10 [13A-SF-1019][사건검색]홈페이지 사건검색 웹접근성 개선 진행 - 장진범  -->\n' +
    '                      <th scope="col">번호</th>\n' +
    '                      <th scope="col" class="showTD">선택</th>\n' +
    '                      <th scope="col">법원명</th>\n' +
    '                      <th scope="col">사건번호</th>\n' +
    '                      <th scope="col">사건명</th>\n' +
    '                    </tr>\n' +
    '                  </thead>\n' +
    '                  <tbody>\n' +
    '\n' +
    '      <!-- 웹접근성 input type hidden, reset등을 제외한 나머지에 1:1 label을 제공해야합니다. 대법원 홈페이지 개편팀 주경희 13.07.30 -->\n' +
    '\n' +
    '      <!-- 2013.11.25 [13A-SF-1016] [사건검색]웹접근성및 웹표준 감리결과 조치 - 김윤수 -->\n' +
    '      <tr><td colspan="5"></td></tr>\n' +
    '\n' +
    '                </tbody>\n' +
    '                \n' +
    '                </table>\n' +
    '                </div>\n' +
    '</form>\n' +
    '                <!-- //tableHor  -->\n' +
    '<script language="JavaScript" type="text/JavaScript">\n' +
    '//<![CDATA[\n' +
    '\n' +
    '// 삭제대상 쿠키 전체 선택인지 전체취소인지\n' +
    'function AllCheck(flg)\n' +
    '{\n' +
    '    for( var i=0; i<document.CookieForm.elements.length; i++ )\n' +
    '  {\n' +
    '        document.CookieForm.elements[i].checked = flg;\n' +
    '  }\n' +
    '}\n' +
    '//================================================================\n' +
    '\n' +
    '\n' +
    'function DelSelCook()\n' +
    '{\n' +
    '  var result=\'\';\n' +
    '  var v_all = \'\';\n' +
    '  var v_split = v_all.split(\'*\');\n' +
    '  var flg=1;\n' +
    '  var check=0; //체크된 사건 카운트\n' +
    '\n' +
    '  for( var i=0; i<document.CookieForm.elements.length; i++ )\n' +
    '  {\n' +
    '      var Item = document.CookieForm.elements[i];\n' +
    '    if( Item.checked ){\n' +
    '      check++;\n' +
    '    } else {\n' +
    '      if(flg)\n' +
    '      {\n' +
    '        result = v_split[i];\n' +
    '        flg=0;\n' +
    '      } else  result = result + \'*\' + v_split[i];\n' +
    '\n' +
    '    }//else\n' +
    '  }\n' +
    '  \n' +
    '  if( check > 0 )\n' +
    '  { \n' +
    '    document.DelCookForm.cookie.value = result;\n' +
    '    document.DelCookForm.submit();\n' +
    '\n' +
    '  } else {\n' +
    '    alert("선택한 사건이 없습니다.");\n' +
    '    return;\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    '\n' +
    'function setCookie() {\n' +
    '  \n' +
    '  // 쿠키저장체크여부\n' +
    '  var saveCookieYn;\n' +
    '  var saveSagbnSortYn;\n' +
    '  var saveBubSortYn;\n' +
    '\n' +
    '  // 조회한 사건쿠키저장여부\n' +
    '  if(document.getElementsByName("saveCookieYn")[0].checked)\n' +
    '    saveCookieYn = "YES";\n' +
    '  else\n' +
    '    saveCookieYn = "NO";\n' +
    '\n' +
    '  document.cookie = "save_cookie="+saveCookieYn+"; path=/sf;";\n' +
    '\n' +
    '  // 사건번호입력모드 체크여부\n' +
    '  var inputsano_flag = "false";\n' +
    '  if( document.sanoform.inputsano_ch.checked ) inputsano_flag = "true";\n' +
    '  document.cookie = "inputsano_check="+inputsano_flag+"; path=/sf;";\n' +
    '\n' +
    '  // 사건구분 가나다순 정렬여부 \n' +
    '  if(document.getElementsByName("saveSagbnSortYn")[0].checked)\n' +
    '    saveSagbnSortYn = "YES";\n' +
    '  else\n' +
    '    saveSagbnSortYn = "NO";\n' +
    '  document.cookie = "save_sagbnsort_cookie="+saveSagbnSortYn+"; path=/sf;";\n' +
    '\n' +
    '  // 법원명 가나다순 정렬여부 \n' +
    '  if(document.getElementsByName("saveBubSortYn")[0].checked)\n' +
    '    saveBubSortYn = "YES";\n' +
    '  else\n' +
    '    saveBubSortYn = "NO";\n' +
    '  document.cookie = "save_bubsort_cookie="+saveBubSortYn+"; path=/sf;";\n' +
    '\n' +
    '}\n' +
    '//]]>\n' +
    '\n' +
    '</script>\n' +
    '\n' +
    '<form name="DelCookForm" method="post" action="/sf/cookie/DelSetCookie.jsp">\n' +
    '<input type="hidden" name="cookie" value="">\n' +
    '</form>       \n' +
    '              </div>\n' +
    '              <!--  //tab1 -->\n' +
    '            \n' +
    '            </div>\n' +
    '            <!-- //tabContents -->\n' +
    '            \n' +
    '          </div>\n' +
    '          <!--  //Tab -->\n' +
    '        </div>\n' +
    '        <!-- //contentIn -->\n' +
    '\n' +
    '  \n' +
    ' \n' +
    '\n' +
    '</body></html>')


})

module.exports = router;