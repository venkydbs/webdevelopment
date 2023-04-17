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
        $(".navLinks>li>a:contains('Home')").parent().click();
        dynamichtml = "";
        medicineitems = [];
        medicineitems = JSON.parse(localStorage.getItem("json"));
        GetProductHtml(medicineitems);
    }

    else {
        medicineitems = [];
        $.each(JSON.parse(localStorage.getItem("json")), function (i, v) {
            if (v.name.toLowerCase().indexOf($("#productsearch").val().toLowerCase()) != -1) {
                medicineitems.push(v);
            }
        });
        //console.log(medicineitems);
        GetProductHtml(medicineitems);
    }

    //added code to set card width, if search displays one result
    if($(".cards_item").length==1)
    {
        $('.cards_item').css("width","65%");
    }
});





/**************************************** products card creation ******************************************/

localStorage.setItem("json", JSON.stringify(medicineitems));
dynamichtml = "";
medicineitems = [];
medicineitems = JSON.parse(localStorage.getItem("json"));
GetProductHtml(medicineitems);

category = "";
category = getUrlParameter("cat");
if (category != "") {
    $(".navLinks>li>a:contains('" + category + "')").parent().click();
}

if($('.navLinks>li').hasClass('active'))
{
    if ($('.navLinks>li.active')[0].textContent.trim() != "Home") {
        medicineitems = [];
        medicineitems = JSON.parse(localStorage.getItem("json"));
    
        medicineitems = medicineitems.filter(function (i) {
            return i.category == $('.navLinks>li.active')[0].textContent.trim();
        });
        //console.log(medicineitems);
        GetProductHtml(medicineitems);
    }
}



else {
    medicineitems = [];
    medicineitems = JSON.parse(localStorage.getItem("json"));
    GetProductHtml(medicineitems);
}


/**************************************** document.ready function ******************************************/

$(document).ready(function () {

    $('.navLinks>li').on('click', function () {
        $('li').removeClass('active');
        $(this).toggleClass('active');
    });

    category = "";
    category = getUrlParameter("cat");

    if (category != "") {
        $(".navLinks>li>a:contains('" + category + "')").parent().click();
    }

    if($('.navLinks>li').hasClass('active'))
    {
        if ($('.navLinks>li.active')[0].textContent.trim() != "Home") {
            medicineitems = [];
            medicineitems = JSON.parse(localStorage.getItem("json"));
    
            medicineitems = medicineitems.filter(function (i) {
                return i.category == $('.navLinks>li.active')[0].textContent.trim();
            });
            GetProductHtml(medicineitems);
        }
    }

    else {
        medicineitems = [];
        medicineitems = JSON.parse(localStorage.getItem("json"));
        GetProductHtml(medicineitems);
    }


    $(".cartmsg").hide();
    //cartqstring = "";
    cartvalue=[];
    cartval=[];
    $("#cart").hide();
    $(".modal").hide();
    medicineitems = JSON.parse(localStorage.getItem("json"));
    cartitemshtml = "";
    final_rating = 0;
    actual_rating = 0;
    cartitemexists=false;
    /*updated cart reference from local storage*/
    if(localStorage.getItem("cartitems")) {
      product_name = "";
      product_price = "";
      totalprice = 0;  
      cartval =  JSON.parse(localStorage.getItem("cartitems"));
      $("#cartcount").text(cartval.length);

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

      /*cart reference from querystring*/
      //var qs = document.location.href.split('?checkout=true')[1];        
      /*var qs = localStorage.getItem("cartitems");
      var parts = qs.split('&');
      var arr = [];
      itemslist = [];
      qtylist = [];
      product_name = "";
      product_price = "";
      totalprice = 0;        

      $.each(parts, function () {
        var val = this.split('=')[1];
        arr.push(val);
      }); //console.log(arr)

      for (var i = 0; i < arr.slice(1).length; i++) {
        itemslist.push(arr.slice(1)[i].split(':')[0]);
        qtylist.push(arr.slice(1)[i].split(':')[1]);
      }

      $("#cartcount").text(itemslist.length);

      for (var i = 0; i < itemslist.length; i++) {
        product_name = medicineitems.filter(function (data) {
          return data.id == String(itemslist[i]);
        })[0].name;

        product_price = medicineitems.filter(function (data) {
          return data.id == String(itemslist[i]);
        })[0].price;

        cartitemshtml += "<br/><div><span><img style='height:15px;width:15px' src='./Media/bin.png'></img></span><a id='productlink' href='#'>" + product_name + " (" + qtylist[i] + ")</a> <span class='price'> € " + parseInt(qtylist[i]) * parseInt(product_price.split('€')[1].trim()) + "</span></div><br/>";
        totalprice += parseInt(qtylist[i]) * parseInt(product_price.split('€')[1].trim());
      }

      $("#cartitems").append(cartitemshtml);
      $('.totalprice').html("<b>Total: € "+totalprice+"</b>");*/
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


  function MovetoCart() {
    if(localStorage.getItem("cartitems")) {
      cartvalue = localStorage.getItem("cartitems");
      cartvalue.push(product_data[0].id + ":1"); 
            
    }

    else {
      cartvalue=[];
      cartvalue[0]=product_data[0].id + "-1";
      
    }

    localStorage.setItem("cartitems", JSON.stringify(cartvalue));
    document.location.href = "./product?checkout=true";
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


/*************************** function to generate html for product details page ********************************/

function GetProductDetailHtml(jsonarray) {
    $("#cart").hide();
    $("#productdetail").show();
    medialist = "";
    featurelist = "";
    productimg = "";
    categorylinkhtml = "";
    UserRating="";
    userRatingHtml="";

    product_data = medicineitems.filter(function (i) {
        return i.id == String(getUrlParameter('id'));
    });


        medialist = " <img src='" + product_data[0].productimage + "'></img>";
 
        productimg = "<li > <div ></div>  <div class='product-colors'>" + medialist + "</div> </li>";
   
        productimg += "<li class='product_card_desc'> <div style='display:flex;flex-direction:column;'><b><span>" + product_data[0].name + "</span></b><br/> </span> <br/> <b><span style='color:brown'>" + product_data[0].price + "<br/><div style='float:left'> <div style='align-items:center'></div> <br/><button id='product_add_to_cart' onclick='MovetoCart()' class='btn card_btn btn-grad'>Move to Cart</button> </div> </span></b></div></li> ";
        

   
    $("#product-card").append(productimg);
    //$("#product_name").text(product_data[0].name);
    $(".product-pic").css("background-image", "url('" + product_data[0].productimage + "')");
    $(".product-pic").css("background-repeat", "no-repeat");
    $(".product-pic").css("background-position", "left center");

    for (var i = 0; i < product_data[0].stockcount; i++) {
        $('#productqty').append('<option value="">' + (i + 1) + '</option>');
    }

    $("#modal h2").html("Reviews & Ratings for "+product_data[0].name + "<a id='Modalclosebtn' href='#'>X</a>");

    for (var i = 0; i < product_data[0].reviews.length; i++) {
    if(product_data[0].reviews[i].rating==5)
    {
        UserRating="★★★★★";
    }

    if(product_data[0].reviews[i].rating==4)
    {
        UserRating="★★★★";
    }

    if(product_data[0].reviews[i].rating==3)
    {
        UserRating="★★★";
    }

    if(product_data[0].reviews[i].rating==2)
    {
        UserRating="★★";
    }

    if(product_data[0].reviews[i].rating==1)
    {
        UserRating="★";
    }
    

    userRatingHtml +="<br/> <span style='color:orange'>"+UserRating+"</span> by "+product_data[0].reviews[i].person+" : "+product_data[0].reviews[i].comment+"<br/>";
    
    }

    $(".copy span").append(userRatingHtml);
}

/********************** function to generate html for products on landing page ***************************/

function GetProductHtml(jsonarray) {
    $("#productcatalog").html("");
    dynamichtml = "";
    $.each(jsonarray, function () {
        ratinghtml = "";
       

        dynamichtml += "<li class='cards_item'><div class='card'><a href='/product?id=" + this.id + "'><div class='card_image'><img src='" + this.productimage + "'></div></a><div class='card_content'><h1 class='card_title'>" + this.name + "</h1> <div class='card_price'> <span> Price: " + this.price + "</span></div><br/><button onclick='Navigateproductdetails(" + this.id + ")'' id='view_product_detail' class='btn card_btn btn-grad'>More</button> </div></div></li>";

    });
    $("#productcatalog").append(dynamichtml);
}


/******************************* function to get query string values ***********************************/

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

/********************* function to show navigation menu icon for mobile devices ************************/

function ToggleMenu() {
    $(".navLinks")[0].classList.toggle("responsive");
}

/*********************************** function to navigate to home page *********************************/

function NavigateHome() {
    window.location.href = "/";
}

/**************************** function to navigate to product details page ******************************/

function Navigateproductdetails(itemid) {
    window.location.href = "/product?id=" + itemid;
}

