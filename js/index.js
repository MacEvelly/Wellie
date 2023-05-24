/**
 * Created by willia23 on 7/7/16.
 */
(function($) {
    console.clear();
    $.fn.makeBook     = function(infoObject) {
        var D = {
            title: 'Title',
            author: 'Author',
            summery: 'Summery',
            insideText: 'Inside Text',
            insideLink: '#',
            coverImage: "http://s.cdpn.io/13060/book1.webp"
        };
        $.extend(D, infoObject);

        var bookHTML = $('<figure class="book">'
                        +'<ul class="hardcover_front">'
                        +'<li>'
                        +'<img src="'+D.coverImage+'" alt="'+D.title+'" style="height: 100%; width: 100%;">'
                        +'</li>'
                        +'<li></li>'
                        +'</ul>'
                        +'<ul class="page">'
                        +'<li></li>'
                        +'<li><a class="btn" href="'+D.insideLink+'"><span>Download<br/>pdf excerpt</span></a></li>'
                        +'<li></li><li></li><li></li>'
                        +'</ul>'
                        +'<ul class="hardcover_back">'
                        +'<li></li><li></li>'
                        +'</ul>'
                        +'<ul class="book_spine">'
                        +'<li></li><li></li>'
                        +'</ul>'
                        +'</figure>').appendTo(this);

        $('<div data-book="'+D.flipBook[0]+'" data-pages="'+D.flipBook[1]+'" class="bookAbout">'
            +'<h3>'+D.title+'</h3>'
            +'<p>'+D.summery+'</p>'
            +'</div>').appendTo(this);
    };
    $.fn.makeFlipBook = function(book, pages) {
        var bookHolder = $('<div class="bb-custom-wrapper '+book+'"></div>');
        var myBook = $('<div class="bb-bookblock"></div>').appendTo(bookHolder);

        for (var pageNum = 2; pageNum <= pages; pageNum++) {
            var page = $("<div class='bb-item'><img src='img/" + book + "_P" + pageNum + ".webp' alt='page" + pageNum + "'/></div>").appendTo(myBook);
        }

        var navHolder = $('<nav>'+
                            '<a data-action="first" href="#" class="bb-custom-icon bb-custom-icon-first">First page</a>'+
                            '<a data-action="prev"  href="#" class="bb-custom-icon bb-custom-icon-arrow-left">Previous</a>'+
                            '<a data-action="next"  href="#" class="bb-custom-icon bb-custom-icon-arrow-right">Next</a>'+
                            '<a data-action="last"  href="#" class="bb-custom-icon bb-custom-icon-last">Last page</a>'+
                          '</nav>').appendTo(bookHolder);

        // Assign Actions
        function bookAction(e) {
            var action = $(this).attr('data-action');
            if (action == undefined) {
                console.log(e.data);
            }
            myBook.bookblock(action);
            return false
        }

        $(navHolder).find('a').on('click touchstart', bookAction);
        $(myBook).on('swipeleft', bookAction);
        $(myBook).on('swipeRight', bookAction);
        $(myBook).bookblock({
            speed: 800,
            shadowSides: 0.8,
            shadowFlip: 0.7
        });
        $(this).empty().append(bookHolder);
    };
    $.fn.makeMap = function(){
        var mapHolder = this;
        var mapInfo = {
            //"Map_reference.png": {"title": "reference","description": "Blank"},
            "Map_BG.png": {"title": "BG","description": "Blank"},
            "Map_carriage.png": {"title": "carriage","description": "Blank"},
            "Map_central-tree.png": {"title": "central-tree","description": "Blank"},
            "Map_flower-garden-bush.png": {"title": "flower-garden-bush","description": "Blank"},
            "Map_garden.png": {"title": "garden","description": "Blank"},
            "Map_garden-&-tree.png": {"title": "garden-&-tree","description": "Blank"},
            "Map_house.png": {"title": "house","description": "Blank"},
            "Map_play-house.png": {"title": "play-house","description": "Blank"},
            "Map_pond.png": {"title": "pond","description": "Blank"},
            "Map_rabbit-hutch-&-patch.png": {"title": "rabbit-hutch-&-patch","description": "Blank"},
            "Map_shed.png": {"title": "shed","description": "Blank"},
            "Map_stage.png": {"title": "stage","description": "Blank"},
            "Map_tea-table.png": {"title": "tea-table","description": "Blank"}
        };

        $.each(mapInfo, function(key,item){
            var title = item.title.replace('-',' ');
            var myClass = item.title.replace('-&','');
            console.log(".mapHolder ."+myClass+"{}");
            var img = $("<img src='img/map/"+key+"' class="+myClass+" data-title='"+title+"' data-description='"+item.description+"'>").appendTo(mapHolder);
        })
    }
}(jQuery));

(function (){
    console.log('run');
    var wellieInfo, characters, books;
    function hidePop(){
        TweenLite.to(".girlOverlay,.girlOverlayHolder", 0.5, {autoAlpha: 0});
    }
    function showGirl(){
        var girl = $(this).attr("data-name");
        var girlPop = $("<div class='girlPop'>" +
                            "<div class='infoBody'>" +
                                "<img class='modalDoll' src='img/girls/" + characters[girl].imagebase + "_modal.png'>" +
                                "<img class='cornerBoot' src='img/girls/" + characters[girl].imagebase + "_boots.svg'>" +
                                "<img class='cornerIll'  src='img/girls/" + characters[girl].imagebase + "_portrait.png'>" +
                                "<p class='title'>Meet<span class='name'>" + girl + "</span></p>" +
                                "<div class='girlContent'></div>" +
                                "<img class='cornerFlower' src='img/Corner_Vines_7.svg'>" +
                                "<div class='closeBTN'>X</div>" +
                            "</div>" +
                            "<img class='cornerDoll' src='img/girls/" + characters[girl].imagebase + "_doll.png'>" +
                        "</div>");

        var girlNav     = girlPop.find(".girlNav");
        var girlContent = girlPop.find(".girlContent");

        var sections = ["meet",'Good Deeds','Passions', 'Who She Is'];
        function makeSections(){
            $("<div class='allSections'><span class='subTitle'>"+this+":</span>"+characters[girl][this]+"</span></div>").appendTo(girlContent);
        }
        $.each(sections, makeSections);
        girlPop.find(".closeBTN").on('click', hidePop);
        $(".girlOverlayHolder").empty().append(girlPop);

        TweenLite.to(".girlOverlay,.girlOverlayHolder", 0.5, {autoAlpha: 1});
        var tl = new TimelineMax();
            tl.to(".girlOverlay", 0.2, {autoAlpha: 1});
            tl.from(".girlPop", 0.5, {autoAlpha: 0, y:"-10"});
            tl.from(".cornerDoll,.modalDoll" , 0.5, {autoAlpha: 0, y:"+10"});
            //tl.from(".cornerIll"  , 0.5, {autoAlpha: 0, y:"+10"}, '-=0.25');
            tl.from(".cornerBoot" , 0.5, {autoAlpha: 0, y:"+10"}, '-=0.25');
            tl.from(".title,.cornerIll" , 0.5, {autoAlpha: 0, y:"+10"}, '-=0.5');

            //tl.staggerFrom(".girlNav>div" , 0.25, {css:{rotation:"0deg", scale:1.2, opacity:0}}, 0.2, '-=0.5');
            tl.staggerFrom(".allSections" , 0.25, {css:{scale:1.2, opacity:0}}, 0.2, '-=0.5');

    }
    function loadInfo(data){
        wellieInfo  = data;
        characters  = data.characters;
        books       = data.books;
        $(".girlBTN").on("click", showGirl);
        TweenLite.to("#parallaxHolder", 1,{alpha: 1});
    }
    $.getJSON( "data/willieInfo.json", loadInfo );
    TweenLite.set(".girlOverlay,.girlOverlayHolder", {autoAlpha: 0});
    /************ Book Javascript ************/
    var book1 = $("<div/>",{'class':'BookDiv'}).appendTo('.bookDis');
    $(book1).makeBook({ title: 'The Riddle of the Robin',
        coverImage : "img/book1.webp",
        insideLink : "pdf/WW_book2.pdf",
        flipBook:["B1",8],
        summery:"A robin has moved into the garden, thrilling the WellieWishers with its pretty songs. When the girls bring it presents, they learn what robins like to eat. (Hint: It’s sort of like spaghetti!) Then one day, the robin disappears. The girls go on a hunt to find it—and get a major surprise! Can animal-lover Willa figure out what’s up with her new feathered friend?"});

    var book2 = $("<div/>",{'class':'BookDiv'}).appendTo('.bookDis');
    $(book2).makeBook({ title: "Ashlyn's Unsurprise Party",
        coverImage : "img/book2.webp",
        insideLink : "pdf/WW_book2.pdf",
        flipBook:["B2",7],
        summery:"Ashlyn is throwing a party! She wants to keep everything top secret so that she can surprise her friends. Then she learns that her friends have allergies and other needs. At first, Ashlyn is disappointed about letting her friends in on her secret plans—but it turns out that Ashlyn is in for the biggest surprise of all!"
    });

    var book3 = $("<div/>",{'class':'BookDiv'}).appendTo('.bookDis');
    $(book3).makeBook({ title: 'The Muddily-Puddily Show',
        coverImage : "img/book3.webp",
        insideLink : "pdf/WW_book3.pdf",
        flipBook:["B3",11],
        summery:"The WellieWishers are putting on a show, and Emerson is in charge. The girls love her songs and silly skits, but not all of Emerson’s creative ideas are working. Ashlyn can’t see out of her pumpkin costume, Willa has a touch of stage fright, and Kendall is struggling with the special effects. When the girls try to tell her their problems, Emerson doesn’t listen. Will the show go on?"
    });

    var shouldScroll = false;
    function makeFlipBook(){
        $('.bookSelect').removeClass("bookSelect");
        $(this).parent(".BookDiv").addClass("bookSelect");
        var book  = $(this).attr("data-book");
        var pages = $(this).attr("data-pages");
        $('.exceptHolder').makeFlipBook(book,pages);
        if(shouldScroll) $('html,body').animate({scrollTop: $('.exceptHolder').offset().top},'slow');
        shouldScroll = true
    }
    $(".bookAbout").on("click", makeFlipBook );
    $(book1).find(".bookAbout").trigger("click");

    function playVideo(){
        console.log('play');
        $('.appVid').get(0).play()
    }
    $(".iPad").on('click',playVideo)
    $(".appVid").on('click',playVideo)

}());

