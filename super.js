class J {
  constructor() {
    this.g = 1;
  }

  somehting() {
    return this.g;
  }
}

function dosome(i) {
  console.log(i);
  const g = i();
  return g;
}
const ja = new J();

const b = dosome(function () {
  ja.somehting();
});

b;
