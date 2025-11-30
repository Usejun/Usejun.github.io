/*!
 * Lunr languages, `stemmer` support
 */
!function(root,factory){
  if(typeof define==="function"&&define.amd){
    define(factory);
  }else if(typeof exports==="object"){
    module.exports=factory();
  }else{
    factory()(root.lunr);
  }
}(this,function(){
  return function(lunr){
    lunr.stemmerSupport = function() {};
  };
});
