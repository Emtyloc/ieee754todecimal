const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const clearButton = document.querySelector('.clear-icon');
const norm = document.querySelector('#norm');
const sign = document.querySelector('#sign');
const expo = document.querySelector('#expo');
const mant = document.querySelector('#mant');
const calc = document.querySelector('#calc');
buttons.forEach((item) => {
    item.onclick = () => {
        if (item.innerText == '0') item.innerText = '1';
        else item.innerText = '0';
        let displayText = [];
        //Actualizamos el signo
        if (buttons[0].innerText == '0'){
            displayText.push('+ ');
            sign.innerText = "+";
        }else{
            displayText.push('- ');
            sign.innerText = "-";
        }
        //Actualizamos el exponente
        let exp = [];
        for (let i = 1; i < 9; i++){
            exp.push(buttons[i].innerText.toString())
        }
        //Actualizamos la mantissa
        let mantissa = [];
        for (let i = 9; i < 32; i++){
            mantissa.push(buttons[i].innerText.toString());
        }
        //Casos
        /*DESNORMALIZADO*/
        if (exp.join('') == '00000000' && mantissa.join('') != '00000000000000000000000'){
            let result = 0;
            for (let i = 0; i < mantissa.length; i++){
                result += parseInt(mantissa[i],10) * 2**(-(i+1));
            }
            mant.innerText = "\\("+result.toFixed(5).toString()+"\\)...";
            calc.innerHTML = "\\(2^{-126}*"+result.toFixed(5).toString()+"\\)..."
            result = result*(2**(-126));
            displayText.push(result.toString());
            norm.innerText = "denormalized";
            expo.innerHTML = "\\(2^{-126}\\)";
        }
        /*CERO*/
        else if (exp.join('') == '00000000' && mantissa.join('') == '00000000000000000000000'){
            displayText.push('0');
            norm.innerText = "zero";
            mant.innerText = "\\(0\\)";
        }
        /*INFINITO*/
        else if (exp.join('') == '11111111' && mantissa.join('') == '00000000000000000000000'){
            displayText.push(" ∞");
            norm.innerText = "infinity";
        }
        /*NaN*/
        else if (exp.join('') == '11111111' && mantissa.join('') != '00000000000000000000000'){
            displayText.pop();
            displayText.push( "NaN");
        }
        /*NORMALIZADO*/
        else {
            result = 1;
            for (let i = 0; i < mantissa.length; i++){
                result += parseInt(mantissa[i],10)*2**(-(i+1));
            }
            mant.innerText = "\\(1+"+(result-1).toFixed(5).toString()+"\\)...";
            let ex = parseInt(exp.join(''),2)-127
            calc.innerHTML = "\\(2^{"+ex+"}*"+result.toFixed(5)+"\\)...";
            result = result*(2**(parseInt(exp.join(''),2)-127));
            displayText.push(result.toString());
            norm.innerText = "normalized";
            expo.innerHTML = "\\(2^{"+ex+"}\\)";
            
            
        }
        display.innerText = displayText.join("");
        MathJax.typeset();
    }
})

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
    isDark = !isDark;
}

clearButton.onclick = () => {
    buttons.forEach((item) => {
        item.innerText = '0';
    })
    display.innerText = '+ 0';
    norm.innerText = "zero";
    mant.innerText = "\\(0\\)";
    expo.innerText = "\\(0\\)";
    calc.innerHTML = "\\(0\\)";
    MathJax.typeset();
}