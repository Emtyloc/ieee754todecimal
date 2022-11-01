const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const clearButton = document.querySelector('.clear-icon');

buttons.forEach((item) => {
    item.onclick = () => {
        if (item.innerText == '0') item.innerText = '1';
        else item.innerText = '0';
        let displayText = [];
        //Actualizamos el signo
        if (buttons[0].innerText == '0'){
            displayText.push('+ ');
        }else displayText.push('- ');
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
            result = result*(2**(-126));
            displayText.push(result.toString());
        }
        /*CERO*/
        else if (exp.join('') == '00000000' && mantissa.join('') == '00000000000000000000000'){
            displayText.push('0');
        }
        /*INFINITO*/
        else if (exp.join('') == '11111111' && mantissa.join('') == '00000000000000000000000'){
            displayText.push(" ∞");
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
            result = result*(2**(parseInt(exp.join(''),2)-127));
            displayText.push(result.toString());
        }
        display.innerText = displayText.join("");
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
        display.innerText = '+ 0';
    })
}