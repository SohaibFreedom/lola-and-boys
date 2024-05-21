var load_more = $('#load-more');
var load_more_sppiner = $('.load-more-sppiner');
load_more_sppiner.hide();

$('.sort_by').change(function (){
  load_more.show();
});

function LoadMoreProduct (){
  
  var product_on_page = $('.product-on-page');
  var next_url = $('.product-on-page').attr('data-next-url');
	$.ajax(
		{
			url:next_url,
			type:'GET',
			dataType:'html',
			beforeSend: function(){
				load_more.hide();
                load_more_sppiner.show();
			}

		}
	).done(function(next_page){
		var new_product = $(next_page).find('.product-on-page');
      	product_on_page.append(new_product.html());
		var new_url = new_product.data('next-url');
// 			next_url = new_url;
      	load_more_sppiner.hide();
      	console.log(next_url);
        console.log(new_url);
		if(new_url){          
      		$('.product-on-page').attr('data-next-url',new_url)
			load_more.show();          	
        }		
	})
}
