class TwoWayMap {
    constructor() {
        this.forwardMap = new Map();
        this.reverseMap = new Map();
    }

    // Method to set a key-value pair
    set(key, value) {
        this.forwardMap.set(key, value);
        this.reverseMap.set(value, key);
    }

    get(key) {
        return this.forwardMap.get(key);
    }

    reverseGet(value) {
        return this.reverseMap.get(value);
    }

    has(key) {
        return this.forwardMap.has(key);
    }

    reverseHas(value) {
        return this.reverseMap.has(value);
    }

    // Method to delete a key-value pair
    delete(key) {
        const value = this.forwardMap.get(key);
        if (value !== undefined) {
            this.forwardMap.delete(key);
            this.reverseMap.delete(value);
            return true;
        }
        return false;
    }

    // Method to clear the map
    clear() {
        this.forwardMap.clear();
        this.reverseMap.clear();
    }

    // Method to get the size of the map
    get size() {
        return this.forwardMap.size;
    }

    // Method to iterate over entries in the forward map
    *entries() {
        yield* this.forwardMap.entries();
    }

    // Method to iterate over entries in the reverse map
    *reverseEntries() {
        yield* this.reverseMap.entries();
    }
}

// Example usage:
const twoWayMap = new TwoWayMap();
twoWayMap.set('AirlineCode', 'AirlineCode');
twoWayMap.set('FlightNumber', 'FlightNumber');
twoWayMap.set('Airline', 'airline');
twoWayMap.set('AirlineName', 'airlineName');
twoWayMap.set('AirlineCode', 'airlineCode');
twoWayMap.set('DepTime', 'formattedDepartureTime');
twoWayMap.set('CityCode', 'source');
twoWayMap.set('Origin', 'origin');
twoWayMap.set('Destination', 'destination');
twoWayMap.set('CityName', 'cityName');
twoWayMap.set('Airport', 'airport');
twoWayMap.set('AirportName', 'airportName');
twoWayMap.set('AirportCode', 'airportCode');
twoWayMap.set('Terminal', 'terminal');
twoWayMap.set('formattedDuration', 'formattedDuration');
twoWayMap.set('stops', 'stops');
twoWayMap.set('ArrTime', 'formattedArrivalTime');
twoWayMap.set('CityCode', 'dest');
twoWayMap.set('time', 'time');
twoWayMap.set('FareClassification', 'colorCode');
twoWayMap.set('FareClassification', 'fareClassificationValue');
twoWayMap.set('Markup', 'Markup');
twoWayMap.set('IsRefundable', 'refund');
twoWayMap.set('ResultIndex', 'ResultIndex');
twoWayMap.set('Fare', 'fare');
twoWayMap.set('PublishedFare', 'publishedFare');

const tripJackMap = new TwoWayMap();
tripJackMap.set('fN', 'FlightNumber');
tripJackMap.set('aI', 'airline');
tripJackMap.set('fD', 'flightDetails');
tripJackMap.set('name', 'airlineName');
tripJackMap.set('code', 'airlineCode');
tripJackMap.set('dt', 'formattedDepartureTime');
tripJackMap.set('cityCode', 'source');
tripJackMap.set('da', 'origin');
tripJackMap.set('aa', 'destination');
tripJackMap.set('city', 'cityName');
tripJackMap.set('fd', 'airport');
tripJackMap.set('name', 'airportName');
tripJackMap.set('code', 'airportCode');
tripJackMap.set('terminal', 'terminal');
tripJackMap.set('formattedDuration', 'formattedDuration');
tripJackMap.set('stops', 'stops');
tripJackMap.set('at', 'formattedArrivalTime');
tripJackMap.set('cityCode', 'dest');
tripJackMap.set('time', 'time');
tripJackMap.set('FareClassification', 'colorCode');
tripJackMap.set('FareClassification', 'fareClassificationValue');
tripJackMap.set('Markup', 'Markup');
tripJackMap.set('rT', 'refund');
tripJackMap.set('id', 'ResultIndex');
tripJackMap.set('totalPriceList', 'fare');
tripJackMap.set('fd', 'publishedFare');




console.log(twoWayMap.get('key1')); // Output: value1
console.log(twoWayMap.reverseGet('value2')); // Output: key2

console.log(twoWayMap.has('key2')); // Output: true
console.log(twoWayMap.reverseHas('value1')); // Output: true

console.log(twoWayMap.size); // Output: 2

for (const [key, value] of twoWayMap.entries()) {
    console.log(`${key} -> ${value}`);
}
// Output:
// key1 -> value1
// key2 -> value2

for (const [value, key] of twoWayMap.reverseEntries()) {
    console.log(`${value} -> ${key}`);
}
// Output:
// value1 -> key1
// value2 -> key2
