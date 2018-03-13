var user


$(document).ready(function(){
      $('.parallax').parallax();
    });

    $(document).ready(function() {
      $('select').material_select();
    });

    $(document).ready(function(){
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });


  
    $(".submit").on("click", function(event) {
      event.preventDefault();
      console.log("button pressed");
      // Here we grab the form elements
      var newFriend = {
        userName: $("#username").val().trim(),
        fullName: $("#fullname").val().trim(),
        photo: $("#photo").val().trim(),
        scores: [
        parseInt( $("#q1").val().trim()),
        parseInt( $("#q2").val()),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val().trim(),
        $("#q6").val().trim(),
        $("#q7").val().trim(),
        $("#q8").val().trim(),
        $("#q9").val().trim(),
        $("#q10").val().trim()
        ]
      };

      console.log(newFriend);

      // This line is the magic. It"s very similar to the standard ajax function we used.
      // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
      // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
      // depending on if a tables is available or not.

      $.post("/api/friends", newFriend,
        function(data) {

          alert("Congratulations, Now let's find you a friend!");
         
          //Now play the matching game
          
          //$('#match-results').text(newFriend.name);

          // // Clear the form when submitting
          // $("#reserve-name").val("");
          // $("#reserve-phone").val("");
          // $("#reserve-email").val("");
          // $("#reserve-unique-id").val("");
          $('#friendMatch').modal('open');
        });
        runFriendQuery();
    });


  function runFriendQuery() {
    var currentURL = window.location.origin;

    $.ajax({ url: currentURL + "/api/friends", method: "GET"})
    .then(function(friendData) {
      console.log("------------------------------");
      console.log("URL: "+ currentURL+"/api/friends");
      console.log("------------------------------");
      console.log(friendData);
      user = friendData.length-1;
      alert(friendData);

      friendArray = [];

      for (var i=0; i < friendData.length; i++){
        console.log(friendData[i].scores);
        let sum = friendData[i].scores.reduce((a,b) => parseInt(a) + parseInt(b), 0);
        console.log(sum);
        friendArray.push(sum);

      }
      console.log(user);
      console.log(friendArray);
      console.log(friendArray[user]);

      matchArray = [];

      for (var a=0; a < friendArray.length-1; a++){
        let matchDiff = Math.abs(friendArray[a]-friendArray[user]);
        matchArray.push(matchDiff);
        console.log(matchDiff);
      }

      console.log(matchArray);
      var idx = matchArray.indexOf(Math.min.apply(null,matchArray));
      console.log(idx);
      console.log(friendData[idx]);
    })
  };