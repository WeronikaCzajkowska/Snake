const canvas = document.querySelector('#board');
const ctx = canvas.getContext("2d");

let score = 0;
let fps = 0;
let eaten = false;
const s = {};


const wrest = {current:0, up:2, down:3, left:1, right:4}

const food = {x:canvas.width/4, y:canvas.height/4, r:15}

food.draw = function()
{
  ctx.beginPath();
  ctx.fillStyle = "lightgreen";
  ctx.arc(this.x, this.y, this.r, 0 , 2*Math.PI);
  ctx.fill();
  ctx.closePath();
};


const snake = {radius:15, position:[{ x : canvas.width/2, y:canvas.height/2}]}

snake.draw = function()
{
  ctx.fillStyle = "lightblue";
  for(let i = 0; i < this.position.length; i++)
  {
    let p = this.position[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
  }
};

snake.update = function()
{
  if(fps % 10 == 0)
  {
    if(eaten == true)
    {
      score += 10;
      document.querySelector('#score').innerHTML = score;
      this.position.push({x : this.position[this.position.length-1].x,y : this.position[this.position.length-1].y});
      eaten = false;
    }

    for( let i = this.position.length -1; i > 0;  i--)
    {
      if(this.position[0].x == this.position[i].x && this.position[0].y == this.position[i].y && this.position.length > 2)
      {
        s.pause = true;
        s.status = 0;
      }
      this.position[i].x = this.position[i-1].x;
      this.position[i].y = this.position[i-1].y;
    }
    if(wrest.current == wrest.right)
    {
      this.position[0].x += 30;
    }
    if(wrest.current == wrest.left)
    {
      this.position[0].x -= 30;
    }
    if(wrest.current == wrest.up)
    {
      this.position[0].y -= 30;
    }
    if(wrest.current == wrest.down)
    {
      this.position[0].y += 30;
    }
    if((Math.sqrt(Math.pow((this.position[0].x - food.x),2) + Math.pow((this.position[0].y - food.y),2))) <= 2*food.r)
    {
      food.x = Math.random() * canvas.width;
      food.y = Math.random() * canvas.height;
      eaten = true;
    }

    if(this.position[0].x < 0 )
    {
      s.pause = true;
      s.status = 0;
    }
    if(this.position[0].x > canvas.width )
    {
      s.pause = true;
      s.status = 0;
    }
    if(this.position[0].y < 0 )
    {
      s.pause = true;
      s.status = 0;
    }
    if(this.position[0].y > canvas.height )
    {
      s.pause = true;
      s.status = 0;
    }
  }
}

function keyDownHandler(e)
{
  if(e.keyCode == 37)
  {
    if(wrest.current != wrest.right && wrest.current != wrest.left)
      wrest.current = wrest.left;
  }
  else if(e.keyCode == 38)
  {
    if(wrest.current != wrest.up && wrest.current != wrest.down)
    wrest.current = wrest.up;
  }
  else if(e.keyCode == 39)
  {
    if(wrest.current != wrest.right && wrest.current != wrest.left)
      wrest.current = wrest.right;
  }
  else if(e.keyCode == 40)
  {
    if(wrest.current != wrest.up && wrest.current != wrest.down)
      wrest.current = wrest.down;
  }
}
document.addEventListener("keydown", keyDownHandler);

function drawing()
{
  snake.update();
  snake.draw();
  food.draw();
}

function header(text)
{
  ctx.font = '20px Arial';
  ctx.fillStyle = '#e60';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width/2, 60);
}

function help(text)
{
  ctx.font = '14px Arial';
  ctx.fillStyle = '#e60';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width/2, 90);
}

function game()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawing();
  fps ++;
  if(s.pause)
  {
    if(s.status == 0)
    {
      header('GAME OVER');
      help('To start click a button: NEW GAME');
    }
  }
  requestAnimationFrame(game);
}
game();
