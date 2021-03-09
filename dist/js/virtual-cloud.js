$(document).ready(function() {

    //переменные
    const price = {
            minimum: 190,
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
            OptimizationForBitrix: 260,
            NVMe: 49.90,
            Site: 24.90,
            sale24m: 0.24
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

        totalPriceSale = $('#totalPriceSale');
        totalPriceSaleBlock = $('#sale');

    let PremiumEmailUser_selectVal = $(PremiumEmailUser_select).val(),
        term_selectVal = $(term).val(),
        polz1 = 1;
        polz2 = 1;


    function calculator() {
        let total = price.minimum - price.NVMe - price.Site,
            sale = 0;

        if (PleskWordPressToolkit_checkbox.is(':checked')) {
            total = total + price.PleskWordPressToolkit;
        }
        if (PremiumEmail_checkbox.is(':checked')) {
            total = total + price.PremiumEmail[PremiumEmailUser_selectVal];
        }
        if (PleskImunify360_checkbox.is(':checked')) {
            total = total + price.PleskImunify360;
        }
        if (OptimizationForBitrix_checkbox.is(':checked')) {
            total = total + price.OptimizationForBitrix;
        }
        total = total + (polz1*price.NVMe);
        total = total + (polz2*price.Site);

        
        if (term_selectVal == 24) {
            $(totalPriceSaleBlock).removeClass('hide');
            sale = (total * price.sale24m * term_selectVal);
            if (SSLAlphaSSL_checkbox.is(':checked')) {
                sale = sale + (price.SSLAlphaSSL * 2 * price.sale24m);
            }
            total = (total - (total * price.sale24m)) * term_selectVal;
            if (SSLAlphaSSL_checkbox.is(':checked')) {
                total = total + (price.SSLAlphaSSL * 2 - (price.SSLAlphaSSL * 2 * price.sale24m));
            }
        } else {
            $(totalPriceSaleBlock).addClass('hide');
            total = total * term_selectVal;
            if (SSLAlphaSSL_checkbox.is(':checked')) {
                total = total + price.SSLAlphaSSL;
            }
        }
        console.log(term_selectVal);

        $(totalPrice).text(total.toFixed(2));
        $(totalPriceSale).text(sale.toFixed(2));
        humanMoney(totalPrice, 2);
        humanMoney(totalPriceSale, 2);
    }
    calculator();
    $('.jsVirCheckBox').on('change', function() {
        calculator();
    });

    function renderTextCalculator() {
        $(PleskWordPressToolkitText).text(price.PleskWordPressToolkit);
        humanMoney(PleskWordPressToolkitText, 0);

        $(PremiumEmailText).text(price.PremiumEmail[PremiumEmailUser_selectVal]);
        humanMoney(PremiumEmailText, 0);

        $(PleskImunify360Text).text(price.PleskImunify360);
        humanMoney(PleskImunify360Text, 0);

        $(SSLAlphaSSLText).text(price.SSLAlphaSSL);
        humanMoney(SSLAlphaSSLText, 0);

        $(OptimizationForBitrixText).text(price.OptimizationForBitrix);
        humanMoney(OptimizationForBitrixText, 0);
    }
    renderTextCalculator();

    function recountPremiumEmail() {
        $(PremiumEmailText).text(price.PremiumEmail[PremiumEmailUser_selectVal]);
        humanMoney(PremiumEmailText, 0);
        calculator();
    }

    function humanMoney(select, num) {
        $(select).text((e, text) => {
            const price = text.split(' ');
            return (+price).toLocaleString('ru-RU',{minimumFractionDigits: num});
          });
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
    });

    //ползунок 1
    $('#virSlider1').slider({
        animate: "slow",
        range: "min",    
        value: 1,
        min: 1,
        max: 100,
        slide : function(event, ui) {
            $("#virSlider1Text").text(ui.value);
            polz1 = ui.value;
            calculator();
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
            polz2 = ui.value;
            calculator();
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
        $(this).closest('.vir-select').find('.vir-select__head').text($(this).find('span').text());
        $(this).closest('.vir-select').find('.vir-select__input').val($(this).data('value'));
        $('.vir-select').removeClass('open');
    });

    $('#premEmail').on('click', '.vir-select__item', function (e) {
        PremiumEmailUser_selectVal = $(PremiumEmailUser_select).val()
        recountPremiumEmail();
    });
    $('#term').on('click', '.vir-select__item', function (e) {
        term_selectVal = $(term).val();
        calculator();
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