/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

$( ".composeTT" ).click(function() {
  $( ".new-tweet" ).slideToggle( "slow", function() {
    $("#writing-tweet").focus();
  });
});

// function escape(str) {
//   var div = document.createElement('div');
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// }
  $( "form" ).on( "submit", function( event ) {   
   event.preventDefault();
   let tweetLength = $("textarea").val().length;

      if(tweetLength > 140 || tweetLength === 0 ){
        alert("nope! Not today");
      } else {
      $.ajax({
          type: "POST",
          url:"/tweets",
          data: $("#writing-tweet").serialize(),
          success: function(data){
            $(".tweets").remove();
            $("#writing-tweet").val("");
            loadTweets();             
          }
        })
    }
  });
    const loadTweets = () =>{
        let $data = $.ajax({
          type: "GET",
          url: "/tweets",
          success: function(tweets){
              renderTweets(tweets);
          }
        });
    } 
    loadTweets();
});

// $("#writing-tweet")[0].reset(); // work on that

// Test / driver code (temporary). Eventually will get this from the server.
const createTweetElement = (tweet) =>{
// let content1 = tweet.content.text;
  
  let content = `<section class="tweets"> <article><header>
            <div class="profile-user">
              <ul>
                <li><img src="${tweet.user.avatars.small}" alt=" "></li>
                <li class="user-name">${tweet.user.name}</li>
              </ul>
              <p>${tweet.user.handle}</p>
            </div>
          </header>
          <div class="content">
           ${tweet.content.text}          
          </div>
          <footer>
            ${tweet.created_at} days ago
            <ul class="footer-imgs">
              <li><img src="" alt=" "></li>
              <li><img src="" alt=" "></li>
              <li><img src="" alt=" "></li>
            </ul>
          </footer>
        </article></section>`

      return content;
}

const renderTweets = (tweets) =>{
  tweets.forEach(tweet =>{
    $('.new-tweet').after(createTweetElement(tweet));
  });
}