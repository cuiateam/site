// Define uma nova diretiva referente a mascara (https://github.com/probil/v-mask)
Vue.directive('mask', VueMask.VueMaskDirective);

new Vue({
  el: "#app",
  data: {
    registro1: '',
    registro2: '',
    registro3: '',
    registro4: '',
    horarioNecessario: 31500 // Em segundos
  },
  computed:{
    tempoRestante: function(){
      // Verifica o tempo restante de trabalho necessário e informe ao usuário
      var s1 = this.horaParaSegundos(this.registro1);
      var s2 = this.horaParaSegundos(this.registro2);
      var t1 = s2 - s1;
      
      var s3 = this.horaParaSegundos(this.registro3);
      var s4 = this.horaParaSegundos(this.registro4);
      var t2 = s4 - s3;

      var t = t1 + t2;
      var d1 = this.horarioNecessario - t;

      if((t1 > 0 && t2 > 0) || (t1 > 0 && t2 == 0) || (t2 > 0 && t1 == 0)){
        if(t >= this.horarioNecessario){
          return "Você já trabalhou " + this.segundosParaHora(t) + " já pode ir embora!";
        }else{
          if(d1 < 60){
            return "Você já trabalhou " + this.segundosParaHora(t) + " e ainda precisa trabalhar " + d1 + " minutos!";
          }else{
            return "Você já trabalhou " + this.segundosParaHora(t) + " e ainda precisa trabalhar " +  this.segundosParaHora(d1) + " horas!";
          }
        }
      }else if(t1 > 0){
        if(t1 > this.horarioNecessario){
          return "Você já trabalhou " + this.segundosParaHora(t1) + " já pode ir embora!";
        }else{
          d1 = this.horarioNecessario - t1;
          if(s3 > 0){
            s4 = d1 + s3;
            return "Você já trabalhou " + this.segundosParaHora(t1) + " horas e precisa trabalhar até as " + this.segundosParaHora(s4) + " para poder ir embora!";
          }else{
            s3 = s2 + 3600;
            s4 = d1 + s3;
            return "Você já trabalhou " + this.segundosParaHora(t1) + " horas e se entrar as " + this.segundosParaHora(s3) + " pode sair as " + this.segundosParaHora(s4) + "!";
          }
          
        } 
      }else if(s1 > 0){
        s2 = s1 + this.horarioNecessario;
        return "Se tu trabalhar direto tu pode ir embora as " + this.segundosParaHora(s2) + "!";
      }

      return "Melhor você começar a trabalhar eim!";
    }
  },
  methods:{
    // Transforma uma string no formato HH:MM em segundos
    horaParaSegundos: function(horario){
      return horario.split(':')[0] * 3600 + horario.split(':')[1] * 60;
    },
    // Transforma um horario que esta em segundos para uma string no formato HH:MM
    segundosParaHora: function(segundos){
      let horas = Math.trunc(segundos / 3600);
      let minutos = (segundos - horas * 3600) / 60;
      return ('00' + horas).slice(-2) + ':' + ('00' + minutos).slice(-2);
    }
  }
});
