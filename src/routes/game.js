const express=require('express')

const router=new express.Router()

router.post('/deal',(req,res)=>{
    console.log(req.body)
    let cardVal=Math.floor(Math.random()*req.body.images.length)
    // console.log(cardVal)
    let cardnme=req.body.images[cardVal]
    let action=''
    if(cardnme.split('.')[0]==='aces'){
        action='switch'
    }else{
        action='keep'
    }
    let activeplayer=req.body.activeplayer==0?1:0

    let cardvalue=translatecards(cardnme)

    res.send({
        cardnum:cardVal,
        card:cardnme,
        action,
        activeplayer,
        cardvalue
    })
})

const translatecards=(card)=>{
    //2D.jpg
    
    let crdval=card.slice(0,card.indexOf('.')-1)
    // console.log(crdval)
    const patt=/[0-9]/g
    if (!crdval.match(patt)){
        // console.log('String')
        return (()=>{
            if (crdval==='A'){
                return 11
            }else{
                return 10
            }
        })()
    }else{
        // console.log('Int')
        return crdval
    }

}

router.post('/wincheck',(req,res)=>{

    if (req.body.totalscore===21){
        //gameplay=false
        //return [true,plyrnum]
        res.send({
            winner:true,
            playernum:req.body.activeplayer
        })
    }else if(req.body.totalscore>21){
        //gameplay=false
        let winplyr=req.body.activeplayer===0?1:0
        //return plyrnum===0?[true,1]:[true,0]
        res.send({
            winner:true,
            playernum:winplyr
        })
    }else{
        res.send({
            winner:false,
            playernum:req.body.activeplayer
        })
        //return [false,plyrnum]
    }
})



router.post('/end',(req,res)=>{
    console.log('hello')
    if(req.body.currScore===21){
        res.send({
            winner:true,
            currplayer
        })
    }else if(req.body.currScore>21){
        let currplayer=req.body.currplayer===0?1:0
        res.send({
            winner:true,
            currplayer
        })
    }else{
        let othrplyr=req.body.currplayer===0?1:0
        let scores=req.body.scores
        if((21-req.body.currScore)<(21-scores[othrplyr])){
            res.send({
                winner:true,
                currplayer:req.body.currplayer
            })
        }else if((21-req.body.currScore)>(21-scores[othrplyr])){
            res.send({
                winner:true,
                currplayer:othrplyr
            })
            
        }else{
            res.send({
                winner:'draw'
            })
            //return ['draw',undefined]
        }
    }
    
})


module.exports=router