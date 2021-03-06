if(!collections) var collections = {};
collections.dom = {};
collections.dom = (function() {
  var dom = {};

  /**
   * 传递函数给whenReay(),当文档解析完毕且为操作准备就绪时，
   * 函数将作为文档对象的方法调用
   * DOMContentLoad、readystatechange或load事件发生时会触发注册函数.
   * 一档文档准备就绪，所有函数都将被调用，任何传递给whenReady()函数.
   */
  var whenReady = (function() { // 这个函数返回whenReady()函数.
    var funcs = []; // 当获得事件时，要运行的函数.
    var ready = false; // 当触发事件处理程序时，切换到true.

    // 当文档准备就绪时，调用事件处理程序.
    function handler(e) {
      // 如果运行过一次，只需要返回.
      if (ready) return;

      // 如果发生readystatrechange事件,
      // 但其状态不是"complete"的话，那么文档尚未准备好.
      if(e.type === 'readystatechange' && document.readyState !== 'complete') { // 如果不是load事件则退出。
        return;
      }
      // 运行所有的注册函数.
      // 注意每次都要计算funcs.length,
      // 以防这些函数的调用可能会导致注册更多的函数.
      for(var i = 0; i < funcs.length; i++) {
        funcs[i].call(document);
      }
      // 现在设置ready表示为true,并移除掉所有函数.
      ready = true;
      funcs = null;
    }

    // 为接受到的任何事件注册处理程序.
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded',handler,false);
      document.addEventListener('readystatechange',handler,false);
    }
    else if(document.attachEvent) {
      document.attachEvent('onreadystatechange',handler);
      document.attachEvent('onload',handler);
    }
    // 返回whenReady()函数.
    return function whenReady(f) {
      if (ready) f.call(document); // 若准备完毕，只需要运行即可.
      else funcs.push(f);          // 否则，加入队列等候.
    }
  }());

  dom.method = {};
  dom.method.whenReady = whenReady;
  return dom;
}());