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
      autoplay: false,
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
          LĨNH VỰC HOẠT ĐỘNG
        </div>
        <div class="descrition">
          AC TECH với các lĩnh vực hoạt động đa dạng như:
		  Quản trị thông minh, sản xuất và gia công phần mềm, 
		  cung ứng CNTT, tích hợp hệ thống.
        </div>
      </div>
    `);
  }

  const applyContentSpeed = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          CÔNG NGHỆ CHỦ ĐẠO
        </div>
        <div class="descrition">
          Các sản phẩm của AC Tech được xây dựng trên các nền tảng
		  công nghệ hiện đại: Back-End, Front-End, Mobile App, 
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
          CHUYÊN GIA NHIỀU KINH NGHIỆM
        </div>
        <div class="descrition">
          AC Tech có những chuyên gia nước ngoài kinh nghiệm nhiều năm 
		  ở các nước Châu  u, Mỹ, Nhật Bản,... cùng các lập trình viên có trình độ cao. 
        </div>
      </div>
    `);
  };

  const applyContentSecurity = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          SẢN PHẨM CHÍNH
        </div>
        <div class="descrition">
          AC Tech - SMT với các sản phẩm chính như: ERP, 
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
          KHÁCH HÀNG LÀM TRỌNG TÂM
        </div>
        <div class="descrition">
          Với kim chỉ nam “Sự phát triển của khách hàng là mục tiêu hàng đầu”.
		  AC Tech mang đến những công nghệ quản trị tối ưu cùng những trải
		  nghiệm tuyệt vời nhất mang lại quy trình tự động hóa và tối ưu nguồn lực cho khách hàng.
        </div>
      </div>
    `);
  };

  const applyContentPlatform = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          KẾT NỐI ĐA NỀN TẢNG
        </div>
        <div class="descrition">
          Các sản phẩm của AC Tech được lập trình dựa trên các nền tảng công nghệ hiện đại:
		  Al, loT, Big Data, Cloud, Blockchain, Reactjs, Reactstrap,.. tối ưu cho việc kết nối đa nền tảng
        </div>
      </div>
    `);
  };

  const applyContentAdministration = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          DỊCH VỤ CHUYÊN NGHIỆP
        </div>
        <div class="descrition">
          Sự uy tín, chuyên nghiệp, Dịch vụ tư vấn tận tình, chăm sóc khách hàng chuyên nghiệp,
		  đội ngũ lập trình viên có trình độ cao, hỗ trợ đa kênh, 
		  mang lại lợi ích tối đa cho doanh nghiệp.
        </div>
      </div>
    `);
  };
  
  const applyContentDesign = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          Chuẩn UI-UX
        </div>
        <div class="descrition">
          Trải qua nhiều năm nghiên cứu, ACTECH
          tự tin là đơn vị thiết kế phần mềm chuẩn giao diện và trải nghiệm người dùng UX/UI. Thiết kế phần mềm có giao diện đẹp, bắt mắt
          giúp thu hút khách hàng, trải nghiệm người dùng được nghiên cứu và tối ưu phù hợp với hành vi người sử dụng.
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
