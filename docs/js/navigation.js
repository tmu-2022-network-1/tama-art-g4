
$(".right-text").click(function () {//ボタンがクリックされたら
    // if((this).classList.contains('active') == true ){
    //     (this).textContent = '- other tag -';
    // }else{
    //     (this).textContent = '- close -';
    // }
    $("#right-fixed").toggleClass('.right-fixed-z-index');
    $(".right-text").toggleClass('active');
    $("#g-nav").toggleClass('panelactive');
    
    var state = openNav();
    document.getElementById('tag-state').textContent = '-' + state + '-';
});

$(".radio-inline__label").click(function () {
    $("#right-fixed").toggleClass('.right-fixed-z-index');
    $(".right-text").toggleClass('active');
    $("#g-nav").toggleClass('panelactive');

    var state = openNav();
    document.getElementById('tag-state').textContent = '-' + state + '-';
});

var openNav = function(){
    if($("#g-nav").hasClass('panelactive')){
        return 'close';
    }else{
        return 'other tag';
    }
}

$(".close").click(function () {//ボタンがクリックされたら
    console.log("mumu");
    $("#event-detail").removeClass('windowactive');
    $("#close-button").removeClass('windowactive');

});

// $(document).on('click touchend', function(event) {
//     console.log($(".windowactive"));
//     if($(".windowactive")){
//         if (!$(event.target).closest('.event-detail').length) {
//             $("#event-detail").removeClass('windowactive');
//         }
//     }
//   });


