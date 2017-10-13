var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        app.member.onCreate();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        /*var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};

app.member = (function(){
    var onCreate = function(){
        setContentView();

        $('#loginBtn').click(e=>{
            e.preventDefault();
        var inputId = $('#id').val();
        var inputPw = $('#pass').val();
        console.log('입력값:'+inputId+'/'+inputPw);

        $.ajax({
            async : false,
            url : 'json/member.json',
            type : 'post',
            data : {id:inputId, pass:inputPw},
            dataType : 'json',
            success : d => {
            alert('success 진입');
        $.each(d,(i,o)=>{
            if(o.id === inputId && o.pass === inputPw){
            checkval = true;   //별도 선언하지 않으면 전역변수가 됨
            return false;
        }else{
            checkval = false;
        }
    });

        if(checkval == true){
            alert('success');
            app.reservation.onCreate();
        }else{
            alert('fail');
            $('#id').val('');
            $('#pass').val('');
        }
    },
        error : e => {
            alert('error');
        }
    });
    });
        $('#joinBtn').click(e=>{
            e.preventDefault();
    });
    };

    var setContentView = function(){
        var compUI={
                br : ()=>{return $('<br/>')},
            div : x=>{return $('<div/>',{ id : x });},
        h1 : x=>{return $('<h1/>',{ id : x });},
        h2 : x=>{return $('<h2/>',{ id : x });},
        h3 : x=>{return $('<h3/>',{ id : x });},
        span : x=>{return $('<span/>',{ id : x });},
        input : (x,y,z)=>{return $('<input/>',{ id : x, name: x, type : y, value : z });},
        btn : x => {return $('<button/>',{ id : x});},
        aBtn : x=>{return $('<a>',{ href:'#', role:'button', id:x });},
        image : (x,y)=>{return $('<img/>',{ id : x, src : y });},
        table : x=>{return $('<table/>',{id : x});},
        td : ()=>{return $('<td/>');},
        li : ()=>{return $('<li/>');}
    }

        $('body').empty();
        $('<div></div>').attr('id','wrapper').appendTo('body');
        $('#wrapper').css({
            'background-color' : 'white',
            'width' : '100%',
            'height' : '100%'
        })
            .html('<div id="container">'
                + '   <div id="content"></div>'
                + '</div>'
            );
        $('#container').css({
            'background-color' : 'white',
            'width' : '100%',
            'height' : '100%'
        });
        $('#content').css({
            'background-color' : 'white',
            'width' : '100%',
            'height' : '100%'
        });

        $('#content').append(compUI.input('id','text'));
        $('#content').append(compUI.input('pass','text'));
        $('#content').append(compUI.btn('loginBtn'));
        $('#content').append(compUI.btn('joinBtn'));

        $('#id').attr('placeholder', 'ID').css({'width' : '100%', 'height' : '50px', 'margin-top':'30px'});
        $('#pass').attr('placeholder', 'Password').css({'width' : '100%', 'height' : '50px', 'margin-top':'20px'});
        $('#loginBtn').text('로그인').addClass('btn btn-default').css({'margin':'30px auto', 'margin-left':'50px', 'margin-right':'20px'});
        $('#joinBtn').text('회원가입').addClass('btn btn-default').css({'margin':'10px auto'});
    };

    return { onCreate : onCreate };
})();



app.reservation = (function(){
    var onCreate = function(){
        setContentView();
    };

    var setContentView = function(){

        $('#content').html('<h1> 예약 관리 </h1></br>').css({'width':'100%', 'height':'100%', 'background-color':'white'});
        var arr = ['A', 'B', 'C', 'D', 'E'];
        var table = '<table id="tbl" border=1 style="border-collapse:collapse; margin: 0 auto">';

        $.each(arr, (i, j)=>{
            table += '<tr style="height:25px; width:50px">';
            $.each(arr, (d, c)=>{
                table += '<td style="width:10% ; text-align: center;" onclick="app.reservation.select('+'\''+arr[i]+(d+1)+'\')">' + arr[i] + '' + (d+1) + '</td>';
            });
        });

        table += '</tr></table>';
        $('#content').append(table);
        $('#content').append('<div id="select-date">날짜 선택하기</div><div id="calendar"></div>'
                            + '<div id="select-time">시간 선택하기</div><div id="clock"></div>'
                            + '<div id="select-sample">정규식 샘플선택</div><div id="sample"></div>'
        );
        $('#select-time').addClass('timepicker');
            $('#select-date').click(e=>{
                $('#calendar').datepicker({
                language:"kr",
                format: "yyyy-mm-dd",
                startDate : "+0d",
                endDate : "+3d",
                todayHighlight: true,
                autoclose : true
            });
        });

        $('#select-time').click(e=>{

        });

        $('#select-sample').click(e=>{
            $('#content').html(
                "<h1>정규식 샘플</h1>"
                + "<input type='text' id='only-num' placeholder='숫자만 입력'>"
                + "<button id='test-num'>숫자 테스트</button><br/>"
                + "<input type='text' id='pass-val' placeholder='영문 대.소문자, 숫자만 가능 4~10'>"
                + "<button id='test-pass'>비번 테스트</button>"
            );

            $('#test-num').click(e=>{
                if(app.valid.isNumber($('#only-num').val())){
                    alert($('#only-num').val());
                }else{
                    alert('숫자만 입력 가능');
                    $('#only-num').val('');
                }
            });


            $('#test-pass').click(e=>{
                if(app.valid.pwChecker($('#pass-val').val())==='yes'){
                    alert($('#pass-val').val());
                }else {
                    alert('영문 대.소문자, 숫자만 가능 4~10');
                    $('#pass-val').val('');
                }
            });

        });


    };






    return { onCreate : onCreate };
})();

app.valid={
    isNumber : x=>{
        return typeof (x*1) === 'number' && isFinite(x);
    },
    pwChecker : x=>{
        var pw_regs = /^[0-9a-zA-Z]{4,10}$/;
        return pw_regs.test(x)?"yes":"no";
    }
};

//ctx
$(function(){
    app.initialize();
});

app.initialize();