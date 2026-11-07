document.addEventListener("DOMContentLoaded",async()=>{
 const nav=document.getElementById("mainNav"),side=document.getElementById("sidebar"),menu=document.getElementById("menuBtn");if(menu&&side)menu.addEventListener("click",()=>side.classList.toggle("open"));
 if(nav){const here=location.pathname.split("/").pop()||"dashboard.html";nav.querySelectorAll("a").forEach(a=>a.classList.toggle("active",a.getAttribute("href").split("/").pop()===here));}
 const logout=document.getElementById("logoutBtn");if(logout)logout.addEventListener("click",async()=>{if(window.zuneSupabase)await zuneSupabase.auth.signOut();location.href="index.html"});
 if(window.zuneSupabase){try{const {data:{user}}=await zuneSupabase.auth.getUser();const label=user?.user_metadata?.full_name||user?.email||"Administrator";["sidebarAdmin","topAdmin"].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=label});}catch(e){console.warn(e)}}
 const c=document.getElementById("connectionLabel"),state=document.getElementById("connectionState");if(c)c.textContent=window.zuneIsLive?"SUPABASE CONNECTED":"OFFLINE";if(state)state.textContent=window.zuneIsLive?"Supabase client ready":"Connection unavailable";
 const refresh=document.getElementById("refreshDashboard");if(refresh)refresh.addEventListener("click",()=>location.reload());
});
window.zuneToast=(msg)=>{const host=document.getElementById("toastHost");if(!host)return;const el=document.createElement("div");el.className="toast";el.textContent=msg;host.appendChild(el);setTimeout(()=>el.remove(),3500)};
