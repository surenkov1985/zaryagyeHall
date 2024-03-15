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

				return `<span class="btn btn_tab dropdown__item ${total} ${slide.classList.contains("swiper-slide-active") ? "active" : ""}"><span class="value">${Array.from(hallSlider.querySelectorAll(".swiper-slide"))[current].dataset.name
					}</span></span>`;
			},

		},
		on: {
			init: function () {
				const pagin = $(".halls__slider_images .pagination_tabs");
				const paginBg = $(pagin).find(".before");

				const activeTab = $(pagin).find(".active");

				$(pagin).closest(".dropdown").find(".dropdown__value .value").text($(activeTab).text())
				$(".halls__slider_images .pagination_tabs").append(`<div class="before"></div>`);
				$(".halls__slider_images .pagination_tabs .before").width($(".halls__slider_images .pagination_tabs .active").innerWidth())
			}
		}
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

		$(paginBg).css({ "width": $(activeTab).innerWidth(), "left": $(activeTab).position().left + "px" })
		$(pagin).closest(".dropdown").find(".dropdown__value .value").text($(activeTab).text())

		console.log($(activeTab).position())

		descSlider.slideTo(slider.activeIndex);
		smallSlider.slideTo(!!(slider.slides.length > slider.activeIndex + 1) ? slider.activeIndex + 1 : 0);
	});

	$(window).resize(function () {
		const pagin = $(".halls__slider_images .pagination_tabs");
		const paginBg = $(pagin).find(".before");

		const activeTab = $(pagin).find(".active");

		$(paginBg).css({ "width": $(activeTab).innerWidth(), "left": $(activeTab).position().left + "px" })
	})
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
			el: ".news__content .swiper-pagination",
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
		if (slider.activeIndex == 1) {
			$(".location__path_icon").css({ left: `${pos}px`, right: 0 });
			$(".location__slides_btn.first").css({ visibility: "hidden", opacity: 0 });
		} else {
			$(".location__path_icon").css({ left: 0, right: `${pos}px` });
			$(".location__slides_btn.first").css({ visibility: "visible", opacity: 1 });
		}
	});
}

function calendarSliders() {

	const months = document.querySelector(".calendar__months_slider");
	const calendar = document.querySelector(".calendar__dates_slider");

	if (!months || !calendar) return;

	const monthsSlider = new Swiper(months, {
		speed: 1000,
		navigation: {
			prevEl: ".calendar__months .swiper_prev",
			nextEl: ".calendar__months .swiper_next"
		}
	})
}

function eventSlider() {

	const eventPicture = document.querySelector(".fs__picture_slider");

	if (!eventPicture) return;

	const slider = new Swiper(eventPicture, {
		speed: 1000,
		navigation: {
			prevEl: ".fs__picture_slider .swiper-prev-btn",
			nextEl: ".fs__picture_slider .swiper-next-btn"
		},
		pagination: {
			el: ".fs__picture .swiper-pagination",
			type: "bullets",
		}
	})
}

function personSliders() {

	const persons = document.querySelectorAll(".event__person_slider");

	if (!persons.length) return;

	for (let person of persons) {

		const personCont = person.closest(".event__person_slider-cont")


		const slider = new Swiper(person, {
			speed: 1000,
			navigation: {
				prevEl: personCont.querySelector(".swiper-prev-btn"),
				nextEl: personCont.querySelector(".swiper-next-btn"),
			},
			pagination: {
				el: personCont.querySelector(".swiper-pagination"),
				type: "bullets",
			}
		})

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
			nextEl: ".festival__slider .swiper-next-btn"
		},
		pagination: {
			el: ".festival .swiper-pagination",
			type: "bullets",
		}
	})
}
