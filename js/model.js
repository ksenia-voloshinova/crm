const modelApp = (() => {
    "use strict"

    let claims = JSON.parse(localStorage.getItem("claims")) || []
    const filter = JSON.parse(localStorage.getItem("filter")) || {
        product: "",
        status: ""
    } 

    class Status {
        constructor(text, value) {
            this.text = text
            this.value = value
            this.colorClass = "badge-primary"
        }

        setColor () {
            const colorClasses = {
                new: "badge-primary",
                inWork: "badge-warning",
                expectedPayment: "badge-dark",
                complete: "badge-success",
                failure: "badge-danger",
                archive: "badge-secondary"
            }

            this.colorClass = colorClasses[this.value]
        }
    }

    function countClaimsByStatus () {
        const numberClaimByStatus = {}
        const statuses = [
            new Status("Новая", "new"),
            new Status("В работе", "inWork"),
            new Status("Завершена", "complete"),
            new Status("Архив", "archive")
        ]
        
        statuses.forEach(status => {
            numberClaimByStatus[status.value] = getCountByStatus(status.value)
        })

        return numberClaimByStatus
    }

    function getCountByStatus (status) {
        let count = 0

        claims.forEach(claim => {
            if (claim.status.value === status) {
                count++
            }
        })

        return count
    }

    class Claim {
        constructor(name, phone, email, product) {
            this.id = this.setId()
            this.date = this.setDate()
            this.name = name
            this.phone = phone
            this.email = email
            this.status = new Status("Новая", "new")
            this.product = product
        }

        setDate () {
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

        setId () {
            return (claims.length) ? claims[claims.length - 1].id + 1 : 1
        }
    }

    function addClaim(claimData) {
        let isDone = false
        if (claimData) {
            const claim = new Claim(claimData.name, claimData.phone, claimData.email, claimData.course)
            claims = JSON.parse(localStorage.getItem("claims")) || []
            claims.push(claim)

            localStorage.setItem("claims", JSON.stringify(claims))
            isDone = true

            testData.generateTestData()
        }
        return isDone
    }

    function deleteClaimArchive (claimID) {
        const claimIndex = claims.findIndex(claim => claim.id === claimID)
        const claimForDelete = claims[claimIndex]
        const archiveStatus = new Status("Архив", "archive")
        archiveStatus.setColor()

        claimForDelete.status.text = archiveStatus.text
        claimForDelete.status.value = archiveStatus.value
        claimForDelete.status.colorClass = archiveStatus.colorClass

        localStorage.setItem("claims", JSON.stringify(claims))
    }

    function validateForm (fields) {
        const errors = []

        fields.forEach(field => formFieldValidate(field, errors))

        return errors
    }

    function formFieldValidate (field, errors) {
        const validateInfo = {
            name: {
                typeError: ["empty", "invalid"],
                regExp: /([а-яёА-Я]+\s[а-яёА-Я]+|[a-zA-z]+\s[a-zA-z]+)$/iu,
                errors: ["Введите имя", "Имя должно должно содержать символы а-я или a-z."]
            },
            phone: {
                typeError: ["empty", "invalid"],
                regExp: /^\+\d-\(?\d{3}\)?-\d{3}-\d{2}-\d{2}$/,
                errors: ["Введите телефон", "Некорректный формат. Например, +7-XXX-XXX-XX-XX"]
            },
            email: {
                typeError: ["empty", "invalid"],
                regExp: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                errors: ["Введите email", "Некорректный формат. Например, john.doe@gmail.com"]
            },
            "status-list": {
                typeError: ["not selected"],
                errors: ["Выберите статус"]
            }
        }

        const value = field.value.trim()
        const fieldType = field.dataset.formElem
        const validator = validateInfo[fieldType]

        if (validator) {
            if (!value || (fieldType === "status-list" && value === "default")) {
                field.dataset.typeError = validator.typeError[0]
                errors.push(createError(fieldType, validator.typeError[0], validator.errors[0]))
            } else if (validator.regExp && !validator.regExp.test(value)) {
                field.dataset.typeError = validator.typeError[1]
                errors.push(createError(fieldType, validator.typeError[1], validator.errors[1]))
            } else {
                field.removeAttribute("data-type-error")
            }
        }
    }

    function createError (fieldName, type, text) {
        return {
            field: fieldName,
            type: type,
            errorText: text
        }
    }

    function getNewStatus (newStatusText, newStatusValue) {
        const newStatus = new Status(newStatusText, newStatusValue)
        newStatus.setColor()

        return newStatus
    }

    function getErrorMessages (errors) {
        const errorMessages = []

        for (const error of errors) {
            for (let key in error) {
                key === "errorText" ? errorMessages.push(error[key]) : errorMessages
            }
        }

        return errorMessages
    }

    return {
        claims,
        filter,
        addClaim,
        validateForm,
        getErrorMessages,
        getNewStatus,
        deleteClaimArchive,
        countClaimsByStatus
    }
})()