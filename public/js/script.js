let pswd = document.getElementById("account_password");
let chbx = document.getElementById("checkbox");
    chbx.onclick = function(){
        if (chbx.checked) {
            pswd.type = "text";
        } else {
            pswd.type = "password";
        }
    }
        const change = (event) => {
            const link = document.getElementById("signIn");
            link.text = link.text === 'My Account' ? 'Welcome basic Logout' : 'My Account';
            event.preventDefault();
        }
