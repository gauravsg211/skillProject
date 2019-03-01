var array=[];
$(document).ready(function () {
    var selectedSkills = "";

    $('.selectbox').select2({
        placeholder: 'Select a skill'
    });

    $("#select2dropdown").on("select2:select select2:unselect", function(e){
        selectedSkills = $(this).val();
        console.log(selectedSkills);
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/employee/'+localStorage.getItem("Id"), 
        headers: {
            "authentication":localStorage.getItem("Token")
        }, 
        success: function (data) {
            $("#userName").text(data.email);
            array = data.skills;
            for (i = 0; i < array.length ; i++) {
                $("#ExistingSkills").append("<span class='label label-info'>" + array[i] + "</span>&nbsp;&nbsp;");
            }
        }
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
                );
            }
        }
    }); 
});

function addSkills() {
    var newskilldata = {      //////  set the key value as per the database key values
        "skills" : array.concat($("#select2dropdown").val()) 
    };
    console.log(newskilldata);
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/Employee/'+localStorage.getItem("Id"), 
        headers: {
            "authentication":localStorage.getItem("Token")
        },  ////////    change URL to hit the ADMIN skills table
        data: newskilldata,
        success: function (data) {
            refresh();
        },
        error: function(err){
            console.log(err);
        }
    })
}

function refresh(){
    window.location("userProfile.html");
}