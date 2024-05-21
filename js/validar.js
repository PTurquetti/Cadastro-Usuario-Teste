//criando os objetos dos elementos de texto do form
//https://pturquetti.github.io/Cadastro_usuario/

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");

var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");

var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");

var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");

const form = document.getElementById("singleForm");
var resultado = document.querySelector("#inputResult");



// Lista de eventos
//nome.addEventListener('focusout', validarNome);
//ano.addEventListener('focusout', validarAno);
//email.addEventListener('focusout', validarEmail);
//senha.addEventListener('focusout', validarSenha);
form.addEventListener("submit", validarForm);



function validarForm(e){

    e.preventDefault();

    const nomeValido = validarNome({ target: nome });
    const anoValido = validarAno({ target: ano });
    const emailValido = validarEmail({ target: email });
    const senhaValido = validarSenha({ target: senha });

    if(nomeValido && anoValido && emailValido && senhaValido){
        resultado.innerText = "Seus dados foram registrados";
        resultado.style.color = "green";
    }else{
        resultado.innerText = "Seus dados não foram registrados";
        resultado.style.color = "red";
    }
}



// Validando Nome
function validarNome(e){ 
    //Verifica se nome tem ao menos 6 caracteres e se todos eles são letras
    const regexNome = /^[a-zA-Z]{7,}$/;
    
    if(e.target.value.trim().match(regexNome)==null){
        //Se não cumpre a expressao regular
        nomeHelp.textContent = "Nome inválido"; 
        nomeHelp.style.color="red";
        return false;
    }
    else{
        // Se o nome é valido
        nomeHelp.textContent = "Nome válido"; 
        nomeHelp.style.color="green";
        return true;
    }       
}

// Validando Ano
function validarAno(e){
    //Verifica se o ano vai de 1900 a 2022 e aceita somente números
    const regexAno = /^(19\d{2}|20(?:0\d|1[0-9]|20))$/;
    const anoTrimado = ano.value.trim();

    if(anoTrimado.match(regexAno)==null){
        // Se o ano digitado não está no intervale
        anoHelp.textContent = "Ano inválido";
        anoHelp.style.color="red";
        return false;
    }
    else{
        // Se o ano é valido
        anoHelp.textContent = "Ano válido";
        anoHelp.style.color="green";
        return true;
    }
}

// Validando email
function validarEmail(e){
    // Expressão regular de verificacao do email
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;

    if(e.target.value.trim().match(regexEmail)==null){
        // Se não cumpre a expressão regular - Ano inválido
        emailHelp.textContent = "Formato de email inválido";
        emailHelp.style.color="red";
        return false;
    }
    else{
        // Ano válido
        emailHelp.textContent = "Formato de email válido";
        emailHelp.style.color="green"; 
        return true;
    }
}



function validarSenha(e){

    // variavel local da senha
    var senha = e.target.value;

    const regexCaractereEspecial = /[!@#$%&+]/; // Verifica caractere especial
    const regexNumero = /[0-9]/;                // Verifica se tem número
    const regexLetra = /[a-zA-Z]/;              // Verifica se tem letra

    // Testando tamanho
    if(senha.length < 6 || senha.length > 20){
        //Não atinge tamanho mínimo ou excede o tamanho máximo
        senhaHelp.textContent = "Senha inválida";
        senhaHelp.style.color="red";
        return false;
    }else{
        //Tem tamanho certo. Testar outras condicoes
        
        // Verifica ocorrências de caractere especial, numero e letra
        if(e.target.value.trim().match(regexCaractereEspecial)==null || 
        e.target.value.trim().match(regexNumero)==null ||
        e.target.value.trim().match(regexLetra)==null){
            //Se não tem ocorrencia de algum desses
            senhaHelp.textContent = "Senha inválida";
            senhaHelp.style.color="red";
            return false;
        }
        else if(senha.indexOf(nome.value.trim()) !== -1 || senha.indexOf(ano.value.trim()) !== -1){
            //Se a senha contem a substring inserida no Nome ou no Ano
            senhaHelp.textContent = "Senha inválida";
            senhaHelp.style.color="red";
            return false;
            
        }
        else{

            //Todos os critérios foram cumpridos. Avaliando a senha da 
            var forca = calcularForcaDaSenha(senha);            // Calcula a forca da senha
            var medidor = document.getElementById("passStrengthMeter");     // Criando o objeto medidor
            medidor.value = forca;      // recebe valor retornado pela funcao de calculo de forca  


            //Detalhando forca da senha
            switch (forca) {
                case 10:
                    // Se fraca
                    senhaHelp.textContent = "Senha fraca";
                    senhaHelp.style.color="orange";
                    break;
                case 20:
                    // Se moderada
                    senhaHelp.textContent = "Senha moderada";
                    senhaHelp.style.color="yellow";
                    break;
                case 30:
                    // Se forte
                    senhaHelp.textContent = "Senha forte";
                    senhaHelp.style.color="green";
                    break;
                default:
                    // Default - nunca deve chegar aqui
                    senhaHelp.textContent = "Erro inesperado";
                    senhaHelp.style.color="purple";
                    return false;
                    break;
            }

            return true;
        }
    }
}

function calcularForcaDaSenha(senha) {
    // Verificar o comprimento da senha
    if (senha.length < 8) {
        // Senha fraca: comprimento menor que 8 caracteres
        return 10;
    } else if (senha.length >= 8 && senha.length <= 12) {
        // Senha moderada: comprimento entre 8 e 12 caracteres
        // Verificar a presença de caractere especial, número e letra maiúscula
        if (/[!@#$%&+]/.test(senha) && /[0-9]/.test(senha) && /[A-Z]/.test(senha)) {
            return 20;
        } else {
            // Se a senha tiver entre 8 e 12 caracteres, mas não atender aos critérios de uma senha moderada, é fraca
            return 10;
        }
    } else {
        // Senha forte: comprimento maior que 12 caracteres
        // Verificar a presença de múltiplos caracteres especiais, números e letras maiúsculas
        var countCaracteresEspeciais = (senha.match(/[!@#$%&+]/g) || []).length;    // Conta os caracteres especiais
        var countNumeros = (senha.match(/[0-9]/g) || []).length;                    // Conta os numeros
        var countLetrasMaiusculas = (senha.match(/[A-Z]/g) || []).length;           // Contas as letras maiúsculas
        
        if (countCaracteresEspeciais > 1 && countNumeros > 1 && countLetrasMaiusculas > 1) {    
            // Possui caracteres especiais, numeros e letras maiusculas o suficiente para ser forte
            return 30;
        } else {
            // Não possui os critérios minimos de caracteses especiais, numeros e letras maiusculas
            // Logo, é moderada
            return 20;
        }
    }
}


