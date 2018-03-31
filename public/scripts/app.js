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
  let realTime = new Date();

  let time = new Date(tweet.created_at);

  let actualTime = time.getHours();

  let timeAgo = "";

  if(time.getDay() === realTime.getDay()){
    timeAgo = "hours";
    actualTime =  12 - time.getHours();
      if(actualTime < 0){
        actualTime = actualTime*(-1) + " minutes";
      }
    if(time.getMinutes() === realTime.getMinutes()){
      timeAgo = "";
      actualTime = "just now";
    }

  } else if (time.getHours() === (realTime.getHours()+10)){
    timeAgo = "";
    actualTime = "just now";
  };

  timeAgo ="";

  let content = `<section class="tweets"> <article><header>
            <div class="profile-user">
              <ul>
                <li><img src="${tweet.user.avatars.regular}" alt=" "></li>
                <li class="user-name">${tweet.user.name}</li>
              <li class="user-handle">${tweet.user.handle}</li>
              </ul>
            </div>
          </header>
          <div class="content">
           ${tweet.content.text}          
          </div>
          <footer>
            <ul class="footer-imgs">
              <li><a href=""><i class="fas fa-heart"></i></a></li>
              <li><a href=""><i class="fab fa-font-awesome-flag" style="margin-right: 5px;"></i></a></li>
              <li><a href=""><i class="fas fa-retweet" style="margin-right: 5px;"></i></a></li>
            <li class="tweet-created">${actualTime} ${timeAgo}ago</li>
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