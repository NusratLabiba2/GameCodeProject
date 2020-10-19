class Form {

    constructor() {
      this.button = createButton('Play');
      this.title = createElement('h2');
      this.reset = createButton('Reset');
    }
    hide(){
      this.button.hide();
      this.title.hide();
    }

  
    display(){
      this.title.html("Angel's Escape");
      this.title.position(displayWidth/2 - 50, 0);
      this.button.position(displayWidth/2 + 30, displayHeight/2);
      this.button.addImage('starting.png');
      this.reset.position(displayWidth-100, 20);
      this.reset.addImage('purple_button.png');

      this.button.mousePressed(()=>{
        this.button.hide();
        gameState = "PLAY";
      });
  
      this.reset.mousePressed(()=>{
        gameState = "START";
      })
    }
  }
  