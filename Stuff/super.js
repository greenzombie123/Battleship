function g(b, ...g){
  b(...g)
}

function t(a,b){
  console.log(a,b);
}

g(t, 12, 10)
g(t, [3,9])