const testData = (() => {
    "use strict"

    class ExampleItem {
        constructor(name, phone, email) {
            this.name = name
            this.phone = phone
            this.email = email
        }
    }

    const testClaimData = [
        new ExampleItem("Алексей Иванов", "+7-952-643-34-56", "alex.ivanov@yandex.ru"),
        new ExampleItem("Мария Александрова", "+7-961-138-34-45", "mariyaAlexandrova@gmail.com"),
        new ExampleItem("Николай Васильев", "+7-951-834-03-95", "nikolay.v@mail.ru"),
        new ExampleItem("Dominic Dixon", "+7-960-345-45-67", "dominic.dixon@yandex.ru")
    ]

    function getRandomIndex (max) {
        return Math.floor(Math.random() * max)
    }
    
    function generateTestData () {
        const inputName = document.querySelector('[data-form-elem="name"]')
        const inputPhone = document.querySelector('[data-form-elem="phone"]')
        const inputEmail = document.querySelector('[data-form-elem="email"]')
        const courseListElement = document.querySelector('[data-form-elem="product-list"]')
        const randomCourseInd = getRandomIndex(courseListElement.options.length)

        const randomIndex = getRandomIndex(testClaimData.length)
        const randomItem = testClaimData[randomIndex]

        inputName.value = randomItem.name
        inputPhone.value = randomItem.phone
        inputEmail.value = randomItem.email

        if (courseListElement.options.length) {
            courseListElement.options[randomCourseInd].selected = "true"
        }
        
    }

    return {
        generateTestData
    }
})()

testData.generateTestData()