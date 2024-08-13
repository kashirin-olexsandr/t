import{a as b,S as w,i as n}from"./assets/vendor-0Fq3u7cb.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const L="45384673-88f77579824a7b83d33085da5",S="https://pixabay.com/api/";async function q(s,r=1){try{return(await b.get(S,{params:{key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r}})).data}catch(o){throw new Error(o.response?o.response.data.message:o.message)}}function P(s){s.innerHTML=""}function $(s,r){const o=s.map(({webformatURL:l,largeImageURL:e,tags:t,likes:a,views:p,comments:g,downloads:h})=>`
            <li class="gallery-list-item">
                <a class="gallery-link" href="${e}">
                    <img class="gallery-img" src="${l}" 
                        alt="${t}" 
                        title="${t}" />
                    <ul class="sub-list">
                        <li class="sub-list-item">
                            <b>Likes</b>
                            <p>${a}</p>
                        </li>
                        <li class="sub-list-item">
                            <b>Views</b>
                            <p>${p}</p>
                        </li>
                        <li class="sub-list-item">
                            <b>Comments</b>
                            <p>${g}</p>
                        </li>
                        <li class="sub-list-item">
                            <b>Downloads</b>
                            <p>${h}</p>
                        </li>
                    </ul>
                </a>
            </li>`).join("");r.insertAdjacentHTML("beforeend",o)}const v=document.querySelector("#search-form"),c=document.querySelector(".gallery"),m=document.querySelector(".loader"),i=document.querySelector(".load-more-btn");let d="",u=1,y=0,E=new w(".gallery a",{});v.addEventListener("submit",async s=>{if(s.preventDefault(),d=s.currentTarget.elements.query.value.trim(),d===""){n.error({message:"Please enter a search term."});return}u=1,P(c),i.style.display="none",await f(!1)});i.addEventListener("click",async()=>{await f(!0)});async function f(s=!0){m.style.display="block",i.style.display="none";try{const r=await q(d,u);if(r.hits.length===0&&u===1)n.info({message:"Sorry, there are no images matching your search query. Please try again!"});else if($(r.hits,c),E.refresh(),u++,y=r.totalHits,c.children.length>=y?(i.style.display="none",n.info({message:"We're sorry, but you've reached the end of search results."})):i.style.display="block",s){const o=c.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}catch(r){n.error({message:r.message})}finally{m.style.display="none"}}
//# sourceMappingURL=commonHelpers.js.map
