class TBO {
    constructor(
        AirlineCode,
        FlightNumber,
        airline,
        formattedDepartureTime,
        source,
        formattedDuration,
        stops,
        formattedArrivalTime,
        destination,
        time,
        colorCode,
        fareClassificationValue,
        Markup,
        PublishedFare,
        refund,
        ResultIndex
    ) {
        this.AirlineCode = AirlineCode;
        this.FlightNumber = FlightNumber;
        this.airline = airline;
        this.formattedDepartureTime = formattedDepartureTime;
        this.source = source;
        this.formattedDuration = formattedDuration;
        this.stops = stops;
        this.formattedArrivalTime = formattedArrivalTime;
        this.destination = destination;
        this.time = time;
        this.colorCode = colorCode;
        this.fareClassificationValue = fareClassificationValue;
        this.Markup = Markup;
        this.PublishedFare = PublishedFare;
        this.refund = refund;
        this.ResultIndex = ResultIndex;
    }

    // Static method
    static calculateMarkup(markupPercentage, baseFare) {
        return (markupPercentage / 100) * baseFare;
    }

    // Getter method
    get totalFare() {
        return this.PublishedFare + this.Markup;
    }
}
