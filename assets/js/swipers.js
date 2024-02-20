function fsSliders() {
	const imgSlider = document.querySelector(".fs__images_slider");

	if (!imgSlider) return;

	const imagesSlider = new Swiper(imgSlider, {
		speed: 1000,
		navigation: {
			prevEl: ".fs__content_slider .swiper-prev-btn",
			nextEl: ".fs__content_slider .swiper-next-btn"
		}
	})

	const activeSlide = $(imagesSlider.slides)[imagesSlider.activeIndex];
		

	if (!!$(activeSlide).find("img").length) {
		if (!$(".head").hasClass("head_light")) {

			$(".head").addClass("head_light");
			$(".fs__content_slider").addClass("light");
		}
	} else {

		$(".head").removeClass("head_light");
		$(".fs__content_slider").removeClass("light");
	};

	imagesSlider.on("slideChange", function(slider){
		
		const activeSlide = $(slider.slides)[slider.activeIndex];
		

		if (!!$(activeSlide).find("img").length) {
			if (!$(".head").hasClass("head_light")) {

				$(".head").addClass("head_light");
				$(".fs__content_slider").addClass("light");
			}
		} else {

			$(".head").removeClass("head_light");
			$(".fs__content_slider").removeClass("light")
		}
	});

	const contentSlider = new Swiper(".fs__content_slider", {
		speed: 1000,
		navigation: {
			prevEl: ".fs__content_slider .swiper-prev-btn",
			nextEl: ".fs__content_slider .swiper-next-btn"
		}
	})

	contentSlider.on("slideChange", function(slider) {

		const activeSlide = slider.activeIndex;
		
		imagesSlider.slideTo(activeSlide)
	})
}