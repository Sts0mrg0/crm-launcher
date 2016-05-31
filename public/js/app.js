$(document).ready(function(){

	// Media in posts/tweet
	$('.gallery').featherlightGallery();

	$('.more').click(function(){
		var nr = $(this).attr('toggle-nr');
		$('#' + nr).slideToggle();
		scrollToAnchor(this);
		$(this).find('.fa').toggleClass('fa-caret-down').toggleClass('fa-caret-up');
	})

	$('.more-answer').click(function(){
		var nr = $(this).attr('toggle-nr-answer');
		$('#answer' + nr).slideToggle();
		scrollToAnchor(this);
		$(this).find('.fa').toggleClass('fa-caret-down').toggleClass('fa-caret-up');
	})

	$('input[id=twitter]').on('click', function(){
		$('textarea[name=content]').toggleClass('maxed');
		$('.word-count').toggle();

		$('.word-count').removeClass('orange-wordcount');
		$('.word-count').removeClass('red-wordcount');
		$('.submit input').removeAttr('disabled');
	});

	$('.static-parent').on('keyup', '.maxed', function(){

		var length = $(this).val().length;
		$('.word-count').text(length + '/140');

		if (length > 100 && length <= 140) {
			$('.word-count').removeClass('red-wordcount');
			$('.word-count').removeClass('disabled-submit');
			$('.word-count').addClass('orange-wordcount');
			$('.submit input').removeAttr('disabled');
		} else if(length > 140) {
			$('.word-count').removeClass('orange-wordcount');
			$('.word-count').addClass('red-wordcount');
			$('.submit input').attr('disabled', 'disabled');
		} else {
			$('.word-count').removeClass('disabled-submit');
			$('.word-count').removeClass('red-wordcount');
			$('.word-count').removeClass('orange-wordcount');
			$('.submit input').removeAttr('disabled');
		}
	});

	$('.reply').click(function(){
		var trigger = $(this).attr('answerTrigger');
		$('.answer_' + trigger ).slideToggle('fast', function(){
			if($('.screen-name').length > 0) {
				$('textarea.fb.' + trigger).text('@' + $('.screen-name.' + trigger).html());
			}
			$('textarea.' + trigger).focus();
		});

		if($(this).attr('screenName')) {
			$('textarea[name=answer]').val('@' + $(this).attr('screenName') + ' ');
			scrollToAnchor('.word-count');
		}
		$('input[name="in_reply_to"]').attr('value', $(this).attr('replyId'));
	});

	$('.reply_post').click(function(){
		var trigger = $(this).attr('answerTrigger');
		$('.answer_post_' + trigger ).slideToggle('fast', function(){
			$('textarea.' + trigger).focus();
		});
		console.log($(this).attr('replyId'));
		$('input[name="in_reply_to"]').attr('value', $(this).attr('replyId'));
	});

	$('.reply_own').click(function(){
		var trigger = $(this).attr('answerTrigger');
		$('.answer_own_' + trigger ).slideToggle('fast', function(){
			$('textarea.' + trigger).focus();
		});
		$('input[name="in_reply_to"]').attr('value', $(this).attr('replyId'));
	});

	$('.specific_answer').keypress(function (e) {
		if(e.which == 13 && !e.shiftKey){
           e.preventDefault();
		   $(this).parent().submit();
       }
   });

   $('.search-case-bar').keypress(function (e) {
	   if(e.which == 13 && !e.shiftKey){
		  e.preventDefault();
		  $(this).parent().parent().parent().submit();
	  }
  });

	// Responsive menu trigger
	$('.menu-trigger').click(function(){
		$('.menu-overlay').toggle();
		$('.vertical-sidebar').toggleClass('active');
	});

	$('.menu-overlay').click(function(){
		$(this).hide();
		$('.vertical-sidebar').removeClass('active');
	});

	$('.add-summary').click(function(){
		if($('.add-summary-block').is(':visible')){
			$('.add-summary span').text('Add summary');
		}
		else{
			$('.add-summary span').text('Cancel summary');
		}
		$('.add-summary-block').slideToggle();
		 scrollToAnchor('.summary');
	});

	$('.more-summaries').click(function(){
		if($('.hidden-summaries').is(':visible')){
			$('.more-summaries span').text('More summaries');
		}
		else{
			$('.more-summaries span').text('Less summaries');
		}

		$('.hidden-summaries').slideToggle();
		scrollToAnchor('.summary-area');
	});

	$('.new-cases').click(function(){
		$('#new').prop('checked', ! $('#new').prop('checked'));
		submit_form(this);
	});
	$('.open-cases').click(function(){
		$('#open').prop('checked', ! $('#open').prop('checked'));
		submit_form(this);
	});
	$('.closed-cases').click(function(){
		$('#closed').prop('checked', ! $('#closed').prop('checked'));
		submit_form(this);
	});
	$('.my-cases').click(function(){
		$('#mine').prop('checked', ! $('#mine').prop('checked'));
		submit_form(this);
	});

	if ($('#mine').attr('checked') != undefined) {
		$('#new, #open, #closed').attr('disabled', true);
		$('.open-cases, .closed-cases, .new-cases').addClass('disabled');
	}

	$('.user-block').click(function(){
		var id = $(this).attr('userId');
		var checked = $('input.cbUser#' + id).attr('checked');
		$('input.cbUser#' + id).attr('checked', !checked);

		$(this).find('form').submit();
	});

	$('.operator').click(function(){
		var operator = $(this).attr('id');
		var operator_nr = operator.split('_')[1];
		$('.answer[operatorId=' + operator_nr +']').parent().toggleClass('attention');
		$('label[for="' + operator + '"]').toggleClass('checked');
	});

	$('.answer').click(function(){
		var post_date = $(this).parent().find('.answer-post-date');
		var visible;

		if(post_date.css('opacity') == 0) {
			visible = 0;
		} else {
			visible = 1;
		}

		$(this).parent().find('.answer-post-date').animate({'opacity': 1 - visible}, 'fast');
		console.log($(this).find('.answer-post-date'));
	});
});

function countWords() {
	console.log("test");
	console.log($('.maxed').text());
}

// Submit on checkbox change
function submit_form(that) {
	$(that).toggleClass("active");
	$(that).parents("form").submit();
}

// Scroll to given anchor
function scrollToAnchor(anchor){
	var tag = $(anchor);
	$('html,body').animate({scrollTop: tag.offset().top}, 'slow');
}
