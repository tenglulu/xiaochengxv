$( document ).ready(function() {
    $('#table_id_example').DataTable({
        "ajax": {
            url:"./data.json",
            dataSrc:'body',
        },
        // data:body,
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "author" },
            { "data": "price" },
            { "data": "publish" },
            { "data": "isbn" }
        ]
    });
});