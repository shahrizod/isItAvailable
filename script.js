function process(type) {
  $('.amazon')[0].style.display = "none";
  $('.netflix')[0].style.display = "none";
  $('.hulu')[0].style.display = "none";
  $('.hbo')[0].style.display = "none";
  $('.disney')[0].style.display = "none";
  $('.notAvailable')[0].style.display = "none";

  $('.services')[0].style.display = "flex";
  $('.results')[0].style.display = "inline-block";
  var input = $("#search").val();

  var API_Key = "p4qf4JteKzO4gkuTdQvdM09Fn73xdFB0aTtZiODb";
  let url = "https://movie-database-imdb-alternative.p.rapidapi.com/?s="+input+"&page=1&type="+type+"&r=json";
  fetch(url, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
      "x-rapidapi-key": "fdc40f4ebdmsh6e065fd66fb4ff9p116441jsnd0cae15490c7" }
  })
    .then(res => res.json())
    .then(json => {
      let imdbID = json.Search[0].imdbID;

      // CODE FOR RESULTS TITLE AND PIC

      let titleName = (json.Search[0].Title)
      $("#title").html(titleName);
      let picUrl = (json.Search[0].Poster);
      $("#pic").attr('src', picUrl);

      //USE IMDB ID TO GET WATCHMODE API SO THAT YOU CAN GET THE STREAMING SOURCES

      let url = 'https://api.watchmode.com/v1/search/?apiKey='+API_Key+'&search_field=imdb_id&search_value='+imdbID; //fix name issues
      fetch(url, { method: 'Get' })
        .then((res) => res.json())
        .then((json) => {
          try {
            var id = json.title_results[0].id;
          } catch (TypeError) {
            $(".notAvailable")[0].style.display = "block";
          }
          
        // TAKE WATCHMODE ID AND INITIATE NEW API REQUEST TO GET STREAMING SOURCES

        let newUrl = "https://api.watchmode.com/v1/title/"+id+"/sources/?apiKey="+API_Key
        fetch(newUrl, { method: 'Get' })
          .then((res) => res.json())
          .then((json) => {
            var services = [];
            for (var i = 0; i < json.length; i++) {
              if ((json[i].type === "free" || json[i].type === "sub") && json[i].region === "US") {
                services.push([json[i].source_id, json[i].web_url]);
              }
            }

            //LOOP THROUGH STREAMING SOURCES AND SHOW AVAILABLE ONES IN UI

            let isItAvailable = false;
            for (var i = 0; i < services.length; i++) {
              if (services[i][0] == 26 ) {
                $('.amazon')[0].style.display = "block";
                $('#amazonLink').attr("href", services[i][1]);
                isItAvailable = true;
              } else if (services[i][0] == 203) {
                $('.netflix')[0].style.display = "block";
                $('#netflixLink').attr("href", services[i][1]);
                isItAvailable = true;
              } else if (services[i][0] == 157) {
                $('.hulu')[0].style.display = "block";
                $('#huluLink').attr("href", services[i][1]);
                isItAvailable = true;
              } else if (services[i][0] == 387) {
                $('.hbo')[0].style.display = "block";
                $('#hboLink').attr("href", services[i][1]);
                isItAvailable = true;
              } else if (services[i][0] == 372) {
                $('.disney')[0].style.display = "block";
                $('#disneyLink').attr("href", services[i][1]);
                isItAvailable = true;
              }
            }
            
            //IF NOT AVAILABLE ON ANY SUPPORTED STREAMING SERVICES, THEN SAY SO

            if (isItAvailable == false) {
              $(".notAvailable")[0].style.display = "block";
            }

          })
        })
    })
    .catch(err => {
      console.error(err);
      $(".results")[0].style.display = "none";
      $(".notAvailable")[0].style.display = "block";

  });
}

// $("#movies").on("click", function () {
  
// });

// $("#search").keyup(function (event) {
//   if (event.keyCode === 13) {
//     $("#button").click();
//   }
// });