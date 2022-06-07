
$(".right-text").click(function () {//ボタンがクリックされたら
    if((this).classList.contains('active') == true ){
        $(".right-text").removeClass('active');
        (this).textContent = '- close -';
        $("#g-nav").toggleClass('panelactive');
    }else{
        $(this).toggleClass('active');
        (this).textContent = '- other tag -';
        $("#g-nav").removeClass('panelactive');
    }
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".right-text").removeClass('active');//tagテキストのactiveクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});