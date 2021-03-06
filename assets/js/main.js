(function ($) {
  "use strict";

  /* 1. Proloder */
  $(window).on("load", function () {
    $("#preloader-active").delay(450).fadeOut("slow");
    $("body").delay(450).css({
      overflow: "visible",
    });
  });

  /* 2. sticky And Scroll UP */
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $(".header-sticky").removeClass("sticky-bar");
      $("#back-top").fadeOut(500);
    } else {
      $(".header-sticky").addClass("sticky-bar");
      $("#back-top").fadeIn(500);
    }
  });
  // Scroll Up
  $("#back-top a").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });

  /* 3. slick Nav */
  // mobile_menu
  var menu = $("ul#navigation");
  if (menu.length) {
    menu.slicknav({
      prependTo: ".mobile_menu",
      closedSymbol: "+",
      openedSymbol: "-",
    });
  }

  /* 4. MainSlider-1 */
  // h1-hero-active
  function mainSlider() {
    var BasicSlider = $(".slider-active");
    BasicSlider.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on(
      "beforeChange",
      function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
          '.single-slider[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 4000,
      dots: false,
      fade: true,
      arrows: false,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });

    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();

  // blog-activ
  $(".blog-active").slick({
    dots: false,
    infinite: true,
    speed: 300,
    arrows: true,
    slidesToShow: 3,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  /* 4. Testimonial Active*/
  var testimonial = $(".h1-testimonial-active");
  if (testimonial.length) {
    testimonial.slick({
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      arrows: true,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrow: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  }

  /* 6. Nice Selectorp  */
  var nice_Select = $("select");
  if (nice_Select.length) {
    nice_Select.niceSelect();
  }

  /* 7. data-background */
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });

  /* 10. WOW active */
  new WOW().init();

  // 11. ---- Mailchimp js --------//
  function mailChimp() {
    $("#mc_embed_signup").find("form").ajaxChimp();
  }
  mailChimp();

  // 12 Pop Up Img
  var popUp = $(".single_gallery_part, .img-pop-up");
  if (popUp.length) {
    popUp.magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  }

  const applyContentSeo = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          L??NH V???C HO???T ?????NG
        </div>
        <div class="descrition">
          AC TECH v???i c??c l??nh v???c ho???t ?????ng ??a d???ng nh??:
		  Qu???n tr??? th??ng minh, s???n xu???t v?? gia c??ng ph???n m???m, 
		  cung ???ng CNTT, t??ch h???p h??? th???ng.
        </div>
      </div>
    `);
  }

  const applyContentSpeed = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          C??NG NGH??? CH??? ?????O
        </div>
        <div class="descrition">
          C??c s???n ph???m c???a AC Tech ???????c x??y d???ng tr??n c??c n???n t???ng
		  c??ng ngh??? hi???n ?????i: Back-End, Front-End, Mobile App, 
		  MicroServices, Cloud, CI/CD, Infrastructure, Database,...
        </div>
      </div>
    `);
  };

  const applyContentFeature = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          CHUY??N GIA NHI???U KINH NGHI???M
        </div>
        <div class="descrition">
          AC Tech c?? nh???ng chuy??n gia n?????c ngo??i kinh nghi???m nhi???u n??m 
		  ??? c??c n?????c Ch??u  u, M???, Nh???t B???n,... c??ng c??c l???p tr??nh vi??n c?? tr??nh ????? cao. 
        </div>
      </div>
    `);
  };

  const applyContentSecurity = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          S???N PH???M CH??NH
        </div>
        <div class="descrition">
          AC Tech - SMT v???i c??c s???n ph???m ch??nh nh??: ERP, 
		  CRM, AFM, HRM, OFFICE, MRP, SSM, BSC, MBO,...
        </div>
      </div>
    `);
  };

  const applyContentConnect = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          KH??CH H??NG L??M TR???NG T??M
        </div>
        <div class="descrition">
          V???i kim ch??? nam ???S??? ph??t tri???n c???a kh??ch h??ng l?? m???c ti??u h??ng ?????u???.
		  AC Tech mang ?????n nh???ng c??ng ngh??? qu???n tr??? t???i ??u c??ng nh???ng tr???i
		  nghi???m tuy???t v???i nh???t mang l???i quy tr??nh t??? ?????ng h??a v?? t???i ??u ngu???n l???c cho kh??ch h??ng.
        </div>
      </div>
    `);
  };

  const applyContentPlatform = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          K???T N???I ??A N???N T???NG
        </div>
        <div class="descrition">
          C??c s???n ph???m c???a AC Tech ???????c l???p tr??nh d???a tr??n c??c n???n t???ng c??ng ngh??? hi???n ?????i:
		  Al, loT, Big Data, Cloud, Blockchain, Reactjs, Reactstrap,.. t???i ??u cho vi???c k???t n???i ??a n???n t???ng
        </div>
      </div>
    `);
  };

  const applyContentAdministration = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          D???CH V??? CHUY??N NGHI???P
        </div>
        <div class="descrition">
          S??? uy t??n, chuy??n nghi???p, D???ch v??? t?? v???n t???n t??nh, ch??m s??c kh??ch h??ng chuy??n nghi???p,
		  ?????i ng?? l???p tr??nh vi??n c?? tr??nh ????? cao, h??? tr??? ??a k??nh, 
		  mang l???i l???i ??ch t???i ??a cho doanh nghi???p.
        </div>
      </div>
    `);
  };
  
  const applyContentDesign = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          Chu???n UI-UX
        </div>
        <div class="descrition">
          Tr???i qua nhi???u n??m nghi??n c???u, ACTECH
          t??? tin l?? ????n v??? thi???t k??? ph???n m???m chu???n giao di???n v?? tr???i nghi???m ng?????i d??ng UX/UI. Thi???t k??? ph???n m???m c?? giao di???n ?????p, b???t m???t
          gi??p thu h??t kh??ch h??ng, tr???i nghi???m ng?????i d??ng ???????c nghi??n c???u v?? t???i ??u ph?? h???p v???i h??nh vi ng?????i s??? d???ng.
        </div>
      </div>
    `);
  };
  
  $("#btn-seo").click(applyContentSeo);
  $("#btn-speed").click(applyContentSpeed);
  $("#btn-feature").click(applyContentFeature);
  $("#btn-security").click(applyContentSecurity);
  $("#btn-administration").click(applyContentAdministration);
  $("#btn-connect").click(applyContentConnect);
  $("#btn-platform").click(applyContentPlatform);
  $("#btn-design").click(applyContentDesign);

})(jQuery);
