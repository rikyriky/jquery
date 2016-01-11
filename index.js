$(function () {
	var template='<article class="tv-show">'+
					'<div class="left img-container">'+
						'<img src=:img: alt="img alt">'+
					'</div>'+
					'<div class="right info">'+
						'<h1>:name:</h1>'+
						'<p>:summary:</p>'+
					'</div>'+
				'</article>';

	$('#app-body')
	.find('form')
	.submit(function (ev) {
		ev.preventDefault(); 
		var busqueda = $(this)
		.find('input[type="text"]')
		.val();

		$.ajax({
			url: 'http://api.tvmaze.com/search/shows?q='+busqueda,
			success: function(data, textStatus, xhr){
				console.log(data);
				var blayblay;
				var container=$('#app-body').find('.tv-shows');
				container.find('article').remove();
				data.forEach(function(tv){
					blayblay = template
						.replace(':name:', tv.show.name)
						.replace(':img:', tv.show.image.medium)
						.replace(':summary:', tv.show.summary)
						.replace(':img alt:', tv.show.name +'Logo');
					container.append(blayblay);
					
				})
			}
		})
	})
	
	$.ajax({
		url: 'http://api.tvmaze.com/shows',
		success: function(data, textStatus, xhr){
			var blayblay;
			var container=$('#app-body').find('.tv-shows');
			data.forEach(function(show){
				blayblay = template
					.replace(':name:', show.name)
					.replace(':img:', show.image.medium)
					.replace(':summary:', show.summary)
					.replace(':img alt:', show.name +'Logo');
				container.append(blayblay);
				
			})
		}
	})

})
