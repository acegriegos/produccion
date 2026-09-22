const apsyAlert = {

    show(mensaje, tipo = 'info', tiempo = 4000, html = false) {

        let container = document.getElementById('apsy-alerts')

        if (!container) {
            container = document.createElement('div')
            container.id = 'apsy-alerts'
            document.body.appendChild(container)
        }

        const alert = document.createElement('div')

        alert.className = `apsy-alert apsy-alert-${tipo}`

        const contenido = html
            ? mensaje
            : document.createTextNode(mensaje).textContent

        alert.innerHTML = `
            <div class="apsy-alert-content">
                ${contenido}
            </div>

            <div class="apsy-alert-progress">
                <div class="apsy-alert-progress-bar"></div>
            </div>
        `

        container.appendChild(alert)

        // Animación de entrada
        requestAnimationFrame(() => {
            alert.classList.add('show')
        })

        // Iniciar barra
        const progress = alert.querySelector('.apsy-alert-progress-bar')

        progress.style.animationDuration = `${tiempo}ms`

        // Cerrar
        setTimeout(() => {

            alert.classList.remove('show')

            setTimeout(() => {
                alert.remove()
            }, 300)

        }, tiempo)
    },

    success(mensaje, tiempo = 4000, html = false) {
        this.show(mensaje, 'success', tiempo, html)
    },

    error(mensaje, tiempo = 5000, html = false) {
        this.show(mensaje, 'error', tiempo, html)
    },

    warning(mensaje, tiempo = 5000, html = false) {
        this.show(mensaje, 'warning', tiempo, html)
    },

    info(mensaje, tiempo = 4000, html = false) {
        this.show(mensaje, 'info', tiempo, html)
    }

}

window.apsyAlert = apsyAlert

export {
    apsyAlert
}