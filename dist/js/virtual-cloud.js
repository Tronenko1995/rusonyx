$(document).ready(function() {

    //скрытие и появление блока с ценами на субдомен
    $('.jsSubdomain').on('input', function () {
        if ($(this).val() != '') {
            $('.jsPriceBlock').removeClass('hide');
            $('.jsLine').removeClass('hide');
        } else {
            $('.jsPriceBlock').addClass('hide');
            $('.jsLine').addClass('hide');
        }
    })

    //ползунок 1
    $('#virSlider1').slider({
        animate: "slow",
        range: "min",    
        value: 20,
        min: 1,
        max: 190,
        slide : function(event, ui) {
            $("#virSlider1Text").text(ui.value);
        }
    });
    $('#virSlider1Text').text($('#virSlider1').slider('value'));   

    //ползунок 2
    $('#virSlider2').slider({
        animate: "slow",
        range: "min",    
        value: 20,
        min: 1,
        max: 190,
        slide : function(event, ui) {
            $("#virSlider2Text").text(ui.value);
        }
    });
    $('#virSlider2Text').text($('#virSlider2').slider('value')); 
    
    //скрипт одинаковой высоты
    function equalHeight (selector) {
        let max_col_height = 0
        $(selector).each(function() {
            if ($(this).height() > max_col_height) { 
                max_col_height = $(this).height();
            }
        });
        $(selector).height(max_col_height);
    }
     //делаем одинаковую высоту в блоке калькулятор тарифов если ширина 1200+
     if (document.body.clientWidth > 1185) {
        equalHeight('.vir-calculator__block-container');
     }

    //Селект
    $('.vir-select').on('click',function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
        } else {
          $(this).addClass('open');
        }
    });
    $('.vir-select').on('click', '.vir-select__item', function (e) {
        e.stopPropagation();
        $(this).closest('.vir-select').find('.vir-select__head').text($(this).text())
        $(this).closest('.vir-select').find('.vir-select__input').val($(this).text());
        $('.vir-select').removeClass('open');
    });
});