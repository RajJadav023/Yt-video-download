import exprees from "express";
import cors from "cors"
import ytdl from  "@distube/ytdl-core"

const app=exprees();
const port=3000;

app.use(exprees.json());
app.use(cors());

app.get("/" ,(req , res)=>{
    res.send("helo");
})

// just fetch data accoring to ytdl.. send json to react.. 
app.post("/info" , async(req ,res)=>{
    try{
        const {url}=req.body;
        // console.log("link is heree.."+url);
        if(!ytdl.validateURL(url)){
            return res.status(400).json({ message: "Invalid YouTube link" });
        }

        // get yt info..
        const info=await ytdl.getBasicInfo(url);
        // console.log(info.videoDetails.thumbnails);
        res.json({
            title:info.videoDetails.title,
            channel: info.videoDetails.author.name,
            duration: info.videoDetails.lengthSeconds,
            thumbnail: info.videoDetails.thumbnails.at(-1).url
        }); 
    }
    catch(e){
        res.status(500).json({message:"Falied to fetch link.."})
    }
})


// this is broweser.. nevigation for downlaod.. th video..
app.get("/download" , async(req , res)=>{
    try{
        const {url}=req.query;
        if(!url || !ytdl.validateURL(url)){
            return res.status(400).send("invalid url");
        }

        const info= await ytdl.getBasicInfo(url);
        const title=info.videoDetails.title.replace(/[^\w\s]/gi, "");

         res.setHeader(
            "Content-Disposition",
            `attachment; filename="${title}.mp4"`
         );
         // main ytdl ( link , filter)
         ytdl(url , {filter:"audioandvideo"}).pipe(res);

    }catch(e){
        res.status(500).send("Failed to Download");
    }
})

// only video
app.get("/downloadVideo" , async(req , res)=>{
    try{
        const {url}=req.query;
        if(!url || !ytdl.validateURL(url)){
            return res.status(400).send("invalid url");
        }

        const info= await ytdl.getBasicInfo(url);
        const title=info.videoDetails.title.replace(/[^\w\s]/gi, "");

         res.setHeader(
            "Content-Disposition",
            `attachment; filename="${title}.mp4"`
         );
         // main ytdl ( link , filter)
         ytdl(url , {filter:"videoonly"}).pipe(res);

    }catch(e){
        res.status(500).send("Failed to Download Only Video");
    }
})


// only song.
app.get("/downloadSong" , async(req , res)=>{
    try{
        const {url}=req.query;
        if(!url || !ytdl.validateURL(url)){
            return res.status(400).send("invalid url");
        }

        const info= await ytdl.getBasicInfo(url);
        const title=info.videoDetails.title.replace(/[^\w\s]/gi, "");

         res.setHeader(
            "Content-Disposition",
            `attachment; filename="${title}.mp3"`
         );
         // main ytdl ( link , filter)
         ytdl(url , {filter:"audioonly"}).pipe(res);

    }catch(e){
        res.status(500).send("Failed to Download Only Video");
    }
})

app.listen(port , ()=>{
    console.log("server is done.. at :"+port);
})