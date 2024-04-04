function fsSliders() {
	const imgSlider = document.querySelector(".fs__images_slider");

	if (!imgSlider) return;

	const imagesSlider = new Swiper(imgSlider, {
		speed: 1000,
		spaceBetween: 1,
		navigation: {
			prevEl: ".fs__content_slider .swiper-prev-btn",
			nextEl: ".fs__content_slider .swiper-next-btn",
		},
	});

	const activeSlide = $(imagesSlider.slides)[imagesSlider.activeIndex];

	if (!!$(activeSlide).find("img").length) {
		if (!$(".head").not(".mobile__head").hasClass("head_light")) {
			$(".head").not(".mobile__head").addClass("head_light");
			$(".fs__content_slider").addClass("light");
			$(".fs__content").addClass("light");
		}
	} else {
		$(".head").removeClass("head_light");
		$(".fs__content_slider").removeClass("light");
		$(".fs__content").removeClass("light");
	}

	imagesSlider.on("slideChange", function (slider) {
		const activeSlide = $(slider.slides)[slider.activeIndex];

		if (!!$(activeSlide).find("img").length) {
			if (!$(".head").not(".mobile__head").hasClass("head_light")) {
				$(".head").not(".mobile__head").addClass("head_light");
				$(".fs__content_slider").addClass("light");
				$(".fs__content").addClass("light");
			}
		} else {
			$(".head").not(".mobile__head").removeClass("head_light");
			$(".fs__content_slider").removeClass("light");
			$(".fs__content").removeClass("light");
		}
	});

	const contentSlider = new Swiper(".fs__content_slider", {
		speed: 1000,
		spaceBetween: 16,
		navigation: {
			prevEl: ".fs__content_slider .swiper-prev-btn",
			nextEl: ".fs__content_slider .swiper-next-btn",
		},
		pagination: {
			el: ".fs__content .swiper-pagination",
			type: "bullets",
		},
	});

	contentSlider.on("slideChange", function (slider) {
		const activeSlide = slider.activeIndex;

		imagesSlider.slideTo(activeSlide);
	});
}

function hallsSliders() {
	const hallSlider = document.querySelector(".halls__slider_images");
	const hallDescSlider = document.querySelector(".halls__slider_desc");
	const smSlider = document.querySelector(".halls__slider_small");

	if (!hallSlider) return;

	const imagesSlider = new Swiper(hallSlider, {
		// loop: true,
		speed: 700,
		navigation: {
			prevEl: ".halls__slider_desc .swiper-prev-btn",
			nextEl: ".halls__slider_desc .swiper-next-btn",
		},
		pagination: {
			el: ".halls__slider_images .pagination_tabs",
			type: "bullets",
			clickable: true,
			bulletClass: "btn_tab",
			bulletActiveClass: "active",
			renderBullet: function (current, total) {
				const slide = Array.from(hallSlider.querySelectorAll(".swiper-slide"))[current];

				return `<span class="btn btn_tab dropdown__item ${total} ${slide.classList.contains("swiper-slide-active") ? "active" : ""
					}"><span class="value">${Array.from(hallSlider.querySelectorAll(".swiper-slide"))[current].dataset.name}</span></span>`;
			},
		},
		on: {
			init: function () {
				const pagin = $(".halls__slider_images .pagination_tabs");
				const paginBg = $(pagin).find(".before");

				const activeTab = $(pagin).find(".active");

				$(pagin).closest(".dropdown").find(".dropdown__value .value").text($(activeTab).text());
				$(".halls__slider_images .pagination_tabs").append(`<div class="before"></div>`);
				$(".halls__slider_images .pagination_tabs .before").width($(".halls__slider_images .pagination_tabs .active").innerWidth());
			},
		},
	});

	const descSlider = new Swiper(hallDescSlider, {
		allowTouchMove: false,
		// loop: true,
		speed: 700,
		// navigation: {
		// 	prevEl: ".halls__slider_desc .swiper-prev-btn",
		// 	nextEl: ".halls__slider_desc .swiper-next-btn"
		// },
		// pagination: {
		// 	el: ".halls__slider_images .pagination_tabs",
		// 	type: 'bullets',
		// 	clickable: true,
		// 	bulletClass: "btn_tab",
		// 	bulletActiveClass: "active",
		// 	renderBullet:function(current, total) {
		// 		// console.log(imagesSlider);
		// 		const slide = Array.from(hallSlider.querySelectorAll(".swiper-slide"))[current];
		// 		console.log(slide.classList.contains("swiper-slide-active"))
		// 		return `<span class="btn btn_tab ${total} ${slide.classList.contains("swiper-slide-active") ? 'active' : ''}">${Array.from(hallSlider.querySelectorAll(".swiper-slide"))[current].dataset.name}</span>`;
		// 	 }
		// }
	});

	const smallSlider = new Swiper(smSlider, {
		allowTouchMove: false,
		initialSlide: 1,
		loop: true,
		speed: 700,
		// navigation: {
		// 	prevEl: ".halls__slider_desc .swiper-prev-btn",
		// 	nextEl: ".halls__slider_desc .swiper-next-btn"
		// },
		// pagination: {
		// 	el: ".halls__slider_images .pagination_tabs",
		// 	type: 'bullets',
		// 	clickable: true,
		// 	bulletClass: "btn_tab",
		// 	bulletActiveClass: "active",
		// 	renderBullet:function(current, total) {
		// 		// console.log(imagesSlider);
		// 		const slide = Array.from(hallSlider.querySelectorAll(".swiper-slide"))[current];
		// 		console.log(slide.classList.contains("swiper-slide-active"))
		// 		return `<span class="btn btn_tab ${total} ${slide.classList.contains("swiper-slide-active") ? 'active' : ''}">${Array.from(hallSlider.querySelectorAll(".swiper-slide"))[current].dataset.name}</span>`;
		// 	}
		// }
	});

	imagesSlider.on("slideChange", function (slider) {
		const activeSlide = $(slider.slides)[slider.activeIndex];
		const pagin = $(".halls__slider_images .pagination_tabs");
		const paginBg = $(pagin).find(".before");

		const activeTab = $(pagin).find(".active");

		$(paginBg).css({ width: $(activeTab).innerWidth(), left: $(activeTab).position().left + "px" });
		$(pagin).closest(".dropdown").find(".dropdown__value .value").text($(activeTab).text());

		console.log($(activeTab).position());

		descSlider.slideTo(slider.activeIndex);
		smallSlider.slideTo(!!(slider.slides.length > slider.activeIndex + 1) ? slider.activeIndex + 1 : 0);
	});

	$(window).resize(function () {
		const pagin = $(".halls__slider_images .pagination_tabs");
		const paginBg = $(pagin).find(".before");

		const activeTab = $(pagin).find(".active");

		$(paginBg).css({ width: $(activeTab).innerWidth(), left: $(activeTab).position().left + "px" });
	});
}

function newsSlider() {
	const news = document.querySelector(".news__slider");

	if (!news) return;

	const newsSlider = new Swiper(news, {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 8,
		navigation: {
			nextEl: ".news .swiper-next-btn",
			prevEl: ".news .swiper-prev-btn",
		},
		pagination: {
			el: ".news .swiper-pagination",
			type: "bullets",
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				spaceBetween: 4,
			},
			769: {
				slidesPerView: 2,
				spaceBetween: 8,
			},
			991: {
				slidesPerView: 3,
				spaceBetween: 12,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
			1441: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
		},
	});
}

function locationSliders() {
	const imgSlider = document.querySelector(".location__images_slider");

	if (!imgSlider) return;

	const imagesSlider = new Swiper(imgSlider, {
		speed: 1000,
	});

	imagesSlider.on("slideChange", function (slider) {
		const pos = +$(window).width() - +$(".location__path_icon").innerWidth();
		console.log($(".location__path svg").innerWidth(), $(window).width());

		if ($(".location").hasClass(".tour")) {

			$(".location__path_icon").css({ left: `${pos}px`, right: 0 });
		} else {
			if (slider.activeIndex == 1) {
				$(".location__slides_btn.first").css({ visibility: "hidden", opacity: 0 });
			} else {
				$(".location__path_icon").css({ left: 0, right: `${pos}px` });
				$(".location__slides_btn.first").css({ visibility: "visible", opacity: 1 });
			}
		}

	});

	if ($(".location").hasClass("tour")) {

		const pos = +$(window).width() - +$(".location__path_icon").innerWidth();
		$(".location__path_icon").css({ left: `${pos}px`, right: 0 });
		$(window).resize(function () {
			const pos = +$(window).width() - +$(".location__path_icon").innerWidth();
			$(".location__path_icon").css({ left: `${pos}px`, right: 0 });
		})
	}

}

function calendarSliders() {
	const months = document.querySelector(".calendar__months_slider");
	const calendar = document.querySelector(".calendar__dates_slider");

	if (!months || !calendar) return;

	const monthsSlider = new Swiper(months, {
		speed: 1000,
		navigation: {
			prevEl: ".calendar__months .swiper_prev",
			nextEl: ".calendar__months .swiper_next",
		},
	});
}

function eventSlider() {
	const eventPicture = document.querySelector(".fs__picture_slider");

	if (!eventPicture) return;

	const slider = new Swiper(eventPicture, {
		speed: 1000,
		navigation: {
			prevEl: ".fs__picture_slider .swiper-prev-btn",
			nextEl: ".fs__picture_slider .swiper-next-btn",
		},
		pagination: {
			el: ".fs__picture .swiper-pagination",
			type: "bullets",
		},
	});
}

function personSliders() {
	const persons = document.querySelectorAll(".event__person_slider");

	if (!persons.length) return;

	for (let person of persons) {
		const personCont = person.closest(".event__person_slider-cont");

		const slider = new Swiper(person, {
			speed: 1000,
			navigation: {
				prevEl: personCont.querySelector(".swiper-prev-btn"),
				nextEl: personCont.querySelector(".swiper-next-btn"),
			},
			pagination: {
				el: personCont.querySelector(".swiper-pagination"),
				type: "bullets",
			},
		});

		// person.querySelector(".swiper-prev-btn").addEventListener("click", function () {
		// 	slider.slidePrev(1000)
		// })

		// person.querySelector(".swiper-next-btn").addEventListener("click", function () {
		// 	slider.slideNext(1000)
		// })
	}
}

function festSlider() {
	const fest = document.querySelector(".festival__slider");

	if (!fest) return;

	const festSlider = new Swiper(fest, {
		speed: 1000,
		navigation: {
			prevEl: ".festival__slider .swiper-prev-btn",
			nextEl: ".festival__slider .swiper-next-btn",
		},
		pagination: {
			el: ".festival .swiper-pagination",
			type: "bullets",
		},
	});
}

function descSlider() {
	const desc = document.querySelector(".description__slider");

	if (!desc) return;

	const descSlider = new Swiper(desc, {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 4,
		speed: 1000,
		navigation: {
			prevEl: ".description__sliders .description__slider_control .swiper-prev-btn",
			nextEl: ".description__sliders .description__slider_control .swiper-next-btn",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 4,
			},
			576: {
				slidesPerView: 2,
				slidesPerGroup: 1,
				spaceBetween: 4,
			},
			767: {
				slidesPerView: 3,
				slidesPerGroup: 1,
				spaceBetween: 4,
			},
			991: {
				slidesPerView: 3,
				slidesPerGroup: 1,
				spaceBetween: 16,
			},
			1440: {
				slidesPerView: 4,
				slidesPerGroup: 1,
				spaceBetween: 25,
			},
		},
	});

	$(document).on("click", ".description__sliders .description__slider_tabs .dropdown__item", function () {
		console.log(descSlider.params);
		const before = $(this).closest(".description__slider_tabs").find(".before");

		if ($(this).hasClass("active")) return;

		const tabs = $(this).data("tabs");

		$(".description__sliders .description__slider_tabs .dropdown__item").removeClass("active");

		$(this).addClass("active");

		$(before).css({ left: $(this).position().left + "px" });

		if (tabs === 1) {
			$(desc).find(".swiper-wrapper").css({ "align-items": "flex-start" });
		} else {
			$(desc).find(".swiper-wrapper").css({ "align-items": "flex-end" });
		}

		descSlider.params.slidesPerView = tabs;
		descSlider.params.autoHeight = true;

		descSlider.params.breakpoints = {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 4,
			},
			576: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 4,
			},
			767: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 4,
			},
			991: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 16,
			},
			1440: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 25,
			},
		}
		descSlider.update();
		descSlider.updateSize();
	});
}

function historySliders() {
	const history = document.querySelector(".history__sliders");

	if (!history) return;

	const desc = history.querySelector(".history__desc_slider"),
		images = history.querySelector(".history__images_slider"),
		dates = history.querySelector(".history__dates_slider");

	let datesSlider = new Swiper(dates, {
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 4,
		// navigation: {
		// 	prevEl: ".history__sliders .swiper-prev-btn",
		// 	nextEl: ".history__sliders .swiper-next-btn",
		// },
		watchSlidesProgress: true,
		breakpoints: {
			320: { slidesPerView: 1, spaceBetween: 4 },
			576: { slidesPerView: 1, spaceBetween: 4 },
			769: {
				slidesPerView: 3,
				spaceBetween: 4,
			},
			991: { slidesPerView: 4, spaceBetween: 8 },
			1200: {
				slidesPerView: 4,
				spaceBetween: 16,
			},
			1441: { slidesPerView: 6, spaceBetween: 32 },
		},
	});

	let imagesSlider = new Swiper(images, {
		speed: 1000,
		effect: "fade",
		navigation: {
			prevEl: ".history__sliders .swiper-prev-btn",
			nextEl: ".history__sliders .swiper-next-btn",
		},
		thumbs: {
			swiper: datesSlider,
		},
	});

	let descSlider = new Swiper(desc, {
		speed: 1000,
		effect: "fade",
		// navigation: {
		// 	prevEl: ".history__sliders .swiper-prev-btn",
		// 	nextEl: ".history__sliders .swiper-next-btn",
		// },
		// thumbs: {
		// 	swiper: imagesSlider,
		// },
	});

	imagesSlider.on("slideChange", function (slider) {
		const activeSlide = slider.activeIndex;

		descSlider.slideTo(activeSlide);
	});
}

function awardsSlider() {
	const news = document.querySelector(".awards__slider");

	if (!news) return;

	const newsSlider = new Swiper(news, {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 8,
		navigation: {
			nextEl: ".awards .swiper-next-btn",
			prevEl: ".awards .swiper-prev-btn",
		},
		pagination: {
			el: ".awards .swiper-pagination",
			type: "bullets",
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			769: {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			991: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
			1441: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
		},
	});
}

function aboutSliders() {

	const sliders = document.querySelectorAll(".about__slider");
	// const sliderTabs = 
	const hallsSlider = document.querySelector(".about__halls_slider");

	if (!sliders.length) return;

	const aboutHallsSlider = new Swiper(hallsSlider, {
		effect: "fade",
		allowTouchMove: false,
		speed: 1000,
		autoHeight: true,
		pagination: {
			el: ".about__sliders_control .dropdown-slider__tabs",
			type: "bullets",
			clickable: true,
			bulletClass: "btn_tab",
			bulletActiveClass: "active",
			renderBullet: function (current, total) {

				const slide = Array.from(hallsSlider.querySelectorAll(".about__sliders_tab"))[current];
				return `<span class="btn btn_tab  dropdown-slider__item ${total} ${slide.classList.contains("swiper-slide-active") ? "active" : ""
					}"><span class="value">${Array.from(hallsSlider.querySelectorAll(".about__sliders_tab"))[current].dataset.name}</span></span>`;
			},
		},
		on: {
			init: function () {
				const pagin = $(".about__sliders_control .dropdown-slider__tabs");
				const paginBg = $(pagin).find(".before");

				const activeTab = $(pagin).find(".active");

				$(pagin).closest(".dropdown-slider").find(".dropdown-slider__value .value").text($(activeTab).text());
				$(".about__sliders_control .dropdown-slider__tabs").append(`<div class="before"></div>`);
				$(".about__sliders_control .dropdown-slider__tabs .before").width($(".about__sliders_control .dropdown-slider__tabs .active").innerWidth());
			},
		},
	});

	aboutHallsSlider.on("slideChange", function (slider) {
		const activeSlide = $(slider.slides)[slider.activeIndex];
		const pagin = $(".about__sliders_control .dropdown-slider__tabs");
		const paginBg = $(pagin).find(".before");

		const activeTab = $(pagin).find(".active");

		$(paginBg).css({ width: $(activeTab).innerWidth(), left: $(activeTab).position().left + "px" });
		$(pagin).closest(".dropdown-slider").find(".dropdown-slider__value .value").text($(activeTab).text());

		console.log($(activeTab).position());

		// descSlider.slideTo(slider.activeIndex);
		// smallSlider.slideTo(!!(slider.slides.length > slider.activeIndex + 1) ? slider.activeIndex + 1 : 0);
	});

	$(window).resize(function () {
		const pagin = $(".about__sliders_control .dropdown-slider__tabs");
		const paginBg = $(pagin).find(".before");

		const activeTab = $(pagin).find(".active");

		$(paginBg).css({ width: $(activeTab).innerWidth(), left: $(activeTab).position().left + "px" });
	});

	for (let slider of sliders) {
		const sliderCont = slider.closest(".about__sliders_tab");

		const aboutSlider = new Swiper(slider,
			{
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 4,
				speed: 1000,
				// autoHeight: true,
				navigation: {
					prevEl: sliderCont.querySelector(".description__slider_control .swiper-prev-btn"),
					nextEl: sliderCont.querySelector(".description__slider_control .swiper-next-btn"),
				},
				breakpoints: {
					320: {
						slidesPerView: 1,
						slidesPerGroup: 1,
						spaceBetween: 4,
					},
					576: {
						slidesPerView: 2,
						slidesPerGroup: 1,
						spaceBetween: 4,
					},
					767: {
						slidesPerView: 3,
						slidesPerGroup: 1,
						spaceBetween: 4,
					},
					991: {
						slidesPerView: 3,
						slidesPerGroup: 1,
						spaceBetween: 16,
					},
					1440: {
						slidesPerView: 4,
						slidesPerGroup: 1,
						spaceBetween: 25,
					},
				},
			})
		let tabs = 0;
		$(sliderCont).find(".description__slider_tabs .dropdown__item").on("click", function () {

			const before = $(this).closest(".description__slider_tabs").find(".before");

			if ($(this).hasClass("active")) return;

			tabs = $(this).data("tabs");

			$(sliderCont).find(".description__slider_tabs .dropdown__item").removeClass("active");

			$(this).addClass("active");

			$(before).css({ left: $(this).position().left + "px" });

			if (tabs === 1) {
				$(slider).find(".swiper-wrapper").css({ "align-items": "flex-start" });
			} else {
				$(slider).find(".swiper-wrapper").css({ "align-items": "flex-end" });
			}

			aboutSlider.params.slidesPerView = tabs;
			aboutSlider.params.autoHeight = true;
			// aboutSlider.params.height = 700;

			aboutSlider.params.breakpoints = {
				320: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 4,
				},
				576: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 4,
				},
				767: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 4,
				},
				991: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 16,
				},
				1440: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 25,
				},
			}

			aboutSlider.update();
			aboutSlider.updateSize();
			aboutHallsSlider.update();


		});
		// aboutSlider.on("slideChange", function () {


		// 	if (tabs === 1) {
		// 		console.log(111)
		// 		aboutSlider.update();
		// 		aboutHallsSlider.update();
		// 	}

		// })
	}
}

function partnersSliders() {

	const sliders = document.querySelectorAll(".partners__slider");
	// const sliderTabs = 
	const hallsSlider = document.querySelector(".partners__halls_slider");

	// if (!sliders.length) return;

	const aboutHallsSlider = new Swiper(hallsSlider, {
		effect: "fade",
		allowTouchMove: false,
		speed: 1000,
		// autoHeight: true,
		pagination: {
			el: ".about__sliders_control .dropdown-slider__tabs",
			type: "bullets",
			clickable: true,
			bulletClass: "btn_tab",
			bulletActiveClass: "active",
			renderBullet: function (current, total) {

				const slide = Array.from(hallsSlider.querySelectorAll(".about__sliders_tab"))[current];
				return `<span class="btn btn_tab  dropdown-slider__item ${total} ${slide.classList.contains("swiper-slide-active") ? "active" : ""
					}"><span class="value">${Array.from(hallsSlider.querySelectorAll(".about__sliders_tab"))[current].dataset.name}</span></span>`;
			},
		},
		on: {
			init: function () {
				const pagin = $(".about__sliders_control .dropdown-slider__tabs");
				const paginBg = $(pagin).find(".before");

				const activeTab = $(pagin).find(".active");

				$(pagin).closest(".dropdown-slider").find(".dropdown-slider__value .value").text($(activeTab).text());
				$(".about__sliders_control .dropdown-slider__tabs").append(`<div class="before"></div>`);
				$(".about__sliders_control .dropdown-slider__tabs .before").width($(".about__sliders_control .dropdown-slider__tabs .active").innerWidth());
			},
		},
	});

	aboutHallsSlider.on("slideChange", function (slider) {
		const activeSlide = $(slider.slides)[slider.activeIndex];
		const pagin = $(".about__sliders_control .dropdown-slider__tabs");
		const paginBg = $(pagin).find(".before");

		const activeTab = $(pagin).find(".active");

		$(paginBg).css({ width: $(activeTab).innerWidth(), left: $(activeTab).position().left + "px" });
		$(pagin).closest(".dropdown-slider").find(".dropdown-slider__value .value").text($(activeTab).text());

		console.log($(activeTab).position());

		// descSlider.slideTo(slider.activeIndex);
		// smallSlider.slideTo(!!(slider.slides.length > slider.activeIndex + 1) ? slider.activeIndex + 1 : 0);
	});

	$(window).resize(function () {
		const pagin = $(".about__sliders_control .dropdown-slider__tabs");
		const paginBg = $(pagin).find(".before");

		const activeTab = $(pagin).find(".active");

		$(paginBg).css({ width: $(activeTab).innerWidth(), left: $(activeTab).position().left + "px" });
	});

	// for (let slider of sliders) {
	// 	const sliderCont = slider.closest(".partners__sliders_tab");

	// 	const aboutSlider = new Swiper(slider,
	// 		{
	// 			slidesPerView: 1,
	// 			slidesPerGroup: 1,
	// 			spaceBetween: 4,
	// 			speed: 1000,
	// 			// autoHeight: true,
	// 			breakpoints: {
	// 				576: {
	// 					slidesPerView: 3,
	// 					spaceBetween: 4,
	// 				},
	// 				769: {
	// 					slidesPerView: 2,
	// 					spaceBetween: 8,
	// 				},
	// 				991: {
	// 					slidesPerView: 3,
	// 					spaceBetween: 12,
	// 				},
	// 				1200: {
	// 					slidesPerView: 3,
	// 					spaceBetween: 24,
	// 				},
	// 				1441: {
	// 					slidesPerView: 3,
	// 					spaceBetween: 32,
	// 				},
	// 			},
	// 		})
	// 	let tabs = 0;
	// 	$(sliderCont).find(".description__slider_tabs .dropdown__item").on("click", function () {

	// 		const before = $(this).closest(".description__slider_tabs").find(".before");

	// 		if ($(this).hasClass("active")) return;

	// 		tabs = $(this).data("tabs");

	// 		$(sliderCont).find(".description__slider_tabs .dropdown__item").removeClass("active");

	// 		$(this).addClass("active");

	// 		$(before).css({ left: $(this).position().left + "px" });

	// 		// if (tabs === 1) {
	// 		// 	$(slider).find(".swiper-wrapper").css({ "align-items": "flex-start" });
	// 		// } else {
	// 		// 	$(slider).find(".swiper-wrapper").css({ "align-items": "flex-end" });
	// 		// }

	// 		aboutSlider.params.slidesPerView = tabs;
	// 		// aboutSlider.params.autoHeight = true;
	// 		// aboutSlider.params.height = 700;

	// 		aboutSlider.params.breakpoints = {
	// 			breakpoints: {
	// 				576: {
	// 					slidesPerView: 3,
	// 					spaceBetween: 4,
	// 				},
	// 				769: {
	// 					slidesPerView: 2,
	// 					spaceBetween: 8,
	// 				},
	// 				991: {
	// 					slidesPerView: 3,
	// 					spaceBetween: 12,
	// 				},
	// 				1200: {
	// 					slidesPerView: 3,
	// 					spaceBetween: 24,
	// 				},
	// 				1441: {
	// 					slidesPerView: 3,
	// 					spaceBetween: 32,
	// 				},
	// 			},
	// 		}

	// 		aboutSlider.update();
	// 		aboutSlider.updateSize();
	// 		aboutHallsSlider.update();


	// 	});
	// 	// aboutSlider.on("slideChange", function () {


	// 	// 	if (tabs === 1) {
	// 	// 		console.log(111)
	// 	// 		aboutSlider.update();
	// 	// 		aboutHallsSlider.update();
	// 	// 	}

	// 	// })
	// }
}
