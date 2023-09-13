document.addEventListener('DOMContentLoaded', () => {
    const compteursDOM = document.querySelectorAll('[data-js-compteur]');
    compteursDOM.forEach(compteurDOM => {
        new Compteur(compteurDOM);
    });
});
