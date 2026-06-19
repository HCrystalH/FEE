document.addEventListener("DOMContentLoaded", function () {
    renderContentList();

    function renderContentList() {
        let contents = JSON.parse(localStorage.getItem("cmsContents")) || [];

        let tbody = document.querySelector("#content-table tbody");
        let msg = document.getElementById("no-content-msg");

        tbody.innerHTML = "";

        if (contents.length === 0) {
            msg.style.display = "block";
            return;
        }

        msg.style.display = "none";

        contents.forEach(function (item, index) {
            let row = document.createElement("tr");

            row.innerHTML =
                "<td>" + (index + 1) + "</td>" +
                "<td>" + escapeHtml(item.title) + "</td>" +
                "<td>" + escapeHtml(item.brief) + "</td>" +
                "<td>" + item.createdDate + "</td>";

            tbody.appendChild(row);
        });
    }

    function escapeHtml(text) {
        let div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
});

// $(document).ready(function () {
//     renderContentList();

//     function renderContentList() {
//         var contents = JSON.parse(localStorage.getItem("cmsContents")) || [];
//         var tbody = $("#content-table tbody");
//         var msg = $("#no-content-msg");
//         tbody.empty();
//         if (contents.length === 0) {
//             msg.show();
//             return;
//         }
//         msg.hide();
//         $.each(contents, function (index, item) {
//             tbody.append(
//                 "<tr>" +
//                     "<td>" + (index + 1) + "</td>" +
//                     "<td>" + $("<span>").text(item.title).html() + "</td>" +
//                     "<td>" + $("<span>").text(item.brief).html() + "</td>" +
//                     "<td>" + item.createdDate + "</td>" +
//                 "</tr>"
//             );
//         });
//     }
// });
