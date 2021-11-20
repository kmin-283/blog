const generateRandomColor = (mainColor: number) => {
  const makeTwoDigitHex = (hex: string) => hex.length < 2 ? '0' + hex : hex;
  const main = makeTwoDigitHex(Math.floor(210+Math.random()*45).toString(16));
  const sub1 = makeTwoDigitHex(Math.floor(20+Math.random()*70).toString(16));
  const sub2 = makeTwoDigitHex(Math.floor(20+Math.random()*70).toString(16));
  
  if (mainColor === 0) {
    return '#' + main + sub1 + sub2;
  } else if (mainColor === 1) {
    return '#' + sub1 + main + sub2;
  }
  return '#' + sub1 + sub2 + main;
};

const generateRandomColors = (count: number) => {
  const ret: string[] = [];
  for (let i=0; i<count; ++i) {
    ret.push(generateRandomColor(i%3));
  }
  return ret;
};

const getContrastYIQ = (hexColor: string) => {
  const r = parseInt(hexColor.substr(1,2),16);
  const g = parseInt(hexColor.substr(3,2),16);
  const b = parseInt(hexColor.substr(5,2),16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;

  return (yiq >= 128) ? 'black' : 'white';
};

const getContrastYIQs = (hexColors: string[]) => {
  return hexColors.map((hexColor) => getContrastYIQ(hexColor));
};

export {
  generateRandomColor,
  generateRandomColors,
  getContrastYIQ,
  getContrastYIQs
};