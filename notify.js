
/** 

**/
(function($){
    var Notify = function(opts,opts1,opts2){
        var self = this;
        this.defaultOptions = {

        //modal placement settings
            topCenter:{
                top: '10%',
                left: '30%',
            },
            topRight:{
                top:0,
                left:'95%'
            },
            topLeft:{
                top: '0%',
                left: '0%',
            },
            middleCenter:{
                top: '140px',
                left: '30%'
            },
            middleRight:{
                top: '10%',
                left: '40%',
            },
            middleLeft:{
                top: '10%',
                left: '40%',
            },
            bottomCenter:{
                top: '10%',
                left: '40%',
            },
            bottomLeft:{
                top: '10%',
                left: '40%',
            },
            bottomRight:{
                top: '10%',
                left: '40%',
            },
            
        //modal css properties
            modalBoxShadow: '0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0,0.12)',
            modalPosition: 'fixed',
            modalWidth: 'auto',
            modalHeight: 'auto',
            modalZIndex: 9999,
            modalBgColor:  '#00d1b2', 
            modalPadding: '.75rem 1.25rem',
            modalMargin: '0 0 1rem 0',
            modalBorder: '1px solid transparent',
            modalBorderRadius: '.25rem',
            modalColor:'white',

        //modal settings properties
            modalFade: false,
            modalMsgType: 'success',
            modalFadeInSpeed: 2000,
            modalFadeOutSpeed :  5000,
            modalTitle: 'Peculai Notify',
            modalData:'This a peculiar alert modal',
            modalType:'',
            modalMultiple:false,
            modalAppendTo:'body',
            modalClass:'notify-modal-window',
            modalPlacement:'topCenter',

        //overlay settings properties
            showOverlay: true,
            overlayAppendTo: function(){
                return self.options.modalAppendTo},
            overlayClass:'notify-modal-overlay',

        //overlay css properties
            overlayPosition: 'fixed',
            overlayBgColor: 'rgba(0,0,0,.5)' , 
            overlayZIndex: 999,
        
        //close button css properties
            closeBtnColor:'white',
            closeBtnBgColor: '',
            closeBtnPosition:'absolute ',
            closeBtnBorderRadius: '50%',
        
        //close button properties
            showCloseBtn: true,
            closeBtnIcon:'',
            closeBtnText : '&times',
            closeBtnPlacement:'topRight',
            customModalStyles:{},
            customCloseBtnStyles:{},

            dismissOnClickOverlay:true,
            overRideDefaultStyles:false,
            modalMediaQUeries:'',
            
        }

        this.opts = opts; // options (object or string)
        this.opts1 = opts1; //options1 ( string)
        this.opts2 = opts2; //options2 (object)
        
        this.options = $.extend({},this.defaultOptions, opts);

        this.overlayStyles = {
            position: 'fixed',
            top: '0%',
            left: '0%',
            width: '100%',
            height: '100%',
            backgroundColor: this.options.overlayBgColor , 
            zIndex: this.options.overlayZIndex,
            display: this.options.showOverlay?'block':''
        };      
        this.initModalStyles = {
            boxShadow: this.options.modalBoxShadow,
            position: this.options.modalPosition,
            width: this.options.modalWidth,
            height: this.options.modalHeight,
            top: Notify.prototype.setPlacement(this,'modal').top,
            left: Notify.prototype.setPlacement(this,'modal').left,
            zIndex: this.options.modalZIndex,
            backgroundColor:  this.options.modalBgColor, 
            padding: this.options.modalPadding,
            margin: this.options.modalMargin,
            //marginBottom: '1rem',
            border: this.options.modalBorder,
            borderRadius: this.options.modalBorderRadius,
            color:this.options.modalColor
        }
        var self = this;
        this.modalStyles = Object.assign({}, this.initModalStyles, this.checkCustomStyles('modal'))
        this.initialCloseBtnStyles = {
            color:this.options.closeBtnColor,
            backgroundColor: this.options.closeBtnBgColor,
            position:this.options.closeBtnPosition,
            top:Notify.prototype.setPlacement(this,'').top,
            left:Notify.prototype.setPlacement(this,'').left,
            borderRadius: this.options.closeBtnBorderRadius,
            display: this.options.showCloseBtn?'block':''
        }
        this.closeBtnStyles = Object.assign({},this.initialCloseBtnStyles,this.checkCustomStyles('closeBtn'));
    }
    
    Notify.prototype = {

        /**
         * check customModalStyles not to overide initialModalStyles
         */
        checkCustomStyles:function(type){
            var self = this;
            
                switch (type) {
                    case 'modal':
                        if(this.options.overRideDefaultStyles){
                            return this.options.customModalStyles
                        }
                        var props = Object.getOwnPropertyNames(this.options.customModalStyles);
                        props.filter(function(prop){
                            if(self.initModalStyles[prop]){
                                console.log("You have overidden default "+prop)
                                delete self.options.customModalStyles[prop];
                            }
                        })
                        return this.options.customModalStyles;
                        break;
                    case 'closeBtn':
                        if(this.options.overRideDefaultStyles){
                            return this.options.customCloseBtnStyles
                        }
                        var props = Object.getOwnPropertyNames(this.options.customCloseBtnStyles);
                        props.filter(function(prop){
                            if(self.initialCloseBtnStyles[prop]){
                                console.log("You have overidden default "+prop)
                                delete self.options.customCloseBtnStyles[prop];
                            }
                        })
                    return this.options.customCloseBtnStyles;
                    default:
                        break;
                }
        },
        
        /**
         * initialise the modal
         */
        initModal : function (cls=null) {
            //alert(this.checkCustomModalStyles())
            return $("<div>")
            .css(this.modalStyles)
            .addClass(this.options.modalClass)
            .appendTo(this.options.modalAppendTo);//this.modalSettings.appendTo
        },

        /**
         * choose placement configuration
         * @param {*} thiz 
         * @param {*} placement 
         */
        setPlacement:function(thiz,placement){
            var placement = (placement=='modal')?thiz.options.modalPlacement:thiz.options.closeBtnPlacement;
            switch (placement) {
                case 'topCenter':
                    return thiz.options.topCenter;
                    break;
                case 'topRight':
                    return thiz.options.topRight;
                    break;
                case 'topLeft':
                    return thiz.options.topLeft;
                    break;
                case 'middleRight':
                    return thiz.options.middleRight;
                    break;
                case 'middleLeft':
                    return thiz.options.middleLeft;
                    break;
                case 'middleCenter':
                    return thiz.options.middleCenter;
                    break;
                    case 'bottomCenter':
                    return thiz.options.bottomCenter;
                    break;
                case 'bottomRight':
                    return thiz.options.bottomRight;
                    break;
                case 'bottomLeft':
                    return thiz.options.bottomLeft;
                    break;
                default:
                return (typeof(placement)=='object')?placement:thiz.options.topCenter
                    break;
            }
        },

        /**
         * activate the modal
         */
        activateModal:function(){
            //this.checkOpts2();
            if(this.options.multipleModal){
                //alert(Math.random());
                //return;
               //this.options.modalClass = Math.random().toString();
                return this.initModal();
            }else{
                if ($("."+this.options.modalClass).length === 0){
                    return this.initModal();
                }else{
                    return $("."+this.options.modalClass);
                }
            }
        },

        /**
         * initialize overlay
         */
        initOverlay: function(){
            //alert(this.options.overlayAppendTo())
            //this.checkOpts2();
            if(this.options.showOverlay){
                if ($("."+this.options.overlayClass).length === 0)
                {
                    var self = this;
                    return $("<div>")
                    .css(this.overlayStyles)
                    .addClass(this.options.overlayClass)
                    .click(function(event){
                        if(self.options.dismissOnClickOverlay){
                            self.boxOut(event);
                        }
                    })
                    .appendTo(this.options.overlayAppendTo());
                }
                else
                {
                    return $("."+this.options.overlayClass);
                }
            }
        },

        /**
         * decide modal type to show
         */
        showModal: function(){
           // alert(this.options.customCloseBtnStyles['font-size']);
            this.checkOpts2();
            var type = this.options.modalType;
            switch (type) {
                case 'alert':
                    this.boxIn()
                    break;
                default:
                
                   
                    var msgArray = ['success','error','warning','info'];
                    this.opts2 && typeof(this.opts2) != 'object' && console.log('you need to pass an object as the third parameter');
                    this.options.modalTitle= typeof(this.opts2) != 'object' && msgArray.find((msg)=>msg==this.opts)?this.opts.toUpperCase():
                    (typeof(this.opts2) == 'object' && this.opts2.title)? this.opts2.title: this.options.modalTitle;
                   this.boxIn(this.opts,this.opts1)
                   return this;
            }
        },

        /**
         * set a modal message type
         * @param {*} type 
         */
        checkMsgType: function(type){
            switch (type) {
                case 'success':
                this.modalStyles.backgroundColor = '#00d1b2';
                    break;
                case 'warning':
                this.modalStyles.backgroundColor = '#eda514';
                    break;
                case 'info':
                this.modalStyles.backgroundColor = '#eda514';
                    break;
                case 'error':
                this.modalStyles.backgroundColor = 'red';
                    break;
                default:
                    this.modalStyles.backgroundColor = type;
                    break;
            }
        },

        /**
         * check the third option passed to the object on default
         */
        checkOpts2: function(){
            if(typeof(this.opts2)=='object'){
                this.options = Object.assign({},this.defaultOptions,this.opts2);
                //this.options.multipleModal = this.opts2.multiple
            }
        },

        /**
         * implement modal
         * @param {*} type 
         * @param {*} msg 
         */
        boxIn : function(type,msg){
            if(typeof(this.opts) != 'object'){
                this.checkMsgType(type)
                var data = this.alertBox(msg);
            }else{
                this.checkMsgType(this.options.modalMsgType)
                var data = this.alertBox(this.options.modalData);
            }
            this.initOverlay()
            this.activateModal()
            .hide()
            .html(data)
            .appendTo(this.options.modalAppendTo);
            const s = document.createElement('style');
            s.textContent = '@media only screen and (max-width: 768px) {'+
                '.'+this.options.modalClass+'{'+
                'top: 10%;'+
                'left:5%; }}';
            document.head.appendChild(s, 'beforeend');
           return this.checkFade();
            
        },

        /**
         * check if modal should fade away
         */
        checkFade: function(){
            if(this.options.modalFade){
                $("."+this.options.modalClass+", ."+this.options.overlayClass).fadeIn(this.options.fadeInSpeed)
                setTimeout(() => {
                    $("."+this.options.modalClass+", ."+this.options.overlayClass).fadeOut()
                   }, this.options.modalFadeOutSpeed)
            }else{
                $("."+this.options.modalClass+", ."+this.options.overlayClass)
                .fadeIn(this.options.modalFadeInSpeed);
            }
            return this;
        },

        /**
         * construct a box for modal
         * @param {*} message 
         */
        alertBox: function(message){
            var str = '';
           var that = this;
            str += '<div>'+this.closeBtn().html()+
            '<strong>'+this.options.modalTitle+'</strong><br>'+message+'</div>';
            return $(str);
        },

        /**
         * remove modal from display
         * @param {*} event 
         */
        boxOut: function(event){
            if ( event!==undefined )
            {
                event.preventDefault();
            }
            // Removes the active class from all links
            $("a").removeClass("active");
            // Fades out the modal window, then removes
            // it from the DOM entirely
            $("."+this.options.modalClass+", ."+this.options.overlayClass)
            .fadeOut("slow", function() {
                $(this).remove();
            });
        },

        /**
         * configure a close button
         * @param {conf} e 
         */
        closeBtn: function(e){
            if(this.options.showCloseBtn){
                var that = this;
                var txt = '';
                if(!this.options.closeBtnIcon){
                    txt = this.options.closeBtnText
                }
                var btn = $('<div>').html('<span  class="close" title="close">'+txt+'<i class="'+this.options.closeBtnIcon+'"></i></span>');
                 btn.children('.close').css(this.closeBtnStyles)
                 $(document).on('click','.close',function(e){
                     that.boxOut(e);
                 })
                return btn;
            }
            return $('<div>').html('');
        },

        /**
         * filter response data
         */
        filterData : function(ele){
            if(ele.indexOf(',') != -1){
                var str =ele; 
                var arr = str.split(',');
                var st ='';
                for(var i=0; i<arr.length; i++){
                    st +='<li>'+ arr[i].replace('\"','').replace('[','').replace(']','').replace('\"','')+'</li>';
                }
                  return st.replace('\"/g',''); 
            }
            return ele;
        }

        
    };
    
    $.Notify =  function(opts,opts1,opts2){
        return new Notify(opts,opts1,opts2).showModal();
    };
    $.fn.Notify = function(opts){
        return new Notify(opts).showModal();
    }
    $.Notify.global = function(){
        return this.defaultOptions;
    } 
})(jQuery);





