$(document).ready(function () {
    var ProjectName = document.getElementById("ProjectName");
    var StartDate = document.getElementById("StartDate");
    var Deadline = document.getElementById("Deadline");
    var Techstack = document.getElementById("Techstack");
    var selectedSkills = "";

    $("#select2dropdown").on("select2:select select2:unselect", function(e){
        selectedSkills = $(this).val();
    });

    //    $.ajax({
    //        type: 'GET',
    //        url: 'http://localhost:8080/project',
    //        headers: {
    //            "authentication":localStorage.getItem("Token")
    //        },  
    //        success: function (data) {
    //            for (i = 0; i < data.length; i++) {
    //                $('#ProjectsListTable').append(
    //                    '<tr><td id = "SerialNo">' + (i + 1) +
    //                    '</td><td id = "ProjectName"><a href="project_details.html?id=' + data[i]._id + '">' + data[i].name + '</a>' +
    //                    '</td><td id = "StartDate">' + data[i].start_date +    
    //                    '</td><td id = "Deadline">' + data[i].deadline +     
    //                    '</td></tr>'
    //                );
    //            }
    //
    //        }
    //    });
    $.ajax({
        type:'GET',
        url: 'http://localhost:8080/count2',
        headers:{
            "authentication":localStorage.getItem("Token"),
            "limit":5
        },
        success: function(data){
            var pages = data;
            console.log(data);
            if(pages>0){
                for(i = 1; i <= pages; i++){
                    $("#pagination_nav").append(
                        "<div id='btn_div' style = 'display: table-cell'>" +
                        '<button><a onclick="loadPageData(this.id)" href="javascript:void(0);" id="'+i+'">' + i + '</a></button>' +
                    "</div>"
                    );
                }
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/project',   
                    headers:{
                        "authentication":localStorage.getItem("Token"),
                        "pagenumber":1,
                        "limit":5
                    },
                    success: function(data) {
                        for (i = 0; i < data.length; i++) {
                            $('#ProjectsListTable').append(
                                '<tr><td id = "ProjectName"><a href="project_details.html?id=' + data[i]._id + '">' + data[i].name + '</a>' +
                                '</td><td id = "StartDate">' + data[i].start_date +    
                                '</td><td id = "Deadline">' + data[i].deadline +     
                                '</td></tr>'
                            );
                        }  
                    }  
                });
            }
        }
    });

    $('.selectbox').select2({
        placeholder: 'Select an option'
    });


    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/technology',  
        headers: {
            "authentication":localStorage.getItem("Token")
        },
        success: function (data) {

            for (i = 0; i < data.length; i++) {
                $("#select2dropdown").append(
                    '<option value="' + data[i].name + '">' + data[i].name + '</option>' 
                )

            }

        }
    });

    $("#AddProjectBtn").click(addProjectFuncAdmin);
    function addProjectFuncAdmin() {

        var newprojectdata = {
            "name": ProjectName.value,      
            "start_date": StartDate.value,      
            "deadline": Deadline.value, 
            "technology": selectedSkills,
            "status":"ongoing",
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/project', 
            headers: {
                "authentication":localStorage.getItem("Token")
            }, 
            data: newprojectdata,
            success: function (data) {
                alert("Project " + ProjectName.value + " Added !!");
                location.reload("projects.html");
            }
        })
    }
});

function loadPageData(page){
    var pageNumber = page;
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/project',   
        headers:{
            "authentication":localStorage.getItem("Token"),
            "pagenumber":pageNumber,
            "limit":5
        },
        success: function(data) {
            $("#ProjectsListTable tr").remove();
            $('#ProjectsListTable').append('<tr><th class="text-center">Project Name</th><th class="text-center">Start Date</th><th class="text-center">Deadline</th></tr>');
            for(i=0; i<data.length;i++){
                $('#ProjectsListTable').append(
                    '<tr><td id = "ProjectName"><a href="project_details.html?id=' + data[i]._id + '">' + data[i].name + '</a>' +
                    '</td><td id = "StartDate">' + data[i].start_date +    
                    '</td><td id = "Deadline">' + data[i].deadline +     
                    '</td></tr>'
                );
            }  
        }  
    });
}