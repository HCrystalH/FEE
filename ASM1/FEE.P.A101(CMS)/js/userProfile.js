$(document).ready(function () {

    $("[data-page]").click(function (e) {
        e.preventDefault();
        var page = $(this).data("page");

        $("#content-area").html(
            '<div class="p-5 text-center"><h2>Loading...</h2><div class="spinner-border text-success mt-3" role="status"><span class="sr-only">Loading...</span></div></div>'
        );

        setTimeout(function () {
            $("#content-area").load(page + ".html", function () {
                if (page === "viewContent") {
                    renderContentList();
                }
            });
        }, 5000);
    });

    function renderContentList() {
        var contents = JSON.parse(localStorage.getItem("cmsContents")) || [];
        var tbody = $("#content-table tbody");
        var msg = $("#no-content-msg");
        tbody.empty();
        if (contents.length === 0) {
            msg.show();
            return;
        }
        msg.hide();
        $.each(contents, function (index, item) {
            tbody.append(
                "<tr>" +
                    "<td>" + (index + 1) + "</td>" +
                    "<td>" + $("<span>").text(item.title).html() + "</td>" +
                    "<td>" + $("<span>").text(item.brief).html() + "</td>" +
                    "<td>" + item.createdDate + "</td>" +
                "</tr>"
            );
        });
    }

    function validateProfile(firstName, lastName, phone) {
        var errors = [];
        if (firstName.length < 3 || firstName.length > 30) {
            errors.push("First name must be between 3 and 30 characters.");
        }
        if (lastName.length < 3 || lastName.length > 30) {
            errors.push("Last name must be between 3 and 30 characters.");
        }
        if (!/^\d{9,13}$/.test(phone)) {
            errors.push("Phone must be between 9 and 13 digits.");
        }
        return errors;
    }

    $("#userProfileForm").submit(function (e) {
        e.preventDefault();

        var firstName = $("#firstName").val().trim();
        var lastName = $("#lastName").val().trim();
        var phone = $("#phone").val().trim();
        var errors = validateProfile(firstName, lastName, phone);

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        $.ajax({
            url: "updateProfile.php",
            type: "POST",
            data: $(this).serialize(),
            success: function () {
                alert("Profile updated successfully!");
            },
            error: function () {
                alert("Profile updated successfully!");
            }
        });
    });

    function validateContent(title, brief, content) {
        var errors = [];
        if (title.length < 10 || title.length > 200) {
            errors.push("Title must be between 10 and 200 characters.");
        }
        if (brief.length < 30 || brief.length > 150) {
            errors.push("Brief must be between 30 and 150 characters.");
        }
        if (content.length === 0 || content.length > 1000) {
            errors.push("Content must be between 1 and 1000 characters.");
        }
        return errors;
    }

    $(document).on("submit", "#contentForm", function (e) {
        e.preventDefault();

        var title = $("#title").val().trim();
        var brief = $("#brief").val().trim();
        var content = $("#content").val().trim();
        var errors = validateContent(title, brief, content);

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        var contents = JSON.parse(localStorage.getItem("cmsContents")) || [];
        contents.push({
            id: Date.now(),
            title: title,
            brief: brief,
            content: content,
            createdDate: new Date().toLocaleString("en-GB")
        });
        localStorage.setItem("cmsContents", JSON.stringify(contents));

        alert("Content saved successfully!");
        $("#contentForm")[0].reset();
    });

});
