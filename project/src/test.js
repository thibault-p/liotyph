
var AlbumViewer = React.createClass({

  // sets initial state
  getInitialState: function(){
    return { searchString: '' };
  },



  render: function() {

    var albums = this.props.albums;
    return (
      <div className="col-xs-ofsset-1 col-xs-10">
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

	render: function(){
		var self = this;
		var month = self.props.month;
		var year = self.props.year;

		return (
			<div className="monthbox">
				<a href="#">{monthsname[parseInt(month)]}</a>
			</div>
		);

	}
});



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
