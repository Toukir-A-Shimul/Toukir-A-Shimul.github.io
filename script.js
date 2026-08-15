const html=document.documentElement;
const saved=localStorage.getItem("toukir-theme");
if(saved==="light") html.classList.add("light");

document.getElementById("themeToggle").addEventListener("click",()=>{
  html.classList.toggle("light");
  localStorage.setItem("toukir-theme",html.classList.contains("light")?"light":"dark");
});

const mobileToggle=document.getElementById("mobileToggle");
const mobileNav=document.getElementById("mobileNav");
mobileToggle.addEventListener("click",()=>mobileNav.classList.toggle("open"));
mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileNav.classList.remove("open")));

document.getElementById("year").textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("show");observer.unobserve(entry.target);}
  });
},{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const dot=document.querySelector(".cursor-dot"), ring=document.querySelector(".cursor-ring");
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
dot.style.left=mx+"px";dot.style.top=my+"px";ring.style.left=rx+"px";ring.style.top=ry+"px";
addEventListener("mousemove",e=>{
  mx=e.clientX;my=e.clientY;
  dot.style.left=mx+"px";dot.style.top=my+"px";
});
(function loop(){
  rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
  ring.style.left=rx+"px";ring.style.top=ry+"px";
  requestAnimationFrame(loop);
})();
document.querySelectorAll("a,button,.project,.certificate,.skill,.contact-details>span").forEach(el=>{
  el.addEventListener("mouseenter",()=>document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-hover"));
});

const sections=[...document.querySelectorAll("main section[id]")];
const links=[...document.querySelectorAll(".navbar nav a")];
const activeObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+entry.target.id));
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>activeObserver.observe(s));

const focusTargets = document.querySelectorAll(
  ".hero-copy, .hero-photo, .tech-strip, .about-intro, .about-body, " +
  ".skills-grid .skill, .project, .education-item, .certificate, .contact-box, " +
  ".contact-details>a, .contact-details>span, .contact-socials a"
);
focusTargets.forEach(el => {
  el.classList.add("hover-lift");
  el.addEventListener("mouseenter", () => el.classList.add("cursor-focus"));
  el.addEventListener("mouseleave", () => el.classList.remove("cursor-focus"));
});
