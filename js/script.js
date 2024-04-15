const paragraphs=[
    "Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.",
    "Once you have mastered the use of topic sentences, you may decide that the topic sentence for a particular paragraph really shouldn’t be the first sentence of the paragraph. This is fine—the topic sentence can actually go at the beginning, middle, or end of a paragraph; what’s important is that it is in there somewhere so that readers know what the main idea of the paragraph is and how it relates back to the thesis of your paper. Suppose that we wanted to start the piranha paragraph with a transition sentence—something that reminds the reader of what happened in the previous paragraph—rather than with the topic sentence. Let’s suppose that the previous paragraph was about all kinds of animals that people are afraid of, like sharks, snakes, and spiders. Our paragraph might look like this (the topic sentence is bold):",
    "Like sharks, snakes, and spiders, piranhas are widely feared. Although most people consider piranhas to be quite dangerous, they are, for the most part, entirely harmless. Piranhas rarely feed on large animals; they eat smaller fish and aquatic plants. When confronted with humans, piranhas’ first instinct is to flee, not attack. Their fear of humans makes sense. Far more piranhas are eaten by people than people are eaten by piranhas. If the fish are well-fed, they won’t bite humans.",
    "Although most people consider piranhas to be quite dangerous, they are, except in two main situations, entirely harmless. Piranhas rarely feed on large animals; they eat smaller fish and aquatic plants. When confronted with humans, piranhas’ instinct is to flee, not attack. But there are two situations in which a piranha bite is likely. The first is when a frightened piranha is lifted out of the water—for example, if it has been caught in a fishing net. The second is when the water level in pools where piranhas are living falls too low. A large number of fish may be trapped in a single pool, and if they are hungry, they may attack anything that enters the water."
];

const typingText = document.querySelector(".typing-text ");
inpField= document.querySelector(".wrapper .input-field");
mistakeTag=document.querySelector(".mistake span");
timeTag= document.querySelector(".time span b");
wpmTag = document.querySelector(".wpm span");
cpmTag=document.querySelector(".cpm span");
tryAgainBtn=document.querySelector("button");

let charIndex=0,
timer,maxTime=10,
timeLeft=maxTime,isTyping=0,
mistakes=0;

function randomParagraph(){
    let randIndex=  Math.floor(Math.random()*paragraphs.length);
    typingText.innerHTML="";
    paragraphs[randIndex].split("").forEach(span=>{
        let spanTag= `<span>${span}</span>`;
        typingText.innerHTML +=spanTag;
       
    })
    document.addEventListener("keydown",()=>inpField.focus());
    typingText.addEventListener("click",()=>inpField.focus());

}

function initTyping(){
    const characters= typingText.querySelectorAll("span");
    let typeChar=inpField.value.split("")[charIndex];
    if(charIndex<characters.length-1&&timeLeft>0){
    if(!isTyping){
        timer = setInterval(initTimer,1000);
        isTyping=true;
    }
    if(typeChar ==null){
        charIndex--;
        if(characters[charIndex].classList.contains("incorrect")){
            mistakes--;
        }
        characters[charIndex].classList.remove("correct","incorrect");
        
    }else{
        if(characters[charIndex].innerText===typeChar){
        characters[charIndex].classList.add("correct");
        }else{
            mistakes++;
            characters[charIndex].classList.add("incorrect");
        }
        charIndex++;
    }
    characters.forEach(span=> span.classList.remove("active"));
    characters[charIndex].classList.add("active");
    let wpm = Math.round((((charIndex-mistakes)/5)/(maxTime-timeLeft))*60);
    wpmTag.innerText= wpm;
    mistakeTag.innerText= mistakes;
    cpmTag.innerText=charIndex-mistakes;
}else{
    inpField.value="";
    clearInterval(timer);
}
}

function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTag.innerHTML=timeLeft;
    }else{
        clearInterval(timer);
    }
}
randomParagraph();
function resetGame(){
    
    randomParagraph();
    timeLeft=maxTime,
    charIndex=mistakes=isTyping=0;
    mistakeTag.innerText=mistakes;
    timeTag.innerText=timeLeft;
    wpmTag.innerText=0;
    cpmTag.innerText=0;
    
}

inpField.addEventListener("input",initTyping);
tryAgainBtn.addEventListener("click",resetGame);