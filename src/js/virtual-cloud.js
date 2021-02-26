$(document).ready(function() {
    $('.jsSubdomain').on('input', function () {
        console.log($(this).val())
        if ($(this).val() != '') {
            $('.jsPriceBlock').removeClass('hide');
            $('.jsLine').removeClass('hide');
        } else {
            $('.jsPriceBlock').addClass('hide');
            $('.jsLine').addClass('hide');
        }
    })
    var handle = $("#custom-handle");
    $( "#polzunok" ).slider({
        create: function() {
			handle.text($(this).slider("value"));
		},
        animate: "slow",
        range: "min",    
        value: 20,
        max: 190,
        slide : function(event, ui) {
            handle.text( ui.value );
            let val = ui.handle.style.cssText;
            val = parseFloat(val.substr(6))
            $(".jsSliderCounter").text(ui.value);
            $(".jsSliderCounter").css('left',`${val}%`);
            console.log(val)
            // console.log('ui.handle.style.cssText', ui.handle.style.cssText) 
            // console.log('ui.handle.style.cssText', parseInt(ui.handle.style.cssText.slice(6, 1))) 
            // console.log('ui.handle.style.cssText', ui.handle.style.cssText.slice(2, 1)) 
        }
    });
    $(".jsSliderCounter").text($( "#polzunok" ).slider("value"));   
    $(".jsSliderCounter").css('left',`${val}%`);   
});