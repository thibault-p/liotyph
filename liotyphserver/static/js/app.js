(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Application = React.createClass({displayName: "Application",
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
        React.createElement(LoginScreen, {setAuth: this.setAuth})
      );
    }else{
      return (
        React.createElement(Navbar, null)
      );
    }
  }
})


var Navbar = React.createClass({displayName: "Navbar",
  render: function() {
    return (
      React.createElement("nav", {className: "navbar navbar-default  navbar-inverse"}, 
        React.createElement("div", {className: "container-fluid"}, 
          React.createElement("div", {className: "navbar-header"}, 
            React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1", "aria-expanded": "false"}, 
              React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
              React.createElement("span", {className: "icon-bar"}), 
              React.createElement("span", {className: "icon-bar"}), 
              React.createElement("span", {className: "icon-bar"})
            ), 
            React.createElement("a", {className: "navbar-brand", href: "#"}, 
              "LioTyPH"
            )
          ), 
          React.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, 
            React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
              React.createElement("li", {className: "dropdown"}, 
                React.createElement("li", null, React.createElement("a", {href: "#"}, "Settings")), 
                React.createElement("li", null, React.createElement("a", {href: "#"}, "Logout"))
              )
            )
          )
        )
      )
    );
  }
});


var AlbumViewer = React.createClass({displayName: "AlbumViewer",

});

var LoginScreen = React.createClass({displayName: "LoginScreen",
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
      errormsg = (React.createElement("div", {className: "alert alert-warning alert-dismissible", role: "alert"}, 
        React.createElement("button", {type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
        "Login failed. Username and/or password mismatch."
      ));
    return (
      React.createElement("div", {className: "container-fluid"}, 
        React.createElement("div", {className: "loginscreen col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1"}, 
          React.createElement("h1", null, "LioTyPH"), 
          React.createElement("form", {onSubmit: this.submitForm}, 
            errormsg, 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("input", {type: "text", className: "form-control", name: "username", ref: "username", placeholder: "Username", onChange: this.handleChange})
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("input", {type: "password", className: "form-control", name: "password", ref: "password", placeholder: "Password", onChange: this.handleChange})
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("button", {className: "btn btn-default", type: "submit", disabled: this.state.empty}, "Sign in")
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(
  React.createElement(Application, null),
  document.getElementById('content')
);


},{}]},{},[1])