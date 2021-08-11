function _hypertensionListbydate(){
    var startdate = document.getElementById('dateStartdate').value;
    var enddate = document.getElementById('dateEnddate').value;
    $.ajax({
        type:"GET",
        url:"http://localhost:8000/data/" +startdate + '/' + enddate,
        dataType:'json',})
    $.ajax({
        type:"GET",
        url:"http://localhost:8000/data",
        dataType:'json',
        success: function (response) {
        if (response == ""){
            document.getElementById('example').innerHTML = "";
        } else {
            var datatable = $('#example').DataTable({
            "destroy":true,
            "data": response,
        "columns": [
            { "data": "job_date" },
            { "data": "job_number" },
            { "data": "print_file" },
            { "data": "print_flat" },
            { "data": "print_name" },
        ],
        })
        }
        }, error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("failed, error is '" + thrownError + "'");
                alert("error is '" + thrownError + "'");
    }}
    )
}

