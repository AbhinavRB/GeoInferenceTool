			var datatosend=[];
			var lab;
			var flag=0;
			var ind=1;
			var pind=1;
			var lines=[];
		var lines2del=[];
		var lines2add=[];
		var pointsVfound=[];
	        /*

			Method to add label

			*/
			
			//edit

			//$('#tmp_canvasangle').css({'top':$("#Maincanvas").position().top});
			 var DrawArea = document.querySelector('#DrawArea');
		    var canvas = document.getElementById('Maincanvas'),
		    ctx = canvas.getContext('2d'),
		    line = {},	/* LOOK HERE!!! We may need to make line an object too for inference part  LOOK HERE!!*/
		    points=[];
		    uniqpoints=[];
		    uniqpoints.push({x:-1,y:-1,labe:'-'});
		    temparr={};
		    temparrs={};
		    lineobj={ start:{x:1,y:1,labe:''},end:{x:2,y:1,labe:''}, slopes:function() {
		    	return (this.end.y - this.end.y)/(this.end.x - this.start.x);
		    }};
		    angle={};
		    angles=[];
		    drag = false;
		    var tmp_canvas = document.createElement('canvas');
		    var tmp_ctx = tmp_canvas.getContext('2d');
		    tmp_canvas.id = 'tmp_canvas';
		    tmp_canvas.width = canvas.width;
		    tmp_canvas.height = canvas.height;
			//tmp_canvas.position='absolute';



			//alert($('#header').outerHeight());
			tmp_canvas.style.position='absolute';
			// tmp_canvas.style.top=canvas.style.top;
			// tmp_canvas.style.left=canvas.style.left;
			tmp_canvas.style='border:10px solid #000000;';	
			
			var tmp_canvasangle = document.createElement('canvas');
			var tmp_ctxangle = tmp_canvasangle.getContext('2d');
			tmp_canvasangle.id = 'tmp_canvasangle';
			tmp_canvasangle.width = canvas.width;
			tmp_canvasangle.height = canvas.height;
			//tmp_canvasangle.position='absolute';
			tmp_canvasangle.style.position='absolute';
			//tmp_canvasangle.style.top='5px';
			//tmp_canvasangle.style.left='5px';
			tmp_canvasangle.style='border:10px solid #000000;';	
			
			tmp_ctx.lineWidth = 3;
			tmp_ctx.lineJoin = 'round';
			tmp_ctx.lineCap = 'round';
			tmp_ctx.strokeStyle = 'white';
			tmp_ctx.fillStyle = 'white';

			
			//tmp_ctx.position='absolute';
			//tmp_ctx.left= 0px;  tmp_ctx.top: 0;
			ctx.lineWidth = 5;
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
			ctx.strokeStyle = 'white';
			ctx.fillStyle = 'white';
			
			DrawArea.appendChild(tmp_canvas);
			//document.getElementById("clrButton").onclick = function () { ctx.clearRect(0,0,800,500);ctx.beginPath(); drawgrid();tmp_ctx.clearRect(0,0,800,500) ;points=[];ind=1;uniqpoints=[];uniqpoints.push({x:-1,y:-1,labe:'-'})};
			drawgrid();
			temparr.toString = function(){return this.x+", "+this.y};
			init();

		

			function addlab()
			{
				if(!labelcheck(pind))
				{
					alert("Not enough points to add labels for");
				}

	            //create a form
	           //var f = document.createElement("form");
	        	//f.setAttribute('method',"post");
	           // f.setAttribute('action',"submit.php");
	           else
	           {
	           	DrawArea.appendChild(tmp_canvasangle);
	        	tmp_canvasangle.style.top=tmp_canvas.style.top;
	           	tmp_canvasangle.addEventListener('dblclick', Mousedclick,event.preventDefault());
	           	tmp_canvas.removeEventListener('mousedown', mouseDown, false);
	           	tmp_canvas.removeEventListener('mouseup', mouseUp, false);
	           	tmp_canvas.removeEventListener('mousemove', mouseMove, false);
	           	tmp_ctxangle.lineWidth = 1;
	           	tmp_ctxangle.lineJoin = 'round';
	           	tmp_ctxangle.lineCap = 'round';
	           	tmp_ctxangle.strokeStyle = 'white';
	           	tmp_ctxangle.fillStyle = 'rgba(255,0,0,0.5)';
	           	tmp_ctxangle.beginPath();
	           	tmp_ctxangle.arc(uniqpoints[pind].x,uniqpoints[pind].y,10,0,2*Math.PI);

	           	tmp_ctxangle.stroke();
	           	tmp_ctxangle.fill();
	           	tmp_ctxangle.closePath();
	           	pind++;
	            //create input element
	            var divlab = document.createElement("div");
	            divlab.setAttribute("class","col-md-6 col-md-offset-5");
	            var i = document.createElement("input");
	            i.type = "text";
	            i.name = "user_name";
	            i.id = "label_id";
	            //i.setAttribute("class","");
	            //.required=true;
	            i.setAttribute("required", ""); 
	            //f.appendChild(i);
	            //create a button
	            var s = document.createElement("button");
	            s.id="b1";
	            s.textContent='submit'; 
	            s.type = "submit";
	            s.value = "Submit";
	            s.setAttribute("class","btn btn-primary btn-sm")
	            i.required=true;
	            i.autofocus=true;
	            i.setAttribute("required","");
	            i.focus();
	            s.onclick = function () 
	            {
	            	lab=i.value ; //console.log(lab);
	            	ctx.font="20px Calibri"; 
	            	if(uniqpoints[ind].y<250){
	            		ctx.fillText(lab,uniqpoints[ind].x,uniqpoints[ind].y-15);
	            	}
	            	else{
	            		ctx.fillText(lab,uniqpoints[ind].x,uniqpoints[ind].y+20);
	            	}
	            	uniqpoints[ind].labe=lab;
	            	ind++;
	            	divlab.removeChild(s);
	            	divlab.removeChild(i);
	            	document.getElementById("AngleArea").removeChild(divlab);
	            	printuniq();
	            	tmp_canvas.addEventListener('mousedown', mouseDown, false);
					tmp_canvas.addEventListener('mouseup', mouseUp, false);
					tmp_canvas.addEventListener('mousemove', mouseMove, false);
					tmp_ctxangle.clearRect(uniqpoints[ind-1].x-20,uniqpoints[ind-1].y-20,uniqpoints[ind-1].x+20,uniqpoints[ind-1].y+20);
					 if(ind==pind)
					 {
					 	DrawArea.removeChild(tmp_canvasangle);
					 }
					
	            };
	           
	            divlab.appendChild(i);
	            divlab.appendChild(s);
	            document.getElementById('AngleArea').appendChild(divlab);
		    }

		}

		   
			function drawgrid(){
				for (var x = 0.5; x < 801; x += 20) {
					ctx.moveTo(x, 0);
					ctx.lineTo(x, 500);
				}

				for (var y = 0.5; y < 501; y += 20) {
					ctx.moveTo(0, y);
					ctx.lineTo(800, y);
				}

			//ctx.moveTo(0,0);
			//ctx.lineTo(380,380);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#41545e";
			ctx.stroke();
			}

		function draw() 
		{
				//ctx.drawImage(tmp_canvas, 0, 0);
				tmp_ctx.clearRect(0,0,800, 500);
				tmp_ctx.beginPath();
				tmp_ctx.moveTo(line.startX, line.startY);
				tmp_ctx.lineTo(temparr.x, temparr.y);
				tmp_ctx.stroke();
				tmp_ctx.closePath();
		}




			function drawAngle() 
			{
				//DrawArea.appendChild(tmp_canvasangle);
				var j = document.createElement("input");
				j.type = "number";
				j.name = "user_name";
				j.id = "angle_id";
	            //f.appendChild(i);
	            //create a button
	            var s1 = document.createElement("button");
	            s1.id="b2";
	            s1.textContent='submit'; 
	            s1.type = "submit";
	            s1.value = "Submit";
	            

	            var Lastpoint = points.slice(-1)[0] ;
	            var secondlast = points[points.length-2];
	            var x1 = Lastpoint.x;
	            var y1 = Lastpoint.y;
	            var x2 = secondlast.x;
	            var y2 = secondlast.y;
	            var m1 =(y1-y2)/(x1-x2);
	            console.log("first slope : " +m1);
					/*slope=Math.atan(slope);
					console.log("second slope : " +slope);
					slope=slope*180/Math.PI;
					console.log(" final slope : "+slope);*/

					s1.onclick = function ()
					{	var angle=j.value ;
						//console.log("angle : "+angle); 
						angle = parseInt(angle);
						var M = Math.tan(angle);			
						var m2 = (M-m1)/(1-M*m1);
						var theta = Math.atan(m2);
						//console.log(theta*180/Math.PI);
	     	     	//var theta = (angle+slope)
	     	     /*	if(slope>=0){
	     	     		angle=180+angle;
	     	     		theta =angle-slope;
	     	     	}
	     	     	*/
					//slope = Math.atan(slope);
					/*console.log("theta in degrees : " + (angle+Math.round(slope)));
					theta = (theta)*Math.PI/180;
					console.log(theta);*/
					tmp_ctx.moveTo(x1, y1);
					tmp_ctx.lineTo(x1 - 300 * (Math.cos(theta)), y1 - 300* (Math.sin(theta)));
					tmp_ctx.stroke();
					document.getElementsByTagName('body')[0].removeChild(s1);document.getElementsByTagName('body')[0].removeChild(j);
					printuniq();
				            	//DrawArea.removeChild(tmp_canvasangle);
				            };
				            document.getElementsByTagName('body')[0].appendChild(j); 
				            document.getElementsByTagName('body')[0].appendChild(s1); 
				        }

				        function getCursorPosition(canvas, event)
				        {
				        	alert('Click on the point where you want to draw the angle');
				        	var rect = canvas.getBoundingClientRect();
				        	var x = event.clientX - rect.left;
				        	var y = event.clientY - rect.top;
				        	//console.log("x: " + x + " y: " + y);
				        }


			function mouseDown(e) {
			//ctx.clearRect(0,0,800, 500);
			if(!drag)
			{ 
				line.startX = e.pageX-this.offsetLeft;
				line.startY = e.pageY-this.offsetTop;
				temparr={x:line.startX , y:line.startY , labe:'-'};
				temparr=line_stick_helper(temparr);
				temparr= checkpoint(temparr);
				line.startX=temparr.x;
				line.startY=temparr.y;

				
		        flag=0;
		        for(var i in uniqpoints){
		        	if(uniqpoints[i].x==temparr.x && uniqpoints[i].y==temparr.y){
		        		flag=1;
		        	}    
		        }
		        if(flag==0){
		        	uniqpoints.push(temparr);
		        }
		        points.push(temparr);
		        lineobj={start:temparr,end:temparr};

		         	
			}
			//console.log('mouse down');
			
			drag = true;
		}

		

	function labelcheck(pind)
	{
	if((pind-1)>=uniqpoints.length-1)
			{
				return false;
					
			}
			else
			{
				return true;
			}
	}
		function mouseUp()
		{
			//ctx.clearRect(0,0,800,500);
			//init();
			drag = false;
			ctx.drawImage(tmp_canvas, 0, 0);
			temparr={x:line.w , y:line.h,labe:'-'};
			temparr=line_stick_helper(temparr);
			temparr=checkpoint(temparr);

			points.push(temparr);
			lineobj.end=temparr;
			console.log("line object :"+lineobj.start.x +"  "+lineobj.start.y +"  "+lineobj.end.x +"  "+lineobj.end.y );
			lines.push(lineobj);

	        /*if((uniqpoints.slice(-1)[0].x==temparr.x)&&(uniqpoints.slice(-1)[0].y==temparr.y)){
	          }
	            else{
	                            uniqpoints.push(temparr);
	                        }*/
	                        flag=0;
	                        for(var i in uniqpoints){
	                        	if(uniqpoints[i].x==temparr.x && uniqpoints[i].y==temparr.y){
	                        		flag=1;
	                        	}    
	                        }
	                        if(flag==0){
	                        	uniqpoints.push(temparr);

	                        }
	    }


	    function mouseMove(e) {

	    	if (drag) {

	    		line.w = (e.pageX-this.offsetLeft);
	    		line.h = (e.pageY-this.offsetTop);
				//ctx.clearRect(0,0,800, 500);
				temparr={x:line.w , y:line.h,labe:'-'};
				//console.log("before helper - x: "+temparr.x + " y: "+temparr.y);
				temparr=line_stick_helper(temparr);
				//console.log("after helper - x: "+temparr.x + " y: "+temparr.y);
				temparr= checkpoint(temparr);
				draw();
			//init();
		}}

	function init() {
		tmp_canvas.addEventListener('mousedown', mouseDown, false);
		tmp_canvas.addEventListener('mouseup', mouseUp, false);
		tmp_canvas.addEventListener('mousemove', mouseMove, false);
		
	}
	function Mousedclick(e)
	{
		//tmp_ctx.clear();
		
		//tmp_ctx.fillCirc(e.pageX-this.offsetLeft - 10,  e.pageY-this.offsetTop- 10, 20, 20,'rgba(0,255,0,.6)');
	//	tmp_ctx.clearRect(e.pageX-this.offsetLeft - 10,  e.pageY-this.offsetTop- 10, 20, 20);
		/*
		addRect(e.pageX-this.offsetLeft - 10,  e.pageY-this.offsetTop- 10, 20, 20,
                               'rgba(0,255,0,.6)');
		alert("kjsdsdkjsjjl");
		*/
	}

	function addRect(x, y, w, h, fill) {
  var rect={};
  rect.x = x;
  rect.y = y;
  rect.w = w
  rect.h = h;
  rect.fill = fill;
}

	
	function checkpoint(curr){
		var r=20;

		var newpoint = {x: curr.x, y: curr.y ,labe: curr.labe};
	    //console.log("Point has: "+points.toString());
	    for(var pt in points) {
	       //console.log("pt has: "+points[pt].x    );

	       var Dot = points[pt];


	       if(clickedInside(curr, Dot, r)) {
	                //if((curr.x >= pt.x-r  || curr.x <= pt.x+r) && (curr.y >= pt.y-r  || curr.y <= pt.y+r)) {
	                	//console.log("from check poin");

	                	newpoint.x = Dot.x;
	                	newpoint.y = Dot.y;
	                	newpoint.labe=Dot.labe;
	                	return newpoint;
	                }

	     //console.log("from check point"+newpoint.x+","+newpoint.y);

	 }
	 return newpoint;

	}

	var clickedInside = function(coords, point, r){
		var r2 = r*r;

		var value = (((coords.x-point.x)*(coords.x-point.x)) + ((coords.y-point.y)*(coords.y-point.y)));
		return value <= r2;
	};



	function printuniq()
	{
	          //  var demo =document.createElement('p');
	        //    demo.id='demo';
	        //    document.getElementById("demo").innerHTML=uniqpoints.toString();
	        // for ( var count in uniqpoints)
	        // {
	        // 	console.log(uniqpoints[count].x +"  asas  " + uniqpoints[count].y);
	        // }
	        
	}
	function angelSubmit() 
	{
		
		/*var a = document.createElement("a");
		a.id = "#openModal";
		a.className = "modalDialog";
		var ddd=document.getElementById("angler");
		a.appendChild(ddd);
		var c = document.createElement("a");
		c.id="openModal";
		c.href = "#close";
		c.title = "Close";
		c.className = "close";
		a.appendChild(c);
		
		*///document.getElementById("AngleArea").appendChild(a);
		
		//var modal = document.getElementById("openModal");
		//modal.showModal();
		var subtrue=false;
		$('#openModal').load();
		//document.body.appendChild(a); 
		//location("#"+a.id);
			var f = document.createElement("form");
			f.setAttribute("id","angle-form")
			//f.setAttribute('method',"post");
			//f.setAttribute('action',"submit.php");
			for (var g = angles.length - 1; g >= 0; g--) {
				if(angles[g].value==0)
					continue;
				else
					 subtrue=true;
			var labelforang=document.createElement("label");
			labelforang.setAttribute("class","col-md-12 control-label");
			labelforang.innerHTML ="<br>"+g+"Angle between " + angles[g].leftline.start.labe+""+angles[g].leftline.end.labe+" and " + angles[g].rightline.start.labe+""+angles[g].rightline.end.labe + "<br>";
			var divs = document.createElement("div");
			divs.setAttribute("class","col-md-9");
			var i = document.createElement("input"); //input element, text
			i.setAttribute('class','form-control input-lg');
			i.setAttribute('width','50%');
			i.setAttribute('type',"number");
			i.setAttribute('name',"Angle1");
			i.setAttribute('value',angles[g].value);
			i.setAttribute('id',g)
			f.appendChild(labelforang);
			divs.appendChild(i);
			
			var divsb = document.createElement("div");
			divsb.setAttribute("class","col-md-3");
			
			var uk = document.createElement("button"); //input element, Submit button
			uk.setAttribute('class',"btn btn-success btn-lg")
			uk.setAttribute('type',"button");
			//uk.setAttribute('value',"Set Unknown");
			uk.innerHTML="Set Unknown";
			uk.setAttribute("id",i.id*5);
			divsb.appendChild(uk);
			f.appendChild(divs);
			f.appendChild(divsb);
			uk.onclick=function()
			{
					
				var angval = document.getElementById(this.id/5);
				angval.value=-1;
			
			}
			
		};
			if(subtrue)
			{
			var divsu = document.createElement("div");
			divsu.setAttribute("class","col-md-9");
			var s = document.createElement("input"); //input element, Submit button
			s.setAttribute('class',"btn btn-primary btn-lg")
			s.setAttribute('type',"button");
			s.setAttribute('value',"Submit");
			divsu.appendChild(s);
			f.appendChild(divsu);
			 s.onclick = function () 
	            {
	            		
	            		
	            		var eles;

	            		for (var g = angles.length - 1; g >= 0; g--) 
	            		{	if(angles[g].value==0)
	            				continue;
	            			eles = document.getElementById(g);
	            			angles[g].value=eles.value;
	                 		
	            			}
	            			for (var g = angles.length - 1; g >= 0; g--) 
	            		{	
	            			console.log(angles[g].value);
	                 		
	            			}

	            			document.getElementById("AngleArea").removeChild(f);
	           	}
			
			document.getElementById("AngleArea").appendChild(f);
		}


	}
		




function sendcanvasdata()
{
    // {	for (var i in points){
    // 	console.log(points[i].x+"    "+points[i].y+"    "+points[i].labe+" \n");
    // }
    var linestr="";
    var pointstr="";
    var anglestr="";
    var senddata="";
    for(var i=0;i<points.length;i++){
    	for(var j=i+1;j<points.length;j++){
    		if((points[j].x==points[i].x) && (points[j].y==points[i].y)){
    			points[j].labe=points[i].labe;
    		}
    	}
    }
	for(var i=0;i<points.length;i++){
		for(var j=i+1;j<points.length;j++){
			if((points[j].x==points[i].x) && (points[j].y==points[i].y)){
				points[j].labe=points[i].labe;
			}
		}
	}
	uniqlines=[];
	for (var i = 0; i < lines.length; i++) 
    {
    	var tempflag=0;
    	for (var j = i+1; j < lines.length-1; j++) {
    		if((lines[j].start.x == lines[i].start.x) &&(lines[j].start.y == lines[i].start.y) &&(lines[j].end.x == lines[i].end.x)&&(lines[j].end.y == lines[i].end.y))
    			tempflag=1;
    		else
    			{

    			}
    	};
    	if(tempflag==0)
    	{
    		uniqlines.push(lines[i]);
    	}
    	
    };
/*
    console.log("Printing line objects\n");
    for (var i =0;i<lines.length;i++){
    	console.log(lines[i].start.x+"    "+lines[i].start.y+"    "+lines[i].start.labe+" \n");
    	console.log(lines[i].end.x+"    "+lines[i].end.y+"    "+lines[i].end.labe+" \n");

    }
    console.log("Printing point objects\n");
    for (var i in points){
    	console.log(points[i].x+"    "+points[i].y+"    "+points[i].labe+" \n");
    }
    */
    var data = new FormData();
    datatosend=[];
    strdata="";
    data.append("data" , "the_text_you_want_to_save");
    var xhr = new XMLHttpRequest();
    strdata+='points';
    for (var i in uniqpoints){
    	if(i!=0){
    		console.log(uniqpoints[i].x+"\n");

    		datatosend.push(uniqpoints[i].labe);
    		datatosend.push(uniqpoints[i].x);

    		datatosend.push(uniqpoints[i].y);
    		strdata+=uniqpoints[i].labe+" "+uniqpoints[i].x+" "+ uniqpoints[i].y+"\n";
    	}
    }
    //pointstr=strdata;
    if(uniqpoints[0].x==-1)
    	uniqpoints.splice(0,1);
    pointstr = JSON.stringify(uniqpoints);
    senddata="{ \"points\"  :";
     senddata+=pointstr;
     senddata+=",";
    //datatosend.push('-------\n');
/*		
		for (var i=0;i<points.length-1;i=i+2)
		{
			 //if(i==(uniqpoints.length-2)){break;}
			
	//		console.log(uniqpoints[i].x+"\n");
			strdata+=points[i].labe+points[i+1].labe+"\n";
			var linelabe=points[i].labe+points[i+1].labe;
			datatosend.push(linelabe);
		
		//datatosend.push(uniqpoints[i].y);
		}
		*/		
	//strdata+="-----\n";
	strdata="";
	for (var i =0 ;i<uniqlines.length;i++)
	{
		strdata+=uniqlines[i].start.labe+""+uniqlines[i].end.labe+"\n";
	}
	//strdata+="*****\n";
	  //linestr=strdata;
	   senddata+="\"lines\"  :";
    
    linestr = JSON.stringify(uniqlines);
    senddata+=linestr;
    senddata+=",";
   // senddata+="asd";
	//strdata+="angles\n";	



	strdata="";
	for (var i =0 ;i<angles.length;i++)
	{	if(angles[i].value!=0)
		{
			strdata+=angles[i].value +"  "+angles[i].leftline.start.labe+""+angles[i].leftline.end.labe+"  "+angles[i].rightline.start.labe+""+angles[i].rightline.end.labe+"\n";
		}
	}
	 //anglestr=strdata;
	  senddata+="\"angles\"  :";
    
    anglestr = JSON.stringify(angles);
    senddata+=anglestr;
    senddata+="}";
    /*
	strdata=JSON.stringify(strdata);
	console.log(datatosend);
	console.log(strdata);
	datatosend.join("\n");
	*/
	console.log("senddata:\n\n\n "+ senddata);
	data.append('data',senddata);
	var xhr = new XMLHttpRequest();
	xhr.open( 'post', 'savedata.php', true );

	xhr.send(data);
	 xhr.onreadystatechange=function() {
    if (xhr.readyState==4 && xhr.status==200) {
    	var btn = document.getElementById("subbut");
    	btn.disabled=true;
    	var ta = document.createElement("textarea");
    	var bt = document.createElement("button");
    	ta.setAttribute("class","form-control");
    	ta.setAttribute("id","txtarea");

    	//ta.setAttribute("width","10%");
    	ta.setAttribute("rows",4);
    	ta.setAttribute("cols","100");
    	ta.setAttribute("background","white");
    	ta.value="Output:\n";
    	ta.disabled = true;
    	bt.setAttribute("class","btn btn-primary");
    	bt.textContent="OK";
       	var ft = document.getElementById("DrawArea");
    	ft.appendChild(ta);
    	ft.appendChild(bt);
    	ta.value+=xhr.responseText;
    	
    	
    	bt.onclick= function()
    	{
    		ft.removeChild(bt);

    		ft.removeChild(ta);
    		btn.disabled=false;
    		
    	}

     // alert(xhr.responseText);
    }
  }
	}	

	function processdata()
	{
		

			process2();
			var btn = document.getElementById("subbut");
btn.disabled = false;

			
	}
		function process2()
		{
			
			modifylinesarray();
			angles=[];
			for(var i=0;i<points.length;i++){
				for(var j=i+1;j<points.length;j++){
					if((points[j].x==points[i].x) && (points[j].y==points[i].y)){
						points[j].labe=points[i].labe;
					}
				}
			}

			for(var i=0;i<uniqlines.length;i++)
			{
				for(var j=i+1;j<uniqlines.length;j++)
				{
					if((uniqlines[j].start.labe == uniqlines[i].start.labe) || (uniqlines[j].start.labe == uniqlines[i].end.labe) || (uniqlines[j].end.labe == uniqlines[i].start.labe) || (uniqlines[j].end.labe == uniqlines[i].end.labe))
					{

						var m1= slope(uniqlines[i]);
						//var c1 = intercept(uniqlines[i],m1);
						//console.log("slope 1 :" + m1);

						var m2 =slope(uniqlines[j]);
						//var c2 = intercept(uniqlines[j],m2);
						var ang=(Math.atan((m1 - m2)/(1 + m1*m2)));
						ang=Math.abs(Math.round(ang*180/Math.PI));
						//if(ang<0){
						//	ang=180+ang;
						//}
						//console.log("angle = "+ ang);
						/*
						m1 - m2)/(1 + m1*m2);
						*/
						if(ang!=0 && ang!=1)
						{
						angle={value:ang , leftline:uniqlines[j],rightline:uniqlines[i]};
						angles.push(angle);
						}
						//console.log(angle.value +"..."+angle.leftline.start.labe+""+angle.leftline.end.labe+"..."+angle.rightline.start.labe+""+angle.rightline.end.labe);

					}
				}
			}

			//angle_modify();
	//console.log(datatosend);
	//angelSubmit();

}
function angle_modify()
{ 
	var marked =[];
	var marcount=0;
	for (var i = 0; i < angles.length; i++) {
		var right = angles[i].rightline;
		var rstart = right.start.labe;
		var rend = right.end.labe;
		console.log("left: "+angles[i].leftline.start.labe + ""+angles[i].leftline.end.labe  );
		console.log("right: "+rstart+""+rend);
		//marked.push(i);
		for (var k = i+1; k < angles.length; k++) {

			console.log(angles[k].rightline.start.labe+""+angles[k].rightline.end.labe);
			if((angles[k].rightline.start.labe == rstart) &&(angles[k].rightline.end.labe == rend))
			{
				//if()
				marked.push(k);
				marcount++;
			}
		}
		i=i+marcount;
	};
	for (var i = marked.length - 1; i >= 0; i--) {

		if (i > -1) {
			angles.splice(i, 1);
		}
		
	};
}
function slope(l)
{
	return ((l.end.y-l.start.y)/(l.end.x-l.start.x));
}
function intercept(l,m)
{
	return ((l.start.y)-(m*l.start.x));
}
function intersection(l1,l2)
{
	var m1= slope(l1);
	var c1 = intercept(l1,m1);
	var m2 =slope(l2);
	var c2 = intercept(l2,m2);


	var valx=(c2-c1)/(m1-m2);
	var valy=m1*valx+c1;
	console.log("in method intersection.\n x:" + valx + " y :" + valy);
	if(!((valx>800)||(valy>500)||(valx<0)||(valy<0))){

				//2 lines AB and CD and a point p. AP ,BP & CP,DP
				console.log("Line 1 = " + l1.start.labe + "" + l1.end.labe);

				console.log("Line 2 = " + l2.start.labe + "" + l2.end.labe);
				x1=l1.start.x;
				y1=l1.start.y;
				x2=l1.end.x;
				y2=l1.end.y;
				var AB = Math.round(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)));
				var AP = Math.round(Math.sqrt((valx-x1)*(valx-x1)+(valy-y1)*(valy-y1)));
				var PB = Math.round(Math.sqrt((x2-valx)*(x2-valx)+(y2-valy)*(y2-valy)));
				console.log(AB+"="+AP+"+"+PB)

				x1=l2.start.x;
				y1=l2.start.y;
				x2=l2.end.x;
				y2=l2.end.y;
				
				var CD = Math.round(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)));
				var CP = Math.round(Math.sqrt((valx-x1)*(valx-x1)+(valy-y1)*(valy-y1)));
				var DP = Math.round(Math.sqrt((x2-valx)*(x2-valx)+(y2-valy)*(y2-valy)));
				console.log(CD+"="+CP+"+"+DP)
				if(((AB+10) > (AP + PB))&&((AB-10)<(AP + PB))&&((CD+10)>(CP + DP))&&((CD-10)<(CP + DP)))
					return ({x:Math.round(valx),y:Math.round(valy)});
				else
					return false;


			}
			else 
				return false;
}

		
function linesplitter(l,K,poi)
{
	console.log("Line splitter called\n\nLine l is : " +  l.start.labe + ""+ l.end.labe);
	var waitflag=0;

	console.log("\n\nLine K is : " +  K.start.labe + ""+ K.end.labe);
	console.log("POI is : (" + poi.x + " ," + poi.y + ")");
	var indexofi=0;
	
	//console.log("line coordinates :\nstart = " + l.start.x +" , " + l.start.y);
	poi.x = Math.round(poi.x);
	poi.y = Math.round(poi.y);
	//console.log("end = " + l.end.x +" , " + l.end.y);
	//console.log("point coordinates = " + poi.x + " , " + poi.y);
	//if((clickedInside(l.start, Math.round(poi), 5)) || (clickedInside(l.start, Math.round(poi), 5))){
	var splitflag = conditioncheck(l,K,poi);
	console.log("splitflag: "+ splitflag);
		if(splitflag==false)
		{
			return false;
		}
		else if(splitflag==3)
			{
				split2(K,l.end.labe,poi);
				return;
			}
		else if (splitflag==2)
			{
				split2(K,l.start.labe,poi);
				return ;
			}
		else if (splitflag==4)
		{
			split2(l,K.start.labe,poi);
			return;
		}
		else if ( splitflag ==5)
		{
			split2(l,K.end.labe,poi);
			return;
		}
		
		/*
		if(((l.start.x == Math.round(poi.x) ) && (l.start.y == Math.round(poi.y)))||((l.end.x == Math.round(poi.x) ) && (l.end.y == Math.round(poi.y))))
			{return false;}
		if(((K.start.x == Math.round(poi.x) ) && (K.start.y == Math.round(poi.y)))||((K.end.x == Math.round(poi.x) ) && (K.end.y == Math.round(poi.y))))
			{return false;}
		*/
		else
		{	
			console.log("Points v found");


			for (var i = pointsVfound.length - 1; i >= 0; i--)
			{
				console.log(pointsVfound[i].x + " , " + pointsVfound[i].y);
			};


			var flagVfound=false;

			for (var i = 0; i < pointsVfound.length; i++) 
			{
				if(poi.x+5 > pointsVfound[i].x && poi.x-5 < pointsVfound[i].x && poi.y+5 > pointsVfound[i].y && poi.y-5 < pointsVfound[i].y)
				{
					flagVfound=true;
					indexofi=i;
					break;
				}
			}

			if(flagVfound)
			{
				console.log("flag v found is true nasdasdasdjasdbnasdjasdbasdjasdbasdjasdbasdjasdbasdjasdb");
				var nline1={start:{x:l.start.x,y:l.start.y,labe:l.start.labe},end:{x:poi.x,y:poi.y,labe:pointsVfound[indexofi].labe}};
				var nline2={start:{x:poi.x,y:poi.y,labe:pointsVfound[indexofi].labe},end:{x:l.end.x,y:l.end.y,labe:l.end.labe}};
				lines2add=[];
				lines2del=[];
				lines2add.push(nline1);
				lines2add.push(nline2);
				lines2del.push(l);
				return false;
			}
			else
			{	
				console.log("flag v found is false\n\n\n\n");
				DrawArea.appendChild(tmp_canvasangle);
	        	tmp_canvasangle.style.top=tmp_canvas.style.top;
	           	tmp_canvasangle.addEventListener('dblclick', Mousedclick,event.preventDefault());
	           	tmp_canvas.removeEventListener('mousedown', mouseDown, false);
	           	tmp_canvas.removeEventListener('mouseup', mouseUp, false);
	           	tmp_canvas.removeEventListener('mousemove', mouseMove, false);
	           	tmp_ctxangle.lineWidth = 1;
	           	tmp_ctxangle.lineJoin = 'round';
	           	tmp_ctxangle.lineCap = 'round';
	           	tmp_ctxangle.strokeStyle = 'white';
	           	tmp_ctxangle.fillStyle = 'rgba(255,0,0,0.5)';
	           	tmp_ctxangle.beginPath();
	           	tmp_ctxangle.arc(poi.x,poi.y,10,0,2*Math.PI);

	           	tmp_ctxangle.stroke();
	           	tmp_ctxangle.fill();
	           	tmp_ctxangle.closePath();
	           	var divint = document.createElement("div");
	           	divint.setAttribute("class","col-md-12 col-md-offset-4");
				var lbl=document.createElement('label');
				var i = document.createElement("input");
				lbl.innerHTML="Point of intersection found. please enter label";
				i.type = "text";
				i.name = "user_name";
				i.id = "label_id";
	            //.required=true;
	            i.setAttribute("required", "true"); 
	            //f.appendChild(i);
	            //create a button
	            divint.appendChild(lbl);
	            //divint.appendChild("<br>");
	            var s = document.createElement("button");
	            s.id="b1";
	            s.textContent='submit'; 
	            s.type = "submit";
	            s.value = "Submit";
	            s.setAttribute("class","btn btn-primary")
	            i.required=true;
	            //i.autofocus=true;
	            //i.setAttribute("required", ""); ;
	            i.focus();

	            divint.appendChild(lbl); 
	           divint.appendChild(i); 
	           divint.appendChild(s); 
	           document.getElementById("AngleArea").appendChild(divint);

	            s.onclick = function () 
	            {
	            	lab=i.value ;
	            	 //console.log(lab);
	            	 var nline1={start:{x:l.start.x,y:l.start.y,labe:l.start.labe},end:{x:poi.x,y:poi.y,labe:lab}};
	            	 var nline2={start:{x:poi.x,y:poi.y,labe:lab},end:{x:l.end.x,y:l.end.y,labe:l.end.labe}};
	            	 console.log("Pushing point :" + poi.x + " , " + poi.y);
	            	 console.log("Pushing Lines :" + nline1.start.labe + ""+ nline1.end.labe);
	            	 console.log("Pushing Lines :" + nline2.start.labe + ""+ nline2.end.labe);
	            	 pointsVfound.push({x:poi.x,y:poi.y,labe:lab});
	            	 points.push({x:poi.x,y:poi.y,labe:lab});
	            	 uniqpoints.push({x:poi.x,y:poi.y,labe:lab});
	            	 ctx.fillText(lab,poi.x,poi.y-15);

	            	 lines2add.push(nline1);
	            	 lines2add.push(nline2);
	            	 lines2del.push(l);
	            	 console.log("Deleting line :" + l.start.labe + ""+ l.end.labe);

	            	 divint.removeChild(s);
	            	 divint.removeChild(i);

	            	 divint.removeChild(lbl);
	            	 document.getElementById("AngleArea").removeChild(divint);
	            	 DrawArea.removeChild(tmp_canvasangle);
	            	 tmp_canvas.addEventListener('mousedown', mouseDown, false);
					tmp_canvas.addEventListener('mouseup', mouseUp, false);
					tmp_canvas.addEventListener('mousemove', mouseMove, false);
					pind++;
					ind++;
	            	 printuniq();
	            	split2(K,lab,poi);
	            	waitflag=1;
	            	//return;
	            	 //process2();
	            	 //angelSubmit();
	            };
	            /*if(waitflag==0)
	            {
	            	while(lab=="")
	            	{

	            	}
	            	waitflag=0;
	            }*/
	            if(waitflag==1)
	            	return;
	            else
	            {

	            }
	            // add all elements to the form
	            //i.appendChild(s);
	            //f.appendChild(c);
	            //f.appendChild(s);

	           
	        }
		}
}
function split2(l,lab,poi)
{
	console.log("split2 called");
	poi.x=Math.round(poi.x);
	poi.y=Math.round(poi.y);
	
	var nline1={start:{x:l.start.x,y:l.start.y,labe:l.start.labe},end:{x:poi.x,y:poi.y,labe:lab}};
	var nline2={start:{x:poi.x,y:poi.y,labe:lab},end:{x:l.end.x,y:l.end.y,labe:l.end.labe}};
	lines2add.push(nline1);
	lines2add.push(nline2);
	lines2del.push(l);
	console.log("Pushing Lines :" + nline1.start.labe + ""+ nline1.end.labe);
	console.log("Pushing Lines :" + nline2.start.labe + ""+ nline2.end.labe);
	console.log("Deleting line :" + l.start.labe + ""+ l.end.labe);



}
function line_stick_helper(currpoint)
{
	for (var i = lines.length - 1; i >= 0; i--) {
		/* var x1 = uniqlines[i].start.x;
		 var y1= uniqlines[i].start.y;
		 var x2 = uniqlines[i].end.x;
		 var y2 = uniqlines[i].end.y;*/
		 var currm = slope(lines[i]);
		 var currc = intercept(lines[i],currm);
		 //console.log("currm and currc : "+ currm + " " + currc);
		 var ptx = (currpoint.x + currm*currpoint.y - currc*currm)/(Math.pow(currm,2)+1);
		 var pty = (currpoint.x*currm + Math.pow(currm,2)*currpoint.y +currc)/(Math.pow(currm,2)+1);
		 x1=lines[i].start.x;
		 y1=lines[i].start.y;
		 x2=lines[i].end.x;
		 y2=lines[i].end.y;
		 var AB = Math.round(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)));
		 var AP = Math.round(Math.sqrt((ptx-x1)*(ptx-x1)+(pty-y1)*(pty-y1)));
		 var PB = Math.round(Math.sqrt((x2-ptx)*(x2-ptx)+(y2-pty)*(y2-pty)));
		 if(((AB+10) > (AP + PB))&&((AB-10)<(AP + PB)))
		{		
		var dist = Math.round(Math.sqrt((ptx-currpoint.x)*(ptx-currpoint.x)+(pty-currpoint.y)*(pty-currpoint.y)));
		 //console.log("dist :"+ dist);
		 if(dist<20)
		 	return ({x:ptx ,y:pty ,labe:'-'});
		 else
		 	continue;
		}
		 else
		 	continue;
	};
	return currpoint
}
function conditioncheck(l,k,poi)
{
	console.log("conditioncheck called\n");
	poix=Math.round(poi.x);
	poiy = Math.round(poi.y);
	//console.log("poix:" + poix + " poiy:" + poiy);
	console.log("L start:" + l.start.x + " " + l.start.y + "\nend" + l.end.x + " " + l.end.y );
	console.log("K start:" + k.start.x + " " + k.start.y + "\nend" + k.end.x + " " + k.end.y );
	console.log(((l.start.x == poix ) && (l.start.y == poiy))&&((k.start.x == poix) && ( k.start.y == poiy)));
	console.log(((l.start.x == poix ) && (l.start.y == poiy))&&((k.end.x == poix ) && (k.end.y == poiy)));
	console.log(((l.end.x == poix ) && (l.end.y == poiy))&&((k.start.x == poix) && ( k.start.y == poiy)));	
	console.log(((l.end.x == poix ) && (l.end.y == poiy))&&((k.end.x == poix ) && (k.end.y == poiy)));
	console.log( ((l.start.x + 2 > poix)&&(l.start.x - 2 < poix )) && ((l.start.y + 2 > poiy)&&(l.start.y - 2 < poiy )));
	console.log(((l.end.x + 2 > poix)||(l.end.x - 2 < poix )) && ((l.end.y + 2 > poiy)||(l.end.y - 2 < poiy )) );
	if(((l.start.x == poix ) && (l.start.y == poiy))&&((k.start.x == poix) && ( k.start.y == poiy)))
			{return false;}

	else if(((l.start.x == poix ) && (l.start.y == poiy))&&((k.end.x == poix ) && (k.end.y == poiy)))
			{return false;}
	else if(((l.end.x == poix ) && (l.end.y == poiy))&&((k.start.x == poix) && ( k.start.y == poiy)))
			{return false;}
	else if(((l.end.x == poix ) && (l.end.y == poiy))&&((k.end.x == poix ) && (k.end.y == poiy)))
			{return false;}
	else if (  ((l.start.x + 5 > poix)&&(l.start.x - 5 < poix )) && ((l.start.y + 5 > poiy)&&(l.start.y - 5 < poiy ))   )  
			return 2;
	
	else if (  ((l.end.x + 5 > poix)&&(l.end.x - 5 < poix )) && ((l.end.y + 5 > poiy)&&(l.end.y - 5 < poiy ))   )  
			return 3;
	else if(    ((k.start.x + 5 > poix)&&(k.start.x - 5 < poix )) && ((k.start.y + 5 > poiy)&&(k.start.y - 5 < poiy ))     )
			return 4;
	else if (  ((k.end.x + 5 > poix)&&(k.end.x - 5 < poix )) && ((k.end.y + 5 > poiy)&&(k.end.y - 5 < poiy ))   )  
			return 5;
	else
		return true;
}
function detectpoihandler()
{
	console.log("detectpoihandler called\n");
	var c = detectpoi();
		console.log("c is :" + c);
	modifylinesarray();
	while(c>1)
	{	console.log("c is :" + c);
		c=detectpoi();
		modifylinesarray();
		console.log("lines array modified");
	}
	
//	console.log("c is :" + c);
//	modifylinesarray();
		
}
function detectpoi()
{	
	console.log("detectpoi called\n");
	var counter=0;
	for(var i=0;i<points.length;i++){
		for(var j=i+1;j<points.length;j++){
			if((points[j].x==points[i].x) && (points[j].y==points[i].y)){
				points[j].labe=points[i].labe;
			}
		}
	}
	for(var i=0;i<lines.length;i++)
	{
		for(var j=i+1;j<lines.length;j++)
		{
			poi=intersection(lines[i],lines[j]);
			if (!poi)
			{

			}
			else{

				if(linesplitter(lines[i],lines[j],poi)!=false)
					counter++;
				/*while(waitflag==1)
				{
					
				}*/

			}

			console.log(",m####################################poi = " + poi.x + " , " + poi.y);
		}
	}
	modifylinesarray();
	return counter;
}
function clear_everything()
{
	location.reload();
}
function modifylinesarray()
{
	console.log("modifylinesarray called");
	uniqlines=[];
	console.log("print lines 2 delete and add");
	for (var i = lines2del.length - 1; i >= 0; i--) {
		console.log(lines2del[i].start.labe+""+lines2del[i].end.labe);
	}
	console.log("sdfghjk234567890lkjhgfdsa------------------");
	for (var i = lines2add.length - 1; i >= 0; i--) {
		console.log(lines2add[i].start.labe+""+lines2add[i].end.labe);
	}
	for (var i = lines2del.length - 1; i >= 0; i--) {
		var index = lines.indexOf(lines2del[i]);
		if (index > -1) {
			lines.splice(index, 1);
		}
	}
	for (var i = lines2add.length - 1; i >= 0; i--) {
		lines.push(lines2add[i]);
	};

	console.log("Lines------------------");
	for (var i = lines.length - 1; i >= 0; i--) {
		console.log(lines[i].start.labe+""+lines[i].end.labe);
	}
    for (var i = 0; i < lines.length; i++) 
    {
    	var tempflag=0;
    	for (var j = i+1; j < lines.length; j++) {
    		if((lines[j].start.x == lines[i].start.x) &&(lines[j].start.y == lines[i].start.y) &&(lines[j].end.x == lines[i].end.x)&&(lines[j].end.y == lines[i].end.y))
    			{
    				tempflag=1;
        		break;
        	}
    		else
    			{

    			}
    	};
    	if(tempflag==0)
    	{
    		console.log("oushing into unique :"+ lines[i].start.labe+""+lines[i].end.labe);
    		uniqlines.push(lines[i]);
    	}
    	
    };
    for (var i = uniqlines.length - 1; i >= 0; i--) {
    	console.log("UniqLines : ---- "+uniqlines[i].start.labe+""+uniqlines[i].end.labe);
    };
    lines2add=[];
    lines2del=[];
	return;

}