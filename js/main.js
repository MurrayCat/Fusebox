jQuery(document).ready(function($){
	//toggle 3d navigation
	$('.cd-3d-nav-trigger').on('click', function(){
		toggle3dBlock(!$('.cd-header').hasClass('nav-is-visible'));
	});

	//select a new item from the 3d navigation
	$('.cd-3d-nav a').on('click', function(){
		var selected = $(this);
		selected.parent('li').addClass('cd-selected').siblings('li').removeClass('cd-selected');
		updateSelectedNav('close');
	});

	$(window).on('resize', function(){
		window.requestAnimationFrame(updateSelectedNav);
	});

	function toggle3dBlock(addOrRemove) {
		if(typeof(addOrRemove)==='undefined') addOrRemove = true;
		$('.cd-header').toggleClass('nav-is-visible', addOrRemove);
		$('main').toggleClass('nav-is-visible', addOrRemove);
		$('.cd-3d-nav-container').toggleClass('nav-is-visible', addOrRemove);
	}

	//this function update the .cd-marker position
	function updateSelectedNav(type) {
		var selectedItem = $('.cd-selected'),
			selectedItemPosition = selectedItem.index() + 1,
			leftPosition = selectedItem.offset().left,
			backgroundColor = selectedItem.data('color');

		$('.cd-marker').removeClassPrefix('color').addClass('color-'+ selectedItemPosition).css({
			'left': leftPosition,
		});
		if( type == 'close') {
			$('.cd-marker').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				toggle3dBlock(false);
			});
		}
	}

	$.fn.removeClassPrefix = function(prefix) {
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};
	//Illustration by http://psdblast.com/flat-color-abstract-city-background-psd
	$(window).on('mousemove', function(e) {
	        var w = $(window).width();
	        var h = $(window).height();
	        var offsetX = 0.5 - e.pageX / w;
	        var offsetY = 0.5 - e.pageY / h;

	        $(".parallax").each(function(i, el) {
	            var offset = parseInt($(el).data('offset'));
	            var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px)";

	            $(el).css({
	                '-webkit-transform': translate,
	                'transform': translate,
	                'moz-transform': translate
	            });
	        });
	    });
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);
			var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
			var material = new THREE.MeshBasicMaterial({color: 0x438fda , wireframe: true});
			var cube = new THREE.Mesh(geometry, material);
			var speed = float = 1.0; //how fast the object should rotate
			scene.add(cube);
			camera.position.z = 1900;
			function render() {
				requestAnimationFrame(render);

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
				//cube.transform.Rotate(Vector3(Input.GetAxis("Mouse Y"), Input.GetAxis("Mouse X"), 0) * Time.deltaTime * speed);
				renderer.render(scene, camera);
			};

			render();
		

});
