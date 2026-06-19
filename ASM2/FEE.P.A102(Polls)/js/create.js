

$(document).ready(function(){
    let questionIdx = 0;

    // Add question
    $(".add-question-btn").click(function(){
        questionIdx++;

        const questionHtml =
        `
            <div class ="question-block border p-3 mb-3">

                <input type="text"
                    class="form-control question-input mb-2"
                    placeholder="Enter your question"
                    name="questions[${questionIdx}][text]"
                    required>

                <div class ="form-check">
                    <input type="checkbox"
                        class="form-check-input"
                        id="mandatory_${questionIdx}">

                    <label class="form-check-label" for="mandatory_${questionIdx}"> Mandatory </label>
                </div>
                
                <div class="form-check mb-3">
                    <input type="checkbox"
                           class="form-check-input"
                           id="multiple_${questionIdx}"
                           >
                    <label class="form-check-label" for="multiple_${questionIdx}"> You can select multiple options </label>
                </div>

                <div class ="answers-container">
                    <label> Possible answers </label>
                    
                    <div class="answer-row d-flex mb-2">
                        <input
                            type="text"
                            class="form-control answer-input"
                            placeholder="Type your answer"
                            name="questions[${questionIdx}][answers][]"
                            required>
                        <button type="button" class="btn btn-info ml-2 add-answer-btn"> + </button>
                    </div>
                </div>
            </div>
        `;
        $("#questionBlocks").append(questionHtml);
    });

    // Add answer (dynamically)
    $(document).on('click','.add-answer-btn',function(){

        const answerContainer = $(this).closest(".question-block").find(".answers-container");

        const answerHtml =
        `
            <div class ="answer-row d-flex mb-2">
                <input
                    type="text"
                    class="form-control answer-input"
                    placeholder="Another answer"
                    minlength ="3"
                    maxlength="200"
                    required>

                <button
                    type="button"
                    class="btn btn-danger ml-2 remove-answer">
                    ×
                </button>
            </div>
        `;

        answerContainer.append(answerHtml);
    });

    // Remove answer 
    $(document).on("click", ".remove-answer", function () {
        $(this).closest(".answer-row").remove();
    });

    $("#interview").submit(function(e){
        e.preventDefault();

        let errors = [];

        // Validate poll name
        const pollName= $("#namePoll").val().trim();

        if(pollName.length < 3  || pollName.length > 255){
            errors.push("Poll name must be 3-255 characters.");
            $("#namePoll").addClass("is-invalid");

        }else{
            $("#namePoll").removeClass("is-invalid");
        }

        // Validate questions
        $(".question-input").each(function(){
            const question = $(this).val().trim();

            if(question.length < 3 || question.length > 255){
                errors.push("Each question must be at least 3 characters");
                $(this).addClass("is-invalid");
            }else{
                $(this).removeClass("is-invalid");
            }
        });

        // Validate answers
        $(".answer-input").each(function () {
            const answer = $(this).val().trim();

            if (answer.length < 3 || answer.length > 200) {
                errors.push("Each answer must be at least 3 characters.");
                $(this).addClass("is-invalid");
            } else {
                $(this).removeClass("is-invalid");
            }
        });

        // Show errors at TOP
        if (errors.length > 0) {
            showNotification(errors.join("<br>"), "danger");
            return;
        }

        // SUCCESS MESSAGE 
        showNotification("Poll created successfully!", "success");

    });
});