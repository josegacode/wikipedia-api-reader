function searchOnWikipedia() {
  // Getting the text for search in wikipedia
  $("#render-container").html('');
  let searchRequest = $("#search-request-field").prop("value");
  // let urlForSearch = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${searchRequest}`;
  let urlForSearch = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro=1&explaintext=1&titles=${searchRequest}&continue=&format=json&formatversion=2`;

  $("#search-request").val(urlForSearch);

  $.ajax({
    type: "GET",
    url: urlForSearch,
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",

    success: function (response) {
      let responseText = JSON.stringify(response, null, "\t");
      $("#search-request-value").val(responseText);
      // getHtmlFromWiki(response.query.search[0].pageid, response.query.search[0].title);

      let title = response.query.pages[0].title;
      let extract = response.query.pages[0].extract;
      $("#render-container").append(`<h1>${title}</h1>`);
      $("#render-container").append(extract);
    },

    error: function (errorMessage) {
      console.error(errorMessage);
    },
  });
}
/*
let getHtmlFromWiki = (pageIdParam, title) => {
  // Get the page HTML to render using the id from previous search

  $("#render-container").html('');
  // let urlToRender = `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&pageid=${pageId}&prop=extract`;
  let urlToRender = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exlimit=20&exintro=1&explaintext=1&origin=*&titles=${title}`;
  $('#request-html').val(urlToRender);


  $.ajax({
    type: "GET",
    url: urlToRender,
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",


    success: function (response) {
      let responseText = JSON.stringify(response, null, "\t");
      $("#response-html-value").val(responseText);

      let titleResponse = response.query.pages;
      let text = response.query.pages;

      // text.replace("//", "");
      // Appending to the render container
      $("#render-container").append(`<h1>${titleResponse}</h1>`);
      $("#render-container").append(`${text}`);
    },

    error: function (errorMessage) {
      console.error(errorMessage);
    },
  });
};
*/