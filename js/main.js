$(document).ready(function() 
{
	/*=====================================================================================
		Add Smooth Scrolling For Windows Webkit Users
	=======================================================================================*/
	if (navigator.userAgent.indexOf('Windows') != -1 && 
		navigator.userAgent.indexOf('WebKit') != -1)
	{
		var smoothScrollingScript = document.createElement('script');
		smoothScrollingScript.src = '/js/smoothscroll.js';

		var firstScript = document.getElementsByTagName('script')[0];
		firstScript.parentNode.insertBefore(smoothScrollingScript, firstScript);
	}

	/*=====================================================================================
		About Scrolling Animation
	=======================================================================================*/

		$('#about').click(function() {
			$('html, body').stop().animate({
				scrollTop: $('.about').offset().top - 50
			}, 700, 'easeInOutQuad');
		});

	/*=====================================================================================
		Responsive Hamburger Menu
	=======================================================================================*/
	var isShowing = false;
	$('.icon-list').click(function(){
		if (!isShowing)
		{
			$('.top-bar ul').css('float', 'none');
			$('.top-bar ul').css('display', 'block');
			$('.top-bar li').css('text-align', 'center');
			$('.top-bar li').css('display', 'block');
			isShowing = true;
		}
		else
		{
			$('.top-bar ul').removeAttr('style');
			$('.top-bar li').removeAttr('style');
			isShowing = false;

			resetMenu();
		}
	});

	// Close Menu On Item Click
	$('.top-bar li a').click(function(){
		$('.top-bar ul').removeAttr('style');
		$('.top-bar li').removeAttr('style');
		isShowing = false;

		resetMenu();
	});

	$( window ).resize(function() {
  		if (isShowing && $(window).width() > 450)
  		{
  			$('.top-bar ul').removeAttr('style');
			$('.top-bar li').removeAttr('style');
			isShowing = false;

			resetMenu();
  		}
	});

	/*=====================================================================================
		Load Map With Santa Barbara Coordinates
	=======================================================================================*/

	var latitude = 34.4258;
	var longitude = -119.7142;

	var map = loadMap(latitude, longitude);

	/*=====================================================================================
		Hangle Logo And Map Animations
	=======================================================================================*/

	$('.bar-logo').addClass("rotate");

	setTimeout(function() {
		$('.bar-logo').removeClass("duration");
		$('.bar-logo').removeClass("rotate");
		$('#coming-soon').fadeIn('slow');
	}, 1000);

	setTimeout(function() {
		$('.intro-content h1').show();
	}, 2000);

	setInterval(function(){
		// Reset longitude at end of map
		if ((longitude + .1) >= 180)
			longitude = -180;

		longitude += .03;
		map.setCenter(new google.maps.LatLng(latitude, longitude));
	}, 10);

	
	/*=====================================================================================
		Hangle iPhone Chatroom Sliding Animation
	=======================================================================================*/

	var marginRight = 72;
	var marginLeft = 145;
	var state = "right";

	setInterval(function(){
		switch(state)
		{
			case "right":
			  	$('.chatroom-slider').css('margin-left', marginRight);
			  	state = "left";
			  	break;
			case "left":
			  	$('.chatroom-slider').css('margin-left', marginLeft * -1);
			  	state = "reset";
			 	break;
			 case "reset":
			 	$('.chatroom-slider').css('margin-left', 0);
			 	state = "right";
			 	break;
		}
	}, 1500);

	/*=====================================================================================
		Handle Content Animations Based On Scroll Location
	=======================================================================================*/
	
	var isFirstContentShowing = false;
	var isSecondContentShowing = false;
	var isLightboxShowing = false;

	$(window).scroll(function() {

	    var height = $(window).scrollTop();

	    if(!isFirstContentShowing && height  > 100) {
	    	isFirstContentShowing = true;
	        $('.animation-container').removeClass('hidden');
	        $('.right-column').removeClass('hidden');
	    }

	    if(!isSecondContentShowing && height  > 900) {
	    	isSecondContentShowing = true;
	        $('#more-info-image').removeClass('hidden');
	    }

	    // Bottom of page
	    if (document.body.scrollHeight == (document.body.scrollTop + window.innerHeight)) {
        	
        	// Show email subscription
	    	if (!isLightboxShowing && !isSubscribed())
	    	{
				$('#email-subscription-toggle').click();
				isLightboxShowing = true;

				$('#submit-email').click(function(){
					$.post("php/AddEmail.php", { email: $('#email-input').val() }).done(function(response) {
						if(response.indexOf('True') != -1)
						{
							$('.lightbox-content h1').text("Thank you.");
							$('.lightbox-content small').hide();
							$('#email-input').hide();
							$('#submit-email').hide();

							setSubscribedCookie("true");
						}
					});
				});
	    	}

    	}
	});
});

function loadMap(latitude, longitude)
{
	var map;
	var pgLocation = new google.maps.LatLng(34.4258, -119.7142);

	var pgOptions = {
		 	zoom: 3,
		 	center: pgLocation,
			scrollwheel: false, 
			mapTypeControl: false, 
			streetViewControl: false, 
			disableDefaultUI: true,
			styles:
			[{"featureType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"lightness":-100}]}]
		 	};

	return new google.maps.Map(document.getElementById("map"), pgOptions);	
}

function isSubscribed()
{
	if (getSubscribedCookie() == "true")
		return true;
	else
		return false;
}

function setSubscribedCookie(value)
{
	var date = new Date();
	date.setDate(date.getDate() + 365);
	var expires = "expires=" + date.toGMTString();
	document.cookie = "Subscribed_Cookie" + "=" + value + "; " + expires;
}

function getSubscribedCookie()
{
	var name = "Subscribed_Cookie" + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		  var c = ca[i].trim();
		  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  }
	return "";
}

function resetMenu()
{
	// Fixed chrome rendering issue
	$('.top-bar').hide();
	setTimeout(function(){
		$('.top-bar').show();
	}, 1);
}