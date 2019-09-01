let totalscore=0
let activeplayer=0
let scores=[0,0]
let gameplay=true


//DOM variables

let current1=document.querySelector('#current-0')
let current2=document.querySelector('#current-1').textContent
let totscore1=document.querySelector('#score-0')
let totscore2=document.querySelector('#score-1')
let cardimg=document.querySelector('.card')

//Initialization
current1.textContent=0
current2.textContent=0
totscore1.textContent=0
totscore2.textContent=0
cardimg.style.display='none'
const imgefiles=['10C.jpg', '10D.jpg', '10H.jpg', '10S.jpg', '2C.jpg', '2D.jpg', '2H.jpg', '2S.jpg', '3C.jpg', '3D.jpg', '3H.jpg', '3S.jpg', '4C.jpg', '4D.jpg', '4H.jpg', '4S.jpg', '5C.jpg', '5D.jpg', '5H.jpg', '5S.jpg', '6C.jpg', '6D.jpg', '6H.jpg', '6S.jpg', '7C.jpg', '7D.jpg', '7H.jpg', '7S.jpg', '8C.jpg', '8D.jpg', '8H.jpg', '8S.jpg', '9C.jpg', '9D.jpg', '9H.jpg', '9S.jpg', 'AC.jpg', 'AD.jpg', 'AH.jpg', 'AS.jpg',  'JC.jpg', 'JD.jpg', 'JH.jpg', 'JS.jpg', 'KC.jpg', 'KD.jpg', 'KH.jpg', 'KS.jpg', 'QC.jpg', 'QD.jpg', 'QH.jpg', 'QS.jpg','aces.jpg']


const dealApi=async ()=>{
    let bdy={
        images:imgefiles,
        activeplayer
        }
    try{
        const dealResp=await fetch ('http://localhost:3000/deal',{
            method: 'POST',
            body:JSON.stringify(bdy),
            headers:{'Content-Type':'application/json'}
        })
        const dealJson=await dealResp.json()
        //console.log(dealJson)
        cardimg.style.display='block'
        cardimg.src='images/cards/'+dealJson.card

        if(dealJson.action==='switch'){
            document.querySelector('#current-'+activeplayer).textContent=0
            document.querySelector('#score-'+activeplayer).textContent=scores[activeplayer]
            document.querySelector('.player-'+activeplayer+'-panel').classList.toggle('active')
            activeplayer=dealJson.activeplayer
            cardimg.style.display='none'
            document.querySelector('.player-'+activeplayer+'-panel').classList.toggle('active')
            totalscore=scores[activeplayer]
        }else if(dealJson.action==='keep'){
            
            totalscore+=parseInt(dealJson.cardvalue)
            document.querySelector('#current-'+activeplayer).textContent=totalscore
            const winbdy={
                totalscore,
                activeplayer
            }
            const wincheck=await fetch('http://localhost:3000/wincheck',{
                method:'post',
                body:JSON.stringify(winbdy),
                headers:{'Content-Type':'application/json'}
            })          

            let winresp=await wincheck.json()
            
            if(winresp.winner===true){
                declare_winner(winresp.playernum)
            }
            
        }
    }catch(e){
        alert('Error in communicating with server. Please retry')
    }    
}

const holdapi=async (addscore)=>{
    scores[activeplayer]=addscore
    const winbdy={
        totalscore:scores[activeplayer],
        activeplayer
    }
    try{
    const wincheck=await fetch('http://localhost:3000/wincheck',{
        method:'post',
        body:JSON.stringify(winbdy),
        headers:{'Content-Type':'application/json'}
    })          

    let winresp=await wincheck.json()
    
    if(winresp.winner){

        if(winresp.playernum===activeplayer){
            document.querySelector('#current-'+activeplayer).textContent=0
            document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active')
            document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner')
            document.querySelector('#name-'+activeplayer).textContent='Winner'
            cardimg.style.display='none'
        }else{
            document.querySelector('#current-'+activeplayer).textContent=0
            document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active')
            activeplayer=activeplayer===0?1:0
            document.querySelector('#current-'+activeplayer).textContent=0
            
            document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner')
            document.querySelector('#name-'+activeplayer).textContent='Winner'
            cardimg.style.display='none'
        }

    }else{
        document.querySelector('#score-'+activeplayer).textContent=scores[activeplayer]
        document.querySelector('#current-'+activeplayer).textContent=0
        document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active')
        console.log(`Before: ${activeplayer}`)
        activeplayer=activeplayer==0?1:0
        console.log(`After: ${activeplayer}`)
        totalscore=scores[activeplayer]
        document.querySelector('.player-'+activeplayer+'-panel').classList.add('active')
        cardimg.style.display='none'
    }
}catch(e){
    alert('Error in communicating with server. Please retry')
}

}



const check_winner=(currScore,plyrnum)=>{

    if (currScore===21){
        gameplay=false
        return [true,plyrnum]
    }else if(currScore>21){
        gameplay=false
        return plyrnum===0?[true,1]:[true,0]
    }else{
        return [false,plyrnum]
    }

}

const reset_game=()=>{
    document.querySelector('#current-0').textContent=0
    document.querySelector('#current-1').textContent=0
    document.querySelector('#score-0').textContent=0
    document.querySelector('#score-1').textContent=0
    document.querySelector('.card').style.display='none'
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent='Player 1'
    document.querySelector('#name-1').textContent='Player 2'
    totalscore=0
    activeplayer=0
    scores=[0,0]
    gameplay=true
}



const end_game_api=async (currScore,currplayer)=>{
    try{
        gameplay=false
        end_bdy={
            currScore,
            currplayer,
            scores
        }
        const endres=await fetch('http://localhost:3000/end',{
            method:'POST',
            body:JSON.stringify(end_bdy),
            headers:{'Content-Type':'application/json'}
        })
        const endresp=await endres.json()
        // console.log(endresp)
        return endresp
    }catch(e){
        alert('Error in communicating with server. Please retry')
    }
}


const declare_winner=(winnerplyr)=>{
    console.log('triggered')
    let othrplyr=winnerplyr===0?1:0
    // document.querySelector('#current-'+othrplyr).textContent=0
    document.querySelector('.player-'+othrplyr+'-panel').classList.remove('active')
    // document.querySelector('#current-'+activeplayer).textContent=0            
    document.querySelector('.player-'+winnerplyr+'-panel').classList.add('winner')
    document.querySelector('#name-'+winnerplyr).textContent='Winner'
    cardimg.style.display='none'
    gameplay=false
}



//Deal Card
document.querySelector('.btn-roll').addEventListener('click',()=>{
    if(gameplay){
        dealApi()
    }
})

//hold turn
document.querySelector('.btn-hold').addEventListener('click',()=>{
    if(gameplay){
        holdapi(totalscore)
        console.log(`After func: ${activeplayer}`)
        activeplayer=activeplayer
    }
    
})


//new game
document.querySelector('.btn-new').addEventListener('click',()=>{
    reset_game()
})


document.querySelector('.btn-end').addEventListener('click',async ()=>{
    if(gameplay){
        let winr=await end_game_api(totalscore,activeplayer)
        // console.log(winr)
        if (winr.winner==='draw'){
            alert('Its a draw!!')
            reset_game()
        }else{
            if(winr.currplayer===activeplayer){
                document.querySelector('#current-'+activeplayer).textContent=0
                document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active')
                document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner')
                document.querySelector('#name-'+activeplayer).textContent='Winner'
                cardimg.style.display='none'
            }else{
                document.querySelector('#current-'+activeplayer).textContent=0
                document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active')
                activeplayer=activeplayer===0?1:0
                document.querySelector('#current-'+activeplayer).textContent=0
                
                document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner')
                document.querySelector('#name-'+activeplayer).textContent='Winner'
                cardimg.style.display='none'
            }   
        }
    }
})








