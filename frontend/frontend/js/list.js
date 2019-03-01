$(document).ready(function(){
    
    $("#createNewUser").click(redirect);
    function redirect(){
        location.replace("create_user.html");
    }
$.ajax({
    type:'GET',
    url: 'http://localhost:8080/count',
    headers:{
        "authentication":localStorage.getItem("Token"),
        "limit":8
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
                url: 'http://localhost:8080/employee',   
                headers:{
                    "authentication":localStorage.getItem("Token"),
                    "pagenumber":1,
                    "limit":8
                },
                success: function(data) {
                    var table = document.getElementById("UserListTable");
                    for(i=0; i<data.length;i++){
                        $('#UserListTable').append(
                            '<tr><td id = "EmployeeId">' + data[i].email + 
                            '</td><td id = "Skills">'+data[i].skills + '</td>'+
                            '</tr>'
                        );
                    }  
                }  
            });
        }
    }
});
});
function loadPageData(page){
    var pageNumber = page;
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/employee',   
        headers:{
            "authentication":localStorage.getItem("Token"),
            "pagenumber":pageNumber,
            "limit":8
        },
        success: function(data) {
            var table = document.getElementById("UserListTable");
            $("#UserListTable tr").remove();
            $('#UserListTable').append("<tr><th>Email</th><th>Skills</th></tr>");
            for(i=0; i<data.length;i++){
                $('#UserListTable').append(
                    '<tr><td id = "EmployeeId">' + data[i].email + 
                    '</td><td id = "Skills">'+data[i].skills + '</td>'+
                    '</tr>'
                );
            }  
        }  
    });
}




