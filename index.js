document.addEventListener('DOMContentLoaded', function () {
    fetch('./assets/data/cards.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cards-container');
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';

                const headline = document.createElement('div');
                headline.className = 'headline';
                headline.textContent = item.headline;

                const subhead = document.createElement('div');
                subhead.className = 'subhead';
                subhead.textContent = item.subhead;

                const description = document.createElement('p');
                description.textContent = item.description;

                const button = document.createElement('button');
                button.textContent = 'Visualizar';
                button.className = 'open-modal';
                button.setAttribute('data-modal-target', item.modal_target);

                card.appendChild(headline);
                card.appendChild(subhead);
                card.appendChild(description);
                card.appendChild(button);

                container.appendChild(card);
            });

            // Eventos de clique aos botões
            const openModalButtons = document.querySelectorAll('.open-modal');
            const closeModalButtons = document.querySelectorAll('.close-modal');

            openModalButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const modalId = button.getAttribute('data-modal-target');
                    const modal = document.querySelector(modalId);
                    if (modal) {
                        modal.style.display = 'block';
                    } else {
                        console.error(`Modal with ID "${modalId}" not found.`);
                    }
                });
            });

            closeModalButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const modal = button.closest('.modal');
                    if (modal) {
                        modal.style.display = 'none';
                    } else {
                        console.error('Close button not inside a modal.');
                    }
                });
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    const openModals = document.querySelectorAll('.modal[style*="display: block"]');
                    openModals.forEach(modal => {
                        modal.style.display = 'none';
                    });
                }
            });

            window.addEventListener('click', (event) => {
                const openModals = document.querySelectorAll('.modal[style*="display: block"]');
                openModals.forEach(modal => {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            });
        })
        .catch(error => console.error('Error w/ JSON:', error));
});
