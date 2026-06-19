function showNotification(message, type = "success") {

    // remove old notifications 
    $("#notificationArea").remove();

    // create container if not exists
    $("body").append(`<div id="notificationArea"></div>`);

    const notif = $(`
        <div class="app-notification app-${type}">
            ${message}
        </div>
    `);

    $("#notificationArea").append(notif);

    // Display during 2s
    setTimeout(() => {
        notif.fadeOut(300, function () {
            $(this).remove();
        });
    }, 2000);
}