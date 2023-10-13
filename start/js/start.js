const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result"); // result 섹션 선택자 생성

const endPoint = 12; // 전체 문항 페이지
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult() { // 대답 항목을 연산해주는 결과 함수 생성
    console.log(select);
    var result = select.indexOf(Math.max(...select)); // select 배열의 최대값 반환
    return result;
} 

function setResult() { 
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;
    
    var resultImg = document.createElement('img'); // img태그 생성
    const imgDiv = document.querySelector('#resultImg'); // resultImg div 태그 생성
    var imgURL = 'img/image-' + point + '.png'; // 주소값 만들기
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg); // 결과 이미지 연결

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}



function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})

        console.log(select); // 대답 항목 콘솔 확인
        setResult();
}

function addAnswer(answerText, qIdx, idx) { // answer 박스 생성하기 위해 함수 설정
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
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++) {
                select[target[i]] += 1; // 사용자가 버튼을 선택했을 때 12간지의 순서대로 해당 타입이 1씩 증가
            }
            for(let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx); // 다음 질문으로 +1씩 증가시키기
        }, 450)
    }, false);
}

function goNext(qIdx) {
    if(qIdx === endPoint) { // 각 문항의 값이 마지막 endPoint와 같다면 결과 페이지 함수 호출 
        goResult();
        return;
    }

    var q = document.querySelector('.qBox'); // qBox 클래스 값 지정
    q.innerHTML = qnaList[qIdx].q; // Index별 질문이 넘어가도록 진행해야하므로 변수로 파라미터 설정
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
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