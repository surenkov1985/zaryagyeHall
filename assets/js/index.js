document.addEventListener("DOMContentLoaded", function(){
	
	fsSliders();
	hallsSliders();
	newsSlider();
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