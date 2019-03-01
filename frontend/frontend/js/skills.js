$(document).ready(function () {
    var user_list_page_navigation = document.getElementById("to_invisible");
    var newSkillName = document.getElementById("newSkillName");
    var selectmenu = document.getElementById("selectmenu");
    var skillsArray = [];
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/technology', 
        headers: {
            "authentication":localStorage.getItem("Token")
        },       ////     change the url to hit   ///   if admin is logged in it will list all the skills
        success: function (data) {

            for (i = 0; i < data.length; i++) {
                $('#SkillsListTable').append(
                    '<tr><td id = "SerialNo">' + (i + 1) +
                    '</td><td id = "SkillName">' + data[i].name +
                    '</td><td id = "Category">' + data[i].implementation +
                    '</td></tr>'
                );
            }

        }
    });

    $("#AddSkillsBtn").click(addSkillFuncAdmin);

    function addSkillFuncAdmin() {
        var newskilldata = {
            "name": newSkillName.value,      //////  set the key value as per the database key values
            "implementation": selectmenu.value       //////  set the key value as per the database key values
        };
        console.log(newskilldata);

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/technology', 
        headers: {
            "authentication":localStorage.getItem("Token")
        },  ////////    change URL to hit the ADMIN skills table
            data: newskilldata,
            success: function (data) {
                location.reload("skills.html");
            }

        })
    }
    function refresh(){ window.location("skills.html");}
});