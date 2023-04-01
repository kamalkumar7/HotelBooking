export const upload = (req,res)=>{
    const {link} = req.body;
    res.json(link);
}