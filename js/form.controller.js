((model, formView) => {
    "use strict"

    const claimForm = document.querySelector(formView.DOMSelectors.form)
    claimForm.addEventListener("submit", addClaim)

    function addClaim (event) {
        event.preventDefault()

        const claimData = formView.getFormData()
        const isDone = model.addClaim(claimData)

        if (isDone) {
            notification.displayNotifications(["Заявка успешно добавлена!"], "success", claimForm, "beforeEnd")
            notification.deleteNotificationSuccess(formView.DOMSelectors.alertSuccess)
        }
    }

})(modelApp, formView)