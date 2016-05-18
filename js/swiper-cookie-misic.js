	var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: false,
    
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    /*nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',*/
    
    // 如果需要滚动条
    //scrollbar: '.swiper-scrollbar',
    
    //swiper回调函数，处理自定义动画刷新页面自动重新播放
    onSlideChangeStart: function(swiper){
      document.querySelector("#topdiv").classList.toggle("topdiv")
      document.querySelector("#topdiv1").classList.toggle("topdiv1")
      document.querySelector("#topdiv2").classList.toggle("topdiv2")
      document.querySelector("#topdiv3").classList.toggle("topdiv3")
      document.querySelector("#content-p1").classList.toggle("content-p1")
      document.querySelector("#sz").classList.toggle("sz")
      document.querySelector("#myP").classList.toggle("myP")
      document.querySelector("#myp2").classList.toggle("myp2")
      document.querySelector("#word-img").classList.toggle("word-img")
      document.querySelector("#spinner1").classList.toggle("spinner1")
      document.querySelector("#four-txt").classList.toggle("four-txt")
      document.querySelector("#anima-five-ap").classList.toggle("anima-five-ap")
      document.querySelector("#anima-five-form").classList.toggle("anima-five-form")
      document.querySelector("#anima-five-code").classList.toggle("anima-five-code")
      document.getElementById("a1").click()
    },
    //swper回调函数，处理上下翻页时  其他图片显示问题
    onSliderMove: function(swiper, event){
      document.querySelector(".img-one").style.display="none"
      document.querySelector(".anima-two").style.display="none"
      document.querySelector(".anima-three").style.display="none"
      document.querySelector(".anima-four").style.display="none"
      document.querySelector(".anima-five").style.display="none"
    },
    //swper回调函数，处理上下翻页时  其他图片显示问题
    onSlideChangeEnd: function(swiper){
      document.querySelector(".img-one").style.display="block"
      document.querySelector(".anima-two").style.display="block"
      document.querySelector(".anima-three").style.display="block"
      document.querySelector(".anima-four").style.display="block"
      document.querySelector(".anima-five").style.display="block"
    }
    
  })
  //音乐点击播放暂停事件
  var myAudio=document.getElementById("audio1"); 
  var mydiv = document.getElementById("mydiv");
  function playPause(){ 
	if (myAudio.paused){ 
	  	myAudio.play()
	  	mydiv.style.webkitAnimationPlayState="running"
	} 
	else{
	  	myAudio.pause()
	  	mydiv.style.webkitAnimationPlayState="paused"
		}
	} 

	//提交报名保存cook
	var sbm = document.querySelector("#sbm");
	sbm.onclick = function(){
		var name = document.getElementById("name").value;
		var phone = document.querySelector("#phone").value;
		var data = document.querySelector("#data").value;
		if((document.querySelector("#name").value!="")&&(document.querySelector("#phone").value!="")&&(document.querySelector("#sbm").value!="")){
			window.localStorage.setItem("name",name)
			window.localStorage.setItem("phone",phone)
			window.localStorage.setItem("data",data)
			console.log(name)
			alert("报名成功")
		}
	}