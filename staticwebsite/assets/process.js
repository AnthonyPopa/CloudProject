import { uuidv4 } from 'uuid';


const API_URL = "https://2cwfpfmfc3.execute-api.us-east-1.amazonaws.com/dev";

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}


function processAddItem(){
    var email = $("#email").val();
    var title = $("#title").val();
    var url = $("#url").val();
    
    var datadir = {
        id: uuidv4(),
        email: email,
        productTitle: title,
        productUrl: url,
        latestPrice: "TBD"
    };

    console.log(datadir);

    $.ajax({
        url: `${API_URL}/items`,
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        contentType: "application/json",
        success: function(data) {                        
            console.log(data);
            location.href='index.html';            
        },
        error: function() {
            console.log("Failed");
        },        
        data: JSON.stringify(datadir)
    }); 
}

function searchItems(){
    var query = $("#query").val();

    var datadir = {
        query: query
    };

    console.log(datadir);

    $.ajax({
        url: `${API_URL}/search`,
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        contentType: "application/json",
        success: function(data) {                        
            console.log(data);
            sessionStorage.setItem('query', query);
            sessionStorage.setItem('searchdata', JSON.stringify(data));
            location.href='search.html';            
        },
        error: function() {
            console.log("Failed");
        },        
        data: JSON.stringify(datadir)
    }); 
}

function loadSearchPage(){
    var query = sessionStorage.getItem('query');
    var data = JSON.parse(sessionStorage.getItem('searchdata'));
    console.log(data);
    $("#searchquery-container").html("Showing search results for: "+query);
    var htmlstr="";
    $.each(data.body, function(index, value) {
        //console.log(value);
        htmlstr = htmlstr + '<div class=\"cbp-item idea web-design theme-portfolio-item-v2 theme-portfolio-item-xs\"> <div class=\"cbp-caption\"> <div class=\"cbp-caption-defaultWrap theme-portfolio-active-wrap\"> <div class=\"theme-icons-wrap theme-portfolio-lightbox\"> <a class=\"cbp-lightbox\" href=\"'+value.productUrl+'\"> <i class=\"theme-icons theme-icons-white-bg theme-icons-sm radius-3 icon-focus\"></i> </a> </div> </div> </div> <div class=\"theme-portfolio-title-heading\"> <h4 class=\"theme-portfolio-title\"><a href=\"'+value.productUrl+'\">'+value.productTitle+'</a></h4> <span class=\"theme-portfolio-subtitle\">Price: '+value.latestPrice+'</span> </div> </div>';
                });
        //console.log(htmlstr);
        $('#portfolio-4-col-grid-search').html(htmlstr);
        handlePortfolio4ColGridSearch();        
}

function deleteItem(ItemID){
    $.ajax({
        url: `${API_URL}/items/${ItemID}`,
        type: 'DELETE',
        crossDomain: true,
        dataType: 'json',
        contentType: "application/json",
        success: function() {                        
            console.log("Deleted item from db");
        },
        error: function() {
            console.log("Failed");
        }
    }); 
}

function handlePortfolio4ColGridSearch() {
        $('#portfolio-4-col-grid-search').cubeportfolio({
            filters: '#portfolio-4-col-grid-filter',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'rotateRoom',
            gapHorizontal: 30,
            gapVertical: 30,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1500,
                cols: 4
            }, {
                width: 1100,
                cols: 4
            }, {
                width: 800,
                cols: 4
            }, {
                width: 550,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
            caption: ' ',
            displayType: 'bottomToTop',
            displayTypeSpeed: 100,

            // lightbox
            lightboxDelegate: '.cbp-lightbox',
            lightboxGallery: true,
            lightboxTitleSrc: 'data-title',
            lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        });
    }

function handlePortfolio4ColGrid() {
        $('#portfolio-4-col-grid').cubeportfolio({
            filters: '#portfolio-4-col-grid-filter',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'rotateRoom',
            gapHorizontal: 30,
            gapVertical: 30,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1500,
                cols: 4
            }, {
                width: 1100,
                cols: 4
            }, {
                width: 800,
                cols: 4
            }, {
                width: 550,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
            caption: ' ',
            displayType: 'bottomToTop',
            displayTypeSpeed: 100,

            // lightbox
            lightboxDelegate: '.cbp-lightbox',
            lightboxGallery: true,
            lightboxTitleSrc: 'data-title',
            lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        });
    }


function loadHomePage(){
    var datadir = {};
    var htmlstr="";
    $.ajax({
        url: `${API_URL}/items`,
        type: 'GET',
        crossDomain: true,
        contentType: "application/json",
        success: function(data) {
            console.log(data);
            $.each(data.body, function(index, value) {
                //console.log(value);
                htmlstr = htmlstr + '<div class=\"cbp-item idea web-design theme-portfolio-item-v2 theme-portfolio-item-xs\"> <div class=\"cbp-caption\"> <div class=\"cbp-caption-defaultWrap theme-portfolio-active-wrap\"> <div class=\"theme-icons-wrap theme-portfolio-lightbox\"> <a class=\"cbp-lightbox\" href=\"'+value.productUrl+'\"> <i class=\"theme-icons theme-icons-white-bg theme-icons-sm radius-3 icon-focus\"></i> </a> </div> </div> </div> <div class=\"theme-portfolio-title-heading\"> <h4 class=\"theme-portfolio-title\"><a href=\"'+value.productUrl+'\">'+value.productTitle+'</a></h4> <span class=\"theme-portfolio-subtitle\">Price: '+value.latestPrice+' </span> <span style="padding: 1em;position: relative;"><button data-itemID="'+value.id+'" id="home_delete" class="btn-danger">Delete</button></span> </div> </div>';
                });
            console.log(htmlstr);
            $('#portfolio-4-col-grid').html(htmlstr);
            handlePortfolio4ColGrid();
            
        },
        error: function() {
            console.log("Failed");
        }
    });    
}

$('#portfolio-4-col-grid').on('click', '#home_delete', function(e) {
    var $this = $(this);
    console.log("DELETING!!")
    console.log(`ItemID: ${$this.data('itemID')}`);
    var $ItemID = $this.data('itemID');
    deleteItem($ItemID);
})


$(document).ready(function(){
    $("#additemform" ).submit(function(event) {
      processAddItem();
      event.preventDefault();
    });

    $("#searchform" ).submit(function(event) {
      searchItems();
      event.preventDefault();
    });

    var pathname = window.location.pathname; 
    console.log(pathname);

    if(pathname=='/index.html' || pathname==='/'){
        loadHomePage();
    }else if(pathname=="/search.html"){
        loadSearchPage();
    }

});
