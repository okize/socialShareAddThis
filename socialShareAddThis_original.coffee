#!
# socialShareAddThis v1.0.0 (http://okize.github.com/)
# Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
#

# use AMD or browser globals to create a jQuery plugin.
((factory) ->
  if typeof define is "function" and define.amd
    define ["jquery"], factory
  else
    factory jQuery
) ($) ->
  "use strict"

  # defaults
  pluginName = "socialShareAddThis"
  defaults =
    addThisProfileID: false # change this to whatever profile id should be used (this is global to the page)
    addThisApiVersion: "300" # 300, 250, 200, 150
    addThisButtons: ["email", "linkedin", "facebook", "twitter"] # email, linkedin, facebook, twitter, googleplus, addthis
    addThisCss: true # set to false to disable addthis styles
    addThisButtonSize: "small" # small, medium, large,
    addThisButtonOrientation: "horizontal" # horizontal, vertical
    addThisButtonFollow: false # enable to allow the buttons to 'follow' while scrolling
    addThisTwitterTemplate: "{{title}} {{url}}" # template for twitter sharing
    googleAnalyticsID: false # include GA Account Id for tracking


  # plugin constructor
  Share = (element, options) ->
    @element = element
    @$el = $(@element) # featured Share component dom container
    @doc = $(window.document)
    @options = $.extend({}, defaults, options)
    @_defaults = defaults
    @_name = pluginName
    @addThisButtonsContainer = {} # will hold reference to jq object of buttons parent div
    @addThisButtonsContainerHeight = null # will hold the height of the buttons, which can't be determined until the buttons have loaded async
    @addThisButtonFollowLimit = null # will hold height of 'limit' where the buttons stop following as page scrolls
    @addThisScript = "//s7.addthis.com/js/" + @options.addThisApiVersion + "/addthis_widget.js" # url of addthis script
    @addThisConfiguration =
      pubid: @options.addThisProfileID
      url: window.location.href
      title: window.document.title
      ui_use_css: @options.addThisCss
      domready: true
      async: true
      data_track_clickback: false
      data_track_addressbar: false
      data_ga_tracker: @options.googleAnalyticsID
      data_ga_social: true

    @socialShareAddThisConfiguration = templates:
      twitter: @options.addThisTwitterTemplate

    @addThisScriptCache = {}
    @init()

  Share:: =
    init: ->
      self = this

      # load the addthis script
      $.when(@loadAddthisScript(@addThisScript)).then ->

        # truth in dom
        self.isAddThisLoaded true

        # sets addthis config if it hasn't been already
        self.setAddThisConfiguration()

        # creates the buttons from options and then inserts them into the dom
        self.$el.append self.buildAddThisHtml(self.options.addThisButtons)

        # displays the buttons after they've been added to the dom
        self.addThisButtonsContainer.show()

        # initialize 'follow' functionality
        self.initializeFollow()  if self.options.addThisButtonFollow


    isAddThisLoaded: (bool) ->

      # if argument is passed then function is setter
      @doc.data "addThisScriptLoaded", bool  if arguments_.length > 0 and typeof bool is "boolean"

      # truth in dom; if data attr hasn't been set yet, set it
      if typeof @doc.data("addThisScriptLoaded") is "undefined"
        @doc.data "addThisScriptLoaded", false
        return false
      @doc.data "addThisScriptLoaded"

    setAddThisConfiguration: ->

      # addthis_config is global to the page so only set it once
      if @isAddThisReady() is true and typeof window.addthis_config is "undefined"
        window.addthis_config = @addThisConfiguration
        window.addthis_share = @socialShareAddThisConfiguration

    loadAddthisScript: (val) ->

      # if cache has been set, return promise form these
      # else create new jqXHR object and store it in the cache
      promise = @addThisScriptCache[val]
      unless promise
        promise = $.ajax(
          url: @addThisScript
          cache: true
          dataType: "script"
        )
        @addThisScriptCache[val] = promise
      promise

    isAddThisReady: ->

      # check for global addthis object
      # doesn't seem to be a public method for getting version loaded
      # otherwise there should be a check here to compare version loaded is
      # the same as the version requested in the plugin init
      if typeof window.addthis is "undefined"
        false
      else
        true

    buildAddThisHtml: (buttons) ->

      # all possible services: http://www.addthis.com/services/list
      servicesMap =
        email:
          className: "addthis_button_email"
          title: "Email A Friend"

        linkedin:
          className: "addthis_button_linkedin"
          title: "Share on LinkedIn"

        facebook:
          className: "addthis_button_facebook"
          title: "Share on Facebook"

        twitter:
          className: "addthis_button_twitter"
          title: "Share on Twitter"

        googleplus:
          className: "addthis_button_google_plusone_share"
          title: "Share on Google+"

        addthis:
          className: "addthis_button_compact"
          title: "Share with AddThis Services"


      # class names for various icon sizes from addthis
      iconSizes =
        small: "addthis_default_style"
        medium: "addthis_20x20_style"
        large: "addthis_32x32_style"


      # class names for different button orientations
      buttonOrientation =
        horizontal: "addThisHorizontal"
        vertical: "addThisVertical"


      # creates the html for the buttons that addthis consumes and returns as icons
      addThisButtonHtml = (buttons) ->
        html = ""
        i = 0
        len = buttons.length

        while i < len
          html += "<a class=\"" + servicesMap[buttons[i]].className + "\" title=\"" + servicesMap[buttons[i]].title + "\" href=\"#\"></a>"  if buttons[i] of servicesMap
          i++
        html


      # div that holds the buttons for addthis services
      addThisButtonsContainer = $("<div>",
        class: "socialShare-addThis " + buttonOrientation[@options.addThisButtonOrientation] + " " + iconSizes[@options.addThisButtonSize]
        html: addThisButtonHtml(buttons)
      )
      @addThisButtonsContainer = addThisButtonsContainer
      addThisButtonsContainer

    initializeFollow: ->
      buttons = @addThisButtonsContainer
      wrapOuter = $("<div>",
        class: "socialShare-outer"
      )
      wrapInner = $("<div>",
        class: "socialShare-inner"
        width: @$el.width()
      )
      posConst =
        cssTop: parseInt(buttons.css("top"), 10) # the original 'top' value set in the css
        offTop: parseInt(@$el.offset().top, 10) # the top of the element that the buttons container would normally be in
        contentHeight: parseInt(@$el.outerHeight(), 10)

      self = this
      win = $(window)

      # ripped from underscore
      # http://documentcloud.github.com/underscore/#throttle
      throttle = (func, wait) ->
        context = undefined
        args = undefined
        timeout = undefined
        result = undefined
        previous = 0
        later = ->
          previous = new Date()
          timeout = null
          result = func.apply(context, args)

        ->
          now = new Date()
          remaining = wait - (now - previous)
          context = this
          args = arguments_
          if remaining <= 0
            clearTimeout timeout
            timeout = null
            previous = now
            result = func.apply(context, args)
          else timeout = setTimeout(later, remaining)  unless timeout
          result


      # sets (caches) a couple of variables that we can't set until
      # this buttons have loaded; unfortunately the AddThis api
      # doesn't provide an event hook for this
      setLimit = ->

        # check if button height has been set yet
        self.addThisButtonsContainerHeight = buttons.outerHeight()  if self.addThisButtonsContainerHeight is null

        # check if button limit has been set yet
        self.addThisButtonFollowLimit = posConst.contentHeight + posConst.offTop - posConst.cssTop - self.addThisButtonsContainerHeight  if self.addThisButtonFollowLimit is null

        # self-destruct function
        setLimit = ->


      # determines when the buttons will follow and when they'll stay
      updatePosition = ->

        # toggles the position (fixed or absolute) of wrapOuter
        # and adjusts the top position of the buttons
        adjustCss = (pos, top) ->
          wrapOuter.css position: pos
          buttons.css top: top + "px"


        # @todo; this can be improved
        if posConst.offTop - win.scrollTop() <= 0
          if self.addThisButtonFollowLimit <= win.scrollTop()
            adjustCss "absolute", self.addThisButtonFollowLimit + posConst.cssTop
          else
            adjustCss "fixed", posConst.cssTop
        else adjustCss "absolute", posConst.cssTop + posConst.offTop  if posConst.offTop - win.scrollTop() > 0


      # performance improvement by lowering the frequency of scroll events firing
      throttled = throttle(updatePosition, 25)

      # move buttons to body top in dom, adjust position top,
      # add class to container & wrap divs around buttons container
      buttons.css(top: posConst.cssTop + posConst.offTop + "px").prependTo("body").addClass("following").wrap(wrapOuter).wrap wrapInner

      # reset wrapOuter to hold jq object of itself
      wrapOuter = $(".socialShare-outer")

      # event handler for scrolling
      win.on "scroll", ->
        setLimit()
        throttled()

  # A really lightweight plugin wrapper around the constructor,
  # preventing against multiple instantiations
  $.fn[pluginName] = (options) ->
    @each ->
      $.data this, "plugin_" + pluginName, new Share(this, options)  unless $.data(this, "plugin_" + pluginName)
