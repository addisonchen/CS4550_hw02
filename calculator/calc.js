(function() {
    "use strict";

    let display = document.getElementById('display');

    function setup_buttons() {
        let valBtns = document.querySelectorAll('.btn');
        console.log(valBtns);

        valBtns.forEach(btn => {
            console.log(btn.value);
        });

    }


    window.addEventListener('load', setup_buttons, false);

    console.log('hello')
})();