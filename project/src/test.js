
var AlbumViewer = React.createClass({

  // sets initial state
  getInitialState: function(){
    return { searchString: '' };
  },



  render: function() {

    var albums = this.props.albums;
    return (
      <div className="col-xs-offset-1 col-xs-10">
          {
						albums.map(function(album){
							return (
								<YearAlbum album={album} />
							);
						})
					}
      </div>
    )
  }
});

var YearAlbum = React.createClass({

	render: function(){
		var self = this;
		var album = self.props.album;

		return (
			<div className="col-xs-12">
				<h2>{album.year}</h2>
				<div className="row">
				{
					album.months.sort().map(function(month){
						return (
							<MonthAlbum year={album.year} month={month} />
						);
					})
				}
				</div>
			</div>

		);
	}
});

var MonthAlbum = React.createClass({
  getInitialState: function(){
    var self = this;
    return self.state = { currentpicture: 0 };
  },

  handleChangePicture: function(e){
    var self = this;
    console.log(self);
    console.log(e.clientX);
    var offset = $(self);
    console.log(offset);
    var divPos = {
        left: e.pageX - offset.left,
        top: e.pageY - offset.top
    };
    console.log(divPos);
  },


	render: function(){
		var self = this;
		var month = self.props.month;
		var year = self.props.year;
    var activePict = self.state.currentpicture;

		return (
			  <div className="monthbox center-block col-xs-3">
          <div className="picture" onMouseMove={self.handleChangePicture}>
            {
                imgs.map(function(img,index){
                  var isactive = (index === self.state.currentpicture)? 'active' : '' ;
                  return <img src={img} className={isactive} />
                })
            }

          </div>

          <p>{monthsname[parseInt(month)]}</p>
			  </div>
		);
	}
});

var imgs = ["static/img/img1.jpg", "static/img/img2.jpg", "static/img/img3.jpg"];


// list of countries, defined with JavaScript object literals
var albums = [
	{"year": "2015", "months": ["1","4","3"]},
	{"year": "2014", "months": ["4","3"]}
];

var monthsname= [	"No date",
									"January",
									"February",
									"March",
									"April",
									"May",
									"June",
									"July",
									"August",
									"September",
									"October",
									"November",
									"December"];

React.render(
  <AlbumViewer albums={ albums } />,
  document.getElementById('main')
);
