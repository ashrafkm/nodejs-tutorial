var globalObj = {

    custom_ajax: function($param) {

        if (!("data" in $param)) {
            $param.data = "";
        }
        if (!("beforeSend" in $param)) {
            $param.beforeSend = "";
        }
        if (!("error" in $param)) {
            $param.error = "";
        }

        // var url = $param.url;

        $.ajax({
            "dataType": $param.dataType,
            "type": $param.type,
            "url": $param.url,
            "data": $param.data,
            "beforeSend": function(request) {
                $.each($param.beforeSend, function(key, value) {
                    window[key][value](data, $param.customData);
                });
            },
            "complete": function() {

            },
            "success": function(data, textStatus, xhr) {
                $.each($param.success, function(key, value) {
                    window[key][value](data, $param.customData);
                });
            },
            "error": function(data) {
                $.each($param.error, function(key, value) {
                    window[key][value](data, $param.customData);
                });
            }
        });

    }
}