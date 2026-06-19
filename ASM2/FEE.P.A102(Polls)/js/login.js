$(document).ready(function(){

    $("#loginForm").submit(function(e){

        e.preventDefault();

        $("#loginError").addClass("d-none").html("");

        let errors =[];

        const alias = $("#alias").val().trim();
        const password = $("#password").val().trim();

        if(alias ===""){
            errors.push("Alias is required");
            $("#alias").addClass("is-invalid");

        }else{
            $("#alias").removeClass("is-invalid");
        }

        if (password === "") {
            errors.push("Password is required.");
            $("#password").addClass("is-invalid");
        } else {
            $("#password").removeClass("is-invalid");
        }

        // Show errors
        if (errors.length > 0) {

            $("#loginError")
                .removeClass("d-none")
                .html(errors.join("<br>"));

            return;
        }

        // Success msg
        $("#loginError")
            .removeClass("alert-danger")
            .addClass("alert-success")
            .removeClass("d-none")
            .html("Login successful");
    });

});