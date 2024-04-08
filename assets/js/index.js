document.addEventListener("DOMContentLoaded", function () {
	fsSliders();
	hallsSliders();
	newsSlider();
	locationSliders();
	calendarSliders();
	eventSlider();
	personSliders();
	festSlider();
	descSlider();
	historySliders();
	awardsSlider();
	aboutSliders();
	partnersSliders();
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

$(document).on("click", ".dropdown-slider__value", function () {
	const dropdown = $(this).closest(".dropdown-slider");

	$(".dropdown-slider").each((ind, drop) => {
		if (!$(this).closest($(drop)).length) {
			$(drop).removeClass("active");
		}
	});

	$(dropdown).toggleClass("active");
});

// Переключение темы

if ($(".head__theme input").prop("checked")) {
	console.log($(this).val());

	$("body").addClass("dark")
}

$(document).on("change", ".head__theme input", function () {
	if ($(this).prop("checked")) {

		$("body").addClass("dark");

		localStorage.colorTheme = "dark";
	} else {
		localStorage.colorTheme = "light";
		$("body").removeClass("dark");
	}
});

if (!localStorage.hasOwnProperty("colorTheme") || localStorage.colorTheme === "light") {
	$("body").removeClass("dark");

	$(".head__theme input").prop("checked", false);
} else if (localStorage.colorTheme === "dark") {
	$("body").addClass("dark");

	$(".head__theme input").prop("checked", true);
}

// Скролл вверх страницы по клику кнопки в футере

$(document).on("click", ".scroll_top_btn", function () {

	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
});

// Dropdown

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

$(document).on("click", ".dropdown-slider__item", function () {
	const dropdown = $(this).closest(".dropdown-slider");
	const value = $(this).find(".value").text();
	const inputVal = $(this).find("input").val();
	// const form = $(".aparts__filter_form");
	// const formContainer = $(form).closest(".aparts__filter");

	// if ($(dropdown).closest(".aparts__filter_control").length) {
	// 	$(form).find("input[name=sortby]").val(inputVal);
	// 	$(form).trigger("submit");
	// }

	$(dropdown).find(".dropdown-slider__value>.value").text(value);
	$(dropdown).removeClass("active");
});

let timer;
// $(window).on('wheel', function(e){
// 	if (window.pageYOffset >= 300) {
// 		const head = $(".head").not(".mobile__head");
// 		$(head).addClass("fixed");

// 		if (e.originalEvent.wheelDelta >= 0){
// 			console.log('Вверх');

// 			gsap.to(".head.fixed", {
// 				translateY: 0, duration:0.5
// 			})
// 			clearTimeout(timer);
// 		} else {
// 			console.log('Вниз');
// 			gsap.to(".head.fixed", {
// 				translateY: -$(".head.fixed").innerHeight(), duration:0.5
// 			})
// 			clearTimeout(timer);
// 		}

// 		timer = window.setTimeout(function(){
// 			console.log('Остановлено');
// 		}, 500);
// 	} else {
// 		$(".head").not(".mobile__head").removeClass("fixed");
// 	}
// 	console.log(window.pageYOffset)

// });

$(document).on("click", ".events__nav_tool", function () {
	$(".events__filter").each((i, item) => {
		if ($(item).attr("id") != $(this).data("target").replace("#", "")) {
			$(item).removeClass("open");
		} else {
			const targetEl = $(this).data("target");
			$(".events__filter").css({ "max-height": 0 });

			if (!$(targetEl).hasClass("open")) {
				$(targetEl).addClass("open");
				$(targetEl).css({ "max-height": $(targetEl).find("form").innerHeight() + "px" });
			} else {
				$(targetEl).removeClass("open");
				$(targetEl).css({ "max-height": 0 });
			}
		}
	});
});

let last;
let isAnim = false;
let lastScrollTop = 0;
let eventsDatePos;
if ($(".events__date").length) eventsDatePos = parseFloat($(".events__date").css("top"));

// скролл

$(document).bind("scroll", function (e) {
	var current = $(window).scrollTop();

	if (window.pageYOffset >= 300) {
		const head = $(".head").not(".mobile__head");
		$(head).addClass("fixed");

		if (current < last) {
			console.log("Вверх");

			if (!$(".head.fixed").hasClass("show")) {
				$(".head.fixed").css({ transition: "all 0.7s" });
				$(".head.fixed").addClass("show");
				$(".head.fixed").removeClass("hide");
			}

			if ($(".events__date").length) {
				$(".events__date").css({ top: $(".head.fixed").innerHeight() + eventsDatePos + "px" });
			}
		} else if (current > last) {
			$(".head.fixed").removeClass("show");
			$(".head.fixed").addClass("hide");

			if ($(".events__date").length) {
				$(".events__date").css({ top: eventsDatePos + "px" });
			}
		}
	} else {
		$(".head").not(".mobile__head").removeClass("fixed");
	}
	last = current;
});



$(document).on("click", function (e) {
	if (!e.target.closest(".dropdown")) {
		$(".dropdown").removeClass("active");
	}
});

// Мобильное меню

$(document).on("click", ".head .btn_menu", function (e) {
	if (!$(".mobile").hasClass("show")) {
		$(".mobile .animate").each((_, item) => {
			// $(item).css({"opacity": 0})
		});
		// $(this).addClass("active");
		$(".mobile").addClass("show");
		$("body").addClass("hidden");

		setTimeout(() => {
			$(".mobile__contacts").addClass("animate__animated animate__fadeInUpSm");
			$(".mobile .animate").each((_, item) => {
				$(item).addClass("animate__animated animate__fadeInUp");
			});
		}, 0);
	} else {
		// $(this).removeClass("active");
		$(".mobile").removeClass("show");
		$("body").removeClass("hidden");
		$(".mobile__nav_sublist").removeClass("active");
		$(".mobile__contacts").removeClass("animate__animated animate__fadeInUpSm");
		$(".mobile .animate").each((_, item) => {
			$(item).removeClass("animate__animated animate__fadeInUp");
		});
	}
});

$(document).on("click", ".mobile__nav_btn", function () {
	const navEl = $(this).closest(".mobile__nav");
	const subList = $(navEl).find(".mobile__nav_sublist");

	$(subList).addClass("active");
});

$(document).on("click", ".mobile__nav_sublist .mobile__nav_title", function () {
	const navEl = $(this).closest(".mobile__nav_sublist");

	$(navEl).removeClass("active");
});

// accordion

$(document).on("click", ".accordion__title", function () {
	const accItem = $(this).closest(".accordion__item");

	if (!$(accItem).hasClass("active")) {
		$(".accordion__item").each((i, item) => {
			$(item).removeClass("active");
			$(item).find(".accordion__content").css({ "max-height": "0px" });
		});
		$(accItem).addClass("active");
		$(accItem)
			.find(".accordion__content")
			.css({ "max-height": $(accItem).find(".accordion__content_desc").innerHeight() + "px" });
	} else {
		$(accItem).removeClass("active");
		$(accItem).find(".accordion__content").css({ "max-height": "0px" });
	}
});

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


$(document).on("focus", "input[type=text], input[type=email], input[type=tel]", function (e) {

	const label = $(this).closest("label");
	const placeholder = $(label).find(".placeholder");

	// $(placeholder).css({ "bottom": "auto", "top": "0", "font-size": "1.125rem" })

	$(placeholder).addClass("active");
})

$(document).on("blur", "input[type=text], input[type=email], input[type=tel]", function (e) {

	const label = $(this).closest("label");
	const placeholder = $(label).find(".placeholder");

	if (!$(this).val()) {
		// $(placeholder).css({ "bottom": "22px", "top": "auto", "font-size": "1.375rem" });

		$(placeholder).removeClass("active");
	}


})