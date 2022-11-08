var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    unkwnCommReaction = "ACTee chưa rõ điều bạn nói.",
    chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if(input.length > 0) {
      createBubble(input)
    }
  }
};

sendForm.addEventListener('submit', function(e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();

  //No mix ups with upper and lowercases
  var input = textInput.value.toLowerCase();

  //Empty textarea fix
  if(input.length > 0) {
    createBubble(input);
  }
}) //end of eventlistener

var createBubble = function(input) {
  //create input bubble
  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');

  //adds input of textarea to chatbubble list item
  chatBubble.innerHTML = input;

  //adds chatBubble to chatlist
  chatList.appendChild(chatBubble)

  checkInput(input);
}

var checkInput = function(input) {
  hasCorrectInput = false;
  isReaction = false;
  //Checks all text values in possibleInput
  for(var textVal in possibleInput){
    //If user reacts with "yes" and the previous input was in textVal
    if(input == "yes" || input == "ok" || input.indexOf("yes") >= 0 || input.indexOf("ok") >= 0 || input == "có" 
      || input.indexOf("có") >= 0 || input == "ừ" || input.indexOf("ừ") >= 0){
      if(previousInput == textVal) {
        isReaction = true;
        hasCorrectInput = true;
        botResponse(textVal);
      }
    }
    if((input == "no" || input == "không" || input == "ko" || input.indexOf("ko") >= 0 || input.indexOf("không") >= 0 
      || input == "đéo" || input.indexOf("đéo") >= 0)  && previousInput == textVal){
      unkwnCommReaction = "Để hiển thị danh sách câu lệnh hãy nhập: ACTee";
      unknownCommand("ACTee rất tiếc khi được nghe điều đó :(")
      unknownCommand(unkwnCommReaction);
      hasCorrectInput = true;
    }
    //Is a word of the input also in possibleInput object?
    if(input == textVal || input.indexOf(textVal) >=0 && isReaction == false){
			console.log("success");
      hasCorrectInput = true;
      botResponse(textVal);
		}
	}
  //When input is not in possibleInput
  if(hasCorrectInput == false){
    console.log("failed");
    unknownCommand(unkwnCommReaction);
    hasCorrectInput = true;
  }
}

// debugger;

function botResponse(textVal) {
  //sets previous input to that what was called
  // previousInput = input;

  //create response bubble
  var userBubble = document.createElement('li');
  userBubble.classList.add('bot__output');

  if(isReaction == true){
    if (typeof reactionInput[textVal] === "function") {
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = reactionInput[textVal]();
    } else {
      userBubble.innerHTML = reactionInput[textVal];
    }
  }

  if(isReaction == false){
    //Is the command a function?
    if (typeof possibleInput[textVal] === "function") {
      // console.log(possibleInput[textVal] +" is a function");
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = possibleInput[textVal]();
    } else {
      userBubble.innerHTML = possibleInput[textVal];
    }
  }
  //add list item to chatlist
  chatList.appendChild(userBubble) //adds chatBubble to chatlist

  // reset text area input
  textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
  // animationCounter = 1;

  //create response bubble
  var failedResponse = document.createElement('li');

  failedResponse.classList.add('bot__output');
  failedResponse.classList.add('bot__output--failed');

  //Add text to failedResponse
  failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(failedResponse) //adds chatBubble to chatlist

  animateBotOutput();

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;

  animationCounter = 1;
}

function responseText(e) {

  var response = document.createElement('li');

  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;

  chatList.appendChild(response);

  animateBotOutput();

  //console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
    //console.log(response.clientHeight);
  }, 0)
}

function responseImg(e) {
  var image = new Image();

  image.classList.add('bot__output');
  //Custom class for styling
  image.classList.add('bot__outputImage');
  //Gets the image
  image.src = "/assets/img/team/"+e+".jpg";
  chatList.appendChild(image);

  animateBotOutput()
  if(image.completed) {
    chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
  }
  else {
    image.addEventListener('load', function(){
      chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    })
  }
}

//change to SCSS loop
function animateBotOutput() {
  chatList.lastElementChild.style.animationDelay= (animationCounter * animationBubbleDelay)+"ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e){
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];
}

// hlep

var possibleInput = {
  // "hlep" : this.help(),
  "trợ giúp" : function(){
    responseText("Bạn có thể gõ các câu lệnh trong ô chat");
    responseText("Ví dụ như là &quot;ACTee, hãy giới thiệu những sản phẩm nổi bật ACTech&quot;");
    responseText("Bạn vẫn gặp những vẫn đề hay lỗi? Hãy liên hệ qua m.me/actechsmt");
    commandReset(0);
    return
    },
  "sản phẩm" : function(){
    responseText("ACTee sẽ giới thiệu cho bạn những sản phẩm nổi bật của ACTech!");
    responseText("Đó là ACTech - CRM <a href='/actech-crm'><p>Quản lý chăm sóc khách hàng</p></a>");
    responseText("Đó là ACTech - OFFICE <a href='/actech-office'><p>Quản lý công việc & nội bộ</p></a>");
    responseText("Đó là ACTech - HRM <a href='/actech-hrm'><p>Quản lý nguồn nhân lực</p></a>");
    responseText("Bạn có muốn tìm hiểu kĩ hơn về các sản phẩm khác của ACTech không? (Yes/No)");
    commandReset(1);
    return
    },
  "thông tin" : function(){
    responseText("ACTech là công ty công nghệ thuộc tập đoàn AnCao được thành lập từ năm 2015 có nhiều năm hoạt động trong lĩnh vực Công nghệ quản trị thông minh.");
    responseText("ACTech đã phát triển cung cấp sản phẩm tới các doanh nghiệp Việt Nam và Thế Giới");
    responseText("Những sản phẩm của ACTech: CRM, AFM, HRM, OFFICE, MRP, SSM, DAS, MBO, DMS+, ASM, PO...được lập trình dựa trên các nền tảng công nghệ hiện đại, với đội ngũ chuyên gia giàu kinh nghiệm, cùng các lập trình viên có trình độ");
    responseText("ACTech luôn sáng tạo để nâng cao hiệu suất quản trị, quy trình tự động hóa. Đó chính là những tiêu chí hàng đầu để ACTech giúp các nhà quản trị hoạch định chiến lược rõ ràng, phát huy hết nguồn lực doanh nghiệp cho khách hàng và đối tác.");
    responseText("Bạn có muốn biết về sứ mệnh của ACTech? (Yes/No)");
    commandReset(2);
    return
    },
  "lĩnh vực" : function(){
    responseText("Những lĩnh vực hoạt động của ACTech:");
    responseText("- Công nghệ quản trị thông minh ACTECH - SMT");
    responseText("- Công nghệ Smart Home, Smart Building, Smart System");
    responseText("- Sản xuất các App. dịch vụ App. ứng dụng");
    responseText("- Gia công các phần mềm");
    commandReset(3);
    return
  },
  "namecard" : function(){
    responseText("Danh sách namecard của công ty:");
    responseImg("hoanghuy");
    responseText("<a href='/namecard/hoanghuy'><b>Quang Huy</b></a>");
    responseImg("kimchung");
    responseText("<a href='/namecard/kimchung'><b>Kim Chung</b></a>");
    responseImg("viettung");
    responseText("<a href='/namecard/viettung'><b>Việt Tùng</b></a>");
    responseImg("luongdung");
    responseText("<a href='/namecard/luongdung'><b>Thế Dũng</b></a>");
    responseImg("luongphuong");
    responseText("<a href='/namecard/luongphuong'><b>Lương Phương</b></a>");
    responseImg("maitrang");
    responseText("<a href='/namecard/maitrang'><b>Mai Trang</b></a>");
    responseImg("manhtien");
    responseText("<a href='/namecard/manhtien'><b>Mạnh Tiến</b></a>");
    responseImg("minhtu");
    responseText("<a href='/namecard/minhtu'><b>Minh Tú</b></a>");
    responseImg("quangminh");
    responseText("<a href='/namecard/quangminh'><b>Quang Minh</b></a>");
    responseImg("hueminh");
    responseText("<a href='/namecard/hueminh'><b>Huệ Minh</b></a>");
    responseImg("vietha");
    responseText("<a href='/namecard/vietha'><b>Việt Hà</b></a>");
    responseImg("nguyendung");
    responseText("<a href='/namecard/nguyendung'><b>Nguyễn Dung</b></a>");
    responseImg("nguyentu");
    responseText("<a href='/namecard/nguyentu'><b>Nguyên Tú</b></a>");
    commandReset(4);
    return
  },
  "sở thích" : function(){
    responseText("ACTee loves:");
    responseText("Coding complicated chatbots");
    responseText("Brainstorming");
    responseText("Going out with friends");
    responseText("Working out");
    commandReset(5);
    return
  },
  "liên hệ" : function(){
    responseText("Email: <a href='mailto:contact@ancaotech.com?Subject=Hello%20ACTech' target='_top'><b>gửi tin nhắn tới tôi</b></a>");
    responseText("Facebook: <a href='https://facebook.com/actechsmt'><b>ACTechSMT</b></a>");
    responseText("Hotline: <a href='tel:+84936825566'><b>+84 936 825 566</b></a> - <a href='tel:+84906083998'><b>+84 906 083 998</b></a>");
    commandReset(6);
    return
  },
  "actee" : function(){
    responseText("Đây là danh sách những câu lệnh mà ACTee biết:")
    responseText("trợ giúp, sản phẩm, thông tin, sứ mệnh, tầm nhìn, chiến lược, lĩnh vực, namecard, sở thích, liên hệ, youtube");
    commandReset(7);
    return
  },
  "sứ mệnh" : function(){
    responseText("Sứ mệnh của AC Tech là mang đến quy trình tự động hóa, nâng cao năng lực quản trị, tối ưu các phương pháp quản lý doanh nghiệp.");
    responseText("Giúp các nhà quản trị nắm bắt thông tin nhanh hơn, đưa ra những quyết định kịp thời dựa trên các dữ liệu được phân tích chuyên sâu, tổng hợp và báo cáo tự động nhằm tiết kiệm thời gian và mang lại hiệu quả kinh tế cao:");
    responseText("Bạn có muốn biết về tầm nhìn của ACTech? (Yes/No)");
    commandReset(8);
    return
  },
  "tầm nhìn" : function(){
    responseText("Tầm nhìn: Mục tiêu dài hạn của AC Tech là trở thành công ty công nghệ hàng đầu, không ngừng sáng tạo những sản phẩm công nghệ quản trị thông minh nhằm giải quyết triệt để “bài toán” quản trị đa ngành nghề,");
    responseText("góp phần thúc đẩy sự tăng trưởng năng suất công việc và hiệu quả kinh tế vượt bậc cho các doanh nghiệp, tổ chức kinh tế - xã hội,…");
    responseText("Bạn có muốn biết về chiến lược phát triển của ACTech? (Yes/No)");
    commandReset(9);
    return
  },
  "chiến lược" : function(){
    responseText("Chiến lược phát triển của ACTech: Với kim chỉ nam “Sự phát triển của khách hàng là mục tiêu hàng đầu”, AC Tech luôn không ngừng sáng tạo nhằm nâng cao chất lượng sản phẩm, dịch vụ.");
    responseText("Từ đó, mang đến những công nghệ quản trị tối ưu, quy trình tự động hóa cùng những trải nghiệm tuyệt vời nhất");
    responseText("Bạn có muốn biết về đội ngũ phát triển của ACTech? (Yes/No)");
    commandReset(10);
    return
  },
  "youtube" : function(){
    window.location.href = "https://www.youtube.com/watch?v=J4uzVHme1EI"
    },
  // work experience
}

var reactionInput = {
  "sản phẩm" : function(){
    //Redirects you to a different page after 3 secs
    responseText("Tại trang này bạn sẽ biết về các sản phẩm của phân hệ ACTech SMT");
    responseText("<a href='/services'><b>ACTech - SMT</b></a>")
    animationCounter = 1;
    return
  },
  "thông tin" : function(){
    responseText("Sứ mệnh của AC Tech là mang đến quy trình tự động hóa, nâng cao năng lực quản trị, tối ưu các phương pháp quản lý doanh nghiệp.");
    responseText("Giúp các nhà quản trị nắm bắt thông tin nhanh hơn, đưa ra những quyết định kịp thời dựa trên các dữ liệu được phân tích chuyên sâu, tổng hợp và báo cáo tự động nhằm tiết kiệm thời gian và mang lại hiệu quả kinh tế cao.");
    animationCounter = 1;
    return
    },
  "sứ mệnh" : function(){
    responseText("Tầm nhìn: Mục tiêu dài hạn của AC Tech là trở thành công ty công nghệ hàng đầu, không ngừng sáng tạo những sản phẩm công nghệ quản trị thông minh nhằm giải quyết triệt để “bài toán” quản trị đa ngành nghề,");
    responseText("góp phần thúc đẩy sự tăng trưởng năng suất công việc và hiệu quả kinh tế vượt bậc cho các doanh nghiệp, tổ chức kinh tế - xã hội,…");
    animationCounter = 1;
    return
    },
  "tầm nhìn" : function(){
    responseText("Chiến lược phát triển của ACTech: Với kim chỉ nam “Sự phát triển của khách hàng là mục tiêu hàng đầu”, AC Tech luôn không ngừng sáng tạo nhằm nâng cao chất lượng sản phẩm, dịch vụ.");
    responseText("Từ đó, mang đến những công nghệ quản trị tối ưu, quy trình tự động hóa cùng những trải nghiệm tuyệt vời nhất");
    animationCounter = 1;
    return
    },
  "chiến lược" : function(){
    responseText("ACTech có những chuyên gia nước ngoài kinh nghiệm nhiều năm ở các nước Châu Âu, Mỹ, Nhật Bản,...cùng các lập trình viên có trình độ cao. ");
    responseText("Đặc biệt ACTech chú trọng đào tạo đội ngũ nhân lực để nâng cao chất lượng vì mục tiêu nhằm mang đến những sản phẩm công nghệ chất lượng tốt nhất dành cho khách hàng.");
    animationCounter = 1;
    return
    }
}
