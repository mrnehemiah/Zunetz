(function(){
  const cfg=window.ZUNE_CONFIG||{};
  window.zuneSupabase=null; window.zuneIsLive=false; window.zuneConnectionError=null;
  try {
    if(!window.supabase?.createClient) throw new Error("Supabase JS library did not load. Check network/CDN access.");
    if(!cfg.SUPABASE_URL||!cfg.SUPABASE_PUBLISHABLE_KEY) throw new Error("Supabase URL or publishable key is missing.");
    window.zuneSupabase=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    window.zuneIsLive=true;
  } catch(e){window.zuneConnectionError=e; console.error(e);}
  const client=()=>{if(!window.zuneSupabase)throw window.zuneConnectionError||new Error("Supabase is not connected.");return window.zuneSupabase};
  window.ZuneDB={
    async list(table,order="created_at",limit=250){const {data,error}=await client().from(table).select("*").order(order,{ascending:false}).limit(limit);if(error)throw error;return data||[]},
    async count(table,filters=[]){let q=client().from(table).select("*",{count:"exact",head:true});filters.forEach(([col,op,val])=>q=q[op](col,val));const {count,error}=await q;if(error)throw error;return count||0},
    async sum(table,column,filters=[]){let q=client().from(table).select(column);filters.forEach(([col,op,val])=>q=q[op](col,val));const {data,error}=await q.limit(10000);if(error)throw error;return (data||[]).reduce((n,r)=>n+(Number(r[column])||0),0)},
    async insert(table,row){const {data,error}=await client().from(table).insert(row).select().single();if(error)throw error;return data},
    async update(table,id,patch){const {data,error}=await client().from(table).update({...patch,updated_at:new Date().toISOString()}).eq("id",id).select().single();if(error)throw error;if(!data)throw new Error("No row updated. Check record ID and permissions.");return data},
    async remove(table,id){const {data,error}=await client().from(table).delete().eq("id",id).select("id");if(error)throw error;if(!data?.length)throw new Error("No row deleted. Check record ID and permissions.")},
    async log(action,entity,details={}){try{await client().from("admin_activity_logs").insert({action,entity,details});}catch(e){console.warn("Audit log write failed",e)}}
  };
})();
