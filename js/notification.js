const notification = (() => {
    "use strict"

    function displayNotifications (textNotifications = [], type, element, position) {
        let notificationHTML = null

        const alerts = document.querySelectorAll(".alert")
        if (alerts) {
            alerts.forEach(alert => alert.remove())
        }

        if (textNotifications.length) {
            textNotifications.forEach(text => {
                if (type === "error") {
                    notificationHTML = `
                                    <div class="alert alert-danger" role="alert">
                                        ${text}
                                    </div>`
                } else if (type === "success") {
                    notificationHTML = `
                                    <div class="alert alert-success" role="alert">
                                        ${text}
                                    </div>`
                }
        
                element.insertAdjacentHTML(position, notificationHTML)
            })  
        }
    }

    function deleteNotificationSuccess (selector) {
        const notificationElement = document.querySelector(selector)
        setTimeout(() => {
            if (notificationElement) {
                notificationElement.style.opacity = 0
                setTimeout(() => notificationElement.remove(), 2000)
            }
        }, 2000)
    }

    return {
        displayNotifications,
        deleteNotificationSuccess
    }
})()