/** Create a basic Event emitter class and explain all the functions for that.
 * 1. On, Emit, Once, Off
 */

class EventEmitter {
    constructor(){
        this.Events ={}
    }
    on(event,listner){
        if(!(event in this.Events)) { 
            this.Events[event] = []
        }
        this.Events[event].push(listner)
    }

    emit(event,...args){
        if(!(event in this.Events)) { 
            return;
        }
        for (const listener of this.Events[event]) {
            listener(...args);
        }
    }

    off(event,listner){
        if(!this.Events[event]) return;
        this.Events[event] = this.Events[event].filter((fn)=> fn != listner)
    }

    once(event,listner){
        const wrapper = (...args)=>{
            listner(args)
            this.off(event,wrapper)
        }
        this.on(event,wrapper)
    }
}


const emitter = new EventEmitter();

emitter.on("login", (user) => {
    console.log("Email", user);
});

emitter.on("login", (user) => {
    console.log("Analytics", user);
});

emitter.emit("login", "Nirav");