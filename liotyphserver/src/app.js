var Application = React.createClass({
  getInitialState: function(){
    return {data: [], authToken: null};
  },
  setAuth: function(auth){
    console.log("Get auth");
    console.log(auth.token);
    this.setState({authToken: auth.token});
  },
  render: function(){
    if(this.state.authToken == null){
      return (
        <LoginScreen setAuth={this.setAuth}/>
      );
    }else{
      return (
        <Navbar />
      );
    }
  }
})


var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default  navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              LioTyPH
            </a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <li><a href="#">Settings</a></li>
                <li><a href="#">Logout</a></li>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});


var AlbumViewer = React.createClass({
  getInitialState: function() {

  },
  render: function(){
    return(
      
    );
  }
});

var LoginScreen = React.createClass({
  getInitialState: function(){
    return {empty: true, haserror:false};
  },
  submitForm: function(event){
    event.preventDefault();
    $.ajax({
      url: '/api/token',
      dataType: 'json',
      cache: false,
      type:'POST',
      username : this.refs.username.value,
      password : this.refs.password.value,
      success: function(data) {
        console.log(data);
        this.props.setAuth(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("OUch");
        this.setState({haserror: true});
      }.bind(this)
    });
  },
  handleChange: function(event){
    u = this.refs.username.value;
    p = this.refs.password.value;
    this.setState({empty : (u.length==0 || p.length==0) });
  },
  render: function(){
    var errormsg = '';
    if(this.state.haserror)
      errormsg = (<div className="alert alert-warning alert-dismissible" role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        Login failed. Username and/or password mismatch.
      </div>);
    return (
      <div className="container-fluid">
        <div className="loginscreen col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
          <h1>LioTyPH</h1>
          <form onSubmit={this.submitForm}>
            {errormsg}
            <div className="form-group">
              <input type="text" className="form-control" name="username" ref="username" placeholder="Username" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="password" ref="password" placeholder="Password" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <button className="btn btn-default" type="submit" disabled={this.state.empty}>Sign in</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Application />,
  document.getElementById('content')
);
