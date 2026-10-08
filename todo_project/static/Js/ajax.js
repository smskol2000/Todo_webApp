$(document).ready(function () {
    console.log("DOM is ready!");

    // ADD TASK
    $("#add-form").submit(function (e) {
        e.preventDefault();

        var title = $("#title").val();

        $.ajax({
            type: "POST",
            url: "",
            data: {
                request: "add_task",
                title: title,
                csrfmiddlewaretoken: $("#add-form input[name=csrfmiddlewaretoken]").val()
            },

            success: function (data) {
                location.reload();
            }
        });
    });


    // EDIT BUTTON
    $(".btn-edit").click(function () {

        var id = $(this).attr("id");

        $("#text-" + id).hide();
        $("#edit-form-" + id).show();

    });


    // EDIT TASK
    $(".edit-form").submit(function (e) {
        e.preventDefault();

        var task_id = $(this).find("input[name=task_id]").val();
        var new_title = $(this).find("input[name=new_title]").val();

        $.ajax({
            type: "POST",
            url: "",
            data: {
                request: "edit_task",
                task_id: task_id,
                new_title: new_title,
                csrfmiddlewaretoken: $(this).find("input[name=csrfmiddlewaretoken]").val()
            },

            success: function (data) {

                $("#text-" + data.id).text(data.title);

                $("#edit-form-" + data.id).hide();
                $("#text-" + data.id).show();

            }
        });
    });


    // DELETE TASK
    $(".btn-delete").click(function (e) {
        e.preventDefault();

        var form = $(this).closest("form");

        var task_id = form.find("input[name=task_id]").val();

        $.ajax({
            type: "POST",
            url: "",
            data: {
                request: "delete_task",
                task_id: task_id,
                csrfmiddlewaretoken: form.find("input[name=csrfmiddlewaretoken]").val()
            },

            success: function (data) {

                $("#text-" + data.id).closest(".task").remove();
             // Update task count
            $("#task-count").text("You have " + data.count + " tasks");


            }
        });
    });


    // CLEAR ALL
    $("#clear-btn").click(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "",
            data: {
                request: "clear all",
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").last().val()
            },

            success: function (data) {
                location.reload();
            }
        });
    });

});