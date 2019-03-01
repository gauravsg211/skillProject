Array.prototype.diff = function(arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    }
    return ret;
};

$(document).ready(function () {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    var technologyArray = [];

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/project/'+id, 
        headers: {
            "authentication":localStorage.getItem("Token")
        }, ////     change the url to hit  to show only desired project information
        success: function (data) {
            $('#ProjectsListTable').append(
                '</td><td id = "ProjectName">' + data.name +
                '</td><td id = "StartDate">' + data.start_date +                ///////   just cahnge the name of variables as declared in the schema
                '</td><td id = "Deadline">' + data.deadline +                ///////   just cahnge the name of variables as declared in the schema
                '</td><td id = "Techstack">' + data.technology +                ///////   just cahnge the name of variables as declared in the schema
                '</td></tr>'
            );

            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/employee',
        headers: {
            "authentication":localStorage.getItem("Token")
        },  ////     change the url to hit  to show desired users good to do project
                success: function (data1) {
                    for (i = 0; i < data1.length; i++) {
                        var skills = data1[i].skills;
                        var commonSkills=(data.technology).diff(skills);
                        console.log(commonSkills);
                        if(commonSkills.length>0){
                            $('#mydiv').append(
                                '<div class="col col-xs-4 col-sm-3" style = "background:none;">' +
                                '<div class="card">' +
                                '<img src="person.png" style="width:100%; border-radius: 50%" alt="">' +
                                '<p style="font-size:14px;margin-top: 10px;"><b>' + data1[i].email + '</b></p>' +
                                '<p class="title" style="padding-bottom: 16px;">' + commonSkills + '</p>' +
                                '</div>' +
                                '</div>'
                            );
                        }
                    }
                }
            });
        }
    });
});