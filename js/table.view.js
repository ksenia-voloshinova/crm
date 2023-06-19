const tableView = (() => {
    "use strict"

    const DOMSelectors = {
        tableBody: '[data-table-body]',
        tableRow: "[data-table-body] tr",
        statusFilter: '[data-status-filter]',
        productFilter: '[data-product-filter]',
        linkFilter: '[data-link-filter]'
    }

    function showClaims (claimsList) {
        if (claimsList) {
            const tableBody = document.querySelector(DOMSelectors.tableBody)
            const tableRows = document.querySelectorAll(DOMSelectors.tableRow)
            tableRows.forEach(row => row.remove())

            claimsList.forEach(claim => {
                const claimTemplate = `
                            <tr>
                                <th scope="row">${claim.id}</th>
                                <td>${claim.date}</td>
                                <td>${claim.product.name}</td>
                                <td>${claim.name}</td>
                                <td>${claim.email}</td>
                                <td>${claim.phone}</td>
                                <td>
                                    <div class="badge badge-pill ${claim.status.colorClass}">
                                        ${claim.status.text}
                                    </div>
                                </td>
                                <td>
                                    <a href="03-crm-edit-bid.html?claim-id=${claim.id}">Редактировать</a>
                                </td>
                            </tr>`

                tableBody.insertAdjacentHTML("afterBegin", claimTemplate)
            })
        }
    }

    function displayCountBadges (countClaimsStatus) {

        for (let key in countClaimsStatus) {
            const badgeElement = document.createElement("div")
            badgeElement.classList.add("badge")
            badgeElement.innerText = countClaimsStatus[key]
            
            document.querySelector(`a[data-status="${key}"]`).append(badgeElement)
        }
    }

    return {
        DOMSelectors,
        showClaims,
        displayCountBadges
    }
})()