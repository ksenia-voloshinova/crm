const editView = (() => {
    "use strict"

    const DOMSelectors = {
        idElem: '[data-id]',
        dateElem: '[data-date]',
        allformFields: '[data-form-elem]',
        buttonSave: '[data-btn-save]',
        buttonDelete: '[data-btn-delete]',
        cardBody: '[data-card]',
        alertSuccess: "div.alert-success"
    }

    function displayClaimData (claimData) {
        const idElem = document.querySelector(DOMSelectors.idElem)
        const dateElem = document.querySelector(DOMSelectors.dateElem)
        const [productList, name, email, phone, statusList] = document.querySelectorAll(DOMSelectors.allformFields)
        
        idElem.innerText = claimData.id
        dateElem.innerText = claimData.date
        productList.value = claimData.product.value
        name.value = claimData.name
        email.value = claimData.email
        phone.value = claimData.phone
        statusList.value = claimData.status.value
    }

    function getFormData () {
        const cardBodyElem = document.querySelector(DOMSelectors.cardBody)
        const id = parseInt(document.querySelector(DOMSelectors.idElem).innerText)
        const [productList, name, email, phone, statusList] = document.querySelectorAll(DOMSelectors.allformFields)
        const productListOptions = productList.options
        const statusListOptions = statusList.options
        const errors = modelApp.validateForm([productList, name, email, phone, statusList])
        const errorMessages = modelApp.getErrorMessages(errors)

        notification.displayNotifications(errorMessages, "error", cardBodyElem, "beforeEnd")

        if (!errors.length) {
            return {
                id,
                name: name.value,
                email: email.value,
                phone: phone.value,
                product: {
                    name: productListOptions[productListOptions.selectedIndex].text,
                    value: productListOptions[productListOptions.selectedIndex].value
                },
                status: {
                    text: statusListOptions[statusListOptions.selectedIndex].text,
                    value: statusListOptions[statusListOptions.selectedIndex].value
                }
            }
        } else {
            return null
        }
    }

    return {
        DOMSelectors,
        displayClaimData,
        getFormData
    }
})()