async function loadScript(src, func = false) {
	const script = document.createElement('script');
	script.src = src;
	document.body.append(script);
	if (func) script.onload = () => func();
}

function setMap() {
	try {
		ymaps.ready(() => {
			for (let mapContainer of document.querySelectorAll(".map")) {
				let id = mapContainer.getAttribute("id"),
					data = mapContainer.dataset,
					mapCoord = JSON.parse(data.coord),
					mapZoom = data.zoom,
					mapTitle = data.title,
					// mapCoord2 = JSON.parse(data.coord2),
					// mapTitle2 = data.title2,
					mapCenter = ['55.75157862329463', '37.62489788352945'],
					map = new ymaps.Map(id, {
						center: mapCenter,
						zoom: mapZoom,
						controls: ["smallMapDefaultSet"],
					}),
					pin = new ymaps.Placemark(
						mapCoord,
						{
							hintContent: mapTitle,
						},
						{
							iconLayout: "default#image",
							iconImageHref: "/assets/img/placemark.png",
							iconImageSize: [170, 190],
							iconImageOffset: [-90, -120]
						}
					);
				// if (mapCoord2) {
				// 	pin2 = new ymaps.Placemark(
				// 		mapCoord2,
				// 		{
				// 			hintContent: mapTitle2,
				// 		},
				// 		{
				// 			iconLayout: "default#image",
				// 			iconImageHref: "../img/placemark.png",
				// 		}
				// 	);
				// 	map.geoObjects.add(pin2);
				// }

				map.behaviors.disable(["scrollZoom"]);
				map.geoObjects.add(pin);
				setMapCenter();
				function setMapCenter() {
					map.setCenter(mapCenter);

					if (!mapContainer.closest(".contacts")) {
						const centerCoord = map.getGlobalPixelCenter();

						// смещаем центр карты

						if (window.innerWidth > 1200) {
							// centerCoord[0] -= 350;
							centerCoord[1] += 0;
						} else if (window.innerWidth > 991) {
							// centerCoord[0] -= 250;
							centerCoord[1] += 0;
						} else {
							centerCoord[0] -= 0;
							centerCoord[1] += 0;
						}
						map.setGlobalPixelCenter(centerCoord);
					}

				}

				window.addEventListener("resize", setMapCenter);
			}
		});
	} catch (e) {
		console.log("Yandex Map is not initiated");
	}
}