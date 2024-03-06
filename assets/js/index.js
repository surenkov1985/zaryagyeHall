document.addEventListener("DOMContentLoaded", function(){
	
	fsSliders();
	hallsSliders();
	newsSlider();
	locationSliders();
});

$(document).on("click", ".dropdown__value", function () {

	const dropdown = $(this).closest(".dropdown");

	$(".dropdown").each((ind, drop) => {

		if (!$(this).closest($(drop)).length) {
			$(drop).removeClass("active");
		}
	});

	$(dropdown).toggleClass("active");
});

// if ($(".head__theme input").prop("checked")) {
// 	console.log($(this).val());

// 	$("body").addClass("dark")
// }

$(document).on("change", ".head__theme input", function(){
	if ($(this).prop("checked")) {
		// console.log($(this).val());

		$("body").addClass("dark");

		localStorage.colorTheme = "dark";
	} else {
		localStorage.colorTheme = "light";
		$("body").removeClass("dark");
	}
	
});

if(!localStorage.hasOwnProperty("colorTheme") || localStorage.colorTheme === "light") {

	$("body").removeClass("dark");

	$(".head__theme input").prop("checked", false)

} else if (localStorage.colorTheme === "dark") {
	$("body").addClass("dark")

	$(".head__theme input").prop("checked", true)
}

$(document).on("click", ".scroll_top_btn", function(){
	// $('html, body').animate({
	// 	scrollTop: 0
	//  }, {duration: 2000, easing: "linear"})

	window.scrollTo({
		top: 0,
		behavior: "smooth"
  });

	// $(document).scrollTop(0)
})

console.log(localStorage.colorTheme)

$(document).on("click", ".dropdown__item", function () {

	const dropdown = $(this).closest(".dropdown");
	const value = $(this).find(".value").text();
	const inputVal = $(this).find("input").val();
	const form = $(".aparts__filter_form");
	const formContainer = $(form).closest(".aparts__filter");

	if ($(dropdown).closest(".aparts__filter_control").length) {

		$(form).find("input[name=sortby]").val(inputVal);
		$(form).trigger("submit");
	}

	$(dropdown).find(".dropdown__value>.value").text(value);
	$(dropdown).removeClass("active");
});

let timer;
$(window).on('wheel', function(e){
	if (window.pageYOffset >= 300) {
		const head = $(".head").not(".mobile__head");
		$(head).addClass("fixed");

		if (e.originalEvent.wheelDelta >= 0){
			console.log('Вверх');

			gsap.to(".head.fixed", {
				translateY: 0, duration:0.5
			})
			clearTimeout(timer);
		} else {
			console.log('Вниз');
			gsap.to(".head.fixed", {
				translateY: -$(".head.fixed").innerHeight(), duration:0.5
			})
			clearTimeout(timer);
		}	
	 
		timer = window.setTimeout(function(){
			console.log('Остановлено');
		}, 500);
	} else {
		$(".head").not(".mobile__head").removeClass("fixed");
	}
	console.log(window.pageYOffset)
	
});

let last;
let isAnim = false;
$(document).bind('touchmove', function(e){
	 var current = e.originalEvent.touches[0].clientY;

	 if (window.pageYOffset >= 300) {
		const head = $(".head").not(".mobile__head");
		$(head).addClass("fixed");

		if (current > last){
			// console.log('Вверх');

			if (!$(".head.fixed").hasClass("show")) {
				$(".head.fixed").css({"transition": "all 1s"})
				$(".head.fixed").addClass("show")
				$(".head.fixed").removeClass("hide")
			}
			
			// gsap.to(".head.fixed", {
			// 	translateY: 0, duration:0.5
			// })
			// clearTimeout(timer);
		} else if(current > last){
			console.log('Вниз');
			// gsap.to(".head.fixed", {
			// 	translateY: -$(".head.fixed").innerHeight(), duration:0.5
			// })
			// clearTimeout(timer);

			$(".head.fixed").removeClass("show")
			$(".head.fixed").addClass("hide")
		}	
	 
		// timer = window.setTimeout(function(){
		// 	console.log('Остановлено');
		// }, 500);
	} else {
		$(".head").not(".mobile__head").removeClass("fixed");
	}
	//  if(current > last){
	// 	 console.log('Движение пальцем вниз');
	//  } else if(current < last){
	// 	console.log('Движение пальцем вверх');
	//  }
	 last = current;
});

$(document).on("click", function (e) {

	if (!e.target.closest(".dropdown")) {

		$(".dropdown").removeClass("active");
	}
});

$(document).on("click", ".head .btn_menu", function(e) {

	if (!$(".mobile").hasClass("show")) {

		$(".mobile .animate").each((_,item) => {
			// $(item).css({"opacity": 0})
		});
		// $(this).addClass("active");
		$(".mobile").addClass("show");
		$("body").addClass("hidden");

		setTimeout(() => {
			$(".mobile__contacts").addClass("animate__animated animate__fadeInUpSm");
			$(".mobile .animate").each((_,item) => {
				$(item).addClass("animate__animated animate__fadeInUp")
			});
		}, 0);
	} else {

		// $(this).removeClass("active");
		$(".mobile").removeClass("show");
		$("body").removeClass("hidden");
		$(".mobile__nav_sublist").removeClass("active");
		$(".mobile__contacts").removeClass("animate__animated animate__fadeInUpSm");
		$(".mobile .animate").each((_,item) => {
			$(item).removeClass("animate__animated animate__fadeInUp")
		});
	}

});

$(document).on("click", ".mobile__nav_btn", function(){

	const navEl = $(this).closest(".mobile__nav");
	const subList = $(navEl).find(".mobile__nav_sublist");

	$(subList).addClass("active");
})

$(document).on("click", ".mobile__nav_sublist .mobile__nav_title", function(){

	const navEl = $(this).closest(".mobile__nav_sublist");

	$(navEl).removeClass("active");
})


// $(function() {
// 	jQuery.scrollSpeed(100, 800, 'easeOutCubic');
//   })

// $(document).on('mousewheel', function(event) {
	
// 	var top = $(window).scrollTop() - (event.originalEvent.wheelDelta );

// 	console.log(event)
// 	event.preventDefault();
// 	 $('html, body').stop().animate({
// 		 scrollTop: top
// 	}, 200);
// })

// For Vanilla JavaScript
// var myWave = wavify( document.querySelector('#myId'), {
// 	height: 60,
// 	bones: 3,
// 	amplitude: 30,
// 	color: 'rgba(150, 97, 255, .8)',
// 	speed: .25
//  })
 
 // For jQuery
//  var myWave = $('#myID').wavify({
// 	height: 50,
// 	bones: 5,
// 	amplitude: 100,
// 	color: 'rgba(16, 16, 16,, .8)',
// 	speed: 0.3
//  });