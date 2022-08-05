const operators = ["+","-","*","/"];
const display_area = document.getElementById("display_area");

let calculator_button = document.getElementById("calculator").getElementsByTagName("td");
let calc_to_do = "";
let result = 0;
let can_delete = false;
let click_valid_button = false;

/*Ցույց տալ հաշվարկը կամ արդյունքը հաշվիչի վերևում */
function displayCalculator(value = null) {
    can_delete = true;
    if(value){
        if(click_valid_button){
            if(!isNaN(value)) calc_to_do = "";
            click_valid_button = false;
        }
         if (isNaN(value) && value != ".") {
           /* հաշվարկն իրականացվում է ավտոմատ կերպով՝ հեշտացնելու հաշվարկի հետագա ընթացքը:*/
           / * Միաժամանակ ստուգում ենք, արդյոք օգտատերը սեղմում է մի քանի օպերատորների վրա անընդմեջ։*/
            if(check_operator(calc_to_do)) {
                if(isNaN(calc_to_do.slice(-1))){
                    calc_to_do = calc_to_do.slice(0, -1);
                }else{
                    calc_to_do = calculate();
                }
            }
        }
        calc_to_do = calc_to_do + value;
    }

    display_area.innerText = calc_to_do;
}

/* Կատարեք պահանջվող հաշվարկը կամ հաշվարկը ավտոմատ կերպով, հենց որ երկու օպերատորներ լինեն */
 function calculate(){
    const string_to_calculate = calc_to_do;
    let first_number = "", second_number = "", operator;

    calc_to_do = "";
    can_delete = false;

  /* Մենք երկու թվերը հանում ենք հաշվարկից՝ փնտրելով դրանք բաժանող օպերատորը */
    for(let i = 0; i < string_to_calculate.length; i++){
        if(isNaN(parseInt(string_to_calculate[i])) && string_to_calculate[i] != ".") {
            for (let j = 0; j < operators.length; j++) {
                if (string_to_calculate[i] === operators[j]) {
                    operator = operators[j];
                    break;
                }
            }
            continue;
        }
        if(!operator){
            first_number += string_to_calculate[i];
        }else{
            second_number += string_to_calculate[i];
        }
    }

    switch (operator){
        case "+" :
            result = parseFloat(first_number) + parseFloat(second_number);
            break;
        case "-" :
            result = parseFloat(first_number) - parseFloat(second_number);
            break;
        case "*" :
            result = parseFloat(first_number) * parseFloat(second_number);
            break;
        case "/" :
            result = parseFloat(first_number) / parseFloat(second_number);
            break;
        default:
            break;

    }

    return result;
}

/* Թույլ է տալիս ստուգել, ​​թե արդյոք օպերատորը առկա է հաշվարկում: */
function check_operator(string_to_verify){

    let operator_presence = false;
    for(let i = 0; i < string_to_verify.length; i++){
        operators.forEach(function(operator){
            if(string_to_verify[i] === operator){
                operator_presence = true;
            }
        })
    }
    return operator_presence;
}

/* Վերականգնել հաշվիչը */
function ac(){
    display_area.innerText = "";
    calc_to_do = "";
    result = 0;
    can_delete = false;
}

/* Ջնջել վերջին գրառումը */
function del(){
    if(can_delete) {
        if(calc_to_do.length >= 1) {
            calc_to_do = calc_to_do.slice(0, -1);
            displayCalculator();
        }
    }
}

/* Մենք նախաստորագրում ենք հաշվիչը՝ յուրաքանչյուր կոճակին հատկացնելով իրադարձություն՝ ըստ իր առաքելության */
for(const key in calculator_button){
    if(!calculator_button.hasOwnProperty(key)) continue; /* Ստացեք բոլոր կոճակները, բացառությամբ նախատիպերի */

    const button = calculator_button[key];
    button.addEventListener("click", function (){
        switch (this.id) {
            case "valid":
                displayCalculator(calculate());
                click_valid_button = true;
                break;
            case "AC":
                ac();
                break;
            case "DEL":
                del();
                break;
            default:
                displayCalculator(this.innerText);
                break;
        }

    });
}
 

