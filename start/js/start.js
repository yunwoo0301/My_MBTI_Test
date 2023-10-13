const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const endPoint = 12;

function addAnswer(answerText, qIdx) { // answer 박스 생성하기 위해 함수 설정
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button'); // button html의 요소를 해당 answer 변수에 담음
    answer.classList.add('answerList'); // answer의 classList에 answerList 값을 넣어 줌
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer); // answer 버튼이 a에게 소속될 수 있도록 appendChild 관계 함수 설정
    answer.innerHTML = answerText;

    answer.addEventListener("click", function() {
        var children = document.querySelectorAll('.answerList'); // 버튼 요소에 3가지 속성 넣음
        for(let i = 0; i < children.length; i++) {
            children[i].disabled = true; // 버튼 비활성화
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            for(let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx); // 다음 질문으로 +1씩 증가시키기
        }, 450)
    }, false,);
}

function goNext(qIdx) {
    var q = document.querySelector('.qBox'); // qBox 클래스 값 지정
    q.innerHTML = qnaList[qIdx].q; // Index별 질문이 넘어가도록 진행해야하므로 변수로 파라미터 설정
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s"; // begin()가 실행됐을 때 main 영역을 끄기
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s"; // qna 영역을 1초 동안 보여주기
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none"; // main 애니메이션이 끝났을 때 해당 영역을 노출x
            qna.style.display = "block"; // main 섹션 사라진 후 qna 섹션 노출o
        }, 450)
        let qIdx = 0; // qIdx 뱐수 만들기
        goNext(qIdx);
    }, 450);
}