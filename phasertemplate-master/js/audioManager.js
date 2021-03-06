export default class AudioManager {
    constructor(scene){
        this.game = scene;

        this.mainSound = this.game.sound.add('music');
        this.construccion = this.game.sound.add("construccion",{volume:0.7});
        this.destruccion =  this.game.sound.add("destruccion",{volume:0.5});
        this.menuInicio = this.game.sound.add("menuInicio", {volume: 0.3});
        this.musicCombate = this.game.sound.add("cancionCombate", {volumen: 0.3});
        this.ataque1 = this.game.sound.add("ataque1",{volumen: 0.3})
        this.ataque2 = this.game.sound.add("ataque2",{volumen: 0.3})
        this.matar = this.game.sound.add("matar",{volumen: 0.3})
        this.startMusic();
    }
    startMusic(){
        this.musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }
 
    }
    setVolumen(vol){
        this.mainSound.setVolume(vol);
        this.construccion.setVolume(vol);
        this.destruccion.setVolume(vol);
        this.musicCombate.setVolume(vol);
    }

    stopAll(){
        this.mainSound.pause();
        this.construccion.pause();
        this.destruccion.pause();
    }
}