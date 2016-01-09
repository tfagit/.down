(function ($) {
    "use strict";

    $(document).ready(function(){
        $("abbr.timeago").timeago();

        new Clipboard(".clip-copy");
    });
})(jQuery);
