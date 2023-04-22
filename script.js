const questions = [
    { questionTxt: "commonly used data types DO NOT include:",
    choices:[
        "1.strings", 
        "2.booleans", 
        "3. alertts", 
        "4. numbers"],
        answer:"3. alerts",},
        
        {questionTxt: "Arry in JavaScript can be used to store __________.",
            choices:[
            "1.numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"],
            answer: "4. all of the above"
        },
        
        {questionTxt:"String valuse must be enclosed within _____when being assigned to variables", 
        choices:[
        "1.commas",
        "2.curl brackets", 
        "3.quotes", 
        "4.parentheses"],
        answer:"3.quotes"},
        
        {questionTxt:"A very useful tool used during development and debugging for printing content to the debugger is:", 
        choices:[    
        "1. JavaScript",
        "2.terminal/bash",
        "3.for loops",
        "4.console.log"],
         answer: "4.console.log"},
        
         {questionTxt: "Which of the following is a statement that can be used to terminate a loop, swich or lable statement?",
         choices: [
         "1.break", 
         "2.stop", 
         "3.halt", 
         "4.exit"],
          answer: "1.break",}
    ];
    
    const main = document.querySelector("#main");
    const question_Crd = document.querySelector("#question_crd");
    const results_crd= document.querySelector("#results_crd");
    const leaderBoard = document.querySelector("#leaderboard");
    
    
    function hideCards() {
        main.setAttribute("hidden",true);
        question_Crd.setAttribute("hidden",true);
        results_crd.setAttribute("hidden",true);
        leaderBoard.setAttribute("hidden", true);
    }
    
    const resultdiv = document.querySelector("#results");
    const resultdtxt = document.querySelector("#results_txt");
    
    function hideResultTxt() {
        resultdiv.style.display = "none";
    }
    
    var intervalID;
    var time;
    var currentQuestion;
    
    document.querySelector("#start_btn").addEventListener("click", startQuiz);
    
    
    function startQuiz(){
        hideCards();
        question_Crd.removeAttribute("hidden");
        currentQuestion = 0;
        displayQuestion();
    
        time = questions.length *15;
    
        intervalID = setInterval(countdown,1000);
    
        displayTime();
    }
    
    function countdown(){
        time--;
        displayTime();
        if (time < 1){
            endQuiz();
        }
    }
    
    const timeDisplay = document.querySelector("#time");
    function displayTime() {
        timeDisplay.textContent= time;
    }
    
    function displayQuestion() {
        let question = questions[currentQuestion];
        let choices = question.choices;
    
        let h2QuestionElement= document.querySelector("#question_txt");
        h2QuestionElement.textContent = question.questionTxt;
    
        for (let i = 0; i < choices.length; i++) {
            let choice = choices[i];
            let choicebutton = document.querySelector("#choice" + i);
            choicebutton.textContent = choice;
        }
    
    }
    
    document.querySelector("#quiz_choices").addEventListener("click", checkAnswer);
    
    
    function choiceIsCorrect(choicebutton){
        return choicebutton.textContent === questions[currentQuestion].answer;
    }
    
    function checkAnswer(eventObject) {
        let choicebutton = eventObject.target;
        resultdiv.style.display = "block";
        if(choiceIsCorrect(choicebutton)){
            resultdtxt.textContent = "Correct!";
            setTimeout(hideResultTxt,1000);
        } else{
            resultdtxt.textContent = "Incorrect!";
            setTimeout(hideResultTxt,1000);
            if (time >= 10){
                time = time -10;
                displayTime();
            }  else{
                time = 0;
                displayTime();
                endQuiz();
            }
        }
        
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else{
            endQuiz();
        }
    }
    
    const score = document.querySelector("#score");
    
    function endQuiz() {
        clearInterval(intervalID);
        hideCards();
        results_crd.removeAttribute("hidden");
        score.textContent = time;
    }
    
    
    const submit_btn = document.querySelector("#submit_btn");
    const text = document.querySelector("#initials");
    
    
    submit_btn.addEventListener("click", storeResults);
    
    function storeResults(event) {
        event.preventDefault();
        
         if (!inputElement.value) {
             alert(" Please enter your initials before pressing submit!!");    
         return;
         }
        
        PaymentRequestUpdateEvent(leaderBoard);
        
        hideCards();
        leaderBoard.removeAttribute("hidden");
        
        renderleaderbroad();
        
    }
    
    function updateStoredLeaderboard(leaderboardItem){
        let leaderboardArray = getLeaderboard();
    
        leaderboardArray.push(leaderboardItem);
        localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
    }    
    
    
    function getLeaderbrd(){
        let storedLeaderboard = localStorage.getItem("leaderboardArry");
        if (storedLeaderboard !== null ){
            let leaderboardArray= JSON.parse(storedLeaderboard);
            return leaderboardArray;
        } else{
            leaderboardArray = [];
        }
        return leaderboardArray;
    }
    
    function renderleaderbroad(){
        let sortedleaderboardArry = sortLeaderboard();
        const scoreList = document.querySelector("#score_list");
        //scoreList.InnerHtml = "";
        for (let i = 0; i < sortedleaderboardArry.length; i++){
            let leaderbrdEntry = sortedleaderboardArry[i];
             let listItems =  document.createElement("li");
             listItems.textContent = 
             leaderbrdEntry.initials + "-" + leaderbrdEntry.score;
             scorelist.append(listItems); 
                }
    }
    
    function sortLeaderboard(){
        let leaderboardArray = getLeaderbrd();
        if(!leaderboardArray) {
            return
        }
    
        leaderboardArray.sort(function(a,b){
            return b.score - a.score;
            });
            return leaderboardArray;
    }
    
    const clearBtn = document.querySelector("#clear_btn");
    clearBtn.addEventListener("click",clearscore);
    
    function clearscore() {
        localStorage.clear();
        renderLeaderboard();
    }
    
    
    const backbtn =document.querySelector("#back_btn");
    backbtn.addEventListener("click",returnToStart);
    
    function returnToStart(){
        hidecards();
        main.removeAttribute("hidden");
    }
    
    function showLeaderbrd(){
        hidecards();
        leaderboard.removeAttribute("hidden");
    }
    
    clearInterval(intervalID);
    
    
    
    time = undefined;
    displayTime();
    
    renderleaderbroad();
    
    
