//Adding a doctype to your html doc will give perfect results both css and javascript
//If not specified then works well in other browsers except IE8 and less.
//I tested with HTML5 doctype

//Friday, November 01, 2013
//11/1/2013 in chrome Version 31.0.1650.57 m
//toLocaleDateString() this gives different strings in different browsers. format string yet to be supported... only moz and ie10 supports
//this.title.childNodes[2].innerHTML = this.date.toLocaleDateString().split(' ').slice(2).join(' - ');

//html parser is faster than the dom ... so you can use innerhtml instead of extensively using createElement and appenchild
//and innerHTML ='' is easy than using removeChild in an loop. just read from stackoverflow

var DatePicker = {

    init : function(elements)
    {
        var pthat = this;
        this.element = null;
        this.date = new Date()
        this.date.setDate(1);	
        this.bod = this.newElement('div','dpbody');
        document.body.appendChild(this.bod);
        
        this.title = this.newElement('div','title');
        this.title.innerHTML = "<div><<</div><div><</div><span>-</span><div>></div><div>>></div>";
        this.bod.appendChild(this.title);
        this.bod.appendChild(this.newElement('ul','weekdays',
            '<li>Sun</li><li>Mon</li><li>Tue</li><li>Wed</li><li>Thu</li><li>Fri</li><li>Sat</li>'));		
        this.days = this.newElement('div','dp_days');
        this.bod.appendChild(this.days);
        
        this.title.onclick = function(e){
            pthat.changeMonthYear(e);
            e ? e.stopPropagation() : event.cancelBubble = true;
        }	
        this.days.onclick = function(e){
            pthat.dateClicked(e);
            e ? e.stopPropagation() : event.cancelBubble = true;
        }
        
        this.setupEvent(elements);
    },

    newElement : function(element, className, innerHTML)
    {
        var _element = document.createElement(element);
        if(className != '')
            _element.className = className;
        if(typeof(innerHTML)!='undefined')
            _element.innerHTML = innerHTML;
        return _element;	
    },

    //add click event listeners to the text boxes(HTML Input Element)
    setupEvent : function(elements)
    {
        var pthat = this;
        elements = elements.split(',');	
        
        for(var i=0; i<elements.length; i++)
        {
            //do not add event if the Id or input element does not exists when provided in DatePicker.init
            if(!(elements[i] = document.getElementById(elements[i])))
                continue; 
                
            this.addEvent(elements[i], 'click', function(e){
                pthat.inputClicked(e);
            });
        }
    },

    dateClicked : function(e)
    {
        e = this.getEventTarget(e);
        var value = parseInt(e.innerHTML)
        
        if(!isNaN(value))
        {
            this.element.value = value + '/' +  this.date.getMonth() + '/' + this.date.getFullYear();
            this.hideCalander();
        }
    },

    inputClicked : function(e)
    {
        e = this.getEventTarget(e);	
        if(this.element === e)return;

        this.element = e;		
        this.showCalander();	
        this.addCloseListener();	
    },

    findAbsolutePosition : function(obj)
    {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft-125;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return [curleft,curtop];
    },

    changeMonthYear : function(e)
    {
        e = this.getEventTarget(e)

        if(this.title.childNodes[0] === e)//previous year
            this.date.setFullYear(this.date.getFullYear() - 1)
        else if(this.title.childNodes[1] == e)//previous month
            this.date.setMonth(this.date.getMonth() - 1)
        else if(this.title.childNodes[3] === e)//next month
            this.date.setMonth(this.date.getMonth() + 1)
        else if(this.title.childNodes[4] === e)//next year
            this.date.setFullYear(this.date.getFullYear() + 1)
            
        this.showCalander();
    },

    showCalander : function()
    {
        var dow = this.date.getDay(); //day of week from (0-6) on 1st of the month. 0=sun, 1=mon, 2=tue, etc.
        var ndays = (new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)).getDate(); //no of days in the month.	
        
        //Friday, November 01, 2013
        //11/1/2013 in chrome Version 31.0.1650.57 m
        //toLocaleDateString() this gives different strings in different browsers. format string yet to be supported... only moz and ie10 supports
        //this.title.childNodes[2].innerHTML = this.date.toLocaleDateString().split(' ').slice(2).join(' - ');
        var temp = this.date.toDateString().split(' ')
        this.title.childNodes[2].innerHTML = temp[1] + ' - ' + temp[3];
        
        this.days.innerHTML = '';	
        
        for(var i = -dow ; i < ndays; i++)
        {
            temp = this.newElement(i<0?'span':'div','','&nbsp;');
            this.days.appendChild(temp);
            if(i>-1)temp.innerHTML = i+1;
        }

        var pos = this.findAbsolutePosition(this.element);	
        this.bod.style.left = pos[0] + this.element.offsetWidth + 5 + 'px';
        this.bod.style.top = pos[1] + 'px';	
        this.bod.style.display = 'block';
    },

    hideCalander : function()
    {
        this.element = null;
        this.bod.style.display = 'none';
        if(this.closeHandler)
            this.removeEvent(document, 'click', this.closeHandler);
    },

    addCloseListener : function(e)
    {
        var pthat = this;
        
        pthat.closeHandler = function(e){
            e = pthat.getEventTarget(e)
            if(e!==pthat.element && pthat.bod.style.display == 'block')
                pthat.hideCalander();
        }        
        
        pthat.removeEvent(document, 'click', pthat.closeHandler);
        pthat.addEvent(document, 'click', pthat.closeHandler)
    },

    addEvent : function(element, type, callback)
    {
        if(document.addEventListener)element.addEventListener(type, callback);
        else element.attachEvent('on'+type, callback);
    },

    removeEvent : function(element, type, handler)
    {
        if(document.removeEventListener)element.removeEventListener(type, handler);
        else element.detachEvent('on'+type, handler)
    },

    getEventTarget : function(e)
    {
        if(!e)e = window.event;
        return e.srcElement || e.target
    }
}