// inits can be either both on window.load or doc.ready but not mixed
// if mixed, only doc.ready plugin loads
$(document).on('ready', function() {

  $('body *').inlineIpsum({token: '@'});

  $('#micrositeHeader').socialShareAddThis({
     addThisButtons: ['email', 'linkedin', 'facebook', 'twitter']
  });

  $('#micrositeContentColumnFull').socialShareAddThis({
     addThisButtons: ['facebook', 'twitter', 'linkedin', 'email']
  });

  // no buttons
  $('#micrositeFooter').socialShareAddThis({
     addThisButtons: []
  });

  $('#micrositeContent').socialShareAddThis({
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter', 'googleplus', 'addthis'],
    addThisButtonOrientation: 'vertical',
    addThisButtonSize: 'large',
    addThisButtonFollow: true
  });

});

$(window).on('load', function() {

  // loads in AddThis Service Metadata
  $('#serviceMetaData').on('click', function (e) {

    e.preventDefault();

    // remove click handler
    $(this).off('click').parent('p').remove();

    // get json
    function getServiceApiJson( ) {
      return $.ajax({
        url: 'http://cache.addthiscdn.com/services/v1/sharing.en.jsonp',
        crossDomain: true,
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        jsonpCallback: 'callback'
      }).pipe(function (data) {
        return data.data;
      });
    }

    getServiceApiJson().done(function (services) {

      // iterrate through json and build table rows
      for (var i = 0, len = services.length, rows; i < len; i++) {
        rows += '<tr>';
        rows += '<td>' + (i+1) + '</td>';
        rows += '<td>' + services[i].name + '</td>';
        rows += '<td>' + services[i].code + '</td>';
        // rows += '<td><span class="addthis_service_icon icon_' + services[i].code + '"></span></td>';
        rows += '<td><img src="' + services[i].icon + '" height="16" width="16" /></td>';
        rows += '<td><img src="' + services[i].icon32 + '" height="32" width="32" /></td>';
        rows += '<td>' + services[i].endpoint + '</td>';
        rows += '</tr>';
      }

      // add rows & show the table
      $('#serviceMetaDataTable').append(rows).show();

    });

  });

});

var addthisEventHandler = function (e) {
  // console.log(e);
  var addthisObj = window.addthis;
  var addThisObjects = [];
  var addThisFunctions = [];
  var addThisProperties = [];
  for (var prop in addthisObj) {

    if (typeof addthisObj[prop] === 'object') {
      addThisObjects.push(prop);
    } else if (typeof addthisObj[prop] === 'function') {
      addThisFunctions.push(prop);
    } else {
      addThisProperties.push(prop);
    }

  }

  addThisObjects.sort();
  addThisFunctions.sort();
  addThisProperties.sort();

  console.group('OBJECTS:');

  for (var i = 0, len = addThisObjects.length, objName; i < len; i++) {
    objName = addThisObjects[i];
    console.log(objName + '\n' + '-> ' + addthisObj[ objName ]);
  }

  console.groupEnd();

  console.groupCollapsed('FUNCTIONS:');

  for (var j = 0, len2 = addThisFunctions.length, funcName; j < len2; j++) {
    funcName = addThisFunctions[j];
    console.log(funcName + '\n' + '-> ' + addthisObj[ addThisFunctions[j] ]);
  }

  console.groupEnd();

  console.groupCollapsed('PROPERTIES:');

  for (var k = 0, len3 = addThisProperties.length, propName; k < len3; k++) {
    propName = addThisProperties[k];
    console.log(propName + '\n' + '-> ' + addthisObj[ propName ]);
  }

  console.groupEnd();

};

var addthisEventListeners = function () {
  window.addthis.addEventListener('addthis.ready', addthisEventHandler);
  window.addthis.addEventListener('addthis.menu.open', addthisEventHandler);
  window.addthis.addEventListener('addthis.menu.close', addthisEventHandler);
  window.addthis.addEventListener('addthis.menu.share', addthisEventHandler);
  window.addthis.addEventListener('addthis.user.ready', addthisEventHandler);
};

var isAddthisLoaded = function () {
  if (typeof window.addthis === 'undefined') {
    setTimeout(isAddthisLoaded, 200);
  } else {
    addthisEventListeners();
  }
};

// isAddthisLoaded();







var Lorem;(function(){Lorem=function(){this.type=null;this.query=null;this.data=null;};Lorem.IMAGE=1;Lorem.TEXT=2;Lorem.TYPE={PARAGRAPH:1,SENTENCE:2,WORD:3};Lorem.WORDS=["lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","ut","aliquam,","purus","sit","amet","luctus","venenatis,","lectus","magna","fringilla","urna,","porttitor","rhoncus","dolor","purus","non","enim","praesent","elementum","facilisis","leo,","vel","fringilla","est","ullamcorper","eget","nulla","facilisi","etiam","dignissim","diam","quis","enim","lobortis","scelerisque","fermentum","dui","faucibus","in","ornare","quam","viverra","orci","sagittis","eu","volutpat","odio","facilisis","mauris","sit","amet","massa","vitae","tortor","condimentum","lacinia","quis","vel","eros","donec","ac","odio","tempor","orci","dapibus","ultrices","in","iaculis","nunc","sed","augue","lacus,","viverra","vitae","congue","eu,","consequat","ac","felis","donec","et","odio","pellentesque","diam","volutpat","commodo","sed","egestas","egestas","fringilla","phasellus","faucibus","scelerisque","eleifend","donec","pretium","vulputate","sapien","nec","sagittis","aliquam","malesuada","bibendum","arcu","vitae","elementum","curabitur","vitae","nunc","sed","velit","dignissim","sodales","ut","eu","sem","integer","vitae","justo","eget","magna","fermentum","iaculis","eu","non","diam","phasellus","vestibulum","lorem","sed","risus","ultricies","tristique","nulla","aliquet","enim","tortor,","at","auctor","urna","nunc","id","cursus","metus","aliquam","eleifend","mi","in","nulla","posuere","sollicitudin","aliquam","ultrices","sagittis","orci,","a","scelerisque","purus","semper","eget","duis","at","tellus","at","urna","condimentum","mattis","pellentesque","id","nibh","tortor,","id","aliquet","lectus","proin","nibh","nisl,","condimentum","id","venenatis","a,","condimentum","vitae","sapien","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","sed","tempus,","urna","et","pharetra","pharetra,","massa","massa","ultricies","mi,","quis","hendrerit","dolor","magna","eget","est","lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","integer","eget","aliquet","nibh","praesent","tristique","magna","sit","amet","purus","gravida","quis","blandit","turpis","cursus","in","hac","habitasse","platea","dictumst","quisque","sagittis,","purus","sit","amet","volutpat","consequat,","mauris","nunc","congue","nisi,","vitae","suscipit","tellus","mauris","a","diam","maecenas","sed","enim","ut","sem","viverra","aliquet","eget","sit","amet","tellus","cras","adipiscing","enim","eu","turpis","egestas","pretium","aenean","pharetra,","magna","ac","placerat","vestibulum,","lectus","mauris","ultrices","eros,","in","cursus","turpis","massa","tincidunt","dui","ut","ornare","lectus","sit","amet","est","placerat","in","egestas","erat","imperdiet","sed","euismod","nisi","porta","lorem","mollis","aliquam","ut","porttitor","leo","a","diam","sollicitudin","tempor","id","eu","nisl","nunc","mi","ipsum,","faucibus","vitae","aliquet","nec,","ullamcorper","sit","amet","risus","nullam","eget","felis","eget","nunc","lobortis","mattis","aliquam","faucibus","purus","in","massa","tempor","nec","feugiat","nisl","pretium","fusce","id","velit","ut","tortor","pretium","viverra","suspendisse","potenti","nullam","ac","tortor","vitae","purus","faucibus","ornare","suspendisse","sed","nisi","lacus,","sed","viverra","tellus","in","hac","habitasse","platea","dictumst","vestibulum","rhoncus","est","pellentesque","elit","ullamcorper","dignissim","cras","tincidunt","lobortis","feugiat","vivamus","at","augue","eget","arcu","dictum","varius","duis","at","consectetur","lorem","donec","massa","sapien,","faucibus","et","molestie","ac,","feugiat","sed","lectus","vestibulum","mattis","ullamcorper","velit","sed","ullamcorper","morbi","tincidunt","ornare","massa,","eget","egestas","purus","viverra","accumsan","in","nisl","nisi,","scelerisque","eu","ultrices","vitae,","auctor","eu","augue","ut","lectus","arcu,","bibendum","at","varius","vel,","pharetra","vel","turpis","nunc","eget","lorem","dolor,","sed","viverra","ipsum","nunc","aliquet","bibendum","enim,","facilisis","gravida","neque","convallis","a","cras","semper","auctor","neque,","vitae","tempus","quam","pellentesque","nec","nam","aliquam","sem","et","tortor","consequat","id","porta","nibh","venenatis","cras","sed","felis","eget","velit","aliquet","sagittis","id","consectetur","purus","ut","faucibus","pulvinar","elementum","integer","enim","neque,","volutpat","ac","tincidunt","vitae,","semper","quis","lectus","nulla","at","volutpat","diam","ut","venenatis","tellus","in","metus","vulputate","eu","scelerisque","felis","imperdiet","proin","fermentum","leo","vel","orci","porta","non","pulvinar","neque","laoreet","suspendisse","interdum","consectetur","libero,","id","faucibus","nisl","tincidunt","eget","nullam","non","nisi","est,","sit","amet","facilisis","magna","etiam","tempor,","orci","eu","lobortis","elementum,","nibh","tellus","molestie","nunc,","non","blandit","massa","enim","nec","dui","nunc","mattis","enim","ut","tellus","elementum","sagittis","vitae","et","leo","duis","ut","diam","quam","nulla","porttitor","massa","id","neque","aliquam","vestibulum","morbi","blandit","cursus","risus,","at","ultrices","mi","tempus","imperdiet","nulla","malesuada","pellentesque","elit","eget","gravida","cum","sociis","natoque","penatibus","et","magnis","dis","parturient","montes,","nascetur","ridiculus","mus","mauris","vitae","ultricies","leo","integer","malesuada","nunc","vel","risus","commodo","viverra","maecenas","accumsan,","lacus","vel","facilisis","volutpat,","est","velit","egestas","dui,","id","ornare","arcu","odio","ut","sem","nulla","pharetra","diam","sit","amet","nisl","suscipit","adipiscing","bibendum","est","ultricies","integer","quis","auctor","elit","sed","vulputate","mi","sit","amet","mauris","commodo","quis","imperdiet","massa","tincidunt","nunc","pulvinar","sapien","et","ligula","ullamcorper","malesuada","proin","libero","nunc,","consequat","interdum","varius","sit","amet,","mattis","vulputate","enim","nulla","aliquet","porttitor","lacus,","luctus","accumsan","tortor","posuere","ac","ut","consequat","semper","viverra","nam","libero","justo,","laoreet","sit","amet","cursus","sit","amet,","dictum","sit","amet","justo","donec","enim","diam,","vulputate","ut","pharetra","sit","amet,","aliquam","id","diam","maecenas","ultricies","mi","eget","mauris","pharetra","et","ultrices","neque","ornare","aenean","euismod","elementum","nisi,","quis","eleifend","quam","adipiscing","vitae","proin","sagittis,","nisl","rhoncus","mattis","rhoncus,","urna","neque","viverra","justo,","nec","ultrices","dui","sapien","eget","mi","proin","sed","libero","enim,","sed","faucibus","turpis","in","eu","mi","bibendum","neque","egestas","congue","quisque","egestas","diam","in","arcu","cursus","euismod","quis","viverra","nibh","cras","pulvinar","mattis","nunc,","sed","blandit","libero","volutpat","sed","cras","ornare","arcu","dui","vivamus","arcu","felis,","bibendum","ut","tristique","et,","egestas","quis","ipsum","suspendisse","ultrices","gravida","dictum","fusce","ut","placerat","orci","nulla","pellentesque","dignissim","enim,","sit","amet","venenatis","urna","cursus","eget","nunc","scelerisque","viverra","mauris,","in","aliquam","sem","fringilla","ut","morbi","tincidunt","augue","interdum","velit","euismod","in","pellentesque","massa","placerat","duis","ultricies","lacus","sed","turpis","tincidunt","id","aliquet","risus","feugiat","in","ante","metus,","dictum","at","tempor","commodo,","ullamcorper","a","lacus","vestibulum","sed","arcu","non","odio","euismod","lacinia","at","quis","risus","sed","vulputate","odio","ut","enim","blandit","volutpat","maecenas","volutpat","blandit","aliquam","etiam","erat","velit,","scelerisque","in","dictum","non,","consectetur","a","erat","nam","at","lectus","urna","duis","convallis","convallis","tellus,","id","interdum","velit","laoreet","id","donec","ultrices","tincidunt","arcu,","non","sodales","neque","sodales","ut","etiam","sit","amet","nisl","purus,","in","mollis","nunc","sed","id","semper","risus","in","hendrerit","gravida","rutrum","quisque","non","tellus","orci,","ac","auctor","augue","mauris","augue","neque,","gravida","in","fermentum","et,","sollicitudin","ac","orci","phasellus","egestas","tellus","rutrum","tellus","pellentesque","eu","tincidunt","tortor","aliquam","nulla","facilisi","cras","fermentum,","odio","eu","feugiat","pretium,","nibh","ipsum","consequat","nisl,","vel","pretium","lectus","quam","id","leo","in","vitae","turpis","massa","sed","elementum","tempus","egestas","sed","sed","risus","pretium","quam","vulputate","dignissim","suspendisse","in","est","ante","in","nibh","mauris,","cursus","mattis","molestie","a,","iaculis","at","erat","pellentesque","adipiscing","commodo","elit,","at","imperdiet","dui","accumsan","sit","amet","nulla","facilisi","morbi","tempus","iaculis","urna,","id","volutpat","lacus","laoreet","non","curabitur","gravida","arcu","ac","tortor","dignissim","convallis","aenean","et","tortor","at","risus","viverra","adipiscing","at","in","tellus","integer","feugiat","scelerisque","varius","morbi","enim","nunc,","faucibus","a","pellentesque","sit","amet,","porttitor","eget","dolor","morbi","non","arcu","risus,","quis","varius","quam","quisque","id","diam","vel","quam","elementum","pulvinar","etiam","non","quam","lacus","suspendisse","faucibus","interdum","posuere","lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","duis","tristique","sollicitudin","nibh","sit","amet","commodo","nulla","facilisi","nullam","vehicula","ipsum","a","arcu","cursus","vitae","congue","mauris","rhoncus","aenean","vel","elit","scelerisque","mauris","pellentesque","pulvinar","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","maecenas","pharetra","convallis","posuere","morbi","leo","urna,","molestie","at","elementum","eu,","facilisis","sed","odio","morbi","quis","commodo","odio","aenean","sed","adipiscing","diam","donec","adipiscing","tristique","risus","nec","feugiat","in","fermentum","posuere","urna","nec","tincidunt","praesent","semper","feugiat","nibh","sed","pulvinar","proin","gravida","hendrerit","lectus","a","molestie"];Lorem.prototype.randomInt=function(min,max){return Math.floor(Math.random()*(max-min+1))+min;};Lorem.prototype.createText=function(count,type){switch(type){case Lorem.TYPE.PARAGRAPH:var paragraphs=new Array;for(var i=0;i<count;i++){var paragraphLength=this.randomInt(10,20);var paragraph=this.createText(paragraphLength,Lorem.TYPE.SENTENCE);paragraphs.push(paragraph);}return paragraphs.join("\n");break;case Lorem.TYPE.SENTENCE:var sentences=new Array;for(var i=0;i<count;i++){var sentenceLength=this.randomInt(5,10);var words=this.createText(sentenceLength,Lorem.TYPE.WORD).split(" ");words[0]=words[0].substr(0,1).toUpperCase()+words[0].substr(1);var sentence=words.join(" ");sentences.push(sentence);}return(sentences.join(". ")+".").replace(/(\.\,|\,\.)/g,".");break;case Lorem.TYPE.WORD:var wordIndex=this.randomInt(0,Lorem.WORDS.length-count-1);return Lorem.WORDS.slice(wordIndex,wordIndex+count).join(" ").replace(/\.|\,/g,"");break;}};Lorem.prototype.createLorem=function(element){var lorem=new Array;var count=parseInt(this.query);if(/\d+p/.test(this.query)){var type=Lorem.TYPE.PARAGRAPH;}else{if(/\d+s/.test(this.query)){var type=Lorem.TYPE.SENTENCE;}else{if(/\d+w/.test(this.query)){var type=Lorem.TYPE.WORD;}}}lorem.push(this.createText(count,type));lorem=lorem.join(" ");if(element){if(this.type==Lorem.TEXT){element.innerHTML+=lorem;}else{if(this.type==Lorem.IMAGE){var path="";var options=this.query.split(" ");if(options[0]=="gray"){path+="/g";options[0]="";}if(element.getAttribute("width")){path+="/"+element.getAttribute("width");}if(element.getAttribute("height")){path+="/"+element.getAttribute("height");}path+="/"+options.join(" ").replace(/(^\s+|\s+$)/,"");element.src="http://lorempixum.com"+path.replace(/\/\//,"/");}}}if(element==null){return lorem;}};if(typeof jQuery!="undefined"){(function($){$.fn.lorem=function(){$(this).each(function(){var lorem=new Lorem;lorem.type=$(this).is("img")?Lorem.IMAGE:Lorem.TEXT;lorem.query=$(this).data("lorem");lorem.createLorem(this);});};$(document).ready(function(){$("[data-lorem]").lorem();});})(jQuery);}})();
/*!
 * jQuery replaceText - v1.1 - 11/21/2009
 * http://benalman.com/projects/jquery-replacetext-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){$.fn.replaceText=function(search,replace,text_only){return this.each(function(){var node=this.firstChild,val,new_val,remove=[];if(node){do{if(node.nodeType===3){val=node.nodeValue;new_val=val.replace(search,replace);if(new_val!==val){if(!text_only&&/</.test(new_val)){$(node).before(new_val);remove.push(node);}else{node.nodeValue=new_val;}}}}while(node=node.nextSibling);}remove.length&&$(remove).remove();});};})(jQuery);(function($,window,document,undefined){var IpsumWriter={_lorem:new Lorem(),_buffer:"",_addBuffer:function(item){this._buffer+=(typeof item==="string")?item:item[0].outerHTML;},_getWords:function(count){return this._lorem.createText(count,Lorem.TYPE.WORD);},_getSentences:function(count){return this._lorem.createText(count,Lorem.TYPE.SENTENCE);},_getParagraphs:function(count){return this._lorem.createText(count,Lorem.TYPE.PARAGRAPH);},_tagBuilder:function(tag,text,attributes){attributes=$.extend({},{text:text},attributes);return $(tag,attributes);},p:function(paragraphCount,sentenceCount,attributes){paragraphCount=paragraphCount||1;sentenceCount=sentenceCount||5;var tag="<p></p>";for(var i=0;i<paragraphCount;i++){this._addBuffer(this._tagBuilder(tag,this._getSentences(sentenceCount),attributes));}return this;},_image:function(width,height,text,bgColor,fgColor,attributes){height=height||width;bgColor=bgColor||"eee";var dim=width+"x"+height+"/";fgColor=(typeof fgColor!="undefined")?fgColor+"/":"";bgColor=(typeof fgColor!="undefined")?bgColor+"/":"";text=(typeof text!="undefined")?"&text="+text:"";var tag="<image/>";var imgUrl="http://placehold.it/"+dim+fgColor+bgColor+text;attributes=$.extend({},{"src":imgUrl},attributes);return this._tagBuilder(tag,"",attributes);},image:function(width,height,text,bgColor,fgColor,attributes){this._addBuffer(this._image(width,height,text,bgColor,fgColor,attributes));return this;},_h:function(level,wordCount,attributes){wordCount=wordCount||2;var tag="<h"+level+"></h"+level+">";this._addBuffer(this._tagBuilder(tag,this._getWords(wordCount),attributes));return this;},_listItem:function(tag,wordCount,hasLink,attributes){wordCount=wordCount||2;var lorem=new Lorem();hasLink=hasLink||false;var li=this._tagBuilder(tag,this._getWords(wordCount),attributes);if(hasLink){li.wrapInner("<a href='#'></a>");}return li;},_list:function(outerTag,innerTag,count,wordCount,hasLinks,outerAttributes,innerAttributes){wordCount=wordCount||2;count=count||5;var outerElem=this._tagBuilder(outerTag,"",outerAttributes);for(var i=0;i<count;i++){outerElem.append(this._listItem(innerTag,wordCount,hasLinks,innerAttributes));}this._addBuffer(outerElem);},write:function(){return this._buffer;},words:function(wordCount){wordCount=wordCount||2;this._addBuffer(this._getWords(wordCount));return this;},sentences:function(sentencesCount){sentencesCount=sentencesCount||5;this._addBuffer(this._getSentences(sentencesCount));return this;},paragraphs:function(count){this._addBuffer(this._getParagraphs(count));return this;},dl:function(listCount,wordCount,hasLinks,olAttributes,liAttributes){this._list("<dl></dl>","<dd></dd>",listCount,wordCount,hasLinks,olAttributes,liAttributes);return this;},ol:function(listCount,wordCount,hasLinks,olAttributes,liAttributes){this._list("<ol></ol>","<li></li>",listCount,wordCount,hasLinks,olAttributes,liAttributes);return this;},ul:function(listCount,wordCount,hasLinks,ulAttributes,liAttributes){this._list("<ul></ul>","<li></li>",listCount,wordCount,hasLinks,ulAttributes,liAttributes);return this;},h1:function(wordCount,attributes){this._h(1,wordCount,attributes);return this;},h2:function(wordCount,attributes){this._h(2,wordCount,attributes);return this;},h3:function(wordCount,attributes){this._h(3,wordCount,attributes);return this;},h4:function(wordCount,attributes){this._h(4,wordCount,attributes);return this;},h5:function(wordCount,attributes){this._h(5,wordCount,attributes);return this;},h6:function(wordCount,attributes){this._h(6,wordCount,attributes);return this;},blogPost:function(){this.h1(3).p(2,25).h2().p(3,15).h3(2).p();return this;}};var Ipsum;var settings;var inline=function(str){Ipsum=Object.create(settings.extension);var command=str.replace(settings.token+settings.locator+".","").concat(".write()");var result;try{result=eval(command);}catch(e){result=$("<em></em>",{text:"Go home Ipsum you're drunk",style:"color: transparent;text-shadow: 0px 0px 2px #FF33FF;",title:e.message})[0].outerHTML;}return result;};$.fn.inlineIpsum=function(options){if(options&&options.extension){options.extension=$.extend({},$.fn.inlineIpsum.options.extension,options.extension);}settings=$.extend({},$.fn.inlineIpsum.options,options);return this.replaceText(new RegExp(settings.token+settings.locator+".Ipsum(\\..*?\\))*","gi"),inline);};$.fn.inlineIpsum.options={extension:IpsumWriter,locator:"Html",token:"@"};})(jQuery,window,document);