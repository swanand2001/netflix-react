import React from 'react'
import $ from 'jquery'; 
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
const Search = () => {
    function getMovieName(nm)
		{
		var movieId=document.getElementById("myInput");
		nm=nm.charAt(0).toUpperCase()+nm.substr(1).toLowerCase();
		movieId.value=nm;
		getRecommendedMovies();
		}

		function getRecommendedMovies()
		{
		var firstUrl;
		var movieDescription=document.getElementById("movieDescription");
		var movieOtherStuffs=document.getElementById("movieOtherStuffs");
		var name=document.getElementById("myInput").value;
		let flag=false;
		for(var n of movies)
		{
		if(n==name)
		{
		flag=true;
	    break;
		}
		}
       if(flag==false) 
	   {
		alert("Sorry movie you are looking is not in our database");
		return;
	   }

        var query="https://api.themoviedb.org/3/search/movie?api_key=4cc7be89de1ac135b500af4bfd2eb8af&query="+name;
	 $.ajax({
    type:'GET',
    url:query,
    success: function(recs)
	{
	var a=JSON.stringify(recs);
	//alert(a);
	var rslt=JSON.parse(a);
	var pp=rslt.results[0].poster_path;
	document.getElementById("searchedImage").src="https://image.tmdb.org/t/p/w500"+pp;
	var titleDiv=document.getElementById("titlediv");
	titleDiv.innerHTML="";
    let rating=rslt.results[0].vote_average;
	titleDiv.innerHTML="<h6><a href='#'>"+name+"</a></h6>";
	titleDiv.innerHTML=titleDiv.innerHTML+"<p><i class='ion-android-star'></i><span>"+rating+"</span> /10</p>";
	movieDescription.innerHTML="";
	let overview=rslt.results[0].overview;
	movieDescription.innerHTML="<h2 style='color:yellow'>Overview 👇</h2>";
	movieDescription.innerHTML+="<p><h6 style='color:white'>"+overview+"</h6></p>";
	movieDescription.innerHTML+="<p><h4 style='color:#b3ffff'>Release Date : </h4><h5 style='color:white'>"+rslt.results[0].release_date+"</h5></p>";
	movieDescription.innerHTML+="<p><h4 style='color:#b3ffff'>Vote Count : </h4><h5 style='color:white'>"+rslt.results[0].vote_count+"</h5></p>";
    var movieId=rslt.results[0].id;
	//cast code starts
	$.ajax({
    type:'GET',
    url:"https://api.themoviedb.org/3/movie/"+movieId+"/casts?api_key=4cc7be89de1ac135b500af4bfd2eb8af",
    success: function(castJSON)
	{
	var cast=document.getElementById("cast");
	cast.innerHTML="";
	cast.innerHTML+="<h4 class='sb-title'>Top Cast</h4>";
	var castLength=castJSON.cast.length;
	if(castLength>15) castLength=15;
    for(var i=0;i<castLength;i++)
	{
	cast.innerHTML+="<div class='celeb-item'>";
    cast.innerHTML+="<a><img src='https://image.tmdb.org/t/p/w500/"+castJSON.cast[i].profile_path+"' width='120' height='80'></a>";
	cast.innerHTML+="<div class='celeb-author'>";
	var lv=castJSON.cast[i].name;
	lv=lv.replaceAll(" ","_");
	lv=lv.replaceAll(".","");
	var linkValue="https://en.wikipedia.org/wiki/"+lv;
	cast.innerHTML+="<h6 style='color:white;'><a href="+linkValue+" style='cursor:pointer;'>"+castJSON.cast[i].name+"</a></h6>";
	cast.innerHTML+="<span><h6 style='color:yellow'>Character : "+castJSON.cast[i].character+"</h6></span>";
	cast.innerHTML+="</div>";
	cast.innerHTML+="</div>";
	}
    },
    error: function(){
      //alert("error");
    }
  });

//cating ends

    },
    error: function(){
      //alert("error");
    }
  });



		$.ajax({
    type:'POST',
    url:"/similarity",
    data:{'name':name},
    success: function(recs)
	{

		var movie_arr = recs.split('---');
        var arr = [];
        for(const movie in movie_arr){
          arr.push(movie_arr[movie]);
		}
		
	var stringToAppend="";
    for(var i=0;i<arr.length;i++)
	{
	$.ajax({
    type:'GET',
	async:false,
    url:"https://api.themoviedb.org/3/search/movie?api_key=4cc7be89de1ac135b500af4bfd2eb8af&query="+arr[i],
    success: function(res)
	{
	if(i==0 || i==4 || i==8 || i==12)
	{
		stringToAppend+="<div class='row'>\n";
        stringToAppend+="<div class='slick-multiItem'>\n";
	}

		stringToAppend+="<div class='slide-it'>\n";
		stringToAppend+="<div class='movie-item'>\n";
		stringToAppend+="<div class='mv-img'>\n";
        firstUrl="https://image.tmdb.org/t/p/w500"+res.results[0].poster_path;
        stringToAppend+="<img src='"+firstUrl+"' width='185' height='284'>\n";
		stringToAppend+="</div>\n";
		stringToAppend+="<div class='hvr-inner'>\n";
		stringToAppend+="<a style='cursor:pointer;' onclick={getMovieName(`"+res.results[0].title+"`)}>Get Details<i class='ion-android-arrow-dropright'></i></a>";
		stringToAppend+="</div>";			
		stringToAppend+="<div class='title-in'>\n";
		stringToAppend+="<h6><a href='#'>"+res.results[0].title+"</a></h6>\n";
		stringToAppend+="<p><i class='ion-android-star'></i><span>"+res.results[0].vote_average+"</span> /10</p>\n";
        stringToAppend+="</div></div></div>\n";
		if(i==3 || i==7 || i==11 || i==15)
		{
		stringToAppend+="</div></div>\n";
		}
    },
    error: function(){
    }
  });
	  }
	  document.getElementById("tab1").innerHTML="";
	  document.getElementById("tab1").innerHTML=stringToAppend;
     },
    error: function(){
      //alert("error");
    }
  });
		
	}
    function autocomplete(inp, arr) {
        var currentFocus;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode==40) {
              currentFocus++;
              addActive(x);
            } else if (e.keyCode==38) { //up
              currentFocus--;
              addActive(x);
            } else if (e.keyCode==13) {
              e.preventDefault();
              if (currentFocus > -1) {
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          if (!x) return false;
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt!=x[i] && elmnt!=inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
      }
      var movies=JSON.stringify(movies);
      autocomplete(document.getElementById("myInput"), movies);
    return (
        <div>
            <header className="ht-header">
	<div className="container">
		<nav className="navbar navbar-default navbar-custom">
				
				<div className="navbar-header logo">
				    <Link to="#" style={{color: 'red',textShadow: '1px 1px red',fontSize: '50px'}}><h3>Movie Recommendation System</h3></Link>
				</div>
				<div>
				    <a href="https://github.com/saksham2105" style={{paddingLeft: '750px'}}><i style={{fontSize:'50px',color:'red'}} className="fa fa-github"></i></a>
			    </div>

	    </nav>
	    
	    
	    <div className="top-search" style={{width:'800px',position:'absolute'}}>
			<input type="text" id="myInput" name="myCountry" placeholder="Search for a movie that you are looking for" />
			<button id="enterButton" type="button" className="btn btn-primary" style={{height: '45px'}} onclick="getRecommendedMovies()">Enter</button>
		</div>

			  </div>
</header>


<div className="slider movie-items">
	<div className="container">
		<div className="row">
	    	<div  className="slick-multiItemSlider">
	    		<div className="movie-item" >
	    			<div className="mv-img">
	    				<Link to="#"><img id="searchedImage" name="searchedImage" alt="" width="285" height="437" /></Link>
	    			</div>
	    			<div className="title-in" id="titlediv">
	    			</div>
				</div>
				

				<div className="movie-item" id="movieDescription">
	    		</div>

			</div>

	    </div>
	</div>
</div>
<div className="movie-items">
	<div className="container">
		<div className="row ipad-width">
			<div className="col-md-6">
				<div className="title-hd">
					<h2>Recommended Movies</h2>
				</div>
				<div className="tabs">
				    <div className="tab-content">
				        <div id="tab1" name="tab1" className="tab active">


                        </div>
				    </div>
				</div>
			</div>
			<div className="col-md-6">
				<div className="sidebar">
					<div className="celebrities" id="cast">

					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<footer className="ht-footer">
	<div className="container">
	</div>
	<div className="ft-copyright">
		<div className="backtotop">
			<center>
			<Link to="#" id="back-to-top" style={{color: 'red'}}>Back to top  <i className="ion-ios-arrow-thin-up"></i></Link>
			<h5 style={{color: 'azure'}}>&copy; Developed by Saksham Solanki</h5>
			</center>
		</div>
	</div>
</footer>
        </div>
    )
}

export default Search
