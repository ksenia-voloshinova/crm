const editController = ((model, editView) => {
    "use strict"

    const cardBody = document.querySelector(editView.DOMSelectors.cardBody)
    const buttonSave = document.querySelector(editView.DOMSelectors.buttonSave)
    const deleteButton = document.querySelector(editView.DOMSelectors.buttonDelete)
    const countClaimsByStatusObj = model.countClaimsByStatus()
    const editDataClaim = getDataClaim()

    function setupEventListeners () {
        buttonSave.addEventListener("click", editClaim)

        deleteButton.addEventListener("click", () => {
            const claimId = parseInt(document.querySelector(editView.DOMSelectors.idElem).innerText)
            model.deleteClaimArchive(claimId)

            notification.displayNotifications(["Заявка добавлена в архив!"], "success", cardBody, "beforeEnd")
            notification.deleteNotificationSuccess(editView.DOMSelectors.alertSuccess)
        })

        editView.displayClaimData(editDataClaim)

        tableView.displayCountBadges(countClaimsByStatusObj)
    }

    function getDataClaim () {
        const claimIdEdit = parseInt(location.search.substr(1).split("=")[1])
        console.log(claimIdEdit)
        const claimInd = model.claims.findIndex(claim => claim.id === claimIdEdit)

        return model.claims[claimInd]
    }

    function editClaim () {
        const claimData = editView.getFormData()

        if (claimData) {
            const claimInd = model.claims.findIndex(claim => claim.id === claimData.id)
            const claimForEdit = model.claims[claimInd]
            const newStatus = model.getNewStatus(claimData.status.text, claimData.status.value) 

            Object.assign(claimForEdit, claimData, {
                status: newStatus,
                date: createDateStr() + "(edit)"
            })

            localStorage.setItem("claims", JSON.stringify(model.claims))

            notification.displayNotifications(["Данные успешно сохранены!"], "success", cardBody, "beforeEnd")
            notification.deleteNotificationSuccess(editView.DOMSelectors.alertSuccess)
        }
    }

    function createDateStr () {
        const dateNow = new Date()
        const formatter = new Intl.DateTimeFormat("ru", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })

        return formatter.format(dateNow)
    }

    function init () {
        setupEventListeners()
    }

    return {
        init
    }

})(modelApp, editView)

editController.init()