console.log("app.js loaded");
window.DocRaptor = {
  createAndDownloadDoc: function(api_key, doc_attrs) {
    var makeFormElement = function(name, value) {
      var element = document.createElement("textarea")
      element.name = name
      element.value = value
      return element
    }

    var form = document.createElement("form")
    form.action = "https://docraptor.com/docs"
    form.method = "post"
    form.style.display = "none"

    form.appendChild(makeFormElement("user_credentials", api_key))

    for (var key in doc_attrs) {
      if (key == "prince_options") {
        for (var option in doc_attrs.prince_options) {
          form.appendChild(makeFormElement("doc[prince_options][" + option + "]", doc_attrs.prince_options[option]))
        }
      } else {
        form.appendChild(makeFormElement("doc[" + key + "]", doc_attrs[key]))
      }
    }

    document.body.appendChild(form);
    form.submit()
  }
}

var urlBase = "https://ne.edgecastcdn.net/0004BA/constellation/testing/pdf/";
var urlStem = "";

var myDoc = {
	title: '',
	url: urlBase + urlStem,
	status: true,
	jsStatus: true,
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
    urlStem = $("#path").val().trim();
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
