const API_KEY = "p4qf4JteKzO4gkuTdQvdM09Fn73xdFB0aTtZiODb";

function process(type) {
  $(".amazon")[0].style.display = "none";
  $(".netflix")[0].style.display = "none";
  $(".hulu")[0].style.display = "none";
  $(".hbo")[0].style.display = "none";
  $(".disney")[0].style.display = "none";
  $(".notAvailable")[0].style.display = "none";

  $(".services")[0].style.display = "flex";
  $(".results")[0].style.display = "inline-block";

  // mediaType = 3 for movies, 4 for TV shows
  getTitleId(type == "movie" ? 3 : 4);
}

function getTitleId(mediaType) {
  let input = $("#search").val();
  $.ajax({
    url:
      "https://api.watchmode.com/v1/autocomplete-search/?apiKey=" +
      API_KEY +
      "&search_value=" +
      input +
      "&search_type=" +
      mediaType,
    method: "GET",
    success: function (response) {
      if (response.results.length > 0) {
        titleId = response.results[0].id;
        getDetails(titleId);
      } else {
        $(".results").hide();
        $(".notAvailable")[0].style.display = "block";
      }
    },
    error: function (error) {
      $(".results").hide();
      $(".notAvailable")[0].style.display = "block";
    },
  });
}

function getDetails(titleId) {
  $.ajax({
    url:
      "https://api.watchmode.com/v1/title/" +
      titleId +
      "/details/?apiKey=" +
      API_KEY +
      "&append_to_response=sources",
    method: "GET",
    success: function (response) {
      let titleName = response.title;
      $("#title").html(titleName);
      let picUrl = response.poster;
      $("#pic").attr("src", picUrl);

      let services = [];
      let resSources = response.sources;
      for (let i = 0; i < resSources.length; i++) {
        if (
          (resSources[i].type === "free" || resSources[i].type === "sub") &&
          resSources[i].region === "US"
        ) {
          services.push([resSources[i].source_id, resSources[i].web_url]);
        }
      }
      console.log(services);
      let isItAvailable = false;
      for (let i = 0; i < services.length; i++) {
        if (services[i][0] == 26) {
          $(".amazon")[0].style.display = "block";
          $("#amazonLink").attr("href", services[i][1]);
          isItAvailable = true;
        } else if (services[i][0] == 203) {
          $(".netflix")[0].style.display = "block";
          $("#netflixLink").attr("href", services[i][1]);
          isItAvailable = true;
        } else if (services[i][0] == 157) {
          $(".hulu")[0].style.display = "block";
          $("#huluLink").attr("href", services[i][1]);
          isItAvailable = true;
        } else if (services[i][0] == 387) {
          $(".hbo")[0].style.display = "block";
          $("#hboLink").attr("href", services[i][1]);
          isItAvailable = true;
        } else if (services[i][0] == 372) {
          $(".disney")[0].style.display = "block";
          $("#disneyLink").attr("href", services[i][1]);
          isItAvailable = true;
        }
      }

      //IF NOT AVAILABLE ON ANY SUPPORTED STREAMING SERVICES, THEN SAY SO

      if (!isItAvailable) {
        $(".results").hide();
        $(".notAvailable")[0].style.display = "block";
      }
    },
  });
}
