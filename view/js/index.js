
const getValue = (id) => {
    return document.getElementById(id).value;
}

let setFormValuesToNull = () => {

    elems = document.getElementsByTagName("input");
    for (let j = 0; j < elems.length; j++) {
        elems[j].value = null;
    }
    document.getElementsByTagName("textarea")[0].value = null;

}

function encodeImageFileAsURL(element) {

    // encoding image to url 

    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
        reader.result;
        console.log('RESULT', reader.result)

        // pdf genarator

        let generatePdf = () => {

            event.preventDefault();

            let userData = {
                name: getValue("user-name"),
                batch: getValue("batch-name"),
                email: getValue("user-email"),
                phone: getValue("user-phone"),
                location: getValue("user-city"),
                gender: document.getElementsByTagName("select")[0].selectedOptions[0].value
            }

            let xOriginForHeadings = 10, xOriginForData = 50, i, yOrigin = 50;

            var doc = new jsPDF('p', 'mm', [297, 210]);
            doc.rect(5, 30, 200, 100)
            //Heading
            doc.setFont("Arial");
            doc.setFontType('bold');
            doc.line(70, 23, 140, 23);
            doc.setFontSize(14);
            doc.text("User Details", 90, 20);

            //Sub-Headings or Data
            doc.setFont('Arial');
            doc.setFontType('normal');
            doc.setFontSize(10);
            doc.addImage(reader.result, 'JPEG', 120, 40, 80, 80);

            for (i = 0; i < Object.entries(userData).length; i++) {

                doc.text(`${Object.entries(userData)[i][0].toUpperCase()} : `, xOriginForHeadings, yOrigin);
                doc.text(`${Object.entries(userData)[i][1].toUpperCase()}`, xOriginForData, yOrigin);
                yOrigin += 10;

            }
            try {

                doc.save('user-data.pdf');
                setFormValuesToNull();
            }
            catch (e) {
                alert('Error occured! while saving pdf ' + e.message);
            }

        }


        document.getElementsByTagName("form")[0].addEventListener('submit', generatePdf);
    };
    reader.readAsDataURL(file);
}
$(document).ready(function () {
    $('.datepicker').datepicker();
    $('#textarea1');
    $('select').formSelect();
});
