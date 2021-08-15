let apiKey = 'AIzaSyCILYa1vJegoYheD6FCkDuQhFHhEnx-Flg';

const display_video = function (id) {
	let video_endpoint = 'https://www.googleapis.com/youtube/v3/videos';
	let search_endpoint = 'https://www.googleapis.com/youtube/v3/search';
	$.ajax({
		url:
			video_endpoint +
			'?part=snippet,player&maxWidth=720&key=' +
			apiKey +
			'&id=' +
			id,
		contentType: 'application/json',
		dataType: 'json',
		success: function (result2) {
			console.log(result2);
			$('#videoplayer').html(result2['items'][0]['player']['embedHtml']);
			$('#viddesc').html(result2['items'][0]['snippet']['description']);
			$('#vidtitle').html(result2['items'][0]['snippet']['title']);

			$.ajax({
				url:
					search_endpoint +
					'?part=snippet&type=video&key=' +
					apiKey +
					'&relatedVideoId=' +
					id,
				contentType: 'application/json',
				dataType: 'json',
				success: function (result3) {
					console.log(result3);
					$('#suggestions').empty();
					for (var i = 0; i <= 4; i++) {
						let recom = "<div id='suggestion" + i + "'>";

						recom +=
							"<h4 id='suggestitle'>" +
							result3['items'][i]['snippet']['channelTitle'] +
							'</h4>';

						let zero = '"';
						let one = "<img id='suggestthumbnail' src='";
						let two =
							result3['items'][i]['snippet']['thumbnails'][
								'high'
							]['url'];
						let three = "'";
						let four = '>';
						recom += one + two + three + two + zero + four;
						$('#suggestions').append(recom);
					}
				},
			});
		},
	});
};

const search_function = function () {
	let endpoint = 'https://www.googleapis.com/youtube/v3/search';
	console.log('test');

	$.ajax({
		url:
			endpoint +
			'?part=snippet&key=' +
			apiKey +
			'&q=' +
			$('#searchb').val(),
		contentType: 'application/json',
		dataType: 'json',
		success: function (result) {
			console.log(result);
			$('#results').empty();

			for (var i = 0; i <= 4; i++) {
				let container =
					"<div class='card card2' style='max-width: 540px;'> <div class='row g-0 results' id='result" +
					i +
					"'>";

				container +=
					"<h4 style='padding:20px' class='col-md-6' id='title'>" +
					result['items'][i]['snippet']['channelTitle'] +
					'</h4>';

				let zero = '"';
				let one = "<img class='col-md-6' id='sideimg' src='";
				let two =
					result['items'][i]['snippet']['thumbnails']['default'][
						'url'
					];
				let three = "'";
				let four = '>';
				container += one + two + three + two + zero + four;
				$('#results').append(container);

				if (i == 0) {
					let id = result['items'][i]['id']['videoId'];
					display_video(id);
				}

				$('#result' + i).click(function () {
					var x = $(this).attr('id').substr(6);
					let id = result['items'][x]['id']['videoId'];
					display_video(id);
				});
			}
		},
	});
};

$(document).ready(function () {
	search_function();
	$('#searchbutton').click(search_function);
});

$(function () {
	$('form').submit(function () {
		search_function();
		$('#searchbutton').click(search_function);
		return false;
	});
});

$('#searchb').keyup(function (event) {
	if (event.keyCode === 13) {
		search_function();
		$('#searchbutton').click(search_function);
	}
});
