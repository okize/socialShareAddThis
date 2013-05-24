# addThisShare

## Summary

A plugin for adding the social sharing component to microsites. This component is cross-browser and cross-platform compatible.

## Options

Option | Description
--- | ---
addThisProfileID | Default is set to false. Change this to whatever profile id should be used (this is global to the page)
addThisApiVersion | Options are: 300, 250, 200, 150
addThisButtons | Options are: email, linkedin, facebook, twitter, googleplus, addthis
addThisCss | set to false to disable addthis styles
addThisButtonSize | Options are: small, medium, large
addThisButtonOrientation | Options are: horizontal, vertical
addThisButtonFollow | Default is set to false. Set to true to allow the buttons to 'follow' while scrolling
addThisTwitterTemplate | Template for twitter sharing. Adds in the default title and URL. So far this only works for Twitter.
googleAnalyticsID | include GA account ID for tracking

#### Size Options

Small: 16px X 16px

Medium: 20px X 20px

Large: 32px X 32px

## To Implement

There is no HTML that needs to be added to the template to initiate this component. Copy the contents of the minified javascript of this plugin into the javascript file already associated with your site. Also copy the function from the example/test.js file for the specific instance of the component that you're adding to the site.

```javascript
$('#micrositeContent').addThisShare({
  addThisButtons: ['email', 'linkedin', 'facebook', 'twitter', 'googleplus', 'addthis'],
  addThisButtonOrientation: 'vertical',
  addThisButtonSize: 'large',
  addThisButtonFollow: true
});
```

## CSS

Make sure to copy the CSS associated with this component and paste it into the stylesheet associated with your website. Modify the styles as needed to match the mock-up provided.

## Icons

The JavaScript can be modified to add or remove social sharing icons.

### Vertical Slider

For the vertical slider, the icons added by default are: Email, LinkedIn, Facebook, Twitter, GooglePlus, AddThis

### Horizontal Panel (Header)

The icons added by default are: Email, Facebook, LinkedIn, Twitter

### Horizontal Panel (Full Column)

The icons added by default are: Facebook, Twitter, Linkedin, Email


#### Note About Icons

The icons are controlled by the AddThis plugin. It is not something we can manipulate. The functionality for the email is also controlled by the plugin and not something we can manipulate.







