$(document).ready(function(){

    let selectedRow = null;

    loadQuestions();

    function loadQuestions(){
        $.getJSON("../mockData/questions.json", function(data){
            let rows ="";

            $.each(data, function(index,item){
                rows += 
                `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.title}</td>
                        <td>
                            <button class="btn btn-secondary btn-sm">
                                View results
                            </button>

                            <button class="btn btn-secondary btn-sm">
                                Close poll
                            </button>

                            <button class="btn btn-danger btn-sm delete-btn"
                                    data-id="${item.id}">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });

            $("#questionTableBody").html(rows);
        });
    }

    // Open modal
    $(document).on("click",".delete-btn",function(){
        selectedRow = $(this).closest("tr");
        $("#deleteModal").modal("show");
    });

    // confirm delete
    $("#confirmDelete").click(function(){
        $.ajax({
            url: "../mockData/questions.json",
            type: "DELETE",

            success: function(){
                // UI delete
                selectedRow.remove();

                $("#deleteModal").modal("hide");

                // SUCCESS MESSAGE
                showNotification("Poll deleted successfully","success");
            },

            error: function(){
                alert("Delete failed");
            }
        });
    });
});