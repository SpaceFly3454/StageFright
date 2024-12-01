if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var removebutton = document.getElementsByClassName('btn-remove')

    for (var i = 0; i < removebutton.length; i++) {
        var button = removebutton[i]
        button.addEventListener('click', function(event) {
            var buttonclick = event.target
            buttonclick.parentElement.parentElement.remove()
            updatetotal()
        })
    }

    var amountinput = document.getElementsByClassName('amount-input')
    for (var i = 0; i < amountinput.length; i++) {
        var input = amountinput[i]
        input.addEventListener('change', amountchange)
    }

    var additem = document.getElementsByClassName('add-item')
    for (var i = 0; i < additem.length; i++) {
        var button = additem[i]
        button.addEventListener('click', additemclick)
    }
}

function additemclick(event) {
    var button = event.target
    var item = button.parentElement
    var name = item.getElementsByClassName('name')[0].innerText
    var price = item.getElementsByClassName('price')[0].innerText
    var image = item.getElementsByClassName('image')[0].src
    addtocart(image, name, price)
}

function addtocart(image, name, price) {
    var row = document.createElement('div')
    var cartitems = document.getElementsByClassName('items')[0]
    row.classList.add('row')
    var rowinside = `
        <div>
            <img class="image" src="${image}">
        </div>
        <div>
            <h4>${name}</h4>
        </div>
        <div>
            <input class="amount-input" type="number" value="1">
            <button class="btn btn-remove" type="button">Remove</button>
        </div>
        <h4>${price}</h4>`
    row.innerHTML = rowinside
    cartitems.append(row)
    row.getElementsByClassName('btn-remove')[0].addEventListener('click', function(event) {
        event.target.parentElement.parentElement.remove();
        updatetotal();
    })
    row.getElementsByClassName('amount-input')[0].addEventListener('change', amountchange)
    updatetotal()
}

function amountchange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal()
}

function updatetotal() {
    var rows = document.getElementsByClassName('items')[0].getElementsByClassName('row')
    var total = 0
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i]
        var price = row.getElementsByTagName('h4')[1]
        var amount = row.getElementsByClassName('amount-input')[0]
        var price1 = parseFloat(price.innerText.replace('$', ''))
        var amount1 = amount.value
        total = total + (amount1 * price1)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total')[0].innerText = '$' + total
}
