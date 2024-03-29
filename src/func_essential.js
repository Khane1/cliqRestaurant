import { roles } from "./firebase/functions/restaurant_funcs/businessLogic";

export function similar(a, b) {
    var equivalency = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;
    var maxLength = (a.length < b.length) ? b.length : a.length;
    for (var i = 0; i < minLength; i++) {
        if (a[i] == b[i]) {
            equivalency++;
        }
    }


    var weight = equivalency / maxLength;
    return Math.round(weight * 100);
}


export function MoneyFormat(val) {
    return Intl.NumberFormat("en-US").format(val);
}

export function calculateTotal(selectedId, e, list) {
    if (selectedId == e.data.customerId) {
        if (
            list.filter((val) => e.data.customerId != val.customerId)
                .length > 0
        ) {
            const Index = list.findIndex(
                (obj) => obj.customerId == e.data.customerId
            );
            list.pop(list[Index]);
        }
        if (list.filter((val) => e.id == val.id).length > 0) {
            const Index = list.findIndex((obj) => obj.id == e.id);
            if (list[Index].status != e.data.status) {
                list[Index].status = e.data.status;
            }
        } else {
            list = [
                ...list,
                {
                    status: e.data.status,
                    id: e.id,
                    customerId: e.data.customerId,
                    total: e.data.total,
                },
            ];
            console.log({
                status: e.data.status,
                id: e.id,
                total: e.data.total,
            });
        }
    } else {
        // console.log(e.id);
    }
}


export function getDateToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "/" + mm + "/" + dd;
    return { today: today, year: yyyy, month: mm, day: dd };
}

export function dateTransfer(date) {
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    // today = yyyy + "/" + mm + "/" + dd;
    return yyyy + '-' + mm + '-' + (parseInt(dd) + 1);
}


export function pingURL() {
    try {

        // The custom URL entered by user
        var URL = "https://www.google.com/";
        var Http = new XMLHttpRequest();
        // // Sends the request and observes the response
        Http.open('GET', URL);
        Http.send();
        Http.onreadystatechange = (e) => {
            statusChecker(Http.status)
        }

    } catch (error) {
        alert(error)
    }
}

function statusChecker(e) {
    switch (e) {
        case 200: {
            console.log("Status 200: Page is up!");
        };
            break;
        case 400: {
            alert("Status 400: Page is down.");
        }
            break;

        case 0: {
            alert("Internet is down.");
        };
            break;

    };
}

export function execRights(user) {
    return (user.role == roles.manager ||
        user.role == roles.admin)
}

export function royalRights(user) {
    return (user.role == roles.manager ||
        user.role == roles.admin ||
        user.role == roles.cashier)
}

export function crudRights(user) {
    console.log(user.role);
    return (user.role == roles.attendant ||
      user.role == roles.admin || user.role == roles.manager)
}