(function($) {
  var cheerioArr = [
    { name: 'group1', e: 795.6510009765625, f: 503.86199951171875 },
    { name: 'group2', e: 985.0800170898438, f: 363.8389892578125 },
    { name: 'group3', e: 767.5989990234375, f: 761.2080078125 },
    { name: 'group4', e: 467.93798828125, f: 646.614013671875 },
    { name: 'group5', e: 675.7760009765625, f: 254.26499938964844 },
    { name: 'group6', e: 745.0750122070312, f:207.74099731445312 },
    { name: 'group7', e: 499.010986328125, f: 490.1579895019531 },
    { name: 'group8', e: 871.8920288085938, f: 457.093994140625 },
    { name: 'group9', e: 420.9330139160156, f: 338.0929870605469 },
    { name: 'group10', e: 969.8200073242188, f: 579.177001953125 },
    { name: 'group11', e: 641.27099609375, f: 427.8609924316406 },
    { name: 'group12', e: 977.5150146484375, f: 565.5659790039062 },
    { name: 'group13', e: 1097.5579833984375, f: 398.1929931640625 },
    { name: 'group14', e: 816.948974609375, f: 249.45399475097656 },
    { name: 'group15', e: 589.3790283203125, f: 356.8349914550781 },
    { name: 'group16', e: 882.8060302734375, f: 597.64599609375 },
    { name: 'group17', e: 354.3269958496094, f: 452.6860046386719 },
    { name: 'group18', e: 911.2050170898438, f: 791.5709838867188 },
    { name: 'group19', e: 590.9810180664062, f: 778.10302734375 },
    { name: 'group20', e: 882.8060302734375, f: 191.38499450683594 },
    { name: 'group21', e: 499.010986328125, f: 481.1610107421875 },
    { name: 'group22', e: 569.3259887695312, f: 165.90899658203125 },
    { name: 'group23', e: 693.3159790039062, f: 666.93798828125 },
    { name: 'group24', e: 810.8289794921875, f: 378.9840087890625 },
    { name: 'group25', e: 501.7909851074219, f: 371.7510070800781 },
    { name: 'group26', e: 627.2139892578125, f: 534.7139892578125 },
    { name: 'group27', e: 508.3179931640625, f: 578.7890014648438 },
    { name: 'group29', e: 426.0589904785156, f: 565.5659790039062 },
    { name: 'group30', e: 422.0639953613281, f: 748.6820068359375 },
    { name: 'group31', e: 675.7760009765625, f: 863.8040161132812 },
    { name: 'group32', e: 832.9500122070312, f: 675.7529907226562 },
    { name: 'group33', e: 987.4290161132812, f: 740.39501953125 },
    { name: 'group34', e: 1006.2830200195312, f: 503.86199951171875 },
    { name: 'group35', e: 1094.4189453125, f: 544.9970092773438 }
  ];

  $(document).ready(function(){
    bodymovin();
    carouselAutoPlay();
  });

  $(window).resize(function() {
    carouselAutoPlay();
  });

  function random(min, max){
    if(max == null){
      max = min;
      min = 0 ? (min + 1) : (min - 1);
    }
    return Math.floor(Math.random() * (max - min) + min);
  }

  function setSvg(id) {
    return anim = lottie.loadAnimation({
      container: id,
      render: 'svg',
      loop: false,
      autoplay: false,
      isPaused: false,
      path: id.dataset.path
    });
  }

  function animateCereal(id) {
    var idName;
    if(id === 'cereal_title'){
      idName = '#';
    } else {
      idName = '#' + id + '_';
    }

    for(var j = 0; j < cheerioArr.length; j++){
      if(id !== 'cereal_title' && j <= 5){ continue; }

      TweenMax.to($(idName + cheerioArr[j].name), random(3,5), {
        opacity: 1,
        x: cheerioArr[j].e + random(-20, 20),
        y: cheerioArr[j].f + random(-20, 20),
        yoyo: true,
        repeat: 20,
        ease: Power0.easeInOut
      });
    }
  }

  function clickedAnimation(direction, info, animArr){
    if (direction[0] !== undefined) {
      var nextId = direction[0].id;
      var nextEl = document.getElementById(nextId);

      animArr.forEach(function(anim){
        if(anim.wrapper.id === nextId){
          anim.goToAndPlay(1, true);

          if(info === "cereal"){
            animateCereal(nextId);
          }
        }
      });
    }
  }

  function bodymovin() {
    var bmAnim = Array.prototype.slice.apply(document.getElementsByClassName('carousel-animate'));
    var cerealTitle = document.getElementById("cereal_title");
    var info = "interest_rate";
    var cerealCarousel = false;
    var setAnims = [];

    if (!document.getElementById('interest_rate_infographic')) {
      info = "cereal";
    }

    bmAnim.forEach(function(bm, index){
      var animationTitle = "animation" + index;
      animationTitle = setSvg(bm);
      setAnims.push(animationTitle);

      animationTitle.addEventListener('DOMLoaded',function(){
        animationTitle.goToAndPlay(1,true);

        if(info === "cereal"){
          animateCereal(bm.id);
        }
      });
    });

    // NEXT
    $("#" + info +"_infographic .right.carousel-control").on('click',function(e) {
      var nextCarousel = $(this).parents('.active').next().find('.carousel-animate');
      clickedAnimation(nextCarousel, info, setAnims);
    });

    // PREVIOUS
    $("#" + info +"_infographic .left.carousel-control").on('click',function(e) {
      var prevCarousel = $(this).parents('.active').prev().find('.carousel-animate');
      clickedAnimation(prevCarousel, info, setAnims);
    });
  }

//////// if videos are used /////////
  function loadCarouselVideos() {
    var irItems = $("#interest_rate_infographic .item");
    var cerealItems = $("#cereal_infographic .item");
    var info = "interest_rate";
    var items = irItems.length > 0 ? irItems : cerealItems;

    for(var i = 0; i < items.length; i++){
      if ($(items[i]).find('video')[0] !== undefined) {
        $(items[i]).find('video')[0].load();
      }
    }
  }

  function carouselAutoPlay() {
    var irItems = $("#interest_rate_infographic .item");
    var cerealItems = $("#cereal_infographic .item");
    var info = "interest_rate";

    if (!document.getElementById('interest_rate_infographic')) {
      info = "cereal";
    }

    var firstItem = $(irItems[0]).hasClass('active')  ? $(irItems[0]) : $(cerealItems[0]);
    var firstVid = $(firstItem).find('video')[0];
    if (firstVid !== undefined) {
      firstVid.currentTime = 0;
      firstVid.play();
    }

    $("#" + info +"_infographic .right.carousel-control").on('click',function(e) {
      var nextVid = $(this).parents('.active').next().find('video')[0];
      if(nextVid !== undefined){
        nextVid.currentTime = 0;
        nextVid.play();
      }
    });

    $("#" + info + "_infographic .left.carousel-control").on('click',function(e) {
      var prevVid = $(this).parents('.active').prev().find('video')[0];
      if(prevVid !== undefined) {
        prevVid.currentTime = 0;
        prevVid.play();
      }
    });
  }
})( jQuery );
