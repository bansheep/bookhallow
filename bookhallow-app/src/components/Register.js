import React, {useState} from "react";
import axios from "axios";

function Register(){
  const[registerItem, setRegisterItem] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: ""
  });

 function onChangeUsername(event){
   const {value} = event.target;
   setRegisterItem((prevInfo) => {
      return{
      ...prevInfo,
      username: value
      };
    });
  }

  function onChangeEmail(event){
    const {value} = event.target;
    setRegisterItem((prevInfo) => {
       return{
       ...prevInfo,
       email: value
       };
     });
   }

   function onChangePassword(event){
     const {value} = event.target;
     setRegisterItem((prevInfo) => {
        return{
        ...prevInfo,
        password: value
        };
      });
    }

    function onChangePasswordRepeat(event){
      const {value} = event.target;
      setRegisterItem((prevInfo) => {
         return{
         ...prevInfo,
         passwordRepeat: value
         };
       });
     }

     function onSubmit(event){
       event.preventDefault();

       console.log("Form submitted");
       console.log("Username: " + registerItem.username);
       console.log("Email: " + registerItem.email);
       console.log("Password: " + registerItem.password);
       console.log("Password repeat: " + registerItem.passwordRepeat);

       if(registerItem.password === registerItem.passwordRepeat){
         const newAccount ={
           username: registerItem.username,
           email: registerItem.email,
           password: registerItem.password
         }

         //axios.post('http://localhost:4000/acounts/addAccount', newAccount)
        //    .then(res => console.log(res.data));

          setRegisterItem({
            username: "",
            email: "",
            password: "",
            passwordRepeat: ""
          });


       }else{
         console.log("Passwords do not match!");
       }
     }

  return(
    <div>
    <div className = "div1" >
      <div className = "ContainerCenter" >
      <h3 className="mainSubTitle">Start your journey</h3>
      <a className="bodyTextLight nav-link" href="/login">Already Registered?</a>

      <form onSubmit={onSubmit}>
        <div className="form-group">
            <input type="text"
                className="form-control"
                placeholder="username"
                value={registerItem.username}
                onChange={onChangeUsername}
            />
        </div>

        <div className="form-group">
            <input type="text"
                className="form-control"
                placeholder="email"
                value={registerItem.email}
                onChange={onChangeEmail}
            />
        </div>

        <div className="form-group">
            <input type="text"
                className="form-control"
                placeholder="password"
                value={registerItem.password}
                onChange={onChangePassword}
            />
        </div>

        <div className="form-group">
            <input type="text"
                className="form-control"
                placeholder="repeat password"
                value={registerItem.passwordRepeat}
                onChange={onChangePasswordRepeat}
            />
        </div>

        <div className="form-group">
          <input type="submit" value="Register" className="btn btn-light" />
        </div>

      </form>

      </div>
    </div>

    <div className = "divTownship" > < /div>

    </div>
  );
}


export default Register;
