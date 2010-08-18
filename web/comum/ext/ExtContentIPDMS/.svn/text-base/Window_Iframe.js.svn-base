var winchoose=null;		
var win =null;


//WINDOW EXT//

function ExtWindow(title,action,paramts,type){
	return ExtWindowAll(title,action,paramts,type,true,true,true,550,400,true,true,'fit');
}

function ExtWindowSizeParam(title,action,paramts,type,width,height){
	return ExtWindowAll(title,action,paramts,type,true,true,true,width,height,true,true,'fit');
}

function ExtWindowAll(title,action,paramts,type,animCollapse,modal,maximizable,width,height,plain,closable,layout){

	//criar IFrame para carregar paginas completas//
	Ext.ux.IFrameComponent = Ext.extend(Ext.BoxComponent, {
		    onRender : function(ct, position){
		         this.el = ct.createChild({tag: 'iframe', id: 'iframe-'+ this.id, frameBorder: 0, src: this.url});
		    }
	});

	//garantir uma window de cada vez
	if ( winchoose != null && winchoose.isVisible() )
		return;

	//POPUP WINDOW//        
	winchoose = new Ext.Window({
		animEl        : this,
		//animateTarget : document.forms[0],//animar rendering da window a partir do botão definido--performance???
		animCollapse  : animCollapse,
		id            : 'windowPop',
		title         : title,
		modal         : modal,//desactivar background enquanto a janela esta activa
		maximizable   : maximizable,
		width         : width,
		height        : height,        
		plain         : plain,
		closable      : closable,
		layout        : layout,
		scope         : this,
		listeners : {//reset window size
			show: function() {
			this.setHeight(height);
			this.setWidth(width);
			}
			}
	});

	//EVENTOS//
	//antes renderizar winddow adicionar conteudo   
	winchoose.on('beforerender', function(p){
		
		//se for para adicionar html usar componente iframe
		if(type=='html')
			winchoose.add({items: [new Ext.ux.IFrameComponent({ id: 'teste', url: action})],layout:'fit'})
			//caso seja para adicionar componentes ext usar request do Ext
			else{
				Ext.Ajax.request({
					url       : action,
					method    : 'post',
					scripts   : true,
					params    : paramts,			 			 	
					success   : function(response) {

					//adicionar componentes EXT- treepanel, panels...etc....
					winchoose.add(eval( response.responseText));      		 
					winchoose.doLayout();
				}
				});
			}
	});            

	//limpar window        
	winchoose.on('beforeclose', function( p ) { 

		winchoose = null
		win=null;
	});


	//mostrar a popwindow
	winchoose.show();      
	return winchoose;
}