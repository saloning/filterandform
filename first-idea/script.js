const steps = [
  {
    coffee:"COFFEE RITUAL 01", time:"2 MIN READ", design:"DESIGN STEP 01 / DISCOVER",
    title:"Choose your beans.", desc:"Every cup starts with a choice. Traditional South Indian filter coffee often blends dark-roasted coffee with chicory for body, aroma, and that unmistakable depth.",
    metaphor:"Start with people, not assumptions. Learn who you're designing for and what they actually need before choosing a direction.",
    takeaway:"Write one clear problem statement. Who is it for, and what are they trying to do?",
    label:"START WITH THE SOURCE", object:"beans"
  },
  {
    coffee:"COFFEE RITUAL 02", time:"3 MIN READ", design:"DESIGN STEP 02 / DEFINE",
    title:"Grind & measure.", desc:"The grind changes the extraction. Too coarse and the cup can feel weak; too fine and the brew may turn harsh. Small choices change the whole result.",
    metaphor:"Turn research into a focused problem. Group what you heard, spot patterns, and decide which user need is worth solving first.",
    takeaway:"Create a “How might we…?” question that is specific enough to guide you, but open enough to invite ideas.",
    label:"FIND THE RIGHT BALANCE", object:"grind"
  },
  {
    coffee:"COFFEE RITUAL 03", time:"2 MIN READ", design:"DESIGN STEP 03 / IDEATE",
    title:"Pack the filter.", desc:"Add the grounds to the upper chamber and level them gently. Set the filter together with care: the setup shapes how the water will move through it.",
    metaphor:"Explore a few routes before committing. Sketch, map, and compare different ways to solve the problem instead of falling in love with your first idea.",
    takeaway:"Sketch three different concepts in five minutes. Quantity first; judge them after.",
    label:"MAKE ROOM FOR IDEAS", object:"filter"
  },
  {
    coffee:"COFFEE RITUAL 04", time:"4–8 MIN STEEP", design:"DESIGN STEP 04 / PROTOTYPE",
    title:"Let it drip.", desc:"Pour hot water into the top chamber, close it, and give the decoction time to collect below. The best part of this step is resisting the urge to rush it.",
    metaphor:"Make your idea tangible. A wireframe, paper flow, or clickable mock-up lets you explore the experience before investing in a polished build.",
    takeaway:"Prototype just one important user flow. Make it rough, fast, and easy to change.",
    label:"LET THE IDEA DEVELOP", object:"drip"
  },
  {
    coffee:"COFFEE RITUAL 05", time:"3 MIN READ", design:"DESIGN STEP 05 / TEST & ITERATE",
    title:"Mix & taste.", desc:"Combine a little strong decoction with hot milk, then adjust to taste. Your first pour is a starting point — not a rule you have to follow forever.",
    metaphor:"Put the prototype in front of people. Watch what they do, listen to what feels confusing, and improve the design based on what you learn.",
    takeaway:"Run a small usability test. Ask people to complete a task and observe where they hesitate.",
    label:"LEARN FROM EVERY SIP", object:"mix"
  },
  {
    coffee:"COFFEE RITUAL 06", time:"2 MIN READ", design:"DESIGN STEP 06 / DELIVER",
    title:"Serve the good stuff.", desc:"Pour between the tumbler and davara to cool and aerate the coffee, then serve it fresh. A thoughtful final touch makes the whole ritual feel complete.",
    metaphor:"Polish the details, share the work, and make sure the solution reaches the people it was made for. Then keep learning from the real-world experience.",
    takeaway:"Present the problem, your decisions, what you tested, and what changed. A strong case study tells the story — not just shows screens.",
    label:"MAKE IT READY FOR PEOPLE", object:"serve"
  }
];
let current = 0;
const $ = id => document.getElementById(id);
function renderStep(index){
  current = Math.max(0, Math.min(steps.length - 1, index));
  const s = steps[current];
  $("coffeeLabel").textContent = s.coffee;
  $("stepTime").textContent = s.time;
  $("designEyebrow").textContent = s.design;
  $("stepTitle").textContent = s.title;
  $("stepDescription").textContent = s.desc;
  $("metaphorText").textContent = s.metaphor;
  $("takeawayText").textContent = s.takeaway;
  $("visualLabel").textContent = s.label;
  $("visualNumber").textContent = String(current + 1).padStart(2,"0");
  $("visualObject").className = `visual-object ${s.object}-object`;
  $("visualObject").innerHTML = visualMarkup(s.object);
  $("progressText").textContent = `${current + 1} OF 6`;
  $("progressFill").style.width = `${((current + 1) / steps.length) * 100}%`;
  $("prevBtn").disabled = current === 0;
  $("nextBtn").innerHTML = current === steps.length - 1 ? 'FINISH THE RITUAL <span>✳</span>' : 'NEXT STEP <span>→</span>';
  document.querySelectorAll(".step-link").forEach((el,i)=>el.classList.toggle("active", i===current));
}
function visualMarkup(type){
  const marks = {
    beans: '<span>●</span><span>●</span><span>●</span><span>●</span><span>●</span>',
    grind: '<span class="grind-dot"></span><span class="grind-dot"></span><span class="grind-dot"></span><span class="grind-dot"></span><span class="grind-dot"></span><span class="grind-dot"></span><span class="grind-dot"></span><span class="grind-dot"></span><span class="grind-dot"></span>',
    filter: '<div class="filter-top"></div><div class="filter-bottom"></div><div class="filter-coffee"></div>',
    drip: '<div class="drip-filter"></div><span class="drop drop-one"></span><span class="drop drop-two"></span><div class="drip-cup"></div>',
    mix: '<div class="mix-cup"><span></span></div><div class="mix-swirl"></div>',
    serve: '<div class="serve-saucer"></div><div class="serve-tumbler"><span></span></div><div class="serve-spark">✳</div>'
  };
  return marks[type] || marks.beans;
}
$("nextBtn").addEventListener("click",()=>{
  if(current < steps.length-1){renderStep(current+1); $("stepCard").scrollIntoView({behavior:"smooth",block:"nearest"});}
  else {document.getElementById("field-notes").scrollIntoView({behavior:"smooth"});}
});
$("prevBtn").addEventListener("click",()=>renderStep(current-1));
document.querySelectorAll(".step-link").forEach(el=>el.addEventListener("click",()=>{renderStep(Number(el.dataset.step)); if(window.innerWidth<640) $("stepCard").scrollIntoView({behavior:"smooth",block:"start"});}));
$("startBtn").addEventListener("click",()=>document.getElementById("journey").scrollIntoView({behavior:"smooth"}));
$("restartBtn").addEventListener("click",()=>{renderStep(0);document.getElementById("journey").scrollIntoView({behavior:"smooth"});});
renderStep(0);
