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

	loadScript(window.location.protocol + "//api-maps.yandex.ru/2.1/?lang=ru_RU", setMap);
});

// dropdown

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

$(document).on("click", ".contacts__col .accordion_btn", function () {
	const accItem = $(this).closest(".contacts__col");

	if (!$(accItem).hasClass("active")) {
		$(".contacts__col").each((i, item) => {
			$(item).removeClass("active");
			$(item).find(".contacts__col_bottom").css({ "max-height": "0px" });
		});
		$(accItem).addClass("active");
		$(accItem)
			.find(".contacts__col_bottom")
			.css({ "max-height": $(accItem).find(".contacts__col_list").innerHeight() + "px" });
	} else {
		$(accItem).removeClass("active");
		$(accItem).find(".contacts__col_bottom").css({ "max-height": "0px" });
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


});

// popup 

$(document).on("click", ".popup_open", function () {

	const popup = $(".popup");
	const popupContent = $(".popup__content");

	$("body").addClass("hidden");
	const timeLine = gsap.timeline();

	timeLine.to(".popup", {
		opacity: 1, visibility: "visible", duration: 0.1, ease: "power1.out"
	}).to(".popup__content", {
		translateX: 0, duration: 0.1, ease: "power1.out"
	});
});

$(document).on("click", ".popup", function (e) {

	if (!e.target.closest(".popup__content") || e.target.closest(".popup_close")) {
		$("body").removeClass("hidden");
		$(this).find(".form_success").removeClass("show");
		$(this).find("form").trigger("reset");
		const timeLine = gsap.timeline();

		timeLine.to(".popup__content", {
			translateX: "100%", duration: 0.1, ease: "power1.out"
		}).to(".popup", {
			opacity: 0, duration: 0.1, ease: "power1.out", delay: 0.4
		}).to(".popup", {
			visibility: "hidden", duration: 0, ease: "power1.out"
		});
	}
})

///////////////////////////

function formatValueInput(elem, regexp) {
	let str = elem.value.replace(regexp, "");

	return str;
}

function testValue(elem, reg, string) {
	if ($(elem).attr("data-reg") === "true") {

		let str = $(elem).val();
		let errElem = $(elem).closest("label").find("span.error");

		if (!str.length) {

			$(errElem).text("Заполните это поле");
			$(errElem).addClass("show");
			$(elem).addClass("error");
			$(elem).attr("data-test", "false");

		} else if (!reg.test(str)) {

			$(errClass).text(string);
			$(elem).addClass("error");
			$(elem).attr("data-test", "false");

		} else {

			$(elem).removeClass("error");
			$(elem).attr("data-test", "true");
			$(errClass).text("");
		};
	};
};

function phoneMask(e) {
	let key = e.key;
	let testReg = /^((8|\+7)[\- ])?(\(\d{3}\)[\- ])\d{3}[\- ]\d{2}[\- ]\d{2}$/;

	let valRegRu = /\D/gi;
	let valRegEur = /\+\d{15}/;
	let testString = "Введите валидный номер";

	let cursorPosition = e.target.selectionStart;
	let str = formatValueInput(this, valRegRu);
	let formatStr = "";

	let rusTel = ["7", "8", "9"];
	let korTel = ["82"];

	if (rusTel.indexOf(str[0]) > -1) {
		if (str[0] === "7") {
			formatStr = "+" + str[0];
		} else if (str[0] === "8") {
			formatStr = str[0];
		} else {
			formatStr = "+7" + str[0];
		}


		if (str.length > 1) {
			formatStr += " (" + str.slice(1, 4);
		}

		if (str.length >= 5) {
			formatStr += ") " + str.slice(4, 7);
		}

		if (str.length >= 8) {
			formatStr += " " + str.slice(7, 9);
		}

		if (str.length >= 10) {
			formatStr += " " + str.slice(9, 11);
		}
	} else {
		if (str.length >= 1) formatStr = "+" + str;
	}

	if (e.type === "blur" || e.type === "focusout") {

		if (this.value && testReg.test(formatStr)) {
			// formData.tel = str;
			console.log(testReg.test(formatStr))
		} else {

		}
	}

	this.value = formatStr;
}

//function on(event, element, callback = function() {}) {
//document.addEventListener(event, function(e) {
//e.stopPropagation()
//const target = e.target.closest(element);
//if (!target) return;
//callback.call(target, e);
//});
//}

function maskedEmail(elem) {
	let regexp = /[^\w-@\.]/gi;
	let str = elem.value.replace(regexp, "");
	let test = /\w+@\w+/.test(str);
	if (!/[\w-]/g.test(str)) {
		str = str.replace(/@/, "");
	}
	if (str.match(/@/g) && str.match(/@/g).length > 1) {
		str = str.slice(0, -1);
	}
	if (!test) {
		//str = str.replace(/\./, "");
	}
	if (str.match(/\./g) && str.match(/\./g).length > 1) {
		//str = str.slice(0, -1);
	}
	return str;
}



document.addEventListener("DOMContentLoaded", function () {

	let formData = {};
	formData.sectors = [];

	function validationFormFields() {
		const form = $(".feedback__form");
		const inputs = $(form).find("input").not("[type=hidden]").not("[type=submit]");
		const testInputs = $(form).find("input[data-test=true]");
		console.log(testInputs.length);
		if (inputs.length === testInputs.length) {
			$(form).find("input[type=submit]").attr("disabled", false);
		} else {
			$(form).find("input[type=submit]").attr("disabled", true);
		}
	}

	$(document).on("submit", ".feedback__form", function (e) {
		e.preventDefault();
		// console.log(e);
		// const url = "https://script.google.com/macros/s/AKfycbwLVcrSrHUv1IvOzBRCI10QNauQw4k3hf2VKaC7QpdDACFNBKeXaq2ePuQK1m8PwM7S/exec";
		const data = new FormData();
		const inputs = $(this).find("input");
		$(inputs).each((ind, input) => {
			// if ($(input).attr('name') === "form_text_118") {
			// 	console.log($(input).val());
			// 	data.append("name", $(input).val());
			// }

			// if ($(input).attr('name') === "form_email_119") {
			// 	data.append("email", $(input).val());
			// }

			// if ($(input).attr('name') === "form_text_120") {
			// 	data.append("phone", $(input).val().replace("+", ""));
			// }

			// if ($(input).attr('name') === "form_date_121") {
			// 	data.append("birthsDate", $(input).val());
			// }
			data.append($(input).attr("name"), $(input).val());
			// $(input).val("");
		})

		setTimeout(() => {
			$(this).find(".form_success").addClass("show");

			setTimeout(() => {
				$(this).find(".form_success").removeClass("show");
			}, 1500);
		}, 1500);
	});

	$(document).on("input keydown blur focusout", "input[type=tel]", function (e) {

		const label = this.closest("label");
		// const form = this.closest("form");
		// const formError = form.querySelector(".form_error");
		this.classList.remove("error");
		// formError.classList.remove("show");
		label.querySelector("span.error").classList.remove("show");

		let key = e.key;
		let testReg = /^((8|\+7)[\- ])?(\(\d{3}\)[\- ])\d{3}[\- ]\d{2}[\- ]\d{2}$/;

		let valRegRu = /\D/gi;
		let valRegEur = /\+\d{15}/;
		let testString = "Введите валидный номер";

		let cursorPosition = e.target.selectionStart;
		let str = formatValueInput(this, valRegRu);
		let formatStr = "";

		let rusTel = ["7", "8", "9"];
		let korTel = ["82"];

		if (rusTel.indexOf(str[0]) > -1) {
			if (str[0] === "7") {
				formatStr = "+" + str[0];
			} else if (str[0] === "8") {
				formatStr = str[0];
			} else {
				formatStr = "+7" + str[0];
			}


			if (str.length > 1) {
				formatStr += " (" + str.slice(1, 4);
			}

			if (str.length >= 5) {
				formatStr += ") " + str.slice(4, 7);
			}

			if (str.length >= 8) {
				formatStr += " " + str.slice(7, 9);
			}

			if (str.length >= 10) {
				formatStr += " " + str.slice(9, 11);
			}
		} else {
			if (str.length >= 1) formatStr = "+" + str;
		}

		this.value = formatStr;

		if (e.type === "keydown" && e.key === "Enter") {
			e.preventDefault();
			$(this).attr("data-reg", "true");
			if (this.value) {

				if (testReg.test(this.value)) {
					$(this).attr("data-test", "true");
					formData.tel = str;
				} else {
					$(this).attr("data-test", "false");
					this.classList.add("error");
					label.querySelector("span.error").classList.add("show");
					label.querySelector("span.error").textContent = "Введите валидный телефон";
					// formError.classList.add("show");
				}
			} else {
				$(this).attr("data-test", "false");
				this.classList.add("error");
				label.querySelector("span.error").classList.add("show");
				label.querySelector("span.error").textContent = "Обязательное поле для заполнения";
				// formError.classList.add("show");
			}
		}

		if (e.type === "blur" || e.type === "focusout") {
			$(this).attr("data-reg", "true");
			if (this.value) {

				if (testReg.test(this.value)) {
					$(this).attr("data-test", "true");
					formData.tel = str;
				} else {
					$(this).attr("data-test", "false");
					this.classList.add("error");
					label.querySelector("span.error").classList.add("show");
					label.querySelector("span.error").textContent = "Введите валидный телефон";
					// formError.classList.add("show");
				}
			} else {
				$(this).attr("data-test", "false");
				this.classList.add("error");
				label.querySelector("span.error").classList.add("show");
				label.querySelector("span.error").textContent = "Обязательное поле для заполнения";
				// formError.classList.add("show");
			}
		}

		validationFormFields()
	});

	$(document).on("input keydown blur focusout", "input[type=email]", function (e) {

		const label = this.closest("label");
		// const form = this.closest("form");
		// const formError = form.querySelector(".form_error");
		this.classList.remove("error");
		// formError.classList.remove("show");
		label.querySelector("span.error").classList.remove("show");
		let valRegRu = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/gi;
		let str = maskedEmail(this);
		this.value = str;

		if (e.type === "keydown" && e.key === "Enter") {
			e.preventDefault();
			$(this).attr("data-reg", "true");
			if (this.value) {

				if (valRegRu.test(this.value)) {

					formData.email = this.value;
					$(this).attr("data-test", "true");
				} else {
					$(this).attr("data-test", "false");
					this.classList.add("error");
					label.querySelector("span.error").classList.add("show");
					label.querySelector("span.error").textContent = "Введите валидный email";
					// formError.classList.add("show");
				}
			} else {
				$(this).attr("data-test", "false");
				this.classList.add("error");
				label.querySelector("span.error").classList.add("show");
				label.querySelector("span.error").textContent = "Обязательное поле для заполнения";
				// formError.classList.add("show");
			}
		}

		if (e.type === "blur" || e.type === "focusout") {
			$(this).attr("data-reg", "true");
			if (this.value) {

				if (valRegRu.test(this.value)) {
					$(this).attr("data-test", "true");
					formData.email = this.value;
				} else {
					$(this).attr("data-test", "false");
					this.classList.add("error");
					label.querySelector("span.error").classList.add("show");
					label.querySelector("span.error").textContent = "Введите валидный email";
					// formError.classList.add("show");
				}
			} else {
				$(this).attr("data-test", "false");
				this.classList.add("error");
				label.querySelector("span.error").classList.add("show");
				label.querySelector("span.error").textContent = "Обязательное поле для заполнения";
				// formError.classList.add("show");
			}
		}

		validationFormFields()
	});

	$(document).on("input keydown focusout blur", "input[name=fio]", function (e) {

		const label = this.closest("label");
		label.querySelector("span.error").classList.remove("show");

		if (e.type === "blur" || e.type === "focusout") {
			$(this).attr("data-reg", "true");
			if (this.value) {
				formData.fio = this.value;
				//document.querySelector("textarea[name=form_textarea_93]").focus();
				$(this).attr("data-test", "true");
			} else {
				this.classList.add("error");
				label.querySelector("span.error").textContent = "Поле обязательно к заполнению";
				label.querySelector("span.error").classList.add("show");
				$(this).attr("data-test", "false");
			}
		}

		validationFormFields()
	});


	$(document).on("click", "[type=submit]", function (e) {
		//e.preventDefault();
		const form = $(this).closest("form");
		let errors = 0;
		const elements = $(form).find("input,select,textarea").not("[type=submit]").not("[type=hidden]");
		$(elements).each((_, input) => {



			if (!$(input).val()) {

				errors += 1;
				$(input).addClass("error");
				if ($(input).closest("label")) {
					$(input).closest("label").find("span.error").addClass("show").text("Обязательное поле для заполнения");


				} else if ($(input).closest("label")) {
					$(input).closest("label").find("span.error").addClass("show");
				}
			}

		});
		if (errors !== 0) {
			e.preventDefault();
		};
	});


	// $("input[name=form_date_32]").attr("placeholder", "DD.MM.YYYY");
	// $("input[name=form_text_17]").attr("maxlength", "90");
	// $("input[name=form_text_19]").attr("maxlength", "20");
	// $("input[name=form_text_20]").attr("maxlength", "7");
	// $("input[name=form_text_23]").attr("maxlength", "20");
	// $("input[name=form_email_24]").attr("type", "email");
	// $("input[name=form_text_28]").attr("maxlength", "15");
	// $("input[name=form_text_29]").attr("maxlength", "6");
	// $("input[name=form_text_31]").attr("maxlength", "80");
	// $("input[name=row]").attr("maxlength", "4");
	// $("input[name=place]").attr("maxlength", "40");
	// console.log($(".date").text())
});

