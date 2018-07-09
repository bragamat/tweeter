/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// const datedateDealing = require('./dates.js')
$(document).ready(function(){

$( ".composeTT" ).click(function() {
  $( ".new-tweet" ).slideToggle( "slow", function() {
    $("#writing-tweet").focus();
  });
});

  $( "form" ).on( "submit", function( event ) {   
   event.preventDefault();
   let tweetLength = $("textarea").val().length;
   location.reload(); 
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
    };
    loadTweets();
});


let realTime = new Date();

const createTweetElement = (tweet) =>{
 let stringReturn = moment(tweet.created_at).fromNow()
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
            <li class="tweet-created">${stringReturn}</li>
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