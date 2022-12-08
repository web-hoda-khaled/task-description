$(document).ready(function (){
    let userName = document.getElementById("yourName");
    let userMail = document.getElementById("yourMail");
    let userPass = document.getElementById("yourPass");
    let userConfirmPass = document.getElementById("yourConfirmPass");
    let creatAccount = document.getElementById("creatAccount");
    let userData;
$("#grtStarte").click(function (e) { 
    $(".first-page").fadeOut(300 , _ => {
        $(".register").fadeIn(300)
    }); 
});


//fetch api
async function postData( data) {
    const response = await fetch('https://goldblv.com/api/hiring/tasks/register', {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    let final = await response.json()
    console.log(final);

        if(final.errors?.username){
            document.getElementById("alertUsername").innerHTML =final.errors.username
        }
    
        if(final.errors?.email){
            document.getElementById("alertUseremail").innerHTML =final.errors.email
        }
    
        if(final.errors?.password){
            document.getElementById("alertUserpassword").innerHTML =final.errors.password
        }

        if (final.hasOwnProperty("id")) {
        console.log(final.id);
        localStorage.setItem("user" , JSON.stringify(userData))
        
        //calling Function
        clearForm();
            $(".register").fadeOut(300 , _ => {
                $(".logged").fadeIn(300)
            })

            document.getElementById("loggedEmail").innerHTML = userData.email;

           
        }

  }


   //valid name
   function validName(){
    let regex = /^[a-z]{5,10}[0-9]{0,1}[a-z]{5,15}$/gi
    if( regex.test(userName.value) == true)
    {
        document.getElementById("alertUsername").innerHTML =""

        return true
    }
    else
    {
        document.getElementById("alertUsername").innerHTML ="your name not valid check please"
    }
    }

    //valid Mail
    function validMail(){
        let regex = /^[a-z]{3,15}[0-9]{0,5}@[a-z]{3,15}.com$/g
        if( regex.test(userMail.value) == true)
        {
            document.getElementById("alertUseremail").innerHTML =""

            return true
        }
        else
        {
            document.getElementById("alertUseremail").innerHTML ="your email not valid check please"
        }
        }
    
    //valid Pass
    function validPass(){
        let regex = /^\w{8,10}/gi
        if( regex.test(userPass.value) == true)
        {
            document.getElementById("alertUserpassword").innerHTML =""

            return true
        }
        else
        {
            document.getElementById("alertUserpassword").innerHTML ="your password not valid check please"
        }
        }
    
    //valid Pass
    function pass2(){
        if (userPass.value == userConfirmPass.value) {
            document.getElementById("Confirm").innerHTML =""

            return true

        }
        else{
            
            document.getElementById("Confirm").innerHTML ="password not same"
        }
        }
    



// get data from input
creatAccount.addEventListener("click" , _ => {

    //  
    if ( validName()==true && validMail()==true &&validPass() == true &&pass2()==true ) {
         userData = {
            username: userName.value,
            email: userMail.value,
            password: userPass.value,
            password_confirmation: userConfirmPass.value,
        }
        postData( userData) }
    else{
        console.log("msh tmam");
    }
})



//clear form 
function clearForm(){
    userName.value = ""
    userMail.value = ""
    userPass.value = ""
    userConfirmPass.value = ""
}


//swipe to logged screen










})