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

const dealCard=()=>{

    let cardval=Math.floor(Math.random()*imgefiles.length)
    cardimg.style.display='block'
    cardimg.src='images/cards/'+imgefiles[cardval]
    if (imgefiles[cardval].split('.')[0]==='aces'){
        document.querySelector('#current-'+activeplayer).textContent=0
        document.querySelector('#score-'+activeplayer).textContent=scores[activeplayer]
        document.querySelector('.player-'+activeplayer+'-panel').classList.toggle('active')
        activeplayer=activeplayer==0?1:0
        cardimg.style.display='none'
        document.querySelector('.player-'+activeplayer+'-panel').classList.toggle('active')
        totalscore=scores[activeplayer]
    }else{
        let val=translatecards(imgefiles[cardval])
        totalscore+=parseInt(val)
        document.querySelector('#current-'+activeplayer).textContent=totalscore

        if (totalscore===21){
            declare_winner(activeplayer)
        }else if(totalscore>21){
            let winr=activeplayer===0?1:0
            declare_winner(winr)
        }
    }

}

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



//hold function
const holdfunc=(addscore)=>{
    console.log(`Entering func: ${activeplayer}`)
    // console.log(typeof(scores[activeplayer]))
    // activeplayer=activeplayer==0?1:0
    scores[activeplayer]=addscore
    // console.log(scores[activeplayer])
    let winr=check_winner(scores[activeplayer],activeplayer)

    if (winr[0]){

        if(winr[1]===activeplayer){
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
    document.querySelector('.player-'+activeplayer+'-panel').classList.toggle('active')
    console.log(`Before: ${activeplayer}`)
    activeplayer=activeplayer==0?1:0
    console.log(`After: ${activeplayer}`)
    totalscore=scores[activeplayer]
    document.querySelector('.player-'+activeplayer+'-panel').classList.toggle('active')
    cardimg.style.display='none'
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
    document.querySelector('#name-0').textContent='Player 1'
    document.querySelector('#name-1').textContent='Player 2'
    totalscore=0
    activeplayer=0
    scores=[0,0]
    gameplay=true
}


const end_game=(currScore,currplayer)=>{
    console.log(`end game i: ${currplayer}`)
    gameplay=false
    if(currScore===21){
        return [true,currplayer]
    }else if(currScore>21){
        currplayer=currplayer===0?1:0
        return [true,currplayer]
    }else{
        othrplyr=currplayer===0?1:0
        console.log(`other: ${othrplyr}`)
        if((21-currScore)<(21-scores[othrplyr])){
            return [true,currplayer]
        }else if((21-currScore)>(21-scores[othrplyr])){
            return [true,othrplyr]
        }else{
            return ['draw',undefined]
        }
    }
}


const declare_winner=(winnerplyr)=>{
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
        dealCard()
    }
})

//hold turn
document.querySelector('.btn-hold').addEventListener('click',()=>{
    if(gameplay){
        holdfunc(totalscore)
        console.log(`After func: ${activeplayer}`)
        activeplayer=activeplayer
    }
    
})


//new game
document.querySelector('.btn-new').addEventListener('click',()=>{
    reset_game()
})

//end game
document.querySelector('.btn-end').addEventListener('click',()=>{
    if(gameplay){
        let winr=end_game(totalscore,activeplayer)
        if (winr[0]==='draw'){
            alert('Its a draw!!')
            reset_game()
        }else{
            if(winr[1]===activeplayer){
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