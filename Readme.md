# A Game of 21 Implemented in  Javascript and NodeJS

A Javascript and NodeJS implementation of the Game of 21. This is similar to Black jack but with some modified rules. 

**Rules**
- Each player gets a turn to deal a random card
- The player whose total card scores reach 21 or nearer to 21 first, is the winner
- Clicking Hold adds the running score to player's totalscore and changes the turn
- Clicking end game will evaluate the current scores and determine the winner. The player whose score is closest to 21 is the winner
- Player who reaches 21 in the score first, is the winner
- If player deals the 3 aces card, player's running score is discarded and the turn changes to next player
- To start a new game, click on New Game


**Technical Details**  

There are two branches in the repo for different implementation.

# Master branch
<strong>Language:</strong> Pure Javascript  
<strong>3rd Party Libraries:</strong> Iconion, Google Fonts  

# Gameof21 nodejs Branch  
**Language:** Frontend: Javascript   Backend: NodeJS  
**Frameworks:** Express  
**Usage:**  
<strong>1.</strong> Run ```npm install```  
<strong>2.</strong> To run for dev ```npm run dev```  
<strong>3.</strong> To start ```npm start```  
<strong>4.</strong> By default the app runs on port 3000  

Replace the localhost URLs in app.js based on where the app is hosted.
