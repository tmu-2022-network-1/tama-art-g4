
$(".right-text").click(function () {//ボタンがクリックされたら
    if((this).classList.contains('active') == true ){
        (this).textContent = '- other tag -';
    }else{
        (this).textContent = '- close -';
    }
    $(".right-text").toggleClass('active');
    $("#g-nav").toggleClass('panelactive');
});

