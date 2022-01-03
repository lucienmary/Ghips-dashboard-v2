
$( document ).ready(function() {
    console.log('CRON');

    setInterval(() => {
        cronAssData()
    }, 2000);

    function cronAssData() {
        $.ajax({
            url: "/update-client"
        }).done((data) => console.log(data))
    }
});