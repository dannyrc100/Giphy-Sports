$(document).ready(function () {

  var sportsArray = [
      'Dallas Cowboys', 'New York Yankees', 'Manchester United', 'FC Barcelona', 'Real Madrid', 'New England Patriots', 'New York Giants', 'Paris Saint-Germain', 'Los Angeles Lakers', 'FC Bayern Munich'
  ];

  var sportsDisplay = [''];
  var sportsGif;

  addButtons();

  $(document).on('click', '.sports-buttons .team', createGif);
  $(document).on('click', '#search', addTeamToArray);
  $(document).on('click', 'img', updateGifState);

  function updateGifState() {
      var state = $(this).attr('data-state');
      if (state === 'still') {
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate');
      } else {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
      }
  }

  function addTeamToArray() {
      var newChar = $('#sports-input').val();
      if (newChar !== '') {
          sportsArray.push(newChar);
          addButtons();
      }
  }

  function createteamImage(animateSrc, src) {
      var teamImage = $('<img>');
      teamImage.attr('class', '.img-resposive');
      teamImage.attr({
          'src': src,
          'data-animate': animateSrc,
          'data-still': src,
          'data-state': 'still'
      });
      return teamImage;
  }

  function appendGif(div, rating, img) {
      div.append(rating);
      div.append(img);
      $('.sports-display').append(div);
  }

  function createGif() {
      $('.sports-display').empty();
      var sportsGif = $(this).attr('data-name');
      var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + sportsGif + '&api_key=cb9b90771d804f0baa2b23e160f57ebe&limit=10';
      var gifQuery = $.ajax({
          url: queryURL,
          method: 'GET'
      });
      gifQuery.done(init);
  }

  function init(response) {
      var teams = response.data;
      for (var i = 0; i < teams.length; i++) {
          var teamDiv = $('<div>');
          teamDiv.attr('class', 'teamDiv');
          var teamRating = ('<p>' + 'Rating: ' + teams[i].rating + '</p>');
          var teamImage = createteamImage(teams[i].images.fixed_height.url, teams[i].images.fixed_height_still.url);
          appendGif(teamDiv, teamRating, teamImage);
      }
  }

  function addButtons() {
      $('.sports-buttons').html('');
      for (var i = 0; i < sportsArray.length; i++) {
          var teamsImage = $('<button>');
          teamsImage.attr('data-name', sportsArray[i]);
          teamsImage.attr('class', 'team');
          teamsImage.text(sportsArray[i]);
          teamsImage.appendTo('.sports-buttons');
      }
  }
});