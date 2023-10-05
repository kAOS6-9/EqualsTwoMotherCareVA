function touchHandler_m2t(event) {
  var touches = event.changedTouches,
  first = touches[0],
  type = "",
  moveInProgress = false;
  
  switch(event.type) {
    case "touchstart":
		type = "mousedown";
		break;
    case "touchmove":
		moveInProgress = true;
		type="mousemove";
		break;        
    case "touchend":
		moveInProgress = false;
		type="mouseup";
		break;
    default: return;
  }
  
  //initMouseEvent(type, canBubble, cancelable, view, clickCount,
  //           screenX, screenY, clientX, clientY, ctrlKey,
  //           altKey, shiftKey, metaKey, button, relatedTarget);
  
  var simulatedEvent = document.createEvent("MouseEvent");
  simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                first.screenX, first.screenY,
                                first.clientX, first.clientY, false,
                                false, false, false, 0/*left*/, null);
  
	first.target.dispatchEvent(simulatedEvent);
	if ($(event.target).hasClass("draggable") && moveInProgress) {
		event.preventDefault();
	}
}

function init_m2t() {
  document.addEventListener("touchstart", touchHandler_m2t, true);
  document.addEventListener("touchmove", touchHandler_m2t, true);
  document.addEventListener("touchend", touchHandler_m2t, true);
  document.addEventListener("touchcancel", touchHandler_m2t, true);
}

function uninit_m2t() {
  document.removeEventListener("touchstart", touchHandler_m2t, true);
  document.removeEventListener("touchmove", touchHandler_m2t, true);
  document.removeEventListener("touchend", touchHandler_m2t, true);
  document.removeEventListener("touchcancel", touchHandler_m2t, true);    
}