
$(".right-text").click(function () {//ボタンがクリックされたら
    if((this).classList.contains('active') == true ){
        (this).textContent = '- other tag -';
    }else{
        (this).textContent = '- close -';
    }
    $("#right-fixed").toggleClass('.right-fixed-z-index');
    $(".right-text").toggleClass('active');
    $("#g-nav").toggleClass('panelactive');
});


$(".close").click(function () {//ボタンがクリックされたら
    console.log("mumu");
    $("#event-detail").removeClass('windowactive');
    $("#close-button").removeClass('windowactive');

});




