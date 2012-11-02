/* $_GET[''] for js */
(function(){
    var s = window.location.search.substring(1).split('&');
    if(!s.length) return;
    window.$_GET = {};
    for(var i  = 0; i < s.length; i++) {
         var parts = s[i].split('=');
        window.$_GET[unescape(parts[0])] = unescape(parts[1]);
    }
}());

/* SoundCloud authorize config */
var config = {
  client_id : '',
  redirect_uri : ''
}

/* local settings */
if (document.URL == "http://timpietrusky.github.local/what-is-my-soundcloud-user-id/") {
  config = {
    client_id : 'dd93c5927f6d4c9c4deab805bc38896e',
    redirect_uri : 'http://timpietrusky.github.local/what-is-my-soundcloud-user-id/'
  };
}

/* production settings */
if (document.URL == "http://timpietrusky.github.com/what-is-my-soundcloud-user-id/") {
  config = {
    client_id : '5aec011faa8e46a01000cd23b8698858',
    redirect_uri : 'http://timpietrusky.github.com/what-is-my-soundcloud-user-id/'
  };
}

/* check if config is valid */
if (config.client_id == '' || config.redirect_uri == '') {
  throw '- client_id and/or redirect_uri are missing!';
}

var button_get_user_id = document.querySelectorAll('[role="get your user_id"]')[0],
    input_user_id = document.querySelectorAll('[role="user_id"]')[0],
    article_high_2 = document.querySelectorAll('[data-high=""]')[0],
    output_you = document.querySelectorAll('[role="you"]')[0]
;

/* Connect to SoundCloud and authorize when necessary */
button_get_user_id.onclick = function() {
  SC.initialize({
    client_id: config.client_id,
    redirect_uri: config.redirect_uri
  });

  if ($_GET['code'] == undefined) {
    // Clean up
    article_high_2.dataset.high = "";
    output_you.innerHTML = "";
    input_user_id.value = "";

    // Authorize
    SC.connect(function() {

      // Callback
      SC.get('/me', function(me) { 

        output_you.style.display = 'block';
        output_you.innerHTML = me.username;

        input_user_id.value = me.id;
        article_high_2.dataset.high = "2";
      });
    });
  }
}