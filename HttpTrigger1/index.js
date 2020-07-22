module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const customFormattedDataInput = (req.query.input || (req.body && req.body.input));
    let input = `${customFormattedDataInput}`

    // extraction of custom formatted data to json data
    let splitObjectRegex = /\((.*?)\)/g;
    let objectResult = input.match(splitObjectRegex)
    let geoList = []
    if (objectResult && Array.isArray(objectResult) && objectResult.length > 0) {
        console.log(objectResult.length + "\t objects found ")

        objectResult.forEach(obj => {
            let areaAndCoordinateRegex = /\s*-{3}\s*/g
            let result = obj.split(areaAndCoordinateRegex)
            result = result.map(value => value.replace("(", ""))
            result = result.map(value => value.replace(")", ""))

            let geoItem = {}
            //todo check index length
            // todo add try catch block
            result.map((value, index) => {
                if (index === 0) {
                    geoItem["tag_name"] = result[0]
                }
                if (index === 1) {
                    geoItem["coordinates"] = result[1]
                }
            })
            geoList.push(geoItem)

        })
    }

    // custom json to ready for xml json
    let newKML = [];
    if (geoList.length > 0) {
        geoList.map((item) => {
            let newItem = {
                "Placemark": {
                    "name": item.tag_name,
                    "Point": {
                        "coordinates": item.coordinates
                    }
                }
            };
            newKML.push(newItem);
        })
    }

    // object to xml
    function OBJtoXML(obj) {
        var xml = '';
        for (var prop in obj) {
            xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
            if (obj[prop] instanceof Array) {
                for (var array in obj[prop]) {
                    xml += "<" + prop + ">";
                    xml += OBJtoXML(new Object(obj[prop][array]));
                    xml += "</" + prop + ">";
                }
            } else if (typeof obj[prop] == "object") {
                xml += OBJtoXML(new Object(obj[prop]));
            } else {
                xml += obj[prop];
            }
            xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
        }
        var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
        return xml
    }

    // final processing
    let beforeKML = OBJtoXML(newKML)
    const responseMessage = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2">
        <Document id="1">`+ beforeKML + `</Document>
        </kml>`;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}