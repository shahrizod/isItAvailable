# <a href = "https://shahrizod.github.io/isItAvailable/">isItAvailable</a>

https://shahrizod.github.io/isItAvailable/

<h3> Background </h3>

This is a project I worked on while participating in my Microsoft experience in Summer 2019 to find out where I can stream a certain show or movie. Recently, with the rise of mutlitple new streaming platforms, I decided to look back at this project and noticed that the API I previously used was hardly functional. 

<h3> Logical Issues </h3>

Since the old API wasn't working, I switched from the Utelly API to the Watchmode API, which not only supports more streaming sources but does so for free with an API request limit. However after further testing I realized that despite having an excellent source for where a certain show or movie is available, the search feature was severely lacking. This resulted in me adding another API, the unofficial IMDB database in order to search for a show or movie on there and then directly provide the corresponding IMDB ID to the Watchmode API, resulting in more accurate results. While testing various inputs, I realized that the API would show inaccurate results because I'd be thinking of a show but it would prioritize a movie instead, leading the program to find the results for a movie with a similar name rather than the show. In order to correct this, I set up different buttons for movies and shows so that the user can choose and get better results.

<h3> Visual Issues </h3>

I also tweaked the UI a bit to only show the relevant streaming sources instead of showing check's and x's for each one as well as show the title and poster of the show/movie the program was showing results for. A version of the previous UI can be seen at: https://codepen.io/UlyssessRant/pen/ZgKQEO?editors=0011.

<h3> Future Changes </h3>

Eventually, I'd like to improve the UI a bit because it's a bit simple which leads to poor functionality at times, such as by not allowing users to choose between several similarly named shows/movies, so perhaps I can add a dropdown of possible options for shows/movies as the user types their input. In addition, I would like to add a search algorithm so that the program can correct for minor typos or recognize acronyms, such as "HIMYM" for the show "How I Met Your Mother".
