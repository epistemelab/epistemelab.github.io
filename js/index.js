function playRandomWord(prev) {
	var words = ['Transportation', 'Manufacturing', 'Agriculture', 'Healthcare', 'Genomics', 'Government','Science'
		].filter(function(word) {
		return prev == null || word != prev;
	});
	var index = Math.floor(Math.random() * words.length);
	$('.episteme-placeholder').html("");
	$('.episteme-cursor').html("");
	playWord(words[index]);
}

function playCharacter(word, index, max_index) {
	if(index == 0) {
		$('.episteme-cursor').html("_");
	}else{
		substr = word.substring(0, index)
		$('.episteme-placeholder').html(substr);
	}
	index += 1;
	if(index <= word.length) {
		setTimeout(playCharacter.bind(this, word, index, max_index), 100);
	}else if(index < max_index) {
		setTimeout(function() {
			$('.episteme-cursor').toggleClass('on')
			playCharacter(word, index, max_index)
		}, 300);
	}else{
		playRandomWord(word);
	}
}

function playWord(word) {
	setTimeout(playCharacter.bind(this, word, 0, 30), 1000);
}

function signup() {
	var email = $('.form .email').val();
	$.post('/signup', {
		'email': email
	}, function(resp) {
		$('.cta').css('height', '120px');
		$('.cta .form .message').html('Thanks! Welcome to Episteme.');
		$('.cta .form .message').css('transition', 'opacity 500ms');
		$('.cta .form .message').css('opacity', 1);
		$('.form .email').val('');
	});
}
$(function() {
	// play words.
	playRandomWord();
	// use high-resolution image.
	$('<img/>').attr('src', '/img/bg1-original.jpg').load(function() {
		console.log('loaded');
	   // $(this).remove(); // prevent memory leaks as @benweet suggested
	   $('header').toggleClass('highres');  
	});
});

