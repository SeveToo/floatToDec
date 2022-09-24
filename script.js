const button = document.querySelector("button");
const answer = document.querySelector(".answer");
const steps = document.querySelector(".steps");
const inpSignLabel = document.querySelector(".signLabel");
const inpSign = document.querySelector("#sign");
inpSignLabel.onclick = () => {
  if (!inpSign.value || inpSign.value == "0") inpSign.value = "1";
  else inpSign.value = "0";
};

function power(x, index) {
  ++index;
  return x * Math.pow(2, -index);
}

function binary(x, index) {
  let binaryTab = [128, 64, 32, 16, 8, 4, 2, 1];
  return x * binaryTab[index];
}

button.onclick = () => calculate();
document.addEventListener("keydown", function (e) {
  if (e.code == "Enter") calculate();
});

function howToMakeFraction(x) {
  x = x
    .split("")
    .reverse()
    .map(
      (el, i) =>
        `<div class = "smallStep">
          <span class="smallStep__col smallStep__nr">${parseInt(el)}
          
          
          </span>
          <span class="smallStep__col smallStep__powSolution">
          
          ${Math.pow(2, i)}
          <div class="smallStep__hint">
            <span class="smallStep__col smallStep__pow">2<sup>${i}</sup></span>
          </div>
          
          </span>
          <span class="smallStep__col smallStep__sumOf">${
            parseInt(el) * Math.pow(2, i)
          }
            <div class="smallStep__hint">${parseInt(
              el
            )}<span class="white"> <span class="sign">*</span> ${Math.pow(
          2,
          i
        )}</span></div>
          </span>
          </div>`
    )
    .reverse();

  let a = `<div class="smallStepF">${x.join("")}</div>`;
  return a;
}

function howToMakeMantysa(x) {
  x = x.split("").map(
    (el, i) =>
      `<div class = "smallStep">
          <span class="smallStep__col smallStep__nr2">${parseInt(el)}
          
          
          </span>
          <span class="smallStep__col smallStep__powSolution">
          
          <span class="smallStep__col smallStep__pow2">2<sup>-${
            i + 1
          }</sup></span>
          <div class="smallStep__hint">
          ${Math.pow(2, -(i + 1))}
          </div>
          
          </span>
          <span class="smallStep__col smallStep__sumOf2">${parseInt(
            el
          )}<span class="white"> <span class="sign">*</span> 2<sup>-${i}</sup>
            <div class="smallStep__hint">
      
      
            =${parseInt(el) * Math.pow(2, -(i + 1))}
      
      </span></div>
          </span>
          </div>`
  );

  let a = `<div class="smallStepM">${x.join("")}</div>`;
  return a;
}

// window.onload = () => {
function calculate() {
  /* FIXME: */

  let sign, fraction, mantysaa;
  let ALL = document.querySelector("#ALL");
  // console.log(ALL.value.length);

  /*  FIXME: */
  if (
    document.querySelector("#sign").value &&
    document.querySelector("#fraction").value &&
    document.querySelector("#mantysa").value
  ) {
    sign = document.querySelector("#sign").value;
    fraction = document.querySelector("#fraction").value;
    mantysaa = document.querySelector("#mantysa").value;
    ALL.value = sign + fraction + mantysaa;
  } else if (ALL.value != "" && ALL.value.length == 32) {
    sign = ALL.value.charAt(0);
    fraction = ALL.value.substring(1, 9);
    mantysaa = ALL.value.substring(9, 32);

    document.querySelector("#sign").value = sign;
    document.querySelector("#fraction").value = fraction;
    document.querySelector("#mantysa").value = mantysaa;
  }
  /* FIXME: */
  // const sign = "0";
  // const fraction = "10000001";
  // const mantysaa = "101100110011001100110011010";

  let tab = mantysaa.split("");
  let tab2 = fraction.split("");
  let mantysa = 0;
  let cecha = 0;
  for (let i = 0; i < tab.length; i++) {
    mantysa += power(tab[i], i);
  }
  for (let i = 0; i < 8; i++) {
    cecha += binary(tab2[i], i);
  }
  steps.innerHTML = `
  <div class="theNumber">
    <span class="s">${sign}</span>
    <span class="f">${fraction}</span>
    <span class="m">${mantysaa}</span>
  </div>
  ${howToMakeFraction(fraction)}
  ${howToMakeMantysa(mantysaa)}

  <div class="step"><span class="solution__label">znak:</span> ${
    sign == 1 ? ` <span class="s">-</span>` : ` <span class="s">+</span>`
  }</div>
  <div class="step"><span class="solution__label">cecha:</span> 2<sup><span class="f">${cecha}</span>-127</sup>
  = <span class="solution__label"></span>2<sup><span class="f">${
    cecha - 127
  }</span></sup>
  = <span class="solution__label"></span><span class="f">${Math.pow(
    2,
    cecha - 127
  )}</span>
  </div>
  <div class="step"><span class="solution__label">mantysa:</span> 1 + <span class="m">${mantysa}</span>
  = <span class="m">${Math.round((1 + mantysa) * 1000) / 1000}</span></div>


  <div class="step">
  <span class=" solution__label">liczymy:</span>
    ${sign == 1 ? ` <span class="s">-</span>` : ` <span class="s">+</span>`}
    <span class="solution__label"></span><span class="f">${Math.pow(
      2,
      cecha - 127
    )}</span> *
    <span class="m">${Math.round((1 + mantysa) * 1000) / 1000}</span> = ${
    sign == 1
      ? ` <span class="s">-</span> ${
          (Math.round((1 + mantysa) * 1000) / 1000) * Math.pow(2, cecha - 127)
        }`
      : ` <span class="s">+</span> ${
          (Math.round((1 + mantysa) * 1000) / 1000) * Math.pow(2, cecha - 127)
        }`
  }
`;
  cecha -= 127;
  cecha = Math.pow(2, cecha);
  mantysa += 1;

  answer.innerHTML =
    sign == 1
      ? `<span class="solution__label">wynik: </span>${
          -mantysa * cecha
        } = <span class="final__solution">${
          Math.round(-mantysa * cecha * 100) / 100
        } </span>`
      : `<span class="solution__label">wynik: </span>${
          mantysa * cecha
        } = <span class="final__solution">${
          Math.round(mantysa * cecha * 100) / 100
        } </span>`;
}

// console.log(1 * Math.pow(2, -2));
// 1
// 10000001
// 101100110011001100110011010
