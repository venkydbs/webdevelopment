medicineitems =
    [
        {
            "id": "1",
            "name": "Multi Vitamin",
            "productimage": "../static/multivitamin.jpeg",
            "price": "57€"
        },

        {
            "id": "2",
            "name": "Grape Seed",
            "productimage": "../static/grapeseed.jpg",
            "price": "35€"
        },

        {
            "id": "3",
            "name": "Vitamin E Capsules",
            "productimage": "../static/vitamine.jpg",
            "price": "66€"
        },

        {
            "id": "4",
            "name": "Fasting Salt",
            "productimage": "../static/fastsalt.jpg",
            "price": "28€"
        },

        {
            "id": "5",
            "name": "Advanced Fasting Salt",
            "productimage": "../static/advancedfastsalt.jpg",
            "price": "39€"
        },

        {
            "id": "6",
            "name": "Mega Vitamin C",
            "productimage": "../static/vitc.jpg",
            "price": "55€"
        }

    ];



$("#productsearch").keyup(function (event) {
    if ($("#productsearch").val().trim() == "") {
        dynamichtml = "";
        medicineitems = [];
        medicineitems = JSON.parse(localStorage.getItem("json"));
        GetProductHtml(medicineitems);
    }

    else {
        medicineitems = [];
        $.each(JSON.parse(localStorage.getItem("json")), function (i, v) {
            if (v.name.toLowerCase().indexOf($("#productsearch").val().toLowerCase()) != -1 || v.type.toLowerCase().indexOf($("#productsearch").val().toLowerCase()) != -1) {
                medicineitems.push(v);
            }
        });
        GetProductHtml(medicineitems);
    }
    if($(".cards_item").length==1)
    {
        $('.cards_item').css("width","65%");
    }
});

localStorage.setItem("json", JSON.stringify(medicineitems));
dynamichtml = "";
medicineitems = [];
medicineitems = JSON.parse(localStorage.getItem("json"));
GetProductHtml(medicineitems);

$(document).ready(function () {
    type = "";
    type = getUrlParameter("cat"); 
    $(".cartmsg").hide();
    cartvalue=[];
    cartval=[];
    $("#cart").hide();
    $(".modal").hide();
    medicineitems = JSON.parse(localStorage.getItem("json"));
    cartitemshtml = "";
    final_rating = 0;
    actual_rating = 0;
    cartitemexists=false;

    if(localStorage.getItem("cartitems")) {
      product_name = "";
      product_price = "";
      totalprice = 0; 

      for(var i = 0; i < cartval.length; i++){
        product_name = medicineitems.filter(function (data) {
          return data.id == String(cartval[i].split("-")[0]);
        })[0].name;

        product_price = medicineitems.filter(function (data) {
          return data.id == String(cartval[i].split("-")[0]);
        })[0].price;

        cartitemshtml += "<br/><div><span><img style='height:15px;width:15px' src='./Media/bin.png'></img></span><a id='productlink' href='#'>" + product_name + " (" + cartval[i].split("-")[1] + ")</a> <span class='price'> € " + parseInt(product_price.split('€')[0].trim()) + "</span></div><br/>";
        totalprice += parseInt(product_price.split('€')[0].trim());
      }

      $("#cartitems").append(cartitemshtml);
      $('.totalprice').html("<b>Total: € "+totalprice+"</b>");

    }

    else {
      $(".row").hide();
      $(".cartmsg").show();
    }

    if(getUrlParameter("checkout") == "true") {
      $("#cart").show();
      $("#productdetail").hide();
      $('li').removeClass('active');
      $("#modal h2").text("Checkout")
      $(".copy span").text("Items reserved successfully");
    }

    else {
      GetProductDetailHtml();        
    }

});



$(window).on("load", function () {
    SetProductDetailCSS();
    $('li').removeClass('active');
  });


  function AddtoCart(itemid) {
    if(localStorage.getItem("cartitems")==null) {
        cartvalue=[];
        cartvalue[0]=itemid + "-1";
        localStorage.setItem("cartitems", JSON.stringify(cartvalue));
    }

    else {      
      cartvalue = localStorage.getItem("cartitems");
      cartvalue.push(itemid + ":1"); 
      localStorage.setItem("cartitems", JSON.stringify(cartvalue));
    }
  }



function SetProductDetailCSS() {
    $(".product-colors span").click(function () {
        $(".product-colors span").removeClass("active");
        $(this).addClass("active");
        $("body").css("background", $(this).attr("data-color"));
        $(".product-price").css("color", $(this).attr("data-color"));
        $(".product-button").css("color", $(this).attr("data-color"));
        $(".product-pic").css("background-image", $(this).attr("data-pic"));
    });
}



function GetProductDetailHtml(jsonarray) {
    $("#cart").hide();
    $("#productdetail").show();
    medialist = "";
    featurelist = "";
    productimg = "";
    typelinkhtml = "";
    final_rating = 0;
    actual_rating = 0;
    UserRating="";
    userRatingHtml="";

    product_data = medicineitems.filter(function (i) {
        return i.id == String(getUrlParameter('id'));
    });

 

    medialist = "<span data-pic='url(" + product_data[0].productimage + ")' class='active'> <img src='" + product_data[0].productimage + "'></img> </span>";

    for (var i = 0; i < product_data[0].additionalimages.length; i++) {
        medialist += "<span data-pic='url(" + product_data[0].additionalimages[i].image + ")'> <img src='" + product_data[0].additionalimages[i].image + "'></img> </span>";
    }

    productimg = "<li class='product_card_images'> <div style='display:flex;flex-direction:column;'> <div class='product-pic'></div>  <div class='product-colors'>" + medialist + "</div></div></li>";


    if (product_data[0].features.length == 1) {
        productimg += "<li class='product_card_desc'> <div style='display:flex;flex-direction:column;'><b><span>" + product_data[0].description + "</span></b><br/>" + ratinghtml + " </span> <br/> <b><span style='color:brown'>" + product_data[0].price + "<div style='float:left'> <div style='align-items:center'> <label id='lblqty'>Quantity</label> <select id='productqty'></select> </div> <button id='product_add_to_cart' onclick='AddtoCart()' class='btn card_btn btn-grad'>Add to Cart</button> </div> </span></b></div></li> ";
    }

    else {

        for (var i = 0; i < product_data[0].features.length; i++) {
            if (i == 0) {
                productimg += "<li class='product_card_desc'> <div style='display:flex;flex-direction:column;'><b><span>" + product_data[0].description + "</span></b><br/>" + ratinghtml + " </span> <br/> <b><span style='color:brown'>" + product_data[0].price + " <br/> <div style='align-items:center'><label id='lblqty'>Quantity &nbsp;</label> <select id='productqty'> </select> </div> <button id='product_add_to_cart' onclick='AddtoCart()' class='btn card_btn btn-grad'>Add to Cart</button> </span></b> <ul style='padding-left:15px'><br/>";
            }

            if (i != 0 && i == product_data[0].features.length - 1) {
                productimg += "<li><span>" + product_data[0].features[i].feature + "</span></li></ul></div></li>";
            }

            if (i != 0 && i != product_data[0].features.length - 1) {
                productimg += "<li><span>" + product_data[0].features[i].feature + "</span></li>";
            }
        }
    }
    $("#product-card").append(productimg);
    $("#product_name").text(product_data[0].name);
    $(".product-pic").css("background-image", "url('" + product_data[0].productimage + "')");
    $(".product-pic").css("background-repeat", "no-repeat");
    $(".product-pic").css("background-position", "left center");

    for (var i = 0; i < product_data[0].stockcount; i++) {
        $('#productqty').append('<option value="">' + (i + 1) + '</option>');
    }




    $(".copy span").append(userRatingHtml);
}


function GetProductHtml(jsonarray) {
    $("#productcatalog").html("");
    dynamichtml = "";
    $.each(jsonarray, function () {
        ratinghtml = "";
        final_rating = 0;
        actual_rating = 0;

   


        dynamichtml += "<li class='cards_item'><div class='card'><a href='/product?id=" + this.id + "'><div class='card_image'><img src='" + this.productimage + "'></div></a><div class='card_content'><h1 class='card_title'>" + this.name + "</h1> <div class='card_price'> <span> " + this.price + "</span></div><br/> <button onclick='AddtoCart(" + this.id + ")'' id='view_product_detail' class='btn card_btn btn-grad'>Move to Cart</button> </div></div></li>";

    });
    $("#productcatalog").append(dynamichtml);
}



function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};





function GoHome() {
    window.location.href = "/";
}

function Navigateproductdetails(itemid) {
    window.location.href = "/product?id=" + itemid;
}

