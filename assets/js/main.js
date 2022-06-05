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
          Thiết kế website chuẩn SEO
        </div>
        <div class="descrition">
          Thiết kế web chuyên nghiệp chuẩn SEO giúp bạn dễ dàng
          tối ưu hóa và đưa sản phẩm – dịch vụ của doanh nghiệp
          bạn lên TOP tìm kiếm trên Google. Tại MIKO TECH,
          website được thiết kế chuẩn SEO ngay từ khi xây dựng
          web, tối ưu từ source code đến các tính năng, OnPage
          và OffPage, thiết kế responsive, bảo mật giao thức SSL
          thân thiện với bộ máy tìm kiếm,...
        </div>
      </div>
    `);
  }

  const applyContentSpeed = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          Tốc độ
        </div>
        <div class="descrition">
          Không ai thích 1 website mà tốc độ load
          quá chậm, website chậm sẽ
          dẫn đến khách hàng bạn rời bỏ bạn vì không ai thích chờ đợi. Website hoạt động ổn định với tốc độ tải
          trang nhanh, hoạt động mượt mà giúp tăng tỷ lệ chuyển đổi trong hoạt động bán hàng của bạn và doanh
          nghiệp.
        </div>
      </div>
    `);
  };

  const applyContentFeature = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          Tính năng
        </div>
        <div class="descrition">
          Tất cả yêu cầu riêng biệt về website của
          doanh nghiệp đều được đáp
          ứng như tích hợp cổng thanh toán, hệ thống chatbot hỗ trợ khách hàng, hệ thống dữ liệu kho, hỗ trợ kết
          nối đa kênh,... Và hàng trăm nghìn tính năng. Thiết kế website với tính năng hữu ích giúp tăng tỷ lệ
          chuyển đổi cho doanh nghiệp của bạn.
        </div>
      </div>
    `);
  };

  const applyContentSecurity = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          Bảo mật
        </div>
        <div class="descrition">
          Trong bất cứ ngành nghề nào không riêng
          gì thiết kế website, bảo
          mật luôn là một tiêu chí quan trọng. Nếu có sự cố về bảo mật, thông tin khách hàng hoặc doanh nghiệp
          bị rò rỉ, thiệt hại là điều không thể tránh khỏi. Hiểu được điều đó, thiết kế web tại MIKOTECH luôn
          đáp ứng tính bảo mật cho website doanh nghiệp bạn thông qua một số công nghệ hiện đại.
        </div>
      </div>
    `);
  };

  const applyContentAdministration = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          Quản trị
        </div>
        <div class="descrition">
          Thiết kế website chuyên nghiệp không chỉ
          hướng đến khách hàng mà
          còn chú ý đến khả năng quản trị. Website có hệ thống lưu trữ, tổng hợp và phân tích dữ liệu, hỗ trợ
          bạn phân tích và đưa ra những chiến lược kinh doanh hợp lý.
        </div>
      </div>
    `);
  };

  const applyContentConnect = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          Kết nối
        </div>
        <div class="descrition">
          Hiện nay, thiết kế website áp dụng đa kết
          nối là điều không còn xa
          lạ. Khi mà thị trường thương mại điện tử phát triển, tính năng kết nối của website với các sàn thương
          mại điện tử, API đơn vị vận chuyển, mạng xã hội, Google shopping giúp bạn bán hàng tiện lợi, quản lý
          dễ dàng chỉ với website.
        </div>
      </div>
    `);
  };

  const applyContentPlatform = () => {
    $(".about-content").empty();
    $(".about-content").append(`
      <div class="content w3-animate-zoom">
        <div class="title">
          Nền tảng
        </div>
        <div class="descrition">
          Tại AC TECH, chúng tôi dựa vào nhu cầu
          về tính năng để tư vấn
          nền tảng thiết kế web phù hợp. Bởi mỗi nền tảng có đặc điểm riêng, với tầm nhìn xa, chúng tôi tư vấn
          bạn nền tảng phù hợp để trong dài hạn bạn vẫn có thể sử dụng tốt website của mình. Chúng tôi đáp ứng
          mọi nền tảng mà bạn yêu cầu từ WordPress, Laravel, React, React Native, Node JS,...
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
          tự tin là đơn vị thiết kế
          website chuẩn giao diện và trải nghiệm người dùng UX/UI. Thiết kế website có giao diện đẹp, bắt mắt
          giúp thu hút khách hàng, trải nghiệm người dùng được nghiên cứu và tối ưu phù hợp với hành vi mua sắm
          của người Việt Nam giúp tăng tỷ lệ chuyển đổi cho website của bạn.
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
