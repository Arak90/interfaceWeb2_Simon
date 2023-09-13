// Classe Compteur
class Compteur {
    constructor(elDOM) {
        this.elDOM = elDOM;
        this.elNombre = elDOM.querySelector('[data-js-nombre]');
        this.initialiserEvenements();
    }

    initialiserEvenements() {
        this.elDOM.querySelector('[data-js-action="moins"]').addEventListener('click', this.decrementer.bind(this));
        this.elDOM.querySelector('[data-js-action="plus"]').addEventListener('click', this.incrementer.bind(this));
    }

    incrementer() {
        let valeur = parseInt(this.elNombre.innerText, 10);
        this.mettreAJourNombre(valeur + 1);
    }

    decrementer() {
        let valeur = parseInt(this.elNombre.innerText, 10);
        this.mettreAJourNombre(valeur - 1);
    }

    mettreAJourNombre(nouveauNombre) {
        let ancienEl = this.elNombre;
        let nouveauEl = ancienEl.cloneNode(true);
        nouveauEl.innerText = nouveauNombre;

        let direction = nouveauNombre > parseInt(ancienEl.innerText, 10) ? 1 : -1;
        if (direction === 1) {
            nouveauEl.classList.add('nombre-entrer');
        } else {
            nouveauEl.classList.add('nombre-sortir');
        }

        function gererFinTransition() {
            ancienEl.remove();
            ancienEl.removeEventListener('transitionend', gererFinTransition);
        }
        
        ancienEl.addEventListener('transitionend', gererFinTransition);

        this.elDOM.insertBefore(nouveauEl, ancienEl);

        // Une fois que nous avons défini l'état initial, déclenchez la transition
        requestAnimationFrame(function() {
            if (direction === 1) {
                ancienEl.classList.add('nombre-sortir');
                nouveauEl.classList.remove('nombre-entrer');
            } else {
                ancienEl.classList.add('nombre-entrer');
                nouveauEl.classList.remove('nombre-sortir');
            }
            this.elNombre = nouveauEl;
        }.bind(this));
    }
}
