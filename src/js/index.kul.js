import debounce from 'lodash.debounce';
import foreach from 'lodash.foreach';
import scrollToTop from './scroll-to-top';

"use strict";

function moreMenu() {
  window.addEventListener('resize', debounce(() => {
    /* Make sure to only show the more menu if we are on a mobile device */
    var button = document.querySelector(".local-header .btn-toggle");
    if (button.style.display !== "block") {
      self.resetList();
    }
  }, 450));

  const menus = document.querySelectorAll(".nav-more");
  const htmlLang = document.documentElement.getAttribute('lang');
  const moreText = htmlLang.toLowerCase() === 'nl' ? 'Meer' : 'More';

  foreach(menus, (menu, i) => {
    const list = menu.querySelector('ul');
    const form = menu.querySelector('form');

    const itemsHTML = [].reduce.call(list.querySelectorAll('li'), (htmlString, current) => {
      if (!current.classList.contains('nav-more')) {
        htmlString += current.outerHTML;
      }
      return htmlString;
    }, '');

    list.innerHTML = itemsHTML;

    const moreItemHTML = [
      '<li class="nav-more">',
        `<a href="#" class="dropdown-toggle" id="more-menu${i}" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">`,
          `${moreText} <i class="material-icons">&#xE313;</i>`,
        '</a>',
        `<ul class="dropdown-menu" aria-labelledby="more-menu${i}" aria-expanded="false"></ul>`,
      '</li>'
    ].join('');

    list.insertAdjacentHTML('beforeend', moreItemHTML);

    const moreItem = list.querySelector('.nav-more');
    const moreList = moreItem.querySelector('ul');
    const menuWidth = menu.clientWidth;
    const itemsTotalWidth = moreItem.clientWidth + (form ? form.clientWidth : 0);
    const menuItems = list.querySelectorAll('.')
    
    moreItem.style.display = 'none';
    
    
  });



      $menus.each(function (i) {
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
}


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
const addPaddingToLocalHeader = function () {
  var $local = document.querySelector(".local-header");

  if ($local && !$local.querySelector(".nav-tabs")) {
    $local.classList.add("p-b-2");
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

export default function autoInit() {
  addPaddingToLocalHeader();

  if (document.querySelector('.nav-more')) {
    moreMenu();
  }

  scrollToTop({
    selector: '.scroll-to-top'
  });
}