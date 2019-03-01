
$(document).ready(function(){
    $("#createNewUser").click(createNewUser);


    function createNewUser(){

        var Username = document.getElementById("Username");
        var Password = document.getElementById("Password");




        var newuserdata =  {    
            "email": Username.value,
            "password": Password.value,
            "admin": false
        };

        console.log(newuserdata);


        function validateEmail(emailField){
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if (reg.test(emailField.value) == false) {
                return false;
            }

            return true;

        }

        if(validateEmail(Username)==true){

            $.ajax({
                type: 'POST',

                url: 'http://localhost:8080/employee',  
                headers: {
                    "authentication":localStorage.getItem("Token")
                },
                ////////    change URL to hit
                data: newuserdata,
                success: function(data) {
                    alert(data.message);
                    location.replace("list.html");
                }

            })

        }

        else{ 
            alert("enter valid email");
        }
    }; 
})
