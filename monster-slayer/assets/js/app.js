new Vue({
  el: '#app',
  data: {
    gameIsRunning: false,
    playerHealth: 100,
    monsterHealth: 100,
    turns: []
  },
  methods:{
    startNewGame: function(){
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function(){
      this.playerAttack(3,10);
      if(this.checkWin()){
        return;
      }

      this.monsterAttack();
      this.checkWin();
    },
    specialAttack: function(){
      this.playerAttack(10,20);
      if(this.checkWin()){
        return;
      }

      this.monsterAttack();
      this.checkWin();
    },
    heal: function(){
      if(this.playerHealth <= 90){
        this.playerHealth += 10;
      }else{
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heal for 10'
      });

      this.monsterAttack();
      this.checkWin();
    },
    giveUp: function(){
      this.gameIsRunning = false;
    },
    checkWin: function(){
      if(this.monsterHealth <= 0){
        if(confirm('You win! Play again?')){
          this.startNewGame();
        }else{
          this.gameIsRunning = false;
        }
        return true;
      }else if(this.playerHealth <= 0){
        if(confirm('You lose! Play again?')){
          this.startNewGame();
        }else{
          this.gameIsRunning = false;
        }
        return true;
      }

      return false;
    },
    playerAttack: function(min, max){
      var damage = this.calculateDamage(min,max);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage
      });
    },
    monsterAttack: function(){
      var damage = this.calculateDamage(5,12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage
      });
    },
    calculateDamage: function(min, max){
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
});
