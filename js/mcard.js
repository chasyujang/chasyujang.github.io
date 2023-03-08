var _url = $('meta[property="og:url"]').attr('content');
var _title = $('meta[property="og:title"]').attr('content');
var _desc = $('meta[property="og:description"]').attr('content');
var _wedddate = $("#Product_Category_Code").val() == "PCC02" ? "" : $('#WeddingDate').val() + " " + getWeddingWeekName($('#WeddingWeekName').val()) + "요일 " + getTime_Type_Name($('#Time_Type_Name').val()) + " " + $('#WeddingHour').val() + "시 " + $('#WeddingMin').val() + "분 \n";
var _image = $('meta[property="og:image"]').attr('content');
var _imgWidth = $('meta[property="og:image:width"]').attr('content');
var _imgHeight = $('meta[property="og:image:height"]').attr('content');

var invitationId = $('#invitationId').val();
var outlineType = $('#outlineType').val();
var outlineImage = $('#outlineImage').val();
var lat = $("#lat").val();
var lng = $("#lot").val();
var loc = $("#loc").val();
var serviceHost = $("#serviceHost").val();
var ratio = 1;
var _min_height = 0;

var strMapMedia = "";
var objects = [];
var areas = [];
var etcs = [];
var accounts = [];
var container = [];
var babyInfos = [];

$(document).ready(function (e) {

    ratio = $("#wrap").width() / 800;

     $('.account_pop').hide();
    //신랑신부정보
    if ($("#Groom_Phone").val() != "") {
        var rt = $("#Groom_Global_Phone_YN").val() == "Y" ? true : false;
        $(".at_Groom_Phone").attr("href", "tel:" + (rt ? $("#Groom_Global_Phone_Number").val() : "") + $("#Groom_Phone").val());
        $(".as_Groom_Phone").attr("href", "sms:" + (rt ? $("#Groom_Global_Phone_Number").val() : "") + $("#Groom_Phone").val());
    }
    else {
        $(".at_Groom_Phone").hide();
        $(".as_Groom_Phone").hide();
    }
    if ($("#Bride_Phone").val() != "") {
        var rt = $("#Bride_Global_Phone_YN").val() == "Y" ? true : false;
        $(".at_Bride_Phone").attr("href", "tel:" + (rt ? $("#Bride_Global_Phone_Number").val() : "") + $("#Bride_Phone").val());
        $(".as_Bride_Phone").attr("href", "sms:" + (rt ? $("#Bride_Global_Phone_Number").val() : "") + $("#Bride_Phone").val());
    }
    else {
        $(".at_Bride_Phone").hide();
        $(".as_Bride_Phone").hide();
    }
    //혼주정보
    if ($("#Parents_Information_Use_YN").val() == "N") {
        $(".onoff_2").hide();
    } else {
        $(".onoff_2").show();
    }
    
    if ($("#Groom_Parents1_Phone").val() != "") {
        $(".at_Groom_Parents1_Phone").show();
        $(".as_Groom_Parents1_Phone").show();
        var rt = $("#Groom_Parents1_Global_Phone_Number_YN").val() == "Y" ? true : false;
        $(".at_Groom_Parents1_Phone").attr("href", "tel:" + (rt ? $("#Groom_Parents1_Global_Phone_Number").val() : "") + $("#Groom_Parents1_Phone").val());
        $(".as_Groom_Parents1_Phone").attr("href", "sms:" + (rt ? $("#Groom_Parents1_Global_Phone_Number").val() : "") + $("#Groom_Parents1_Phone").val());
    }
    if ($("#Groom_Parents2_Phone").val() != "") {
        $(".at_Groom_Parents2_Phone").show();
        $(".as_Groom_Parents2_Phone").show();
        var rt = $("#Groom_Parents2_Global_Phone_Number_YN").val() == "Y" ? true : false;
        $(".at_Groom_Parents2_Phone").attr("href", "tel:" + (rt ? $("#Groom_Parents2_Global_Phone_Number").val() : "") + $("#Groom_Parents2_Phone").val());
        $(".as_Groom_Parents2_Phone").attr("href", "sms:" + (rt ? $("#Groom_Parents2_Global_Phone_Number").val() : "") + $("#Groom_Parents2_Phone").val());
    }
    if ($("#Bride_Parents1_Phone").val() != "") {
        $(".at_Bride_Parents1_Phone").show();
        $(".as_Bride_Parents1_Phone").show();
        var rt = $("#Bride_Parents1_Global_Phone_Number_YN").val() == "Y" ? true : false;
        $(".at_Bride_Parents1_Phone").attr("href", "tel:" + (rt ? $("#Bride_Parents1_Global_Phone_Number").val() : "") + $("#Bride_Parents1_Phone").val());
        $(".as_Bride_Parents1_Phone").attr("href", "sms:" + (rt ? $("#Bride_Parents1_Global_Phone_Number").val() : "") + $("#Bride_Parents1_Phone").val());
    }
    if ($("#Bride_Parents2_Phone").val() != "") {
        $(".at_Bride_Parents2_Phone").show();
        $(".as_Bride_Parents2_Phone").show();
        var rt = $("#Bride_Parents2_Global_Phone_Number_YN").val() == "Y" ? true : false;
        $(".at_Bride_Parents2_Phone").attr("href", "tel:" + (rt ? $("#Bride_Parents2_Global_Phone_Number").val() : "") + $("#Bride_Parents2_Phone").val());
        $(".as_Bride_Parents2_Phone").attr("href", "sms:" + (rt ? $("#Bride_Parents2_Global_Phone_Number").val() : "") + $("#Bride_Parents2_Phone").val());
    }
    //모든 전화번호 없을 시 Area4 표시 않함.
    if ($("#Parents_Information_Use_YN").val() == "N"
        && $("#Groom_Phone").val() == ""
        && $("#Bride_Phone").val() == "") {
        $("#area4").hide();
    }

    //갤러리
    if ($("#Gallery_Use_YN").val() == "N") {
        $(".onoff_5").hide();
    } else {
        $(".onoff_5").show();
    }
    //방명록
    if ($("#GuestBook_Use_YN").val() == "N") {
        $(".onoff_1").hide();
    } else {
        $(".onoff_1").show();
    }
    //동영상
    if ($("#Invitation_Video_Use_YN").val() == "N") {
        $(".onoff_6").hide();
    } else {
        $(".onoff_6").show();
        setVideo($("#Invitation_Video_Type_Code").val());
    }
    //기타정보
    if ($("#Etc_Information_Use_YN").val() == "N") {
        $(".onoff_3").hide();
    } else {
        $(".onoff_3").show();
    }


    if ($("#Accounts").text() != "") {
        accounts = JSON.parse($("#Accounts").text());
        accounts.forEach(function (elm) {
            var elem = "<dl id=\"dl_" + elm.Sort + "\">";
            elem = elem + "<dt>";
            elem = elem + "<span id=\"inputSender_" + elm.Sort + "\" class=\"input_sender\"></span>&nbsp;&nbsp;계좌";
            elem = elem + "<a href=\"javascript:;\" class=\"copy_btn all\" idx=\"" + elm.Sort + "\">복사하기</a>";
            elem = elem + "</dt>";
            elem = elem + "<dd><span id=\"inputBank_" + elm.Sort + "\" class=\"input_bank\"></span>&nbsp;&nbsp;(예금주 : <span id=\"inputAccountHolder_" + elm.Sort + "\" class=\"input_accountholder\" ></span>)</dd>";
            elem = elem + "<dd><span id=\"inputAccountNumber_" + elm.Sort + "\" class=\"input_accountnumber\"></span></dd>";
            elem = elem + "</dl>";
            $(".account_list.account").append(elem);

            $("#inputSender_" + elm.Sort).text(elm.Send_Name);
            $("#inputBank_" + elm.Sort).text(elm.Bank_Name);
            $("#inputAccountHolder_" + elm.Sort).text(elm.Account_Holder);
            $("#inputAccountNumber_" + elm.Sort).text(elm.Account_Number);
        });

        //스크롤바
        $(".account_list.account").mCustomScrollbar();

        var accountLength = $('.account_list.account dl').length;
        if (accountLength > 4) {
            $('.account_list.account').addClass('add_scroll');
        } else {
            $('.account_list.account').removeClass('add_scroll');
        }

        $('.copy_btn.all').on('click', function () {

            var idx = $(this).attr('idx');
            var account_number = $("#inputAccountNumber_" + idx).text();

            copyToClipboard(account_number);

            //복사완료 문구
            toast(this, '복사되었습니다.', 1500);
        });
    }

    var groom_accounts = [];


    if ($("#GroomAccounts").text() != "") {
        groom_accounts = JSON.parse($("#GroomAccounts").text());
        groom_accounts.forEach(function (elm) {
            var elem = "<dl id=\"dl_groom_" + elm.Sort + "\">";
            elem = elem + "<dt>";
            elem = elem + "<span id=\"inputGroomSender_" + elm.Sort + "\" class=\"input_groom_sender\"></span>&nbsp;&nbsp;계좌";
            elem = elem + "<a href=\"javascript:;\" class=\"copy_btn groom\" idx=\"" + elm.Sort + "\">복사하기</a>";
            elem = elem + "</dt>";
            elem = elem + "<dd><span id=\"inputGroomBank_" + elm.Sort + "\" class=\"input_groom_bank\"></span>&nbsp;&nbsp;(예금주 : <span id=\"inputGroomAccountHolder_" + elm.Sort + "\" class=\"input_groom_accountholder\" ></span>)</dd>";
            elem = elem + "<dd><span id=\"inputGroomAccountNumber_" + elm.Sort + "\" class=\"input_groom_accountnumber\"></span></dd>";
            elem = elem + "</dl>";
            $(".account_list.groom").append(elem);

            $("#inputGroomSender_" + elm.Sort).text(elm.Send_Name);
            $("#inputGroomBank_" + elm.Sort).text(elm.Bank_Name);
            $("#inputGroomAccountHolder_" + elm.Sort).text(elm.Account_Holder);
            $("#inputGroomAccountNumber_" + elm.Sort).text(elm.Account_Number);
        });

        $('.copy_btn.groom').on('click', function () {

            var idx = $(this).attr('idx');
            var account_number = $("#inputGroomAccountNumber_" + idx).text();
            copyToClipboard(account_number);

            //복사완료 문구
            toast_groom(this, '복사되었습니다.', 1500);
        });
    }
    var bride_accounts = [];
    if ($("#BrideAccounts").text() != "") {
        bride_accounts = JSON.parse($("#BrideAccounts").text());
        bride_accounts.forEach(function (elm) {
            var elem = "<dl id=\"dl_bride_" + elm.Sort + "\">";
            elem = elem + "<dt>";
            elem = elem + "<span id=\"inputBrideSender_" + elm.Sort + "\" class=\"input_bride_sender\"></span>&nbsp;&nbsp;계좌";
            elem = elem + "<a href=\"javascript:;\" class=\"copy_btn bride\" idx=\"" + elm.Sort + "\">복사하기</a>";
            elem = elem + "</dt>";
            elem = elem + "<dd><span id=\"inputBrideBank_" + elm.Sort + "\" class=\"input_bride_bank\"></span>&nbsp;&nbsp;(예금주 : <span id=\"inputBrideAccountHolder_" + elm.Sort + "\" class=\"input_bride_accountholder\" ></span>)</dd>";
            elem = elem + "<dd><span id=\"inputBrideAccountNumber_" + elm.Sort + "\" class=\"input_bride_accountnumber\"></span></dd>";
            elem = elem + "</dl>";
            $(".account_list.bride").append(elem);

            $("#inputBrideSender_" + elm.Sort).text(elm.Send_Name);
            $("#inputBrideBank_" + elm.Sort).text(elm.Bank_Name);
            $("#inputBrideAccountHolder_" + elm.Sort).text(elm.Account_Holder);
            $("#inputBrideAccountNumber_" + elm.Sort).text(elm.Account_Number);
        });

        $('.copy_btn.bride').on('click', function () {

            var idx = $(this).attr('idx');
            var account_number = $("#inputBrideAccountNumber_" + idx).text();
            copyToClipboard(account_number);

            //복사완료 문구
            toast_bride(this, '복사되었습니다.', 1500);
        });
    }

    //축의금
    if ($("#MoneyGift_Remit_Use_YN").val() == "N" && $("#MoneyAccount_Remit_Use_YN").val() == "N" &&
        $("#MoneyAccount_Div_Use_YN").val() == "N" ) {
        $(".onoff_4").hide();
    } else {
        //비회원
        if ($("#User_ID").val() == "") {
            $(".remittance_btn").hide();

            if ($("#MoneyAccount_Remit_Use_YN").val() == "Y") {
                $(".an_btn.account").show();
            } else {
                $(".an_btn.account").hide();
            }


            if ($("#MoneyAccount_Div_Use_YN").val() == "Y" && groom_accounts.length > 0) {
                $(".an_btn.groom").show();
            } else {
                $(".an_btn.groom").hide();
            }

            if ($("#MoneyAccount_Div_Use_YN").val() == "Y" && bride_accounts.length > 0) {
                $(".an_btn.bride").show();
            } else {
                $(".an_btn.bride").hide();
            }

        } else {
            $(".onoff_4").show();

            if ($("#MoneyGift_Remit_Use_YN").val() == "Y") {
                $(".remittance_btn").show();
            } else {
                $(".remittance_btn").hide();
            }

            if ($("#MoneyAccount_Remit_Use_YN").val() == "Y") {
                $(".an_btn.account").show();
            } else {
                $(".an_btn.account").hide();
            }

            if ($("#MoneyAccount_Div_Use_YN").val() == "Y" && groom_accounts.length > 0) {
                $(".an_btn.groom").show();
            } else {
                $(".an_btn.groom").hide();
            }

            if ($("#MoneyAccount_Div_Use_YN").val() == "Y" && bride_accounts.length > 0) {
                $(".an_btn.bride").show();
            } else {
                $(".an_btn.bride").hide();
            }

        }
    }
    //화환 선물 표시 여부
    if ($("#Flower_gift_YN").val() == "Y") {
        $("div.flowergift").show();
    } else {
        $("div.flowergift").hide();
    }

    if ($("#Objects").text() != "") {
        objects = JSON.parse($("#Objects").text());
        var idx = 0;
        objects.forEach(function (elem) {

            var w = elem.width * ratio
            var h = elem.height * ratio
            var x = elem.left * ratio
            var y = elem.top * ratio
            idx++;

            if (elem.type == 'img') {
                var div = "<div id='" + elem.id + "'  class='item' style='top: " + y + "px; left: " + x + "px;  position:absolute;'><img class='img' src='" + $("#CDN").val() + elem.resource_url + "' width='" + w + "px' height='" + h + "px'  /></div>";
                $('#' + elem.pid).append(div);
            }
            else if (elem.type == 'photo') {
                var div = "<div id='" + elem.id + "'  class='item photo' style='top: " + y + "px; left: " + x + "px;  width:" + w + "px; height:" + h + "px;  position:absolute;'><img class='img'  style='max-width:" + w + "px;max-height:" + h + "px;'></div>";
                $('#' + elem.pid).append(div);

                if ($("#Delegate_Image_URL").val() != "") {
                    //$(".item.photo img").attr("src", $("#Delegate_Image_URL").val() + "?" + uuidv4()).css("width", "100%");
                    $(".item.photo img").attr("src", $("#CDN").val() + $("#Delegate_Image_URL").val()).css("width", "100%");
                }
            } else {
                var text = matchText(elem.chracterset);
                var matchinfo = "<input type='text' id='" + idx + "' idx='" + idx + "' class='matchinfo' value='" + elem.chracterset + "'>"
                $('#divMatch').append(matchinfo);

                var txtfontsize = elem.fontsize * ratio;

                var div = "<div id='" + elem.id + "' class='item'  style='top: " + y + "px; left: " + x + "px;    position:absolute; width:" + w + "px;  height:" + h + "px;'><div class='text'>" + text + "</div></div>";
                $('#' + elem.pid).append(div);

                $('#' + elem.id).css('background-color', elem.bgcolor);
                $('#' + elem.id).children(".ui-resizable-handle").removeClass('resizabled');
                $('#' + elem.id).children(".ui-resizable-handle").css('display', 'none');
                $('#' + elem.id + ">.text").css('font-family', elem.font);
                $('#' + elem.id + ">.text").css('font-size', txtfontsize + "px");
                $('#' + elem.id + ">.text").css('color', elem.fontcolor);
                $('#' + elem.id + ">.text").css('font-weight', elem.bold_yn ? "bold" : "");
                $('#' + elem.id + ">.text").css('font-style', elem.italic_yn ? "italic" : "");
                $('#' + elem.id + ">.text").css('text-decoration', elem.underline_yn ? "underline" : "");
                if (elem.horizontal_align == "C") {
                    $('#' + elem.id + ">.text").css('text-align', "center")
                } else if (elem.horizontal_align == "R") {
                    $('#' + elem.id + ">.text").css('text-align', "right")
                } else if (elem.horizontal_align == "L") {
                    $('#' + elem.id + ">.text").css('text-align', "left");
                } else {
                    $('#' + elem.id + ">.text").css('text-align', "");
                }
                if (elem.vertical_align == "T") {
                    $('#' + elem.id).css('align-items', "flex-start")
                } else if (elem.vertical_align == "M") {
                    $('#' + elem.id).css('align-items', "center")
                } else if (elem.vertical_align == "B") {
                    $('#' + elem.id).css('align-items', "flex-end");
                } else {
                    $('#' + elem.id).css('align-items', "");
                }
                $('#' + elem.id + ">.text").css('letter-spacing', elem.between_text / 100 + "em");
                $('#' + elem.id + ">.text").css('line-height', elem.between_line + "em");
                $('.item').each(function () {
                    $(this).data("height", $(this).outerHeight());
                    $(this).data("width", $(this).outerWidth());
                });
                $('.text', '.item').each(function () {
                    $(this).data("height", $(this).outerHeight());
                    $(this).data("fontSize", parseInt($(this).css("font-size")));
                });
            }
        });

    }
    if ($("#ETCs").text() != "") {
        etcs = JSON.parse($("#ETCs").text());
        etcs.forEach(function (elem) {
            $("#etc_title_" + elem.Sort).html(elem.Etc_Title);
            $("#etc_contents_" + elem.Sort).html(elem.Information_Content.replace(/\n/g, '<br/>'));
            $("#etc_title_" + elem.Sort).parents('li').css("padding-bottom", "10px");
        });
    }

    if ($("#TB_Area").text() != "") {
        areas = JSON.parse($("#TB_Area").text());
        areas.forEach(function (elem) {
            $(".templatearea").each(function () {
                if ($(this).attr('idx') == elem.Area_ID) {
                    if ($(this).hasClass('templatearea')) {

                        if ($('#area' + elem.Area_ID).find('.item').length > 0) {
                            if (elem.Area_ID != 2) {
                                $('#area' + elem.Area_ID).css('height', elem.Size_Height * ratio + "px");
                            } else {
                                //$('#area' + elem.Area_ID).css('height', elem.Size_Height * ratio + "px");

                                var space = 0
                                if (typeof ($('#area2').closest('div').find('img')[0]) != "undefined") {
                                    space = parseInt($('#area2 .text').parent('div').css('top')) - $('#area2').closest('div').find('img')[0].height + 30;
                                } else {
                                    space = parseInt($('#area2 .text').parent('div').css('top')) + 30;
                                }

                                var bottom = $('#area2 img').eq(1).height() == null ? 0 : $('#area2 img').eq(1).height();

                                $('#area2').css('min-height', elem.Size_Height * ratio + "px");
                                $('#area2').css('height', $('#area2 img').height() + $('#area2 .text').height() + bottom + space);

                                if (typeof ($('#area2').closest('div').find('img')[1]) != "undefined") {
                                    var id = $('#area2').closest('div').find('img').parent('div')[1].id;

                                    $("#" + id).css('top', parseInt($('#area2 img').height() + $('#area2 .text').height() + space));
                                }

                            }
                            $('#area' + elem.Area_ID).css('background-color', elem.Color);
                        }

                    }
                }
            });
        });
    }
    //화환 영역
    $("div.flowergift .templatearea").css("height", 224 * ratio + "px");
    $("div.flowergift .templatearea img").css("height", 224 * ratio + "px");
    $("div.flowergift .templatearea img").css("width", 800 * ratio + "px");

    Kakao.init('94a08cfa99972d4a71c99401069b1311');
    var addressDetail = $("#addressDetail").text();

    if (InvitationId == "195827") {
        addressDetail = "서울대학교 교수회관";
    }

    //buttons: [
    //    {
    //        title: "자세히 보기",
    //        link: {
    //            mobileWebUrl: _url, // 모바일 주소 걍 location.href
    //            webUrl: _url  // 웹 주소 걍 location.href
    //        }
    //    }
    //],

    // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
    Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn', // 버튼 id
        objectType: 'location', // 카카오톡 링크 타입
        content: {
            title: _title, // 타이틀
            //description: _desc + "\n바른손M카드 모바일청첩장", // 상세정보
            //description: _desc + "\n바른손M카드", // 상세정보
            description: _wedddate + _desc,
            imageUrl: _image, // 이미지
            link: {
                mobileWebUrl: _url, // 모바일 주소 걍 location.href
                webUrl: _url  // 웹 주소 걍 location.href
            },
            imageWidth: parseInt(_imgWidth == null ? 0 : _imgWidth), // 이미지가로
            imageHeight: parseInt(_imgHeight == null ? 0 : _imgWidth)// 이미지 세로
        },
        address: addressDetail
    });
    if (outlineType == "OTC01") {
        strMapMedia = '<iframe id="map" src="/Mcard/NaverMap/' + invitationId + '" width="750" height="320" frameborder="0" style="border: 0" allowfullscreen></iframe>';
    }
    else {
        if (outlineImage != "") {
            strMapMedia = '<img src="' + $("#CDN").val() + outlineImage + '" class="mapImg" id="PreviewMap" style="border: 1px solid #ccc;" onerror="this.style.display=\'none\';">';
        }
    }
    $(".map_wrap").html(strMapMedia);
    // 내비게이션 (0:네이버/1:카카오)
    $(".map_btn").click(function () {
        var navurl = "";

        // 웹브라우저 내에서 네이버지도로 이동
        navurl = 'https://m.map.naver.com/map.naver?lat=' + lat + '&lng=' + lng + '&dlevel=20&mapMode=&pinTitle=' + encodeURIComponent(loc) + '&boundary=&traffic=';

        var f = window.open(navurl);

        return false;
    });
    $('.remittance_btn').click(function (e) {
        var remitwindow = window.open(serviceHost + '/RemitService/?InvitationId=' + invitationId, '_blank', '');
    });
    $('.btn_guestbook_more').click(function (e) {
        var id = $('.guestbook_item').last().data('guestbook-id');
        loadGuestbook(invitationId, 'next', id);
    });
    $('.btn_guestbook_all').click(function (e) {
        loadGuestbook(invitationId, 'all', 0);
    });
    $('.btn_share').click(function (e) {
        var type = $(this).data('type');
        var url = $('meta[property="og:url"]').attr('content');
        var title = $('meta[property="og:title"]').attr('content');

        if (type == 'copy') {
            copyToClipboard(url);
            alert("URL이 복사되었습니다.");
        }
        else if (type == 'facebook') {
            sendSns("facebook", url, title);
        }
    });
    loadGuestbook(invitationId, 'next', 0);
    $('.btn_save_guestbook').click(function (e) {
        var check = true;
        $('#frmGuestbook').find('input').each(function (e) {
            if ($(this).val() == '') {
                alert($(this).data('name') + '(을)를 입력하세요.');
                check = false;
                return false;
            }
        });

        if (!check) return;

        $.ajax({
            url: '/Mcard/GuestBook/' + invitationId,
            method: 'post',
            data: $('#frmGuestbook').serialize(),
            success: function (o) {

                alert(o.message);
                // 입력값 초기화
                $('#frmGuestbook').find('input').each(function (e) {
                    $(this).val('');
                });

                if (o.result == 'true') {
                    loadGuestbook(invitationId, 'next', 0);
                }
            }
        });
    });
    //신랑 & 신부측 혼주 보기
    $('.list_con').slideDown();
    $('.info_detail').on('click', function () {
        $(this).parent('.list_wrap').toggleClass('on');
        $('.list_con').slideToggle();
    }); 
    // Loop over gallery items and push it to the array
    $('#gallery').find('figure').each(function () {
        var $link = $(this).find('a'),
            item = {
                src: $link.attr('href'),
                w: $link.data('width'),
                h: $link.data('height'),
                title: $link.data('caption')
            };
        container.push(item);
    });
    //갤러리 타입03 - 썸네일 슬라이드
    var galleryThumbs = null

    if ($('.gallery-thumbs').length > 0) {
        galleryThumbs =
            new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 3,
                loop: true,
                freeMode: true,
                loopedSlides: 5, //looped slides should be the same
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            });
    }
    var galleryTop = null;
    if (galleryThumbs != null) {
        galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 10,
            autoHeight: true,
            loop: true,
            loopedSlides: 5, //looped slides should be the same
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: galleryThumbs,
            },
        });
    }

    //아기정보 표시
    if ($("#BabyInfos").text() != null && $("#BabyInfos").text() != "" ) {
        var b = JSON.parse($("#BabyInfos").text());
        fn_RenderBabyInfo(b);
    }

    if ($("#Product_Category_Code").val() == "PCC01") {
        //초대장
        $(".onoff_7").hide();
    } else if ($("#Product_Category_Code").val() == "PCC02") {
        //감사장
        $(".onoff_2").hide();
        $(".onoff_5").hide();
        $(".onoff_6").hide();
        $("#area9").hide();
        $("#area10").hide();
        $(".onoff_3").hide();
        $(".onoff_4").hide();
        $(".onoff_1").hide();
        $(".onoff_7").hide();
    } else if ($("#Product_Category_Code").val() == "PCC03") {
        //돌잔치
        $("#area4").hide();
    }

    if ($(document).width() < 500) {
        $(".iframe_wrap iframe").css("height", "191px");
    }

    $('.an_btn.groom').on('click', function () {
        fn_AccountClose();
        $('.account_pop.groom').show();
    });

    $('.btn.an_btn.bride').on('click', function () {
        fn_AccountClose();
        $('.account_pop.bride').show();
    });

    $('.btn.an_btn.account').on('click', function () {
        fn_AccountClose();
        $('.account_pop.account').show();
    });
    
    $('.btn.close').on('click', function () {
        fn_AccountClose();
        scrollAble();
    });

    //층/홀/실 줄바꿈
    if($("#DetailNewLineYN").val() == "Y") {
        $(".i_WeddingHallDetail").prepend("</br>");
    }

});


function getWeddingWeekName(txt) {
    //영문의경우
    if ($("#WeddingWeek_Eng_YN").val() == "Y") {
        switch (txt.toUpperCase()) {
            case "MON":
                txt = "월";
                break;
            case "TUE":
                txt = "화";
                break;
            case "WED":
                txt = "수";
                break;
            case "THU":
                txt = "목";
                break;
            case "FRI":
                txt = "금";
                break;
            case "SAT":
                txt = "토";
                break;
            case "SUN":
                txt = "일";
                break;
        }
    }

    return txt;
}

function getTime_Type_Name(txt) {
    //영문의경우
    if ($("#Time_Type_Eng_YN").val() == "Y") {
        switch (txt.toUpperCase()) {
            case "AM":
                txt = "오전";
                break;
            case "PM":
                txt = "오후";
                break;
        }
    }
    return txt;
}

function copyToClipboard(text) {
    var aux = document.createElement("textarea");
    aux.value = text;
    document.body.appendChild(aux);
    aux.select();
    aux.setSelectionRange(0, 9999);
    document.execCommand("copy");
    document.body.removeChild(aux);
}
function loadGuestbook(invitationId, type, id) {
    $.ajax({
        url: '/Mcard/GuestBook/' + invitationId + '/' + type + '/' + id,
        method: 'get',
        data: {},
        success: function (html) {
            if (type == 'all' || id == 0) {
                $('#guestbook').html(html);
            }
            else {
                $('#guestbook').append(html);
            }

            setEventGuestbook();
        }
    });
}
function setEventGuestbook() {
    //방명록 댓글 토글 이벤트
    $(".message_del").on('click', function () {
        $(this).parents('li').find(".password_check").slideToggle();
    });

    $('.btn_delete_guestbook').click(function (e) {
        var id = $(this).data('guestbook-id');
        var password = $(this).parent().find('input[name="password"]').val();
        var invitationId = $('#invitationId').val();
        $.ajax({
            url: '/Mcard/GuestBook/' + invitationId + '/Remove',
            data: {
                Id: id,
                password: password
            },
            method: 'post',
            success: function (o) {
                loadGuestbook(invitationId, 'next', 0);
            }
        });
    });
}
function setVideo(id) {
    switch (id) {
        case "VTC01"://Youtube
            var htmlInput = $("#Invitation_Video_URL").val();
            var pattern = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:shorts\/)?(?:watch\?v=)?(.+)/g;

            if (pattern.test(htmlInput)) {
                var replacement = '<iframe src="//www.youtube.com/embed/$1" frameborder="0" class="embed-container" allowfullscreen></iframe>';


                htmlInput = htmlInput.replace(pattern, replacement);
            }

            $(".iframe_wrap").html(htmlInput);

            break;
        case "VTC02": //Vimeo
            $(".iframe_wrap").html($("#Invitation_Video_URL").val());
            break;
        case "VTC03"://FEELMAKER
            $(".iframe_wrap").html($("#Invitation_Video_URL").val());
            break;

    }

}
function matchText(text) {

    if (text != null) {
        var _matches = text.match(/#[^#]+#/g);

        if (_matches != null) {
            for (var i = 0; i < _matches.length; i++) {
                var target = _matches[i].replace(/#/g, '');
                var split = target.split(/\|/);
                var _append = $('[match="' + split[0] + '"]').val();
                if (split.length > 1) {
                    _append = '<span style="' + split[1] + '">' + _append + '</span>'
                }
                text = text.replace(_matches[i], _append);
            }
        }
        text = text.replace(/\r|\n|\r\n/g, "<br>");
    }
    return text;
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function setDday(wedding_date) {
   
    if (typeof $(".d_day").val() != 'undefined') {
        var today = new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
        var wedd_day = new Date(wedding_date);
        var distance = wedd_day - today
        var dday = Math.floor(distance / (1000 * 60 * 60 * 24));

        if (parseInt(dday) > 0) {
            //예식일이전
            $(".d_day").text("D-" + parseInt(dday));
            $(".d_day").show();
        } else if (parseInt(dday) == 0) {
            $(".d_day").text("D-Day");
            $(".d_day").show();
            //예식일당일
        } else {
            //예식일이후
            $(".d_day").hide();
        }
    }
}

//스크롤 방지 이벤트
function scrollDisable() {
    $('body').addClass('scroll_off').on('scroll touchmove mousewheel');
}
//스크롤 방지해제 이벤트
function scrollAble() {
    $('body').removeClass('scroll_off').off('scroll touchmove mousewheel');
}
function accOpen() {
    $('.account_pop').show();
    scrollDisable();
}
function accClose() {
    $('.account_pop').hide();
    scrollAble();
}

function fn_AccountClose() {
    $('.account_pop.groom').hide();
    $('.account_pop.bride').hide();
    $('.account_pop.account').hide();
    scrollDisable();
}

function toast(select, msg, timer) {
    var $elem = $("<p>" + msg + "</p>");

    $(".toast.all").html($elem).show();

    $elem.slideToggle(100, function () {
        setTimeout(function () {
            $elem.fadeOut(function () {
                $(this).remove();
                $('.toast.all').css('bottom', '');
            });
        }, timer);
        return false;
    });

    $('.toast.all').stop().animate({ 'bottom': '5%' });
}

function toast_groom(select, msg, timer) {
    var $elem = $("<p>" + msg + "</p>");

    $(".toast.groom").html($elem).show();

    $elem.slideToggle(100, function () {
        setTimeout(function () {
            $elem.fadeOut(function () {
                $(this).remove();
                $('.toast.groom').css('bottom', '');
            });
        }, timer);
        return false;
    });

    $('.toast.groom').stop().animate({ 'bottom': '5%' });
}

function toast_bride(select, msg, timer) {
    var $elem = $("<p>" + msg + "</p>");

    $(".toast.bride").html($elem).show();

    $elem.slideToggle(100, function () {
        setTimeout(function () {
            $elem.fadeOut(function () {
                $(this).remove();
                $('.toast.bride').css('bottom', '');
            });
        }, timer);
        return false;
    });

    $('.toast.bride').stop().animate({ 'bottom': '5%' });
}

//아기정보 변경
function fn_RenderBabyInfo(binfo) {
    babyInfos = binfo;
    var divRoot = $("div.baby_area");
    divRoot.empty();
    babyInfos.sort((a, b) => a.idx - b.idx);

    var babyAreas = [17, 18, 19, 20];

    babyInfos.forEach(function (elem) {
        var divInfo = $("<div />");

        babyAreas.forEach(function (areaId) {
            var areaItem = $.grep(areas, function (item, index) { return (item.Area_ID == areaId) })[0];

            var atemplate = $.grep(objects, function (item, index) { return (item.pid == "area" + areaId) });
            atemplate.sort((a, b) => a.zindex - b.zindex);

            //아기정보 본문
            if (areaId == 19) {
                $.each(elem.ExtraInfos, function (index, extentItem) {
                    var areadiv = $("<div />").attr("idx", areaId).addClass("templatearea");
                    fn_BindBabyInfo(elem, atemplate, areadiv, extentItem);;
                    
                    divInfo.append(areadiv);
                });

            } else {
                var areadiv = $("<div />").attr("idx", areaId).addClass("templatearea");
                fn_BindBabyInfo(elem, atemplate, areadiv, null);
                areadiv.css('height', areaItem.Size_Height * $("#wrap").width() / 800 + "px");
                divInfo.append(areadiv);
            }

        });

        divRoot.append(divInfo);

        $.each(divRoot.find("div.templatearea"), function (idx, areadiv) {
            if ($(areadiv).attr("idx") == "19") {
                var totheight = 15.0;
                $.each($(areadiv).find("div.text"), function (idx, txtItem) {
                    var curHeight = $(txtItem).outerHeight(true);
                    totheight += curHeight;
                    $(txtItem).parent().css("height", curHeight + "px")
                });

                $(areadiv).find("img.img").height(totheight + "px");
                $(areadiv).css('height', totheight + "px")

            } else {
                $(areadiv).find('.text', '.item').each(function () {
                    $(this).data("height", $(this).outerHeight());
                    $(this).data("fontSize", parseInt($(this).css("font-size")));
                });
            }
        });
       
    });
}
function fn_BindBabyInfo(item, template, tareget, extentItem) {

    template.forEach(function (elem) {
        var w = elem.width * ratio
        var h = elem.height * ratio
        var x = elem.left * ratio
        var y = elem.top * ratio

        if (elem.type == 'img') {
            var div = "<div class='item' style='top: " + y + "px; left: " + x + "px;  position:absolute;'><img class='img' src='" + $("#CDN").val() + elem.resource_url + "' width='" + w + "px' height='" + h + "px'  /></div>";
            tareget.append(div);
        } else if (elem.type == 'profile') {
            if (item.Image_Width > 0)
                w = item.Image_Width * ratio;
            if (item.Image_Height > 0)
                h = item.Image_Height * ratio;

            var div = "<div class='item profile-image' style='top: " + y + "px; left: " + x + "px;  position:absolute;'><img class='img' src='" + $("#CDN").val() + item.Image_URL + "' width='" + w + "px' height='" + h + "px'  /></div>";
            tareget.append(div);

        } else {
            var birthDay = new Date(item.Birthday);
            var text = elem.chracterset;
            //아기정보 match
            var _matches = text.match(/#[^#]+#/g);
            if (_matches != null) {
                for (var i = 0; i < _matches.length; i++) {
                    switch (_matches[i]) {
                        case "#아기이름#":
                            text = text.replace(_matches[i], item.Name);
                            break;
                        case "#탄생일자#":
                            var d = birthDay.getDate();
                            var m = birthDay.getMonth() + 1; //Month from 0 to 11
                            var y = birthDay.getFullYear().toString().substr(-2);
                            var datestr = '' + y + '.' + (m <= 9 ? '0' + m : m) + '.' + (d <= 9 ? '0' + d : d);
                            text = text.replace(_matches[i], datestr);
                            break;
                        case "#탄생년#":
                            text = text.replace(_matches[i], birthDay.getFullYear());
                            break;
                        case "#탄생월#":
                            var mm = birthDay.getMonth() + 1; // getMonth() is zero-based
                            text = text.replace(_matches[i], (mm > 9 ? '' : '0') + mm);
                            break;
                        case "#탄생일#":
                            var dd = birthDay.getDate();
                            text = text.replace(_matches[i], (dd > 9 ? '' : '0') + dd);
                            break;
                        case "#아기정보키#":
                            text = text.replace(_matches[i], extentItem.Title);
                            break;
                        case "#아기정보값#":
                            text = text.replace(_matches[i], extentItem.Value);
                            break;

                    }
                }
                //기본 match
                text = matchText(text);
                var div = $("<div />").addClass("item").css("top", y + "px").css("left", x + "px").css("position", "absolute").css("width", w + "px").css("height", h + "px").css('background-color', elem.bgcolor);

                var txtfontsize = elem.fontsize * ratio;
                var textdiv = $("<div />").addClass("text").css('font-family', elem.font).css('font-size', txtfontsize + "px").css('color', elem.fontcolor)
                    .css('font-weight', elem.bold_yn ? "bold" : "").css('font-style', elem.italic_yn ? "italic" : "").css('text-decoration', elem.underline_yn ? "underline" : "")
                    .css('letter-spacing', elem.between_text / 100 + "em").css('line-height', elem.between_line + "em")
                    .html(text);

                if (elem.horizontal_align == "C") {
                    textdiv.css('text-align', "center")
                } else if (elem.horizontal_align == "R") {
                    textdiv.css('text-align', "right")
                } else if (elem.horizontal_align == "L") {
                    textdiv.css('text-align', "left");
                }

                if (elem.vertical_align == "T") {
                    div.css('align-items', "flex-start");
                } else if (elem.vertical_align == "M") {
                    div.css('align-items', "center");
                } else if (elem.vertical_align == "B") {
                    div.css('align-items', "flex-end");
                }

                div.append(textdiv);
                tareget.append(div);

            }

        }

    });

}


$(window).load(function () {
    if (typeof $(".d_day").val() != 'undefined') {
        $(".d_day").css("font-size", (parseInt($(".d_day").css("font-size").replace("px", "")) * ratio) + "px");
        $(".d_day").show();
    }
    setDday($("#WeddingDate").val());
    $(".loader_mcard").hide();
});


