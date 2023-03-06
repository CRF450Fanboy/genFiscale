// todo
// check if input is blank/valid
// input text to lower (upper)
// fetch city api
// https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json

var codiceFiscale;

var cf;
var codiceCatastale;
var letteraDiControllo = "";
var validCF = false;

var btnGenera = document.getElementById("btnGenera");

function makeMaxDob()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // array, i mesi partono da 0
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    } 
    
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("inputDob").setAttribute("max", today);
}

if(btnGenera)
{
    btnGenera.addEventListener("click", async function()
    {
        outputCodice.value = "";
        outputCodice.style.display = "none";
        codiceCatastale = await makeComune();
        cf = makeCognome() + makeNome() + makeDob() + makeMese() + makeDayAndSex() + codiceCatastale;
        letteraDiControllo = makeLetteraControllo(cf);
        cf = cf + letteraDiControllo;
        logInfo();
        if(!codiceCatastale)
        {
            validCF = false;
        }
        if(makeNome() == null || makeCognome() == null || codiceCatastale == null)
        {
            console.log("null");
        }
        else
        {
            if(validCF)
            {
                showCodice();
            }
        }
    });
}

function makeNome()
{
    var nome = document.getElementById("inputNome").value;
    nome = nome.toUpperCase();
    const consonanti = "BCDFGHJKLMNPQRSTVWXYZ";
    const vocali = "AEIOU";
    var final = "";
    var counter = 0;

    if(nome.length == 2)
    {
        final = nome[0] + nome[1] + "X";
        return final;
    }

    for(let i = 0; i < nome.length; i++)
    {
        if(consonanti.includes(nome[i]))
        {
            counter++;
        }
    }

    console.log("Counter: " + counter);

    if(counter >= 4)
    {
        for(let j = 0; j < nome.length; j++)
        {
            let cCounter = 0;

            if(consonanti.includes(nome[j]))
            {
                final = final + nome[j];
                if(final.length == 4)
                {
                    final = final[0] + final[2] + final[3];
                    document.getElementById("lblErrorNome").style.display = "none";
                    validCF = true;
                    return final;
                }
            }
        }
    }
    else if(counter == 3)
    {
        for(let j = 0; j < nome.length; j++)
        {
           if(consonanti.includes(nome[j]))
            {
                final = final + nome[j];
                if(final.length == 3)
                {
                    document.getElementById("lblErrorNome").style.display = "none";
                    validCF = true;
                    return final;
                }
            }
        }
    }
    else
    {
        let index;
        for(let j = 0; j < nome.length; j++)
        {
           if(consonanti.includes(nome[j]))
            {
                final = final + nome[j];
            }
        }  
        for(let j = 0; j < nome.length; j++)
        {
            if(vocali.includes(nome[j]))
            {
                final = final + nome[j];
                if(final.length == 3)
                {
                    document.getElementById("lblErrorNome").style.display = "none";
                    validCF = true;
                    return final;
                }
            }
        }
    }
    document.getElementById("lblErrorNome").style.display = "block";
}

function makeCognome()
{
    var cognome = document.getElementById("inputCognome").value;
    cognome = cognome.toUpperCase();
    const consonanti = "BCDFGHJKLMNPQRSTVWXYZ";
    const vocali = "AEIOU";
    var final = "";
    var counter = 0;

    if(cognome.length == 2)
    {
        final = cognome[0] + cognome[1] + "X";
        return final;
    }

    for(let i = 0; i < cognome.length; i++)
    {
        if(consonanti.includes(cognome[i]))
        {
            counter++;
        }
    }

    if(counter >= 3)
    {
        for(let j = 0; j < cognome.length; j++)
        {
           if(consonanti.includes(cognome[j]))
            {
                final = final + cognome[j];
                if(final.length == 3)
                {
                    document.getElementById("lblErrorCognome").style.display = "none";
                    validCF = true;
                    return final;
                }
            }
        }
    }
    else
    {
        let index;
        for(let j = 0; j < cognome.length; j++)
        {
           if(consonanti.includes(cognome[j]))
            {
                final = final + cognome[j];
            }
        }  
        for(let j = 0; j < cognome.length; j++)
        {
            if(vocali.includes(cognome[j]))
            {
                final = final + cognome[j];
                if(final.length == 3)
                {
                    document.getElementById("lblErrorCognome").style.display = "none";
                    validCF = true;
                    return final;
                }
            }
        }
    }
    document.getElementById("lblErrorCognome").style.display = "block";
}

function hideErrors()
{
    document.getElementById("lblErrorNome").style.display = "none";
    document.getElementById("lblErrorCognome").style.display = "none";
    document.getElementById("lblErrorComune").style.display = "none";
}

function makeDob()
{
    var dob = "";
    var chosenDate = document.getElementById("inputDob");
    dob = chosenDate.value[2] + chosenDate.value[3];
    return dob;
}

function makeMese()
{
    var meseChar = "";
    var chosenDate = document.getElementById("inputDob");
    var mese = chosenDate.value[5] + chosenDate.value[6];
    var chosenMese = parseInt(mese);

    switch(chosenMese)
    {
        case 1 :
        {
            meseChar = "A";
            break;
        }

        case 2 :
        {
            meseChar = "B";
            break;
        }

        case 3 :
        {
            meseChar = "C";
            break;
        }

        case 4 :
        {
            meseChar = "D";
            break;
        }

        case 5 :
        {
            meseChar = "E";
            break;
        }

        case 6 :
        {
            meseChar = "H";
            break;
        }

        case 7 :
        {
            meseChar = "L";
            break;
        }

        case 8 :
        {
            meseChar = "M";
            break;
        }

        case 9 :
        {
            meseChar = "P";
            break;
        }

        case 10 :
        {
            meseChar = "R";
            break;
        }

        case 11 :
        {
            meseChar = "S";
            break;
        }

        case 12 :
        {
            meseChar = "T";
            break;
        }
    }

    return meseChar;

}

function makeDayAndSex()
{
    var sesso = document.getElementById("inputSesso");
    var chosenDate = document.getElementById("inputDob");
    var giorno = chosenDate.value[8] + chosenDate.value[9];
    console.log(giorno);

    if(sesso.value == "M")
    {
        return giorno;
    }
    else
    {
        return parseInt(chosenDate.value[8] + chosenDate.value[9]) + 40;
    }
}

async function makeComune()
{
    var dati;

    await fetch('https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json')
        .then(response => response.json())  // converti a json
        .then(json => dati = json)   // stampa i dati sulla console


    console.log(dati);
    var comuneFound = false;

    if(document.getElementById("inputComune").value == "")
    {
        document.getElementById("lblErrorComune").style.display = "block";
        return;
    }

    for(let i = 0; i < dati.length; i++)
    {
        if(inputComune.value.toLowerCase() == dati[i].nome.toLowerCase())
        {
            document.getElementById("lblErrorComune").style.display = "none";
            return dati[i].codiceCatastale;
        }
    }

    document.getElementById("lblErrorComune").style.display = "block";
    return;
}

function makeLetteraControllo()
{
    var total = 0;

    var tmpCF = cf.toUpperCase();

    for(let i = 0; i < tmpCF.length; i++)
    {
        // 4 ORE BUTTATE PER UNO "0" DA TRASFORMARE IN "1" UFFAAAAA
        // VOGLIO MORIRE
        if(i % 2 == 1)  // dato che gli array partono da 0 qua si parte da 1, i caratteri partono da 1 non da 0 come gli array
        {
            if(tmpCF[i] == "A" || tmpCF[i] == 0)
            {
                total += 0;
            }
            else if(tmpCF[i] == "B" || tmpCF[i] == 1)
            {
                total += 1;
            }
            else if(tmpCF[i] == "C" || tmpCF[i] == 2)
            {
                total += 2;
            }
            else if(tmpCF[i] == "D" || tmpCF[i] == 3)
            {
                total += 3;
            }
            else if(tmpCF[i] == "E" || tmpCF[i] == 4)
            {
                total += 4;
            }
            else if(tmpCF[i] == "F" || tmpCF[i] == 5)
            {
                total += 5;
            }
            else if(tmpCF[i] == "G" || tmpCF[i] == 6)
            {
                total += 6;
            }
            else if(tmpCF[i] == "H" || tmpCF[i] == 7)
            {
                total += 7;
            }
            else if(tmpCF[i] == "I" || tmpCF[i] == 8)
            {
                total += 8;
            }
            else if(tmpCF[i] == "J" || tmpCF[i] == 9)
            {
                total += 9;
            }
            else if(tmpCF[i] == "K")
            {
                total += 10;
            }
            else if(tmpCF[i] == "L")
            {
                total += 11;
            }
            else if(tmpCF[i] == "M")
            {
                total += 12;
            }
            else if(tmpCF[i] == "N")
            {
                total += 13;
            }
            else if(tmpCF[i] == "O")
            {
                total += 14;
            }
            else if(tmpCF[i] == "P")
            {
                total += 15;
            }
            else if(tmpCF[i] == "Q")
            {
                total += 16;
            }
            else if(tmpCF[i] == "R")
            {
                total += 17;
            }
            else if(tmpCF[i] == "S")
            {
                total += 18;
            }
            else if(tmpCF[i] == "T")
            {
                total += 19;
            }
            else if(tmpCF[i] == "U")
            {
                total += 20;
            }
            else if(tmpCF[i] == "V")
            {
                total += 21;
            }
            else if(tmpCF[i] == "W")
            {
                total += 22;
            }
            else if(tmpCF[i] == "X")
            {
                total += 23;
            }
            else if(tmpCF[i] == "Y")
            {
                total += 24;
            }
            else if(tmpCF[i] == "Z")
            {
                total += 25;
            }
        }
        else
        {
            if(tmpCF[i] == "A" || tmpCF[i] == 0)
            {
                total += 1;
            }
            else if(tmpCF[i] == "B" || tmpCF[i] == 1)
            {
                total += 0;
            }
            else if(tmpCF[i] == "C" || tmpCF[i] == 2)
            {
                total += 5;
            }
            else if(tmpCF[i] == "D" || tmpCF[i] == 3)
            {
                total += 7;
            }
            else if(tmpCF[i] == "E" || tmpCF[i] == 4)
            {
                total += 9;
            }
            else if(tmpCF[i] == "F" || tmpCF[i] == 5)
            {
                total += 13;
            }
            else if(tmpCF[i] == "G" || tmpCF[i] == 6)
            {
                total += 15;
            }
            else if(tmpCF[i] == "H" || tmpCF[i] == 7)
            {
                total += 17;
            }
            else if(tmpCF[i] == "I" || tmpCF[i] == 8)
            {
                total += 19;
            }
            else if(tmpCF[i] == "J" || tmpCF[i] == 9)
            {
                total += 21;
            }
            else if(tmpCF[i] == "K")
            {
                total += 2;
            }
            else if(tmpCF[i] == "L")
            {
                total += 4;
            }
            else if(tmpCF[i] == "M")
            {
                total += 18;
            }
            else if(tmpCF[i] == "N")
            {
                total += 20;
            }
            else if(tmpCF[i] == "O")
            {
                total += 11;
            }
            else if(tmpCF[i] == "P")
            {
                total += 3;
            }
            else if(tmpCF[i] == "Q")
            {
                total += 6;
            }
            else if(tmpCF[i] == "R")
            {
                total += 8;
            }
            else if(tmpCF[i] == "S")
            {
                total += 12;
            }
            else if(tmpCF[i] == "T")
            {
                total += 14;
            }
            else if(tmpCF[i] == "U")
            {
                total += 16;
            }
            else if(tmpCF[i] == "V")
            {
                total += 10;
            }
            else if(tmpCF[i] == "W")
            {
                total += 22;
            }
            else if(tmpCF[i] == "X")
            {
                total += 25;
            }
            else if(tmpCF[i] == "Y")
            {
                total += 24;
            }
            else if(tmpCF[i] == "Z")
            {
                total += 23;
            }
        }
    }

    var resto = total % 26;

    if(resto == 0)
    {
        return "A";
    }
    else if(resto == 1)
    {
        return "B";
    }
    else if(resto == 2)
    {
        return "C";
    }
    else if(resto == 3)
    {
        return "D";
    }
    else if(resto == 4)
    {
        return "E";
    }
    else if(resto == 5)
    {
        return "F";
    }
    else if(resto == 6)
    {
        return "G";
    }
    else if(resto == 7)
    {
        return "H";
    }
    else if(resto == 8)
    {
        return "I";
    }
    else if(resto == 9)
    {
        return "J";
    }
    else if(resto == 10)
    {
        return "K";
    }
    else if(resto == 11)
    {
        return "L";
    }
    else if(resto == 12)
    {
        return "M";
    }
    else if(resto == 13)
    {
        return "N";
    }
    else if(resto == 14)
    {
        return "O";
    }
    else if(resto == 15)
    {
        return "P";
    }
    else if(resto == 16)
    {
        return "Q";
    }
    else if(resto == 17)
    {
        return "R";
    }
    else if(resto == 18)
    {
        return "S";
    }
    else if(resto == 19)
    {
        return "T";
    }
    else if(resto == 20)
    {
        return "U";
    }
    else if(resto == 21)
    {
        return "V";
    }
    else if(resto == 22)
    {
        return "W";
    }
    else if(resto == 23)
    {
        return "X";
    }
    else if(resto == 24)
    {
        return "Y";
    }
    else if(resto == 25)
    {
        return "Z";
    }

}



function logInfo()
{
    console.log("Nome: " + makeNome());
    console.log("Cognome: " + makeCognome());
    console.log("Anno di nascita: " + makeDob());
    console.log("Mese di nascita: " + makeMese());
    console.log("Sesso: " + makeDayAndSex());
    console.log("Lettera di controllo: " + letteraDiControllo)
    console.log("Codice catastale: " + codiceCatastale);
    console.log("Codice fiscale: " + cf);
}

function showCodice()
{
    document.getElementById("outputCodice").value = cf;
    document.getElementById("codiceContainer").style.display = "block";
    document.getElementById("codiceLabel").style.display = "block";
    document.getElementById("outputCodice").style.display = "block";
  //  document.getElementById("outputCodice").style.margin = "0 125px";
}

function main()
{
    makeMaxDob();
}

main();
