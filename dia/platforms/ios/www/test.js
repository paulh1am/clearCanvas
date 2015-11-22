



function collision('" + $(this.elem) + "', $("#" + idArray[i]) ){
  	  var x1 = $(this.elem).offset().left;
      var y1 = $(this.elem).offset().top;
      var h1 = $(this.elem).outerHeight(true);
      var w1 = $(this.elem).outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $("#" + idArray[i]).offset().left;
      var y2 = $("#" + idArray[i]).offset().top;
      var h2 = $("#" + idArray[i]).outerHeight(true);
      var w2 = $("#" + idArray[i]).outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
        
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
}
