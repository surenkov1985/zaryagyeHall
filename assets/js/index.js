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