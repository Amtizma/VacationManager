$(document).ready(function() {
function resizeTextarea() {
    var textarea = document.getElementById("objectivename");

// Set the height based on whether the textarea is scrollable
    if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = "50px";
    } else {
        textarea.style.height = "30px";
    }
}

// Permite ca doar cifre sa fie scrise in inputurile cu ID-urile #people si #rooms.
$(document).ready(function () {
    $('#people').on('input', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
});
$(document).ready(function () {
    $('#rooms').on('input', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
});
//------------------------------------ Autocomplete ------------------------------------------------
$(document).ready(function() {
    const input = $('#Name1');
    const datalist = $('#cities');

    input.on('input', function() {
        const value = input.val();
        datalist.empty();

        cities.forEach(function(city) {
            if (city.toLowerCase().startsWith(value.toLowerCase())) {
                datalist.append(`<option value="${city}">`);
            }
        });
    });

    input.on('blur', function() {
        if (!cities.includes(input.val())) {
            datalist.empty();
        }
    });

    input.on('change', function() {
        const options = datalist.find('option');
        if (options.length > 0) {
            input.val(options.first().val());
        }
    });
});
$(document).ready(function() {
    const input = $('#startingcityname');
    const datalist = $('#cities1');
    input.on('input', function() {
        const value = input.val();
        datalist.empty();

        cities.forEach(function(city) {
            if (city.toLowerCase().startsWith(value.toLowerCase())) {
                datalist.append(`<option value="${city}">`);
            }
        });
    });

    input.on('blur', function() {
        if (!cities.includes(input.val())) {
            datalist.empty();
        }
    });

    input.on('change', function() {
        const options = datalist.find('option');
        if (options.length > 0) {
            input.val(options.first().val());
        }
    });
});
//--------------------------------------------------------------------------------------------------
});