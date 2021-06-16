$(document).ready(function () {
  
  let questionList = [
    {
      id: 1,
      selected: "i",
      imagePath: "./img/soru1.jpg",
      ques: "Resimde gördüğünüz yerin ismi nedir ?",
      allAnswer: ["Elhamra ", "Machu Picchu", "Casa Milá", "Angkor Wat"],
      correctAnswerId: "1",
    },
    {
      id: 2,
      selected: "v",
      videoPath: "https://www.youtube.com/embed/fzd6tlOybDk?autoplay=1&mute=0&start=64",
      ques: "Dinlediğiniz videodaki şarkı hangi ülkeye aittir ?",
      allAnswer: ["Kore", "Japonya", "Çin","Fransa"],
      correctAnswerId: "2",
    },
    {
      id: 3,
      selected: "i",
      imagePath: "./img/soru3.jpg",
      ques: "Otomobil yıkamaya verilirken yıkanması gereken yerler genellikle nasıl belirtilir ?",
      allAnswer: ["Ön arka", "Alt üst", "İç dış","Cam çerçeve", "Sağ Sol"],
      correctAnswerId: "2",
    },
    {
      id: 4,
      selected: "i",
      imagePath: "./img/soru4.jpg",
      ques: "Ilgaz Dağları'nda dolaştığını söyleyen biri hangi iki il sınırları içerisinde geziyor demektir ?",
      allAnswer: ["Amasya-Giresun","Kastamonu-Bolu", "Sinop-Samsun", "Sakarya-Bolu", "Kastamonu-Çankırı"],
      correctAnswerId: "4",
    },
    {
      id: 5,
      selected: "i",
      imagePath: "./img/soru5.jpg",
      ques: "Antik Yunan’da düzenlenen Olimpiyat oyunlarında birinci olana verilen kupanın içinde hangisi olurdu?",
      allAnswer: ["Altın sikke","Zeytinyağı", "Gümüş sikke", "Tuz"],
      correctAnswerId: "1",
    }
  ];

  let score = $("#score-point");
  let quesTitle = $("#question");
  let quesText = $("#question_text");
  // let picture = $("#pic");
  let answer = $("#answer");
  let imgDiv = $(".imageDiv")

  let index = 0;
  let correctAnswerCount = 0;
  let buttonsAdd = $("#buttons");
  let startButton = $("#startButton");

  let isAnswer = false;
  var display = document.querySelector("#time");

  startButton.click(function () {
    startGame(10);
  });

  function startGame(seconds) {
    quizLoad();
    activateButtons();
    isAnswer = false;
    startTimer(seconds, display);
    answer.html("Sorunun cevabı nedir?");
  }

  function nextToQues() {
    //
    if (index < questionList.length) {
      setTimeout(function () {
        console.log("nextToQues");
        startGame(10);
      }, 3000);
    } else {
      setTimeout(function () {
        delButons();
        resetBtnCreate();
        answer.html("Oyun sona erdi Yeniden başlatmak için tıkla");
        quesTitle.html("Oyun Sona erdi.");
        quesText.html("Toplam skorunuz : "+ correctAnswerCount + "/" + index);
        imgTag("./img/gameover.png");
        let resetBtn = $("#resetBtn");
        resetBtn.click(function () {
          // console.log("reset game");
          index = 0;
          correctAnswerCount = 0;
          startGame(10);
        });
      }, 2000);
    }
  }

  function imgTag(path){ // create img tag
    var pictu = $("<img>",{
      id:"pic"
    })
    pictu.attr("src", path);
    pictu.addClass("picc");
    imgDiv.append(pictu);
  }

  function resetBtnCreate() { // create reset tag
    var button =$("<button></button>",{
      class:"btn defuatBtn",
      id:"resetBtn",
      style:"color:white"
    });
    var txt = $(document.createTextNode("Yeniden Başlat"));
    button.append(txt);
    console.log("button")
    buttonsAdd.append(button);
  }

  function quizLoad() {
    var question = questionList[index];
    delButons();
    
    quesTitle.html("Soru #" + question.id);

    console.log(question.selected)
    if (question.selected === "i") {
      console.log("deneme")
      imgTag(question.imagePath);
    }else if(question.selected === "v"){

      var video = $("<iframe></iframe>",{
        class:"picc",
        width:"100%", height:"100%" ,
        title:"YouTube video player",frameborder : "0",
        allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        // allowfullscreen
      })
      video.attr("src",question.videoPath);
      video.attr("allowfullscreen");
      imgDiv.append(video);
    }

    quesText.html(question.ques);
    index++;
    for (let i = 0; i < question.allAnswer.length; i++) {
      const element = question.allAnswer[i];
      /*
            var button = document.createElement("button");
            button.classList.add('btn');
            button.setAttribute('id', i);
            var txt = document.createTextNode(element);
            button.appendChild(txt);
            */ //color:white
      var button = $("<button></button>", {
        class: "btn cvpBtn",
        style:"color:white"
      });

      button.attr("id", i);
      var txt = $(document.createTextNode(element));
      button.append(txt);

      buttonsAdd.append(button);
    }
    score.html(correctAnswerCount + "/" + index);
  }

  function delButons(){
    $("#buttons .btn").remove();
    $("#path .picc").remove();
  }

  function activateButtons() {
    var correctAnswer = questionList[index - 1].correctAnswerId;
    document.querySelectorAll(".cvpBtn").forEach(function (button) {
      button.addEventListener("click", function () {
        var userAnswer = button.id;
        //    alert("helo " + button.id + " " + cvp + " " + kulCvp);
        if (isAnswer) {
          return;
        }
        isAnswer = true;

        if (userAnswer === correctAnswer) {
          answer.html("Doğru!!");
          answer.addClass("correct");
          button.style.background = "#42AE26";
          correctAnswerCount += 1;
        } else {
          answer.html("Yanlış!!");
          answer.addClass("NCorrect");
          button.style.background = "#E11225"; // kırmızı

          setTimeout(function () {
            button.style.background = "#75AADB"; // acik mavi(cevaba tıklandıktan sonra)
          }, 1000);

          setTimeout(function () {
            document.querySelectorAll(".cvpBtn").forEach(function (userAnswer) {
              var uA = userAnswer.id; // dc bizim tıkladigimizda verilen answer id = [0,1,2,3]
              if (uA === correctAnswer) {
                userAnswer.style.background = "#42AE26"; //yesil
              }
            });
          }, 1500);
        }

        score.html(correctAnswerCount + "/" + index);
        nextToQues();
      });
    });
  }

  function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;

    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    console.log("test " + timer + isAnswer);
    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
      countdownFinished(); // süre bittiginde butonu yesil olarak goster
      
      nextToQues(); // cevaplanmadiysa diger soruya gec
    }
    if (timer >= 0 && !isAnswer) {
      // cevap vermedigi surece calis, butona tıklandiginda true yap if'e girme
      setTimeout(function () {
        startTimer(timer, display);
      }, 1000);
    }
  }

  function countdownFinished() {
    // süre bittiginde userAnswer cevabı goster.
    isAnswer = true;
    var correctAnswer = questionList[index - 1].correctAnswerId;
    document.querySelectorAll(".cvpBtn").forEach(function (userAnswer) {
      var uA = userAnswer.id;
      if (uA === correctAnswer) {
        userAnswer.style.background = "#42AE26";
      }
    });
  }
});
