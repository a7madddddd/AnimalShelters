var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? !0
      : !1;
  var Scrollbar = window.Scrollbar;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.header();
      Init.wow();
      Init.dropdown();
      Init.feedbackSlider();
      Init.slick();
      Init.categoryToggle();
      Init.filterSearch();
      Init.quantityHandle();
      Init.passwordIcon();
      Init.countdownInit(".countdown", "2025/08/23");
      Init.formValidation();
      Init.contactForm();
    },
    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },
    BackToTop: function () {
      var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
      var rootElement = document.documentElement;
      function handleScroll() {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.05) {
          scrollToTopBtn.classList.add("showBtn");
        } else {
          scrollToTopBtn.classList.remove("showBtn");
        }
      }
      function scrollToTop() {
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
      document.addEventListener("scroll", handleScroll);
    },
    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 1200);
    },
    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }
      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }
      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }
      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }
      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },
    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow", // animated element css class (default is wow)
          animateClass: "animated", // animation css class (default is animated)
          mobile: true, // trigger animations on mobile devices (default is true)
          live: true, // act on asynchronously loaded content (default is true)
        });
        wow.init();
      }
    },
    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        const optionsList = selected.querySelectorAll(
          "div.wrapper-dropdown li"
        );

        selected.addEventListener("click", () => {
          let arrow = selected.children[1];

          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        // update the display of the dropdown
        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });

      // check if anything else ofther than the dropdown is clicked
      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });

      // close all the dropdowns
      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          const optionsContainer = selected.children[2];
          let arrow = selected.children[1];

          handleDropdown(selected, arrow, false);
        });
      }

      // open all the dropdowns
      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },
    // Feedback Slider
    feedbackSlider: function () {
      $("a[data-slide]").click(function (e) {
        e.preventDefault();
        var slideno = $(this).data("slide");
        $(".feedback-user-nav").slick("slickGoTo", slideno - 1);
        $("a[data-slide]").removeClass("active");
        $(this).addClass("active");
      });
    },
    slick: function () {
      if ($(".team-slider").length) {
        $(".team-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: !0,
          autoplay: true,
          fade: true,
          dots: false,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          speed: 800,
          autoplaySpeed: 2000,
        });
      }
      if ($(".testimonial-slider").length) {
        $(".testimonial-slider").slick({
          slidesToShow: 1,
          arrows: false,
          dots: false,
          infinite: true,
          fade: true,
          autoplay: true,
          variableWidth: false,
          autoplaySpeed: 3000,
          speed: 600,
          responsive: [
            {
              breakpoint: 650,
              settings: {
                variableWidth: false,
              },
            },
          ],
        });
      }
      if ($(".feedback-user-nav").length) {
        $(".feedback-user-nav").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: ".testimonial-slider",
          variableWidth: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 2000,
          arrows: false,
          infinity: true,
          centerMode: false,
          focusOnSelect: true,
        });
      }
      if ($(".service-slider").length) {
        $(".service-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: ".service-slider-asnav",
        });
      }
      if ($(".service-slider-asnav").length) {
        $(".service-slider-asnav").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".service-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          variableWidth: true,
          focusOnSelect: true,
        });
      }

      if ($(".shop-detail-slider").length) {
        $(".shop-detail-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: ".shop-slider-asnav",
        });
      }
      if ($(".shop-slider-asnav").length) {
        $(".shop-slider-asnav").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".shop-detail-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          variableWidth: true,
          focusOnSelect: true,
        });
      }
    },
    categoryToggle: function () {
      $(".checkout-btn").on('click', function () {
        $('#sidebar-cart').css('right', '0');
        $('#sidebar-cart-curtain').fadeIn(0).css('display', 'block').animate({ opacity: 1 }, 200);  // Smooth fade in the curtain
      });

      $('.close-popup').on('click', function () {
        $('#sidebar-cart').css('right', '-101%');
        $('#sidebar-cart-curtain').animate({ opacity: 0 }, 200, function () {
          $(this).css('display', 'none');
        });
      });

      if ($(".customer-container").length) {
        $(".signin-button").click(function () {
          $(".sign-form").slideToggle();
        });
      }

      if ($("#shipAddress").length) {
        $(".billing-address").hide();
        $("#shipAddress").change(function () {
          if ($(this).is(":unchecked")) {
            $(".billing-address").hide("slow");
          } else {
            $(".billing-address").show("slow");
          }
        });
      }
    },
    filterSearch: function () {
      if ($("#searchInput").length) {
        $("#searchInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $(".blogs-block").filter(function () {
            var hasMatch =
              $(this).find(".blog-title").text().toLowerCase().indexOf(value) >
              -1;
            $(this).toggle(hasMatch);
          });
        });
      }
    },
    quantityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 0) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },
    passwordIcon: function () {
      $("#eye , #eye-icon").click(function () {
        if ($(this).hasClass("fa-eye-slash")) {
          $(this).removeClass("fa-eye-slash");
          $(this).addClass("fa-eye");
          $(".password-input").attr("type", "text");
        } else {
          $(this).removeClass("fa-eye");
          $(this).addClass("fa-eye-slash");
          $(".password-input").attr("type", "password");
        }
      });
    },
    countdownInit: function (countdownSelector, countdownTime, countdown) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              "<li><h2>%D</h2><h6>Days</h6></li>\
              <li><h2>%H</h2><h6>Hrs</h6></li>\
              <li><h2>%M</h2><h6>Mins</h6></li>\
              <li><h2>%S</h2><h6>Secs</h6></li>"
            )
          );
        });
      }
    },
    formValidation: function () {
      if ($(".reservation-form").length) {
        $(".reservation-form").validate();
      }
      if ($(".feedback-form").length) {
        $(".feedback-form").validate();
      }
      if ($(".blog-form").length) {
        $(".blog-form").validate();
      }
      if ($(".checkout-form").length) {
        $(".checkout-form").validate();
      }
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
      if ($(".login-form").length) {
        $(".login-form").validate();
      }
    },
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-sec mt-16 mb-16'>Email Sent Successfully</h5>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-sec mt-16 mb-16'>There is an error</h5>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return !1;
        }
      });
    },
  };
  Init.i();
})(window, document, jQuery);
