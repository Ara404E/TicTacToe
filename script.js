     const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  
  [0, 4, 8],
  [2, 4, 6]
];

(function(){
    window.GameBoard={
         currentPlayerIndex: 0,
         gameOver: false,
         player:[],
         result:'',
        init: function(){
            this.domCache();
            this.bindEvent();
        },
        domCache: function(){
            this.cells=document.querySelectorAll('.cell')
            this.resultDiv=document.querySelector('.result')
            this.player1Input=document.querySelector('#player1').value;
            this.player2Input=document.querySelector('#player2').value;
            this.startBtn=document.querySelector('.start-btn')
            this.restartBtn=document.querySelector('.restart-btn')
        },
    bindEvent : function(){
            this.startBtn.addEventListener('click', this.startGame.bind(this));
            this.restartBtn.addEventListener('click', this.restartGame.bind(this));
            this.cells.forEach((cell)=> {
                    cell.addEventListener('click' , this.cellClick.bind(this));
                });
            },

    createPlayer : function(name,mark){
        return {
            name , mark
        }
    },
    startGame : function(){
      this.player=[
          this.createPlayer(document.querySelector('#player1').value || 'Player 1', 'X'),
          this.createPlayer(document.querySelector('#player2').value || 'Player 2', 'O')
      ];
      console.log(this.player[0].name);
      console.log(this.player[1].name);
      this.cells.forEach( cell =>{
          cell.textContent='';
          this.result.textContent=''
          cell.dataset.state='';
          });
      console.log('Game started');
      },
      restartGame : function(){
                console.log('Game restarted');
                this.startGame();
                this.gameOver=false;
            },

       cellClick : function(event){
                const cell = event.target;  
            this.result=document.createElement('h3');
                this.result.classList.add('game-result')
                if(this.gameOver || cell.dataset.state) return;
            
            cell.dataset.state=this.player[this.currentPlayerIndex].mark;
            cell.textContent=this.player[this.currentPlayerIndex].mark;

            if(this.checkWin()){
                    this.result.textContent=`${this.player[this.currentPlayerIndex].name} Won!`
                            this.resultDiv.append(this.result);
                this.gameOver = true;
            } else if([...this.cells].every(cell => cell.dataset.state)){
                this.result.textContent=`Drew. Play again!!`;
                    this.resultDiv.append(this.result);
                this.gameOver = true;
            } else {
                this.currentPlayerIndex = 1 - this.currentPlayerIndex;
            }
       },

       checkWin: function (){
         return winningPositions.some(position => 
                position.every(index => 
                    this.cells[index].dataset.state === this.player[this.currentPlayerIndex].mark
                  )
             );
        }
            
    }
     GameBoard.init();
})();