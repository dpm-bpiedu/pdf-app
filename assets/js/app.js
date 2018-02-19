var myDoc = {
	title: '',
	url: '',
	status: true,
	jsStatus: false,
	key: ''
};

var downloadPDF = function() {
    DocRaptor.createAndDownloadDoc(myDoc.key, {
        name: myDoc.title,
        test: myDoc.status,
        type: "pdf",
        document_url: myDoc.url,
        javascript: myDoc.jsStatus,
        prince_options: {
            media: "screen",
            async: true
        }
    });
}

$("#confirm").on("click", function(e) {
    e.preventDefault();
    myDoc.title = $("#title").val().trim();
    myDoc.url = $("#path").val().trim();
    myDoc.key = $("#api_key").val().trim();
    if ($("#test").prop("checked") === true) {
        myDoc.status = true;
    } else {
        myDoc.status = false;
    }
    $("#pdf-button")
        .attr("value", "download PDF: " + myDoc.title)
        .prop("disabled", false);
});

$("#pdf-button").on("click", function() {
    downloadPDF();
});

$(".input-text").on("focus", function() {
  $("#pdf-button")
  .prop("disabled", true)
  .attr("value", "download PDF");
});

function initialize() {
    $("#pdf-button").prop("disabled", true);
}

$(document).ready(function() {
  console.log("app.js is loaded");
  initialize();
});
