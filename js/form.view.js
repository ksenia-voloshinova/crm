const formView = (() => {
    "use strict"

    const DOMSelectors = {
        form: '[data-form]',
        allFormFields: '[data-form-elem]',
        fieldName: '[data-form-elem="name"]',
        fieldPhone: '[data-form-elem="phone"]',
        fieldEmail: '[data-form-elem="email"]',
        productList: '[data-form-elem="product-list"]',
        alertSuccess: "div.alert-success"
    }

    function getFormData () {
        const claimForm = document.querySelector(DOMSelectors.form)
        const formFields = document.querySelectorAll(DOMSelectors.allFormFields)
        const [nameField, phoneField, emailField, productList] = formFields
        const options = productList.options
        const errors = modelApp.validateForm(formFields)
        const listErrorMessages = modelApp.getErrorMessages(errors)

        notification.displayNotifications(listErrorMessages, "error", claimForm, "beforeEnd")
        notification.deleteNotificationSuccess(DOMSelectors.alertSuccess)

        if (!errors.length) {
            return {
                name: nameField.value.trim(),
                phone: phoneField.value.trim(),
                email: emailField.value.trim(),
                course: {
                    name: options[options.selectedIndex].text,
                    value: options[options.selectedIndex].value
                }
            }
        } else {
            return null
        }
    }


    return {
        DOMSelectors,
        getFormData
    }
})()