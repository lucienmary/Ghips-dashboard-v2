$( document ).ready(function() {
    const localIp = $('#input-ip').val();
    const localPort = $('#input-port').val();

    $('#led-1').click(() => isChecked('#led-1'));
    $('#led-2').click(() => isChecked('#led-2'));

    function isChecked(idCheckbox) {
        if($(idCheckbox).prop("checked") == true){
            ajaxUpdateServer(idCheckbox, true);
        }
        else if($(idCheckbox).prop("checked") == false){
            ajaxUpdateServer(idCheckbox, false);
        }
    }

    function ajaxUpdateServer(key, value) {
        var url = new URL(`http://${localIp}:${localPort}/update-server/?`);
        url.searchParams.set(key, value);

        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
        })
    }
});