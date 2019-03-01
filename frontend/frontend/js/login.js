$(document).ready(function(){
    
    $("#LoginBtn").click(Login);
    function Login(){
        var EmailId = document.getElementById("EmailId");
        var Password = document.getElementById("Password");
        var loginData = {
            "email" : EmailId.value,
            "password" : Password.value
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/login',			////     change the url to hit
            data : loginData,
            success: function(data) {
                if(data.token){
                    if(data.admin){
                        localStorage.setItem("Role", "Admin");
                        localStorage.setItem("Token", data.token); 
                        localStorage.setItem("Id", data.userId);
                        location.replace("list.html");

                    }
                    else{
                        localStorage.setItem("Role", "Employee");
                        localStorage.setItem("Token", data.token);  ///////   here set the value of token coming from jwt to authenticate for other pages
                        localStorage.setItem("Id", data.userId);
                        location.replace("userProfile.html");
                    }
                }
            },
            error:{

            }
        });
    }
})