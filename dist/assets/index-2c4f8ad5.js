(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();const p=document.querySelectorAll(".ring"),y=document.querySelectorAll(".tower"),l=document.querySelector("#start-button"),d=document.querySelector("#restart-button"),v=document.getElementById("move-sound"),g=document.getElementById("end-sound"),h=document.getElementById("restart-sound"),w=document.getElementById("start-sound");function f(o,t=.2){o.volume=t,o.play()}function b(o,t){const s=o.firstElementChild;s?(s.classList.add("fade-in"),f(v),t.firstElementChild?t.insertBefore(s,t.firstChild):t.appendChild(s)):console.warn("There is no ring to move")}function S(o,t,s,i){function e(r,c){return new Promise(a=>{setTimeout(()=>{b(r,c),a()},600)})}async function n(r,c,a,m){m===1?await e(r,c):(await n(r,a,c,m-1),await e(r,c),await n(a,c,r,m-1))}return n(o,t,s,i)}async function L(o,t,s){for(;o.firstChild;)t.appendChild(o.firstChild),f(h,.8),await new Promise(i=>setTimeout(i,s))}async function C(o){const t=document.querySelector(".tower.A"),s=document.querySelector(".tower.C");await L(s,t,100),l.disabled=!1,d.classList.remove("active"),u=!1,l.disabled=!1,l.classList.add("active")}let u=!1;function E(){if(!u){f(w),console.log("The Towers are being moved..."),u=!0,l.disabled=!0,d.disabled=!0,l.classList.remove("active");const o=p.length;S(y[0],y[2],y[1],o).then(()=>{console.log("The towers have been moved. You can start again..."),f(g),u=!1,d.disabled=!1,d.classList.add("active")})}}l.addEventListener("click",E);d.addEventListener("click",()=>{C()});