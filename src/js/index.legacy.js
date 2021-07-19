"use strict";

(function ($, window, document, undefined) {
  "use strict";

  window.debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var moreMenu = "moreMenu",
    defaults = {
      propertyName: "value",
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = moreMenu;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      var self = this;

      if ($(window).width() >= 768) {
        this.renderMore();
      }

      $(window).on(
        "resize",
        debounce(
          function () {
            /* Make sure to only show the more menu if we are on a mobile device */

            var $button = $(".local-header").find(".btn-toggle");

            if ($button.css("display") !== "block") {
              self.resetList();
            }
          },
          450,
          false
        )
      );
    },
    resetList: function () {
      var $menus = $(".nav-more");

      $menus.each(function () {
        var $menu = $(this).find("ul"),
          $items = $menu.find("li:not(.nav-more)").clone();

        $menu.empty().append($items);
      });
      this.renderMore();
    },
    renderMore: function () {
      var $menus = $(".nav-more");

      $menus.each(function (i) {
        var $menu = $(this),
          $list = $menu.find("ul"),
          $form = $menu.find("form"),
          menuWidth = $menu.width();

        var $morelang = $("html").attr("lang");
        var $moretext = $morelang == "nl" ? "Meer" : "More";
        var $moreItem = $(
            '<li class="nav-more"><a href="#" class="dropdown-toggle" id="more-menu' +
              i +
              '" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' +
              $moretext +
              ' <i class="material-icons">&#xE313;</i></a><ul class="dropdown-menu" aria-labelledby="more-menu' +
              i +
              '" aria-expanded="false"></ul></li>'
          ),
          $moreList = $moreItem.find("ul");

        $list.append($moreItem);

        var itemsTotalWidth =
          $moreItem.outerWidth() + ($form.length ? $form.outerWidth() : 0);
        $moreItem.hide();

        var $menuItems = $menu.find("li").not($moreItem);
        // $list.prepend($menuItems);

        $menuItems.each(function () {
          var $item = $(this),
            itemWidth = $item.outerWidth(true);

          itemsTotalWidth = itemsTotalWidth + itemWidth;

          // console.log(menuWidth, itemsTotalWidth, itemWidth);

          if (itemsTotalWidth > menuWidth) {
            $moreList.append($item);
          }
        });

        if (!$moreList.is(":empty")) {
          $moreItem.show();
        }
      });
    },
  });

  $.fn[moreMenu] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + moreMenu)) {
        $.data(this, "plugin_" + moreMenu, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);

var _toggleCollapse = function () {
  var headerSel = ".global-header, .local-header",
    menuSel = ".navbar-collapse, .nav-tabs";

  $(menuSel)
    .on("show.bs.collapse", function () {
      $(this).closest(headerSel).addClass("menu-open");
    })
    .on("hide.bs.collapse", function () {
      $(this).closest(headerSel).removeClass("menu-open");
    });
};

var _flyout = function () {
  var flyoutToggle = ".js-flyout-toggle",
    flyoutWrapper = ".l-flyout",
    pageWrapper = ".l-page";

  $(flyoutToggle).on("click", function () {
    $(flyoutWrapper).toggleClass("open");
    $(pageWrapper).toggleClass("l-flyout-in");
  });
};

/**
 * When there is are no nav-tabs on the page, the title sticks too much to the
 * content. Add padding (using a Bootstrap helper) when there is no .nav-tabs in
 * the local header.
 *
 */
var _addPaddingToLocalHeader = function () {
  var $local = $(".local-header");

  if ($local.length && !$local.find(".nav-tabs").length) {
    $local.addClass("p-b-2");
  }
};

/**
 * Activate the colorbox plugin.
 *
 */
var _activateColorbox = function () {
  if ($.fn.colorbox) {
    $(".colorbox").colorbox({
      close: "&times;",
      next: "&rsaquo;",
      previous: "&lsaquo;",
      maxWidth: "90%",
      maxHeight: "90%",
      photo: true,
    });
  }
};

/**
 * Scroll to top.
 */
var _scrollToTop = function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  $(".scroll-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600
    );
    return false;
  });
};

$(function () {
  _toggleCollapse();
  _flyout();
  _addPaddingToLocalHeader();
  _activateColorbox();
  _scrollToTop();

  // Call the custom jQuery plugin, see moremenu.jquery.js
  if ($(".nav-more").length) $("body").moreMenu();
});