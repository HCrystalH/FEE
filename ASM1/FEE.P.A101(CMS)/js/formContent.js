$(document).ready(function () {

    $("#contentForm").submit(function (e) {
        e.preventDefault();

        var title = $("#title").val().trim();
        var brief = $("#brief").val().trim();
        var content = $("#content").val().trim();
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
