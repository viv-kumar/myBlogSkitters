import db from "@/lib/db";
 export  async function GET(req,res){
   const {keyword} =req.query || ""
   
    try{
        await db.connect()
        const searchQuery=keyword?{title:{$:new RegExp(keyword,"i")}}:{};
        const blog=await Blog.find(searchQuery).toArray()
       return new Response(JSON.stringify(blog), { status: 200 });
    }
    catch{
        return new Response(JSON.stringify(null), { status: 500 });
    }
 }