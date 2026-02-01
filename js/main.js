document.addEventListener('DOMContentLoaded', function () {
	// Toggle foldable lists in sidenav
	document.querySelectorAll('.foldable .toggle').forEach(function (toggle) {
		toggle.addEventListener('click', function (ev) {
			ev.preventDefault();
			var foldable = this.closest('.foldable');
			foldable.classList.toggle('collapsed');
		});
	});

	// Toggle dropdowns on click (helps touch devices)
	document.querySelectorAll('.dropdown > a').forEach(function (toggle) {
		toggle.addEventListener('click', function (ev) {
			ev.preventDefault();
			var li = this.parentElement;
			// close other open dropdowns
			document.querySelectorAll('.dropdown.open').forEach(function (openLi) {
				if (openLi !== li) openLi.classList.remove('open');
			});
			li.classList.toggle('open');
		});
	});

	// Close dropdowns when clicking outside
	document.addEventListener('click', function (ev) {
		if (!ev.target.closest('.dropdown')) {
			document.querySelectorAll('.dropdown.open').forEach(function (openLi) {
				openLi.classList.remove('open');
			});
		}
	});
});
