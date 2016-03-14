window.Fluidy = (function() {
  
  var lastEl = null;
  var firstElCol = null;
  var lastElCol = null;
  var countLeft = 0;
  var activeCol = 0;
  var element = null;
  var options = {
    width: '100px',
    columns: 2
  };
  
  var setContentStyles = function(el) {
    el.style.position = 'relative';
    el.style.width = '100%';
  };
  
  var setActiveCol = function() {
    if (activeCol == options.columns) { 
        activeCol = 1; 
        countLeft = 0;
    } else { 
        activeCol++;
        countLeft += lastEl ? Number(lastEl.clientWidth) : 0;
    }
  };
  
  var setItemStyles = function(el) {
    el.style.width = options.width;
    el.style.position = 'absolute';  
  };
  
  var setPosition = function(el) { 
    
    function _setTop(el, _el) {
      el.style.top = _el.clientHeight + Number(_el.style.top.replace('px','')) + 'px';
    }
    
    function _setLeft(el, _el) {
      el.style.left = countLeft + 'px';
    }
 
    if (lastEl) {      
      if (activeCol > 1) {
        _setLeft(el, lastEl);
        
        if (lastElCol) {
          _setTop(el, lastElCol);
        }
        
        if (activeCol == options.columns) {
          lastElCol = el;
        }  else {
          lastElCol = null;
        }             
      } else {    
        _setTop(el, firstElCol);
        firstElCol = el;
      } 
    } else {
      firstElCol = el;
      el.style.top = '0px';
    }
    
  };
  
  function Fluidy(el, params) {
    element = el;
    children = element.children;
    options = params;
    setContentStyles(element);
    
    var childrenLen = children.length; 
    for (var i = 0; i < childrenLen; i++) {
      var item = children[i]; 
      setItemStyles(item);
      setActiveCol();
      setPosition(item);
      lastEl = item;
    }
  }
  
  return Fluidy;
  
})();
