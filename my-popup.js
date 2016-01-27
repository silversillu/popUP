$(document).ready(function(){
    var customSettings = function(){;
        basic = popUP('basic');
        basic.add();

        example1 = popUP('example1');
        example1.content = "<h1>Hello I am a custom popUP window!</h1><h3>You can add any HTML code in me!</h3>";
        example1.add();

        example2 = popUP('example2');
        example2.content = $('.element-from-page');
        example2.add();

        example3 = popUP('example3');
        example3.content = 
            "<h1>Hello I am a styled popUP window!</h1>"+
            "<h3><span class='red'>I</span>"+
            "<span class='yellow'> am</span>"+
            "<span class='green'> so</span>"+
            "<span class='blue'> cool</span></h3>";
        example3.customStyles = 
            ".red {color: #DB4437}"+
            ".yellow {color: #F4B400}"+
            ".green {color: #0F9D58}"+
            ".blue {color: #4285F4}" +
            ".example3.popUP-container {background-color: #FDF0F0}";
        example3.add();  

        example4 = popUP('example4');
        example4.content = "<img src='assets/img-1.jpg'>";
        example4.overlay = true;
        example4.clickAnywhereClose = true;
        example4.add();


    }

    popUP_object = {
        activator        : function(){return this.name + '_activator'},
        hider            : function(){return this.name + '_hider'},
        content          : '<h1>Hello I am a basic popUP window!</h1>', // HTML content in string
        theme            : 'default', // No other options at the moment
        customStyles     : '',
        customStylesFile : '',
        hiderContent     : 'X',
        overlay          : false,
        clickAnywhereClose : false,
        add              : 
            function(){
                // If content is jQuery object
                if(this.content instanceof jQuery){
                    this.content = this.content.prop('outerHTML');;
                    console.log(this.content)
                }
                // Append popUP element to body
                $('body').append(
                    '<div class="' + this.name + ' popUP-container" style="display: none">' +
                        '<a class="' + this.hider() + ' popUP-hider">' + this.hiderContent + '</a>' + 
                        this.content + 
                    '</div>'
                );
                // Append overlay element if popUP has overlay
                if($('.popUP-overlay').length <= 0){
                    $('<div class="popUP-overlay"></div>').insertAfter('body');
                }
                // DEFINE VARIABLES
                // -- Activator
                window[this.name + '_popupActivator'] = $('.' + this.activator()).data('show', this.name).data('overlay', this.overlay);
                // -- Hider
                window[this.name + '_popupHider'] = $('.' + this.hider()).data('hide', this.name);
                // Load chosen theme CSS file to HTML
                $('head').append('<link rel="stylesheet" href="themes/' + this.theme + '.css" type="text/css" />');
                // ADD CUSTOM STYLES
                // -- as inline styles
                if(this.customStyles.length > 0){
                    $('head').append('<style>' + this.customStyles + '</style>');
                }
                // -- as separate CSS file
                if(this.customStylesFile.length > 0){
                    $('head').append('<link rel="stylesheet" href="' + this.customStylesFile + '" type="text/css" />');
                }
                // FUNCTIONS
                if(this.clickAnywhereClose === true){
                    thisElementClass = '.' + this.name;
                    $(document).mouseup(function (e){
                        var container = $(thisElementClass);

                        if (!container.is(e.target) // if the target of the click isn't the container...
                            && container.has(e.target).length === 0) // ... nor a descendant of the container
                        {
                            container.hide();
                            $('.popUP-overlay').hide();
                        }
                    });
                }
                window[this.name + '_popupActivator'].click(function(){
                    $('.popUP-container').hide(); // At first hide any other visible popUP
                    $('.' + $(this).data('show')).show();
                    if($(this).data('overlay') === true){ 
                        console.log('is true')
                        $('.popUP-overlay').show();
                    }
                });

                window[this.name + '_popupHider'].click(function(){
                    $('.' + $(this).data('hide')).hide();
                    $('.popUP-overlay').hide();
                });

            }
        }
        // To clone a js object - so that their variable wouldn't be related afterwards
        popUP = function(name){
            return jQuery.extend({name : name}, popUP_object);
        }
    
    // Call user settings the last!
    customSettings();
});

