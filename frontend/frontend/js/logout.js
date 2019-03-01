function remove(){
    localStorage.removeItem("Role");
    localStorage.removeItem("Token");
    localStorage.removeItem("Id");
    window.location.replace("index.html");
}