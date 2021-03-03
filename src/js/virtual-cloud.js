$(document).ready(function() {

    //переменные
    const price = {
            PleskWordPressToolkit: 250,
            PremiumEmail: {
                user1: 290,
                family5: 458,
                entry10: 824,
                starter30: 2285,
                small50: 3567,
                medium100: 6310,
                large500: 27345
            },
            PleskImunify360: 1090,
            SSLAlphaSSL: 2300,
            OptimizationForBitrix: 260
        },

        PleskWordPressToolkit_checkbox = $('input[name="PleskWordPressToolkit"]'),
        PremiumEmail_checkbox = $('input[name="PremiumEmail"]'),
        PremiumEmailUser_select = $('input[name="PremiumEmailUser"]'),
        PleskImunify360_checkbox = $('input[name="PleskImunify360"]'),
        SSLAlphaSSL_checkbox = $('input[name="SSLAlphaSSL"]'),
        OptimizationForBitrix_checkbox = $('input[name="OptimizationForBitrix"]'),

        PleskWordPressToolkitText = $('#PleskWordPressToolkitText'),
        PremiumEmailText = $('#PremiumEmailText'),
        PleskImunify360Text = $('#PleskImunify360Text'),
        SSLAlphaSSLText = $('#SSLAlphaSSLText'),
        OptimizationForBitrixText = $('#OptimizationForBitrixText'),

        term = $('input[name="term"]'),

        totalPrice = $('#totalPrice');

    let PremiumEmailUser_selectVal = $(PremiumEmailUser_select).val();


    function calculator() {
        let total = 0;
        if (PleskWordPressToolkit_checkbox.is(':checked')) {
            total = total + price.PleskWordPressToolkit;
        }
        if (PremiumEmail_checkbox.is(':checked')) {
            total = total + price.PremiumEmail[PremiumEmailUser_selectVal];
        }
        if (PleskImunify360_checkbox.is(':checked')) {
            total = total + price.PleskImunify360;
        }
        if (SSLAlphaSSL_checkbox.is(':checked')) {
            total = total + price.SSLAlphaSSL;
        }
        if (OptimizationForBitrix_checkbox.is(':checked')) {
            total = total + price.OptimizationForBitrix;
        }
        $(totalPrice).text(total);
    }

    $(PleskWordPressToolkit_checkbox).on('change', function() {
        calculator();
    })
    $(PremiumEmail_checkbox).on('change', function() {
        calculator();
    })
    $(PleskImunify360_checkbox).on('change', function() {
        calculator();
    })
    $(SSLAlphaSSL_checkbox).on('change', function() {
        calculator();
    })
    $(OptimizationForBitrix_checkbox).on('change', function() {
        calculator();
    })

    function renderTextCalculator() {
        $(PleskWordPressToolkitText).text(price.PleskWordPressToolkit);
        $(PremiumEmailText).text(price.PremiumEmail[PremiumEmailUser_selectVal]);
        $(PleskImunify360Text).text(price.PleskImunify360);
        $(SSLAlphaSSLText).text(price.SSLAlphaSSL);
        $(OptimizationForBitrixText).text(price.OptimizationForBitrix);
    }
    renderTextCalculator();

    function recountPremiumEmail() {
        $(PremiumEmailText).text(price.PremiumEmail[PremiumEmailUser_selectVal]);
        calculator();
    }


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
        value: 1,
        min: 1,
        max: 100,
        slide : function(event, ui) {
            $("#virSlider1Text").text(ui.value);
        }
    });
    $('#virSlider1Text').text($('#virSlider1').slider('value'));   

    //ползунок 2
    $('#virSlider2').slider({
        animate: "slow",
        range: "min",    
        value: 1,
        min: 1,
        max: 100,
        slide : function(event, ui) {
            $("#virSlider2Text").text(ui.value);
        }
    });
    $('#virSlider2Text').text($('#virSlider2').slider('value')); 

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
        $(this).closest('.vir-select').find('.vir-select__input').val($(this).data('value'));
        $('.vir-select').removeClass('open');
    });

    $('#premEmail').on('click', '.vir-select__item', function (e) {
        PremiumEmailUser_selectVal = $(PremiumEmailUser_select).val()
        recountPremiumEmail();
    });
    $('#term').on('click', '.vir-select__item', function (e) {
        // recountPremiumEmail($(this).data('value'));
    });

    //табы
    $('.jsTab').on('click', function() {
        if (!$(this).hasClass('active')) {
            const tab = $(this).data('tab');
            $('.jsTabConainer').addClass('hide');
            $(`#${tab}`).removeClass('hide');

            $('.jsTab').removeClass('active');
            $(this).addClass('active');
        }
    })


    //Плавный скрол к элементу
    function scrollTo(element) {
        $("html, body").animate({ scrollTop: $(element).offset().top }, 1000);
    }


    //Добавить в заказ
    $('.jsAddToOrder').on('click', function(e) {
        e.preventDefault();
        const service = $(this).data('service');
        const link = $(this).attr('href');

        scrollTo(link);
        $(`#${service}`).prop('checked', true);
    });

    //Переход к табу
    $('.jsGoTab').on('click', function(e) {
        e.preventDefault();
        const link = $(this).attr('href');
        const tab = $(this).data('tab');

        scrollTo(link);
        $(`.jsTab[data-tab='${tab}']`).click();
    });

    //переход к элементу
    $('.jsGoLink').on('click', function(e) {
        e.preventDefault();
        const link = $(this).attr('href');
        scrollTo(link);
    });

});

$(window).on('load', function() {
    //скрипт одинаковой высоты
    function equalHeight (selector) {
        let max_col_height = 0;
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
});