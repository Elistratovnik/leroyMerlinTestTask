const dataFromServer = {
    "displayedName": {
        "displayedName": {
            "value": [
                "Профиль маячковый ПВХ 10 мм L3м"
            ],
            "description": "Полное наименование товара для клиента"
            }
        },
    "stock": {
        "stocks": {
                "34": {
                "2": "35",
                "3": "42",
                "4": "58",
                "5": "57",
                "6": "112",
                "20": "51",
                "22": "78",
                "26": "34",
                "32": "22",
                "35": "358",
                "40": "28",
                "43": "68",
                "45": "58",
                "49": "31",
                "51": "29",
                "56": "42",
                "62": "26",
                "64": "0",
                "65": "57",
                "86": "15",
                "114": "41",
                "117": "46",
                "143": "46",
                "162": "4",
                "171": "0",
                "176": "12"
            }
        }
    }
}

function getItemName (data) {
    return data.displayedName.displayedName.value[0]
    // или можно вернуть объект с именем и описанием return {value: data.displayedName.displayedName.value[0], description: data.displayedName.displayedName.description}
}

function getRegions (stocks) { // вспомогательная функция, для работы с большим количеством регионов
    const regions = []
    for (region in stocks) {
        regions.push(stocks[region]) 
    }
    return regions
}

function getStoresWhereItemsAvailable (data) {
    const regions = getRegions(data.stock.stocks)
    return regions.reduce((acc, region) => {
        for (storeNumber in region) {
            if (+region[storeNumber] !== 0) {acc.push(storeNumber)} // здесь используется унарный плюс для приведения типа данных string к number, можно обойтись и без него используя нестрогое сравнение != (не желательно)
        }
        return acc
    }, [])
}

function maxItemsInStores (data) {
    const regions = getRegions(data.stock.stocks)
    return regions.reduce((acc, region) => {
        for (storeNumber in region) {
            if (+acc.maxItems === +region[storeNumber]) { // проверяем, что в некоторых магазинах может быть одинаковое максимальное кол-во 
                acc.storeNumber = acc.storeNumber + ' ' + storeNumber
            }
            if (acc.maxItems < +region[storeNumber]) {
                acc.maxItems = region[storeNumber]
                acc.storeNumber = storeNumber
            }
        }
        return acc
    }, {maxItems: 0, storeNumber: '0'})
}
