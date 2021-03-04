import React from "react";

function Login(){
  return(
    <div>
    <div className = "div1" >
      <div className = "ContainerCenter" >
      <h3 className="mainSubTitle">Login</h3>
            <a className="bodyTextLight nav-link" href="/register">Need to Register?</a>
      <form>
        <div className="form-group">
            <input type="text"
                className="form-control"
                placeholder="username"
            />
        </div>

        <div className="form-group">
            <input type="text"
                className="form-control"
                placeholder="password"
            />
        </div>

        <div className="form-group">
          <input type="submit" value="Login" className="btn btn-light" />
        </div>

      </form>

      </div>
    </div>

    <div className = "divTownship" > < /div>

    </div>
  );
}


export default Login;
