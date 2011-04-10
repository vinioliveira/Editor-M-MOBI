/**
 *This Utils is to add new suport to Array Objects  
 */

Array.prototype.remove = function(index){
	this[index]= null;
};