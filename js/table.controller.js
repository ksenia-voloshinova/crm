const tableController = ((model, tableView) => {
    "use strict"

    const claimsList = model.claims
    const filterInfo = model.filter
    const productFilter = document.querySelector(tableView.DOMSelectors.productFilter)
    const statusFilter = document.querySelector(tableView.DOMSelectors.statusFilter)
    const linkFilter = document.querySelector(tableView.DOMSelectors.linkFilter)
    const countClaimsByStatusObj = model.countClaimsByStatus()

    function setupEventListeners () {
        linkFilter.addEventListener("click", handleStatusOnClick)
        statusFilter.addEventListener("click", handleStatusOnClick)
        productFilter.addEventListener("change", handleProductOnChange)
    }

    function handleStatusOnClick () {
        filterInfo.status = event.target.dataset.status
        showFilteredElements(model.claims, filterInfo)
        setActiveItems()
        saveFilter()
    }

    function handleProductOnChange () {
        filterInfo.product = event.target.value
        showFilteredElements(model.claims, filterInfo)
        setActiveItems()
        saveFilter()
    }

    function saveFilter () {
        localStorage.setItem("filter", JSON.stringify(filterInfo))
    }

    function activeFilterElements () {
        showFilteredElements(model.claims, filterInfo)
        setActiveItems()
    }

    function filterData (filterData, filterObject) {

        if (filterObject.status && filterObject.status !== "all") {
            filterData = filterData.filter(claim => claim.status.value === filterObject.status)
        } 

        if (filterObject.product && filterObject.product !== "all") {
            filterData = filterData.filter(claim => claim.product.value === filterObject.product)
        }

        return filterData
    }

    function showFilteredElements (filterClaims, filter) {
        const filteredData = filterData(filterClaims, filter)
        tableView.showClaims(filteredData)
    }

    function setActiveItems () {
        const filter = model.filter

        if (filter.status) {
            const filterElements = document.querySelectorAll(`[data-status="${filter.status}"]`)
            const activeElements = document.querySelectorAll(".active")

            if (filterElements) {
                if (activeElements) {
                    activeElements.forEach(activeElement => activeElement.classList.remove("active"))
                }
                filterElements.forEach(filterElement => filterElement.classList.add("active"))
            }
        }

        if (filter.product) {
            const optionElement = document.querySelector(`option[value="${filter.product}"]`)
            const selectedElements = document.querySelectorAll('option[selected="true"]')

            if (selectedElements) {
                selectedElements.forEach(selectedElement => selectedElement.removeAttribute("selected"))
            }

            optionElement.setAttribute("selected", "true")
        }
    }

    function init () {
        if (claimsList) {
            tableView.showClaims(claimsList)
        }

        tableView.displayCountBadges(countClaimsByStatusObj)

        setupEventListeners()
        activeFilterElements()
    }

    return {
        init
    }

})(modelApp, tableView)

tableController.init()