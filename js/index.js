let txtInput     = document.getElementById('txt-input');
let txtOutput    = document.getElementById('txt-output');

let btnEncrypt   = document.getElementById('btn-encrypt');
let btnDecrypt   = document.getElementById('btn-decrypt');

let btnCopy      = document.getElementById('btn-copy');
let rectangleInfo = document.getElementById('rectangle-info');
let rectangleResult = document.getElementById('rectangle-result');
let notAlloweded = new RegExp('[0-9A-ZñáéíóúÑÁÉÍÓÚ~&@#%!¡¿?]');

txtInput.addEventListener('input', () => {
    
    let input = txtInput.value; 
    // Verify textarea
    if ( input.match( notAlloweded ) ) {
        // Show warning
        alert('👀👉Enter only lowercase letters and no accents.👈👀');
        // If the letter is not allowed, we remove it.
        txtInput.value = input.slice( 0, -1 );
    }

});

btnEncrypt.addEventListener('click', e => {
    e.preventDefault();

    let input = txtInput.value;
    if ( input == '' ) {
        alert('👀👉Enter the text to be encrypted.👈👀');
        rectangleInfo.classList.remove('invisible');
        rectangleResult.classList.add('invisible');
        txtInput.focus();
    }else{
        rectangleInfo.classList.add('invisible');
        rectangleResult.classList.remove('invisible');
        
        let encryptedParagraph = [];
        for (let index = 0; index < input.length; index++) {
            let encriptyLetter = input[ index ].toString()
                .replace(/e/g, 'enter')
                .replace(/i/g, 'imes')
                .replace(/a/g, 'ai')
                .replace(/o/g, 'ober')
                .replace(/u/g, 'ufat')
            encryptedParagraph.push( encriptyLetter );
        }
        txtOutput.value = encryptedParagraph.join('');
        txtInput.value = '';
        btnCopy.focus();
    }
});

btnDecrypt.addEventListener('click', e => {
    e.preventDefault();
    if ( txtInput.value == '' ) {
        alert('👀👉Enter the text to be decrypted.👈👀');
        rectangleInfo.classList.remove('invisible');
        rectangleResult.classList.add('invisible');
        txtInput.focus();
    }else{
        rectangleInfo.classList.add('invisible');
        rectangleResult.classList.remove('invisible');

        let decryptedParagraph = txtInput.value
            .replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ai/g, 'a')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u')

        txtOutput.value = decryptedParagraph;
        txtInput.value = '';
        btnCopy.focus();
    }
});

btnCopy.addEventListener('click', async e => {
    e.preventDefault();
    try {
        await navigator.clipboard.writeText(txtOutput.value);
        // Show message
        alert('🎉Text copied successfully!🎉 \n👉You can paste the text using the [CTRL + C] functionality or the "copy" option from the applications menu.👈');
        btnCopy.textContent = 'Copied!';
        txtInput.focus();
        setTimeout(() => {
            btnCopy.textContent = 'Copy';
        }, 1000);
    } catch(error) {
        console.log(`Error: ${error}`);
    }
});