////GRAPHICS
x = c.getContext('2d');
///

var pizza = [
  [0,0,1,0],
  [0,0,0,0],
  [1,0,0,0],
]
var used=[];
var maxArea = 3, minVeg = 1;

var maxPath=[];

///GRAPHICS
x.globalAlpha = 0.2;
var size=100;
for (var a=0;a<pizza.length;a++){
  for (var b=0;b<pizza[a].length;b++){
    if(pizza[a][b])x.fillStyle="#AB2110";
    else x.fillStyle="#0ACCA0"
    x.fillRect(b*size,a*size,size-1,size-1);
  }
}
////

for (var a = 0; a < pizza.length; a++) {
  used[a] = [];
  for (var b = 0; b < pizza[a].length; b++) {
    used[a][b] = 0;
  }
}
function recur(curArea=0,path=[]){
  var maxsize = curArea;
  var maxLP=path;
  // debugger;
  for (var a=0;a<pizza.length;a++){
    for (var b =0;b<pizza[a].length;b++){
      if (used[a][b] == 0){
        var t = search(a,b,curArea,path);
        if (t.val>maxsize){
          maxsize = t.val;
          maxLP = t.path;
        }
      }
    }
  }
  return {val:maxsize,path:maxLP};
}
function search(x,y,curArea,path){
  var max = curArea;
  var maxlocalpath = [...path];
  for (var a=1;a<=maxArea;a++){
    for (var b=1;b<=maxArea;b++){
      if(isValid(x,y,a,b)){
        for (var a1=x;a1<x+a;a1++){
          for(var b1=y;b1<y+b;b1++){
            used[a1][b1] = 1;
          }
        }
        path.push({x,y,height:a,width:b});
        var t = recur(curArea+a*b,path);
        if(t.val>max){
          max = t.val;
          maxlocalpath = [...t.path]
        }
        path.pop();
        for (var a1=x;a1<x+a;a1++){
          for(var b1=y;b1<y+b;b1++){
            used[a1][b1] = 0;
          }
        }

      }
    }
  }
  return {val:max,path:maxlocalpath};
}
function isValid(x,y,cx,cy){
  var c0=0,c1=0;
  if (cx*cy>maxArea)return false;
  if (x+cx>pizza.length || y+cy>pizza[0].length)return false;
  for (var a=x;a<x+cx;a++){
    for (var b=y;b<y+cy;b++){
      pizza[a][b]==0?c0++:c1++;
      if (used[a][b]==1)return false;
    }
  }
  if (c0>=minVeg && c1>=minVeg)return true;
  else return false;
}

var t = recur();
console.log(t);


///GRAPHICS
x.globalAlpha = 1;
x.beginPath();
for (var a of t.path){
  x.moveTo(a.y*size,a.x*size);
  x.rect(a.y*size,a.x*size,a.width*size,a.height*size)
}
x.stroke();




















//
