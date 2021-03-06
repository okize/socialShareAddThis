(function() {
  (function(factory) {
    if (typeof exports === 'object') {
      return factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(jQuery);
    }
  })(function($) {
    'use strict';
    var Share, defaults, pluginName;

    pluginName = 'socialShareAddThis';
    defaults = {
      addThisProfileID: false,
      addThisApiVersion: '300',
      addThisButtons: ['email', 'linkedin', 'facebook', 'twitter'],
      addThisCss: true,
      addThisButtonSize: 'small',
      addThisButtonOrientation: 'horizontal',
      addThisButtonFollow: false,
      addThisTwitterTemplate: '{{title}} {{url}}',
      googleAnalyticsID: false
    };
    Share = (function() {
      var addThisButtonHtml;

      function Share(element, options) {
        this.element = element;
        this.el = $(this.element);
        this.doc = $(window.document);
        this.options = $.extend({}, defaults, options);
        this.addThisButtonsContainer = {};
        this.addThisButtonsContainerHeight = null;
        this.addThisButtonFollowLimit = null;
        this.addThisScript = '//s7.addthis.com/js/' + this.options.addThisApiVersion + '/addthis_widget.js';
        this.addThisConfiguration = {
          pubid: this.options.addThisProfileID,
          url: window.location.href,
          title: window.document.title,
          ui_use_css: this.options.addThisCss,
          domready: true,
          async: true,
          data_track_clickback: false,
          data_track_addressbar: false,
          data_ga_tracker: this.options.googleAnalyticsID,
          data_ga_social: true
        };
        this.socialShareAddThisConfiguration = {
          templates: {
            twitter: this.options.addThisTwitterTemplate
          }
        };
        this.addThisScriptCache = {};
        this.init();
      }

      Share.prototype.init = function() {
        var _this = this;

        return $.when(this.loadAddthisScript(this.addThisScript)).then(function() {
          _this.isAddThisLoaded(true);
          _this.setAddThisConfiguration();
          _this.el.append(_this.buildAddThisHtml(_this.options.addThisButtons));
          _this.addThisButtonsContainer.show();
          if (_this.options.addThisButtonFollow) {
            return _this.initializeFollow();
          }
        });
      };

      Share.prototype.isAddThisLoaded = function(bool) {
        if (arguments.length > 0 && typeof bool === 'boolean') {
          this.doc.data('addThisScriptLoaded', bool);
        }
        if (typeof this.doc.data('addThisScriptLoaded') === 'undefined') {
          this.doc.data('addThisScriptLoaded', false);
          return false;
        }
        return this.doc.data('addThisScriptLoaded');
      };

      Share.prototype.setAddThisConfiguration = function() {
        if (typeof window.addthis_config === 'undefined' && this.isAddThisReady() === true) {
          window.addthis_config = this.addThisConfiguration;
          window.addthis_share = this.socialShareAddThisConfiguration;
        }
      };

      Share.prototype.loadAddthisScript = function(val) {
        var promise;

        promise = this.addThisScriptCache[val];
        if (!promise) {
          promise = $.ajax({
            url: this.addThisScript,
            cache: true,
            dataType: 'script'
          });
          this.addThisScriptCache[val] = promise;
        }
        return promise;
      };

      Share.prototype.isAddThisReady = function() {
        if (typeof window.addthis === 'undefined') {
          return false;
        } else {
          return true;
        }
      };

      addThisButtonHtml = function(buttons, servicesMap) {
        var html, i, len;

        html = '';
        i = 0;
        len = buttons.length;
        while (i < len) {
          if (buttons[i] in servicesMap) {
            html += "<a class=\"" + servicesMap[buttons[i]].className + "\"                   title=\"" + servicesMap[buttons[i]].title + "\" href=\"#\"></a>";
            i++;
          }
        }
        return html;
      };

      Share.prototype.buildAddThisHtml = function(buttons) {
        var addThisButtonsContainer, buttonOrientation, iconSizes, servicesMap;

        servicesMap = {
          email: {
            className: 'addthis_button_email',
            title: 'Email A Friend'
          },
          linkedin: {
            className: 'addthis_button_linkedin',
            title: 'Share on LinkedIn'
          },
          facebook: {
            className: 'addthis_button_facebook',
            title: 'Share on Facebook'
          },
          twitter: {
            className: 'addthis_button_twitter',
            title: 'Share on Twitter'
          },
          googleplus: {
            className: 'addthis_button_google_plusone_share',
            title: 'Share on Google+'
          },
          addthis: {
            className: 'addthis_button_compact',
            title: 'Share with AddThis Services'
          }
        };
        iconSizes = {
          small: 'addthis_default_style',
          medium: 'addthis_20x20_style',
          large: 'addthis_32x32_style'
        };
        buttonOrientation = {
          horizontal: 'addThisHorizontal',
          vertical: 'addThisVertical'
        };
        addThisButtonsContainer = $('<div>', {
          "class": 'socialShare-addThis ' + buttonOrientation[this.options.addThisButtonOrientation] + ' ' + iconSizes[this.options.addThisButtonSize],
          html: addThisButtonHtml(buttons, servicesMap)
        });
        this.addThisButtonsContainer = addThisButtonsContainer;
        return addThisButtonsContainer;
      };

      Share.prototype.initializeFollow = function() {
        var buttons, posConst, self, setLimit, throttle, throttled, updatePosition, win, wrapInner, wrapOuter;

        buttons = this.addThisButtonsContainer;
        wrapOuter = $('<div>', {
          "class": 'socialShare-outer'
        });
        wrapInner = $('<div>', {
          "class": 'socialShare-inner',
          width: this.el.width()
        });
        posConst = {
          cssTop: parseInt(buttons.css('top'), 10),
          offTop: parseInt(this.el.offset().top, 10),
          contentHeight: parseInt(this.el.outerHeight(), 10)
        };
        self = this;
        win = $(window);
        throttle = function(func, wait) {
          var args, context, later, previous, result, timeout;

          context = void 0;
          args = void 0;
          timeout = void 0;
          result = void 0;
          previous = 0;
          later = function() {
            previous = new Date();
            timeout = null;
            result = func.apply(context, args);
            return result;
          };
          return function() {
            var now, remaining;

            now = new Date();
            remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
              clearTimeout(timeout);
              timeout = null;
              previous = now;
              result = func.apply(context, args);
            } else {
              if (!timeout) {
                timeout = setTimeout(later, remaining);
              }
            }
            return result;
          };
        };
        setLimit = function() {
          if (self.addThisButtonsContainerHeight === null) {
            self.addThisButtonsContainerHeight = buttons.outerHeight();
          }
          if (self.addThisButtonFollowLimit === null) {
            self.addThisButtonFollowLimit = posConst.contentHeight + posConst.offTop - posConst.cssTop - self.addThisButtonsContainerHeight;
          }
          setLimit = function() {};
        };
        updatePosition = function() {
          var adjustCss;

          adjustCss = function(pos, top) {
            wrapOuter.css({
              position: pos
            });
            return buttons.css({
              top: top + 'px'
            });
          };
          if (posConst.offTop - win.scrollTop() <= 0) {
            if (self.addThisButtonFollowLimit <= win.scrollTop()) {
              return adjustCss('absolute', self.addThisButtonFollowLimit + posConst.cssTop);
            } else {
              return adjustCss('fixed', posConst.cssTop);
            }
          } else {
            if (posConst.offTop - win.scrollTop() > 0) {
              return adjustCss('absolute', posConst.cssTop + posConst.offTop);
            }
          }
        };
        throttled = throttle(updatePosition, 25);
        buttons.css({
          top: posConst.cssTop + posConst.offTop + 'px'
        }).prependTo('body').addClass('following').wrap(wrapOuter).wrap(wrapInner);
        wrapOuter = $('.socialShare-outer');
        return win.on('scroll', function() {
          setLimit();
          return throttled();
        });
      };

      return Share;

    })();
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_#{pluginName}')) {
          $.data(this, 'plugin_#{pluginName}', new Share(this, options));
        }
      });
    };
  });

}).call(this);
