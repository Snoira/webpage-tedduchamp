const events = {
    name: "events",
    title: "Events",
    type: "document",
    fields: [
        { name: "date", title: "Date", type: "datetime", options: {
            dateFormat: "DD MMM YYYY",
            timeFormat: "HH:mm",
            allowTimeZoneSwitch: true
        } },
        { name: "location", title: "Location", type: "string" },
        { name: "venue", title: "Venue", type: "string" },
        { name: "url", title: "URL", type: "url" },
    ],
}

export default events;