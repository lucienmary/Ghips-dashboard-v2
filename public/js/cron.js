
$( document ).ready(function() {
    console.log('CRON');

    setInterval(() => {
        cronAssData()
    }, 2000);

    function cronAssData() {
        $.ajax({
            url: "/update"
        }).done(function(data) {
            var res = JSON.parse(data);
            console.log(res.test0);
        });
    }
});