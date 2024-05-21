var productInfoAnchors = document.querySelectorAll("#productInfoAnchor");

var productModal;

// if( document.getElementById('productInfoModal') != null ) {
//     productModal = new bootstrap.Modal(document.getElementById('productInfoModal'), {});
// }

if(productInfoAnchors.length > 0) {
    productInfoAnchors.forEach(item => {
        item.addEventListener("click", event => {
            
            var url = '/products/' + item.getAttribute('product-handle') + '.js';

            fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log(data);

//                 document.getElementById("productInfoImg").src = data.images[0];
                document.getElementById("productInfoTitle").innerHTML = data.title;
                document.getElementById("productInfoPrice").innerHTML = item.getAttribute('product-price');
//                 document.getElementById("productInfoDescription").innerHTML = data.description;

                var variants = data.variants;
                var variantSelect = document.getElementById("modalItemID");
                var defaultValue = document.getElementById("defaultvariant");
                var productID = document.getElementById("ProductId").value = data.id;

                variantSelect.innerHTML = '';
              	defaultValue.innerHTML = ''
                

                  variants.forEach(function( variant, index) {
                      console.log(variant);
                      if(variants.length > 1){
                      	variantSelect.options[variantSelect.options.length] = new Option(variant.option1, variant.id);
                        document.getElementById("defaultvariant").setAttribute("name", "test");
                      }
                    else{
                      	document.getElementById("defaultvariant").value = variant.id;                        
                        document.getElementById("modalItemID").setAttribute("id", "test");                        
                        document.getElementById("defaultvariant").setAttribute("id", "modalItemID");
                        console.log(variant.id);
                      }
                  });
                

//                 productModal.show();
            });

            
        });
    });
}

// var modalAddToCartForm = document.querySelector("#addToCartForm");

// if( modalAddToCartForm != null ) {
//     modalAddToCartForm.addEventListener("submit", function(e) {
//         e.preventDefault();
    
//         let formData = {
//             'items': [
//                 {
//                     'id': document.getElementById("modalItemID").value,
//                 }
//             ]
//         };
    
//         fetch('/cart/add', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//         .then((resp) => {
//            jQuery(".remodal button").trigger('click');
  
//           jQuery('.cart_container .cart_content').css('display','block');
//             return resp.json();
//         })
//         .then((data) => {
//             update_cart();
          
        
//         })
// //         .catch((err) => {
// //             console.error('Error: ' + err);
// //         })
//     });
// }
