/**
 *This utils is to add new support to Array Objects  
 *
 * @author Vinícius Oliveira
 */

/**
 * Check if some element exist into the list
 * 
 * @param object 
 * @returns Boolean 
 */
Array.prototype.contain = function(object){
	return jQuery.inArray(object, this) == -1 ? false : true ;
};

/**
 * Remove some element from list and return 
 * if remotion was succeed 
 * 
 * @param index
 *  
 */

Array.prototype.remove = function(index){
	this.splice(index, 1);
};

/**
 * Check if value exist into list and return 
 * the index reference or -1 if not exist 
 * 
 * @param object
 * @returns Integer
 */
Array.prototype.getIndex = function(object){
	return jQuery.inArray(object, this);
};